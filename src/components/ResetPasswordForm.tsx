import { resetPasswordApi } from "@/apis/resetPassword.api";
import { User } from "@/models/user.model";
import { Button, Form, Input, message } from "antd";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [form] = Form.useForm();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate } = useMutation<
    AxiosResponse<User>,
    AxiosError,
    { token: string; newPassword: string }
  >(({ token, newPassword }) => resetPasswordApi(token, newPassword), {
    onSuccess: (data) => {
      message.success(data.data.message || "Password reset successfully");
      router.push("/login");
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra trong quá trình đặt lại mật khẩu"
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onFinish = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (values.newPassword !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    mutate({ token, newPassword: values.newPassword });
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="newPassword"
        label="New Password"
        rules={[
          { required: true, message: "Please input your new password" },
          { min: 6, message: "Password must be at least 6 characters long" },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        rules={[
          { required: true, message: "Please confirm your new password" },
          { min: 6, message: "Password must be at least 6 characters long" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("newPassword") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords do not match")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isSubmitting} block>
          Đặt lại mật khẩu
        </Button>
      </Form.Item>
    </Form>
  );
}
