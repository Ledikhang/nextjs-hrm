// src/api/errorApi.ts
import { List } from '@/models/list-err.model';
import axios from 'axios';


// Hàm để lấy dữ liệu lỗi theo ID
export const fetchErrorById = async (id: string | number) => {
    try {
        const response = await axios.get(`http://localhost:3000/list-err/${id}`);
        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error fetching error data:', error);
        throw new Error('Đã có lỗi xảy ra khi lấy dữ liệu');
    }
};


// Hàm gọi API để cập nhật lỗi
export const updateError = async (id: string | number, errorData: List) => {
    try {
        const response = await axios.patch(`http://localhost:3000/list-err/${id}`, errorData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error updating error:', error);
        throw new Error('Đã có lỗi xảy ra khi cập nhật dữ liệu');
    }
};