import axios from 'axios';

// Hàm xóa item theo id
export const deleteItem = async (id: string | number): Promise<void> => {
    await axios.delete(`http://localhost:3000/list-err/${id}`);
};