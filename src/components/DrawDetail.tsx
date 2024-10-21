import React, { useEffect, useState } from 'react';
import { Drawer, Image } from 'antd';
import { List } from '@/models/list-err.model';

interface DrawDetailComponentProps {
    record: List | null; // Cập nhật kiểu để cho phép null
    open: boolean; // Trạng thái mở drawer
    onClose: () => void; // Hàm đóng drawer
}

const DrawDetailComponent: React.FC<DrawDetailComponentProps> = ({ record, open, onClose }) => {
    const [drawerWidth, setDrawerWidth] = useState<string>('80%'); // Mặc định là 80%

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setDrawerWidth('100%'); // Full width trên màn hình nhỏ hơn hoặc bằng 768px
            } else {
                setDrawerWidth('80%'); // 80% width trên màn hình lớn hơn 768px
            }
        };

        handleResize(); // Gọi hàm lần đầu để thiết lập kích thước ban đầu
        window.addEventListener('resize', handleResize); // Lắng nghe sự kiện resize

        return () => window.removeEventListener('resize', handleResize); // Cleanup
    }, []);

    return (
        <Drawer 
            width={drawerWidth} 
            title="Chi tiết bản ghi" 
            onClose={onClose} 
            open={open}>
            {record && (
                <>
                    <p><strong>Mã lỗi:</strong> {record.ma_err}</p>
                    <p><strong>Thông báo:</strong> {record.thongbao}</p>
                    <p><strong>Nguyên Nhân:</strong> {record.nguyennhan}</p>
                    <p><strong>Cách xử lý:</strong> {record.xuly}</p>
                    <strong>Ảnh lỗi:</strong> <br />
                    {record.images && record.images.length > 0 ? (
                        record.images.map((image) => (
                            <Image 
                                key={image.id} // Đảm bảo mỗi hình ảnh có key duy nhất
                                src={image.url} 
                                alt={`Ảnh lỗi ${image.id}`} 
                                width={"40%"}
                                style={{ 
                                    objectFit: 'cover', 
                                    padding: '5%' 
                                }}  
                            />
                        ))
                    ) : (
                        <p>Không có hình ảnh nào để hiển thị.</p>
                    )}
                </>
            )}
        </Drawer>
    );
};

export default DrawDetailComponent;
