import { Layout, Row, Divider } from 'antd';
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

function Landing() {
    return (
        <div className="layout">
            <Row align="middle" justify="center" className="headerStyle">
                PID Analyzer GUI
            </Row>
            <Divider />
            <div style={{ margin: "0px 15px 0px 15px", paddingBottom: "15px" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Landing;
