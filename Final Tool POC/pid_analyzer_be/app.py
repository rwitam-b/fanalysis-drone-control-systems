from flask import Flask, request, redirect, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import pandas as pd
import json
from pidAnalyzer import get_pid_sr_plots, get_log_metadata

UPLOAD_FOLDER = './Uploads'

app = Flask(__name__)
CORS(app)


@app.route('/upload_log', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        print(f"Incoming filename: {f.filename}")
        sanitized_filename = secure_filename(f.filename)
        f.save(os.path.join(UPLOAD_FOLDER, sanitized_filename))
        return json.dumps({'uploadDone': True, 'analysisPage': f"/viewAnalysis/{sanitized_filename}"}), 200, {'ContentType': 'application/json'}


@app.route('/get_pid_plots', methods=['POST'])
def process_log():
    if request.method == 'POST':
        request_data = request.get_json()
        file_name = request_data['log_file']
        plot_filenames = get_pid_sr_plots(os.path.join(UPLOAD_FOLDER, file_name))
        return plot_filenames


@app.route('/get_pid_params', methods=['POST'])
def get_pid_params():
    if request.method == 'POST':
        request_data = request.get_json()
        file_name = request_data['log_file']
        return get_log_metadata(os.path.join(UPLOAD_FOLDER, file_name))


@app.route('/image/<image_id>', methods=['GET'])
def get_image(image_id):
    print(image_id)
    if request.method == 'GET':
        return send_file(os.path.join("./static", image_id), mimetype='image/png')


@app.route('/fetchCommonConfigs/<hardware_type>', methods=['GET'])
def get_hardware_common_configs(hardware_type):
    print(hardware_type)
    if request.method == 'GET':
        response_json = {}
        df = pd.read_pickle("pid_statistics.pkl")
        mode_df = df.loc[df['hardware'] == hardware_type].mode()
        if len(mode_df) > 0:
            mode_df.drop(columns=['airframe_name', 'airframe_type', 'hardware','software'], inplace=True)
            mode_df = mode_df.round(3)
            response_json = mode_df.loc[0].to_json()        
        return response_json, 200, {'ContentType': 'application/json'}


if __name__ == '__main__':
    app.run(debug=True)
