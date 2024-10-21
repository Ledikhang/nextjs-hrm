/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Input, Button, message, Modal, Form, Image, Upload } from 'antd';
import { AppstoreAddOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import Fuse from "fuse.js";
import dynamic from 'next/dynamic';
import '@/app/public/table.css';
import { List } from '@/models/list-err.model';
import { fetchList } from "@/apis/list-err/list-err.api";
import { deleteItem } from "@/apis/list-err/delete-err.api";
import { useCheckRole } from "@/hooks/useCheckRole";
import { UserRoles } from "@/enums/user-roles";
import { updateError } from "@/apis/list-err/edit-err.api";
import DrawDetailComponent from "../DrawDetail";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";

const { Search } = Input;

// Dynamic import cho Table từ Ant Design (SSR: false)
const Table = dynamic(() => import('antd').then((mod) => mod.Table), { ssr: false });

interface ColumnType {
    title: string;
    dataIndex?: string;
    key: string;
    render?: (text: string, record: List) => React.ReactNode;
}

export default function ListErrComponent() {
    const [data, setData] = useState<List[]>([]);
    const [filteredData, setFilteredData] = useState<List[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<List | null>(null);
    const [fuse, setFuse] = useState<Fuse<List> | null>(null);
    const [modalVisible, setModalVisible] = useState(false); // State cho Modal
    const [form] = Form.useForm(); // Khởi tạo form
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const list = await fetchList();
                // Sắp xếp danh sách theo ID giảm dần
                const sortedList = list.sort((a, b) => b.id - a.id);
                setData(sortedList);
                setFilteredData(sortedList);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const fuseInstance = new Fuse(data, {
                keys: Object.keys(data[0]).filter(key => key !== 'img'),
                threshold: 0.3,
            });
            setFuse(fuseInstance);
        }
    }, [data]);

    const handleSearch = (value: string) => {
        if (fuse) {
            if (value) {
                const results = fuse.search(value);
                const filtered = results.map(result => result.item);
                setFilteredData(filtered);
            } else {
                setFilteredData(data);
            }
        }
    };

    const handleRowSelect = (record: List, action: 'edit' | 'detail') => {
        setSelectedRecord(record);
        if (action === 'edit') {
            setModalVisible(true);
            form.setFieldsValue(record); // Đặt giá trị cho form từ record đã chọn
        } else if (action === 'detail') {
            setDrawerOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRecord(null);
    };

    // Hàm xử lý chỉnh sửa 
    const handleEdit = async (values: List) => {
        if (selectedRecord?.id) {
            // Kiểm tra xem có sự thay đổi nào không
            const hasChanges = Object.keys(values).some(key => values[key] !== selectedRecord[key]);

            if (!hasChanges) {
                message.info('Không có gì để cập nhật.');
                return; // Nếu không có thay đổi, dừng hàm
            }

            try {
                await updateError(selectedRecord.id, values);
                message.success('Cập nhật thành công');
                // Lấy danh sách cập nhật và sắp xếp
                const updatedList = await fetchList();
                const sortedList = updatedList.sort((a, b) => b.id - a.id); // Sắp xếp theo ID giảm dần
                setFilteredData(sortedList);
                handleCloseModal();
            } catch {
                message.error('Có lỗi xảy ra. Cập nhật không thành công.');
            }
        } else {
            message.error('Không tìm thấy ID của bản ghi để cập nhật.');
        }
    };


    const handleDelete = (id: string | number) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa bản ghi này?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                try {
                    await deleteItem(id);
                    message.success('Xóa thành công');
                    const updatedList = await fetchList();
                    // Sắp xếp lại danh sách theo ID giảm dần
                    const sortedList = updatedList.sort((a, b) => b.id - a.id);
                    setFilteredData(sortedList);
                } catch {
                    message.error('Có lỗi xảy ra. Xóa không thành công.');
                }
            },
        });
    };

    const { checkRole } = useCheckRole();

    // Khai báo các cột cho bảng
    const columns: ColumnType[] = [
        {
            title: 'Mã lỗi',
            dataIndex: 'ma_err',
            key: 'ma_err',
        },
        {
            title: 'Thông báo',
            dataIndex: 'thongbao',
            key: 'thongbao',
        },
        {
            title: 'Nguyên Nhân',
            dataIndex: 'nguyennhan',
            key: 'nguyennhan',
        },
        {
            title: 'Cách xử lý',
            dataIndex: 'xuly',
            key: 'xuly',
        },
        {
            title: 'Thao tác',
            key: 'action',
            dataIndex: 'action',
            render: (value: string, record: List) => (
                <>
                    <Button
                        style={{ backgroundColor: 'none' }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRowSelect(record, 'detail'); // Mở drawer với record
                        }}
                    >
                        Chi tiết
                    </Button>
                    {checkRole([UserRoles.OWNER, UserRoles.ADMIN]) && (
                        <>
                            <Button
                                style={{ backgroundColor: '#CCFF33' }}
                                icon={<EditOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleRowSelect(record, 'edit'); // Chọn record để chỉnh sửa
                                }}
                            >
                            </Button>

                            <Button
                                icon={<DeleteOutlined />}
                                style={{ backgroundColor: 'red', color: "#ffffff" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(record.id);
                                }}
                            >
                            </Button>
                        </>
                    )}
                </>
            ),
        },
    ];

    const dataWithKey = filteredData.map((item, index) => ({
        ...item,
        key: item.id || index,
    }));

    return (
        <div className="home">
            <h1>TỔNG HỢP MÃ LỖI VÀ CÁCH XỬ LÝ TRÊN ONEBSS</h1>

            <div className="menu-search-buton">
                <Search
                    style={{ width: '50%' }}
                    placeholder="Nhập thông tin"
                    enterButton="Search"
                    size="large"
                    onSearch={handleSearch}
                />
                <Link href="/manage-err/add-err-view" passHref>
                    <Button
                        style={{ 
                            backgroundColor:'#1677ff',
                            color:'#ffff'
                    }}
                        icon={<AppstoreAddOutlined />}
                    >
                        Thêm mới
                    </Button>
                </Link>
            </div>
            <Table
                rowClassName='custom-row'
                pagination={{ pageSize: 5 }}
                columns={columns as any}
                dataSource={dataWithKey}
            />
            <DrawDetailComponent
                record={selectedRecord}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <Modal
                title="Chỉnh sửa lỗi"
                visible={modalVisible}
                onCancel={handleCloseModal}
                footer={null} // Có thể tùy chỉnh footer nếu cần
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEdit}
                    style={{
                        maxWidth: 600,
                        margin: '0 auto'
                    }}>
                    <Form.Item
                        label="Mã lỗi"
                        name="ma_err"
                        rules={[{ required: true, message: 'Vui lòng nhập mã lỗi!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Thông báo"
                        name="thongbao"
                        rules={[{ required: true, message: 'Vui lòng nhập thông báo!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Nguyên Nhân"
                        name="nguyennhan"
                        rules={[{ required: true, message: 'Vui lòng nhập nguyên nhân!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Cách xử lý"
                        name="xuly"
                        rules={[{ required: true, message: 'Vui lòng nhập cách xử lý!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    {/* <Form.Item
                        name="images"
                        label="Tải Hình Ảnh"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                    >
                        <Upload
                            multiple
                            listType="picture"
                            beforeUpload={() => false}
                            defaultFileList={selectedRecord?.img_url ? [
                                {
                                    uid: '-1',
                                    name: 'image.png',
                                    status: 'done',
                                    url: selectedRecord.img_url, // URL của hình ảnh đã lưu
                                },
                            ] : []}
                        >
                            <Button icon={<UploadOutlined />}>Tải lên</Button>
                        </Upload>
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
