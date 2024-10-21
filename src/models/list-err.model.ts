/* eslint-disable @typescript-eslint/no-explicit-any */
export interface List {
    id: number;
    ma_err: string;
    thongbao: string;
    nguyennhan: string;
    xuly: string;
    images: { id: number; url: string }[]; // Đảm bảo kiểu dữ liệu cho hình ảnh
    [key: string]: any;
}