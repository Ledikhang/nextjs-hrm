import React from 'react';
import { Input, InputProps } from 'antd';
import '../../app/public/custum.css'

interface CustomInputProps extends InputProps {
  placeholder?: string; // Chỉ định kiểu cho placeholder (nếu cần)
}

const CustomInput: React.FC<CustomInputProps> = (props) => {
  return (
    <Input
      {...props}
      className="custom-input" 
      placeholder={props.placeholder}
    />
  );
};

export default CustomInput;
