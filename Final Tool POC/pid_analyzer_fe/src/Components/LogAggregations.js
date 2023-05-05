import { useState, useEffect } from 'react';
import { Descriptions, Typography, Row, Col, Select, Card, Spin } from 'antd';
const { Title } = Typography;

function LogAggregations({ logId, ...props }) {
    const [hardware, setHardware] = useState("PX4_FMU_V2");
    const [loading, setLoading] = useState(true);
    const [hardwareConfigs, setHardwareConfigs] = useState({
        "MC_ROLL_P": 0,
        "MC_PITCH_P": 0,
        "MC_YAW_P": 0,
        "MC_ROLLRATE_P": 0,
        "MC_ROLLRATE_I": 0,
        "MC_ROLLRATE_D": 0,
        "MC_ROLLRATE_K": 0,
        "MC_PITCHRATE_P": 0,
        "MC_PITCHRATE_I": 0,
        "MC_PITCHRATE_D": 0,
        "MC_PITCHRATE_K": 0,
        "MC_YAWRATE_P": 0,
        "MC_YAWRATE_I": 0,
        "MC_YAWRATE_D": 0,
        "MC_YAWRATE_K": 0
    });

    useEffect(() => {
        fetch(`http://localhost:5000/fetchCommonConfigs/${hardware}`)
            .then(response => response.json()
            ).then(data => {
                setHardwareConfigs(data);
                setLoading(false);
            }).catch(e => {
                console.log(e);
            });
    }, [hardware]);

    return (
        <Row align="middle" justify="center" gutter={10}>
            <Col span={24}>
                <Card
                    title="Most Common Parameter Settings (Real-World Log Statistics)"
                    bordered={false}
                    hoverable
                    className='glass-card'
                    style={{
                        width: "100%",
                    }}
                    headStyle={{
                        fontSize: "20px",
                        color: "white"
                    }}
                >
                    <Row align="middle" justify="space-between" gutter={10}>
                        <Col span={6}>
                            Airframe Type:&nbsp;
                            <Select
                                defaultValue="PX4_FMU_V2"
                                showSearch
                                onChange={value => {
                                    setLoading(true);
                                    setHardware(value);
                                }}
                                options={[
                                    {
                                        "value": "PX4_FMU_V5",
                                        "label": "PX4_FMU_V5"
                                    },
                                    {
                                        "value": "PX4_FMU_V6C",
                                        "label": "PX4_FMU_V6C"
                                    },
                                    {
                                        "value": "MRO_CTRL_ZERO_H7",
                                        "label": "MRO_CTRL_ZERO_H7"
                                    },
                                    {
                                        "value": "CUBEPILOT_CUBEYELLOW",
                                        "label": "CUBEPILOT_CUBEYELLOW"
                                    },
                                    {
                                        "value": "MODALAI_FC_V1",
                                        "label": "MODALAI_FC_V1"
                                    },
                                    {
                                        "value": "AUAV_X21",
                                        "label": "AUAV_X21"
                                    },
                                    {
                                        "value": "PX4_FMU_V3",
                                        "label": "PX4_FMU_V3"
                                    },
                                    {
                                        "value": "CUBEPILOT_CUBEORANGE",
                                        "label": "CUBEPILOT_CUBEORANGE"
                                    },
                                    {
                                        "value": "PX4_FMU_V2",
                                        "label": "PX4_FMU_V2"
                                    },
                                    {
                                        "value": "PX4_SITL",
                                        "label": "PX4_SITL"
                                    },
                                    {
                                        "value": "PX4_FMU_V4",
                                        "label": "PX4_FMU_V4"
                                    },
                                    {
                                        "value": "CODEV_DP1000_V2",
                                        "label": "CODEV_DP1000_V2"
                                    },
                                    {
                                        "value": "PX4_FMU_V6X",
                                        "label": "PX4_FMU_V6X"
                                    },
                                    {
                                        "value": "PX4_FMU_V4PRO",
                                        "label": "PX4_FMU_V4PRO"
                                    },
                                    {
                                        "value": "PX4_FMU_V5X",
                                        "label": "PX4_FMU_V5X"
                                    },
                                    {
                                        "value": "HOLYBRO_KAKUTEH7",
                                        "label": "HOLYBRO_KAKUTEH7"
                                    },
                                    {
                                        "value": "UVIFY_CORE",
                                        "label": "UVIFY_CORE"
                                    },
                                    {
                                        "value": "MODALAI_RB5_FLIGHT",
                                        "label": "MODALAI_RB5_FLIGHT"
                                    },
                                    {
                                        "value": "CUAV_NORA",
                                        "label": "CUAV_NORA"
                                    },
                                    {
                                        "value": "DRONEYEE_ZYRACER",
                                        "label": "DRONEYEE_ZYRACER"
                                    },
                                    {
                                        "value": "THEPEACH_K1",
                                        "label": "THEPEACH_K1"
                                    },
                                    {
                                        "value": "SKYPERSONIC_FC_V3",
                                        "label": "SKYPERSONIC_FC_V3"
                                    },
                                    {
                                        "value": "RING_ZEUS",
                                        "label": "RING_ZEUS"
                                    },
                                    {
                                        "value": "DROTEK_IO_STAR",
                                        "label": "DROTEK_IO_STAR"
                                    },
                                    {
                                        "value": "BEAGLEBONE_BLUE",
                                        "label": "BEAGLEBONE_BLUE"
                                    },
                                    {
                                        "value": "AMOVLAB_P450",
                                        "label": "AMOVLAB_P450"
                                    },
                                    {
                                        "value": "MATEK_H743",
                                        "label": "MATEK_H743"
                                    },
                                    {
                                        "value": "TEAL_FMU_V5_MK1",
                                        "label": "TEAL_FMU_V5_MK1"
                                    },
                                    {
                                        "value": "VANTAGE_VESPER",
                                        "label": "VANTAGE_VESPER"
                                    },
                                    {
                                        "value": "CODEV_AQUILA_V2",
                                        "label": "CODEV_AQUILA_V2"
                                    },
                                    {
                                        "value": "AMOVLAB_P230",
                                        "label": "AMOVLAB_P230"
                                    },
                                    {
                                        "value": "CUAV_X7PRO",
                                        "label": "CUAV_X7PRO"
                                    },
                                    {
                                        "value": "SKY_DRONES_SMARTAP_AIRLINK",
                                        "label": "SKY_DRONES_SMARTAP_AIRLINK"
                                    },
                                    {
                                        "value": "CODEV_TALON1000",
                                        "label": "CODEV_TALON1000"
                                    },
                                    {
                                        "value": "NXP_FMUK66_V3",
                                        "label": "NXP_FMUK66_V3"
                                    },
                                    {
                                        "value": "HOLYBRO_KAKUTEF7",
                                        "label": "HOLYBRO_KAKUTEF7"
                                    },
                                    {
                                        "value": "CODEV_DP1000",
                                        "label": "CODEV_DP1000"
                                    },
                                    {
                                        "value": "OMNIBUS_F4SD",
                                        "label": "OMNIBUS_F4SD"
                                    },
                                    {
                                        "value": "MODALAI_FC_V2",
                                        "label": "MODALAI_FC_V2"
                                    },
                                    {
                                        "value": "MRO_X21",
                                        "label": "MRO_X21"
                                    },
                                    {
                                        "value": "MRO_CTRL_ZERO_F7",
                                        "label": "MRO_CTRL_ZERO_F7"
                                    },
                                    {
                                        "value": "HOLYBRO_DURANDAL_V1",
                                        "label": "HOLYBRO_DURANDAL_V1"
                                    },
                                    {
                                        "value": "MATEK_H743_SLIM",
                                        "label": "MATEK_H743_SLIM"
                                    },
                                    {
                                        "value": "LUMENIER_FMU_V5",
                                        "label": "LUMENIER_FMU_V5"
                                    },
                                    {
                                        "value": "AEROFC_V1",
                                        "label": "AEROFC_V1"
                                    },
                                    {
                                        "value": "RADIOLINK_MINIPIX_V1",
                                        "label": "RADIOLINK_MINIPIX_V1"
                                    },
                                    {
                                        "value": "PX4_SP20",
                                        "label": "PX4_SP20"
                                    },
                                    {
                                        "value": "PX4_FMU_V4GLUAS",
                                        "label": "PX4_FMU_V4GLUAS"
                                    },
                                    {
                                        "value": "SITL",
                                        "label": "SITL"
                                    },
                                    {
                                        "value": "ROBOTICAN_EFC",
                                        "label": "ROBOTICAN_EFC"
                                    },
                                    {
                                        "value": "Spot-1",
                                        "label": "Spot-1"
                                    },
                                    {
                                        "value": "INTEL_AEROFC_V1",
                                        "label": "INTEL_AEROFC_V1"
                                    },
                                    {
                                        "value": "PX4_FC_111",
                                        "label": "PX4_FC_111"
                                    },
                                    {
                                        "value": "EFYTECH_SITL",
                                        "label": "EFYTECH_SITL"
                                    },
                                    {
                                        "value": "PX4_AIRPI2",
                                        "label": "PX4_AIRPI2"
                                    },
                                    {
                                        "value": "GTEN_UPAIR3",
                                        "label": "GTEN_UPAIR3"
                                    },
                                    {
                                        "value": "tap-v18s02",
                                        "label": "tap-v18s02"
                                    },
                                    {
                                        "value": "INTEL_SS",
                                        "label": "INTEL_SS"
                                    },
                                    {
                                        "value": "EMLID_NAVIO2",
                                        "label": "EMLID_NAVIO2"
                                    },
                                    {
                                        "value": "LHCZ_SITL",
                                        "label": "LHCZ_SITL"
                                    },
                                    {
                                        "value": "MMC_SK3_V1",
                                        "label": "MMC_SK3_V1"
                                    },
                                    {
                                        "value": "UVR_POWER",
                                        "label": "UVR_POWER"
                                    },
                                    {
                                        "value": "FCUVS_V2",
                                        "label": "FCUVS_V2"
                                    },
                                    {
                                        "value": "AV_X_V1",
                                        "label": "AV_X_V1"
                                    },
                                    {
                                        "value": "NXPHLITE_V3",
                                        "label": "NXPHLITE_V3"
                                    },
                                    {
                                        "value": "EAGLE",
                                        "label": "EAGLE"
                                    },
                                    {
                                        "value": "OCPOC",
                                        "label": "OCPOC"
                                    },
                                    {
                                        "value": "CRAZYFLIE",
                                        "label": "CRAZYFLIE"
                                    },
                                    {
                                        "value": "RPI",
                                        "label": "RPI"
                                    },
                                    {
                                        "value": "PHENIX_GH",
                                        "label": "PHENIX_GH"
                                    }
                                ]}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row align="middle" justify="center">
                        {loading &&
                            <Spin tip="Loading" size="large" />
                        }
                    </Row>
                    {!loading &&
                        <Row align="top" justify="center" gutter={10}>

                            <Col span={6}>
                                <Card
                                    title="Attitude Controller P gains"
                                    bordered={false}
                                    hoverable
                                    className='glass-card-2'
                                    style={{
                                        width: "100%",
                                    }}
                                    headStyle={{
                                        fontSize: "20px",
                                        color: "white"
                                    }}
                                >
                                    <Descriptions
                                        size="small"
                                        bordered
                                        layout="vertical"
                                        column={{
                                            xxl: 2,
                                            xl: 2,
                                            lg: 3,
                                            md: 3,
                                            sm: 2,
                                            xs: 1,
                                        }}
                                        labelStyle={{ color: "black", fontWeight: "bold" }}
                                        contentStyle={{ color: "black" }}
                                    >
                                        <Descriptions.Item label="MC_ROLL_P">{hardwareConfigs["MC_ROLL_P"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_PITCH_P">{hardwareConfigs["MC_PITCH_P"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_YAW_P">{hardwareConfigs["MC_YAW_P"]}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    title="Roll Rate Controller PID Gains"
                                    bordered={false}
                                    hoverable
                                    className='glass-card-2'
                                    style={{
                                        width: "100%",
                                    }}
                                    headStyle={{
                                        fontSize: "20px",
                                        color: "white"
                                    }}
                                >
                                    <Descriptions
                                        size="small"
                                        bordered
                                        layout="vertical"
                                        column={{
                                            xxl: 2,
                                            xl: 2,
                                            lg: 3,
                                            md: 3,
                                            sm: 2,
                                            xs: 1,
                                        }}
                                        labelStyle={{ color: "black", fontWeight: "bold" }}
                                        contentStyle={{ color: "black" }}
                                    >
                                        <Descriptions.Item label="MC_ROLLRATE_P">{hardwareConfigs["MC_ROLLRATE_P"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_ROLLRATE_I">{hardwareConfigs["MC_ROLLRATE_I"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_ROLLRATE_D">{hardwareConfigs["MC_ROLLRATE_D"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_ROLLRATE_K">{hardwareConfigs["MC_ROLLRATE_K"]}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    title="Pitch Rate Controller PID Gains"
                                    bordered={false}
                                    hoverable
                                    className='glass-card-2'
                                    style={{
                                        width: "100%",
                                    }}
                                    headStyle={{
                                        fontSize: "20px",
                                        color: "white"
                                    }}
                                >
                                    <Descriptions
                                        size="small"
                                        bordered
                                        layout="vertical"
                                        column={{
                                            xxl: 2,
                                            xl: 2,
                                            lg: 3,
                                            md: 3,
                                            sm: 2,
                                            xs: 1,
                                        }}
                                        labelStyle={{ color: "black", fontWeight: "bold" }}
                                        contentStyle={{ color: "black" }}
                                    >
                                        <Descriptions.Item label="MC_PITCHRATE_P">{hardwareConfigs["MC_PITCHRATE_P"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_PITCHRATE_I">{hardwareConfigs["MC_PITCHRATE_I"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_PITCHRATE_D">{hardwareConfigs["MC_PITCHRATE_D"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_PITCHRATE_K">{hardwareConfigs["MC_PITCHRATE_K"]}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card
                                    title="Yaw Rate Controller PID Gains"
                                    bordered={false}
                                    hoverable
                                    className='glass-card-2'
                                    style={{
                                        width: "100%",
                                    }}
                                    headStyle={{
                                        fontSize: "20px",
                                        color: "white"
                                    }}
                                >
                                    <Descriptions
                                        size="small"
                                        bordered
                                        layout="vertical"
                                        column={{
                                            xxl: 2,
                                            xl: 2,
                                            lg: 3,
                                            md: 3,
                                            sm: 2,
                                            xs: 1,
                                        }}
                                        labelStyle={{ color: "black", fontWeight: "bold" }}
                                        contentStyle={{ color: "black" }}
                                    >
                                        <Descriptions.Item label="MC_YAWRATE_P">{hardwareConfigs["MC_YAWRATE_P"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_YAWRATE_I">{hardwareConfigs["MC_YAWRATE_I"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_YAWRATE_D">{hardwareConfigs["MC_YAWRATE_D"]}</Descriptions.Item>
                                        <Descriptions.Item label="MC_YAWRATE_K">{hardwareConfigs["MC_YAWRATE_K"]}</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                            </Col>
                        </Row>
                    }
                </Card>
            </Col>
        </Row>
    );
}

export default LogAggregations;
