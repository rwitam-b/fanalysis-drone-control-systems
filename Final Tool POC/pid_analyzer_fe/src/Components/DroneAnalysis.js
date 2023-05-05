import { useState, useEffect } from 'react';
import { Descriptions, Card, Row, Col, message } from 'antd';

function DroneAnalysis({ logId, ...props }) {
    const [metadata, setMetadata] = useState({
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
        "MC_YAWRATE_K": 0,
        "airframe_name": "",
        "airframe_type": "",
        "hardware": "",
        "software": ""
    });

    useEffect(() => {
        fetch(`http://localhost:5000/get_pid_params`, {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'log_file': logId })
        }).then(response => response.json()
        ).then(data => {
            setMetadata(data);
        }).catch(e => {
            message.error("PID Step Response Plots cannot be generated for this log!");
        });
    }, [logId]);

    return (
        <>
            <Row align="middle" justify="center" gutter={10}>
                <Col span={24}>
                    <Card
                        title="Log Information"
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
                        <Descriptions
                            size="small"
                            bordered
                            column={{
                                xxl: 4,
                                xl: 4,
                                lg: 3,
                                md: 3,
                                sm: 2,
                                xs: 1,
                            }}
                            labelStyle={{ color: "black", fontWeight: "bold" }}
                            contentStyle={{ color: "black" }}
                        >
                            <Descriptions.Item label="Airframe Name">{metadata["airframe_name"]}</Descriptions.Item>
                            <Descriptions.Item label="Airframe Type">{metadata["airframe_type"]}</Descriptions.Item>
                            <Descriptions.Item label="Hardware">{metadata["hardware"]}</Descriptions.Item>
                            <Descriptions.Item label="Software">{metadata["software"]}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
            <br />
            <Row align="top" justify="center" gutter={10}>
                <Col span={6}>
                    <Card
                        title="Attitude Controller P gains"
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
                            <Descriptions.Item label="MC_ROLL_P">{metadata["MC_ROLL_P"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_PITCH_P">{metadata["MC_PITCH_P"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_YAW_P">{metadata["MC_YAW_P"]}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="Roll Rate Controller PID Gains"
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
                            <Descriptions.Item label="MC_ROLLRATE_P">{metadata["MC_ROLLRATE_P"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_ROLLRATE_I">{metadata["MC_ROLLRATE_I"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_ROLLRATE_D">{metadata["MC_ROLLRATE_D"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_ROLLRATE_K">{metadata["MC_ROLLRATE_K"]}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="Pitch Rate Controller PID Gains"
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
                            <Descriptions.Item label="MC_PITCHRATE_P">{metadata["MC_PITCHRATE_P"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_PITCHRATE_I">{metadata["MC_PITCHRATE_I"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_PITCHRATE_D">{metadata["MC_PITCHRATE_D"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_PITCHRATE_K">{metadata["MC_PITCHRATE_K"]}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card
                        title="Yaw Rate Controller PID Gains"
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
                            <Descriptions.Item label="MC_YAWRATE_P">{metadata["MC_YAWRATE_P"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_YAWRATE_I">{metadata["MC_YAWRATE_I"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_YAWRATE_D">{metadata["MC_YAWRATE_D"]}</Descriptions.Item>
                            <Descriptions.Item label="MC_YAWRATE_K">{metadata["MC_YAWRATE_K"]}</Descriptions.Item>
                        </Descriptions>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default DroneAnalysis;
