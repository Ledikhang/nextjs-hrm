/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

interface FormAddUpdateProps {
    onSubmit: (values: FormData) => void;  // Giữ nguyên kiểu là FormData
    initialValues?: never;  // Thay List bằng any nếu không cần thiết
}

const FormAddUpdate: React.FC<FormAddUpdateProps> = ({ onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (values: any) => { // Sử dụng any
        const formData = new FormData();
        formData.append('ma_err', values.ma_err);
        formData.append('thongbao', values.thongbao);
        formData.append('nguyennhan', values.nguyennhan);
        formData.append('xuly', values.xuly);
    
        fileList.forEach((file) => {
            formData.append('file', file.originFileObj);
        });
    
        onSubmit(formData);
    
        form.resetFields();
        setFileList([]);
    };

    const handleUploadChange = ({ fileList }: any) => {
        setFileList(fileList);
    };

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ maxWidth: 600, margin: '0 auto' }}
            onFinish={handleSubmit}
            initialValues={initialValues}
        >
            <Form.Item
                name="ma_err"
                label="Mã Lỗi"
                rules={[{ required: true, message: 'Vui lòng nhập mã lỗi!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="thongbao"
                label="Thông Báo"
                rules={[{ required: true, message: 'Vui lòng nhập thông báo!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="nguyennhan"
                label="Nguyên Nhân"
                rules={[{ required: true, message: 'Vui lòng nhập nguyên nhân!' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="xuly"
                label="Xử Lý"
                rules={[{ required: true, message: 'Vui lòng nhập phương pháp xử lý!' }]}
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item
                name="images"
                label="Tải Hình Ảnh"
            >
                <Upload
                    multiple
                    beforeUpload={() => false}
                    fileList={fileList}
                    onChange={handleUploadChange}
                >
                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Thêm lỗi
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormAddUpdate;
