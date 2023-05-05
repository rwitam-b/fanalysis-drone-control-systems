import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

function Uploader() {
    const navigate = useNavigate();
    const props = {
        name: 'file',
        multiple: false,
        action: 'http://localhost:5000/upload_log',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
                const analysisPage = JSON.parse(info.file.xhr.response)['analysisPage'];
                navigate(analysisPage);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">
                Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
                Supports .ULG log files for the PX4 Ecosystem.
            </p>
        </Dragger>
    );
}

export default Uploader;
