import React from 'react';
import { message } from 'antd';
import FormAddUpdate from "../FormAdd";

import { fetchAddErr } from '@/apis/list-err/add-err.api';

export default function AddErrComponent() {
    const onSubmit = async (values: FormData) => {
        try {
            await fetchAddErr(values);
            message.success('Thêm thông tin lỗi thành công!');
        } catch {
            message.error('Thêm dữ liệu không thành công, vui lòng kiểm tra lại');
        }
    };

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>THÊM THÔNG TIN LỖI</h1>
            <FormAddUpdate onSubmit={onSubmit} />
        </>
    );
}
