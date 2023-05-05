import { useState, useEffect } from 'react';
import { Image, Typography, Row, Col, message, Spin, Card } from 'antd';
const { Title } = Typography;

function PIDPlots({ logId, ...props }) {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/get_pid_plots`, {
            method: 'POST',
            headers: {
                Accept: 'application.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'log_file': logId })
        }).then(response => response.json())
            .then(data => {
                data = data.map(e => `http://localhost:5000/image/${e}`)
                setLinks(data);
                setLoading(false);
            }).catch(e => {
                message.error("PID Step Response Plots cannot be generated for this log!");
            });
    }, [logId]);

    return (
        <Row align="middle" justify="center" gutter={10}>
            <Col span={24}>
                <Card
                    title="PID Step Response Plots"
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
                    <Row align="middle" justify="center">
                        {loading &&
                            <Spin tip="Generating Plots" size="large" />
                        }
                        {!loading && links && links.length > 0 && links.map((link, index) => (
                            <Col key={index} span={8} style={{ padding: "10px" }}>
                                <Image
                                    width={"100%"}
                                    src={link}
                                />
                            </Col>
                        ))}
                        {!loading && links && links.length == 0 &&
                            <>Insufficient data to generate plots!</>
                        }
                    </Row>
                </Card>
            </Col>
        </Row>
    );
}

export default PIDPlots;
