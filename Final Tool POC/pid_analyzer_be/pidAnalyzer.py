import matplotlib
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np
import hashlib
from pathlib import Path
import json
import os
from urllib.parse import urlparse, parse_qs
from bs4 import BeautifulSoup as soup
import px4tools
import sqlite3
from glob import iglob, glob
from html import escape
from pyulog.px4 import *
from pyulog import *
from bokeh.io import output_file, show
from bokeh.plotting import figure, output_notebook, show
import sys
matplotlib.use('Agg')

# adding FlightReview module to the system path
sys.path.insert(0, './flight_review/app/plot_app')

from pid_analysis_plots import get_pid_analysis_plots
from config_tables import *
from plotted_tables import *
from db_entry import *
from helper import *

BULK_PROCESS = False
OUTPUT_FOLDER = './static'

def get_pid_sr_data(file_name):
    output_file_prefix = Path(file_name).stem
    result = []

    try:
        ulog = ULog(file_name)
        px4_ulog = PX4ULog(ulog)
        px4_ulog.add_roll_pitch_yaw()
        db_data = DBData()
    except Exception as e:
        # Nothing if file is corrupt
        return result

    pid_sr_plots = []
    try:
        pid_sr_plots = get_pid_analysis_plots(ulog, px4_ulog, db_data, "")
    except Exception as e:
        print(e)

    print(f"{len(pid_sr_plots)} plots generated!")
    for plot in pid_sr_plots:
        try:
            plot_title = plot.title.text
            print(plot_title)
            if "Step Response for " in plot_title:
                x = list(plot.renderers[1].data_source.data['x'])
                y = list(plot.renderers[1].data_source.data['y'])

                result.append({
                    'id': output_file_prefix,
                    'title': plot_title,
                    'x': x,
                    'y': y
                })
        except Exception as e:
            pass

    return result

def get_pid_metrics(x, y):
    df = pd.DataFrame({'x':x, 'y':y})
    max_y_index = df['y'].idxmax()
    max_entry = df.iloc[max_y_index]   
    
    y_slope = [0 for elem in x]
    for index in range(1, len(y)):
#         y_slope[index] = (y[index] - y[index - 1])/(x[index] - x[index - 1])
        y_slope[index] = y[index] - y[index - 1]
    
    # Metric Calculations
    rise_start = 0
    for idx, point in enumerate(y):            
        if idx > 0 and point >= 0.1 and y[idx-1] < 0.1:
            rise_start = idx
            break
            
    overshoot = 0
    if max_entry['y'] > 1:
        overshoot = (max_entry['y'] - 1) * 100
    
    return max_entry, max_y_index, rise_start, y_slope, round(overshoot, 2)

def get_pid_sr_plots(filename):
    data = get_pid_sr_data(file_name=filename)
    response = []

    for data_item in data:
        plot_title = data_item['title']
        plot_filename = f"{data_item['id']}_{data_item['title']}"
        x = data_item['x']
        y = data_item['y']

        # Process for only non-zero data
        if np.any(y):
            max_entry, max_idx, rise_start, y_slope, overshoot = get_pid_metrics(x, y)
            
            # Plotting code
            plt.clf()

            # Actual Plot
            plt.plot(x, y)
            plt.ylim(ymax = max(1, max(y)) + 0.5, ymin = min(0, min(y)))
            plt.axhline(y = 1, color = 'r', linestyle = 'solid')
            
            # Peak point
            plt.plot(max_entry['x'], max_entry['y'], 'bo')
#             plt.plot(x, y_slope)
            
            # Rise range lines
            plt.axvline(x = x[rise_start], color = 'g', linestyle = 'dotted')        
            plt.axvline(x = max_entry['x'], color = 'y', linestyle = 'dotted')
            
            # Settling plot
            plt.axhline(y = np.mean(y[max_idx:]), xmin=max_entry['x']/x[-1], xmax=x[-1]/x[-1], color = 'r', linestyle = 'dashed')
            
            overshoot = "%.2f" % (overshoot)
            steady_state_err = "%.2f" % ((np.mean(y[max_idx:]) - 1)*100)
            rise_time = "%.2f" % (max_entry['x'] - x[rise_start])
            
            plt.suptitle(plot_title, fontsize=16)
            plt.title(f"\nOvershoot: {overshoot}%" + "\n" + f"Steady State Error: {steady_state_err}%"+ "\n" + f"Rise Time: {rise_time}s")
            # plt.show()
            # plt.tight_layout()
            plt.subplots_adjust(top=0.8)

            h = hashlib.sha256(plot_filename.encode())  
            output_filename = h.hexdigest()
            plt.savefig(os.path.join(OUTPUT_FOLDER, output_filename))
            response.append(f"{output_filename}.png")
    
    return response

def extract_fields_from_log(ulog):
    row_data = {}
    px4_ulog = PX4ULog(ulog)

    # Airframe
    try:
        row_data['airframe_type'] = px4_ulog.get_mav_type()
    except:
        pass
    try:
        row_data['airframe_name'] = get_airframe_name(ulog)[0]
    except:
        pass

    # Hardware
    try:
        row_data['hardware'] = ulog.msg_info_dict['ver_hw']
    except:
        pass

    # Software
    branch_info = ''
    if 'ver_sw_branch' in ulog.msg_info_dict:
        branch_info = ' (branch: ' + ulog.msg_info_dict['ver_sw_branch']+')'
    if 'ver_sw' in ulog.msg_info_dict:
        ver_sw = escape(ulog.msg_info_dict['ver_sw'])
        row_data['software'] = ver_sw + branch_info

    # Parameters
    params = ulog.initial_parameters
    # Attitude Controller P gains
    cols = ['MC_ROLL_P', 'MC_PITCH_P', 'MC_YAW_P']
    for col in cols:
        if col in params:
            row_data[col] = "%.3f" % (params[col])

    # Roll Rate Controller PID Gains
    cols = ['MC_ROLLRATE_P', 'MC_ROLLRATE_I', 'MC_ROLLRATE_D', 'MC_ROLLRATE_K']
    for col in cols:
        if col in params:
            row_data[col] = "%.3f" % (params[col])
        
    # Pitch Rate Controller PID Gains
    cols = ['MC_PITCHRATE_P', 'MC_PITCHRATE_I', 'MC_PITCHRATE_D', 'MC_PITCHRATE_K']
    for col in cols:
        if col in params:
            row_data[col] = "%.3f" % (params[col])

    # Yaw Rate Controller PID Gains
    cols = ['MC_YAWRATE_P', 'MC_YAWRATE_I', 'MC_YAWRATE_D', 'MC_YAWRATE_K']
    for col in cols:
        if col in params:
            row_data[col] = "%.3f" % (params[col])

    # Returning one row of data
    return row_data

def get_log_metadata(log_file):
    try:
        ulog = load_ulog_file(log_file)
        processed_data = extract_fields_from_log(ulog)
        return processed_data
    except Exception as e:
        return None