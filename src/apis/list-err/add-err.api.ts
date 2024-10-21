// src/api/errorApi.ts
import axios from 'axios';

export const fetchAddErr = async (errorData: FormData) => {
    try {
        const response = await axios.post('http://localhost:3000/list-err', errorData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // Trả về dữ liệu từ server
    } catch (error) {
        console.error('Error adding error:', error);
        throw new Error('Đã có lỗi xảy ra khi gửi dữ liệu');
    }
};