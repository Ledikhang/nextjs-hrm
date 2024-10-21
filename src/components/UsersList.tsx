import { useQuery } from "react-query";
import { Spin, Pagination, Input, Form, Modal, Button } from "antd";
import { useContext, useState } from "react";
import { fetchUsers, GetUsersQueryParams } from "@/apis/user.api";
import { ColumnsType } from "antd/es/table";
import { User } from "@/models/user.model";
import dynamic from "next/dynamic";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useDeactivateUser } from "@/hooks/useDeactivateUser";
import { useCheckRole } from "@/hooks/useCheckRole";
import { UserRoles } from "@/enums/user-roles";
import { AuthContext } from "@/context/auth.context";

const Table = dynamic(() => import("antd/lib/table"), { ssr: false });

const { Search } = Input;

const UsersList = () => {
  const [form] = Form.useForm();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [queryParams, setQueryParams] = useState<GetUsersQueryParams>({
    page: 1,
    limit: 10,
    search: "",
  });

  const { user: currentUser } = useContext(AuthContext)!;

  const { data, isLoading, isError } = useQuery(
    ["users", queryParams],
    () => fetchUsers(queryParams),
    {
      keepPreviousData: true,
    }
  );
  const updateUserMutation = useUpdateUser();
  const deactivateUserMutation = useDeactivateUser();

  const handleSearch = (value: string) => {
    setQueryParams((prev) => ({ ...prev, search: value, page: 1 }));
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
      limit: pageSize || prev.limit,
    }));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    form.setFieldsValue(user);
  };

  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      if (editingUser) {
        updateUserMutation.mutate({ id: editingUser.id, data: values });
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleDeactivate = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to deactivate this user?",
      onOk: () => deactivateUserMutation.mutate(id),
    });
  };

  const { checkRole } = useCheckRole();

  const columns: ColumnsType<User> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          {checkRole([UserRoles.OWNER, UserRoles.ADMIN]) && (
            <>
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                onClick={() => handleEdit(record)}
              >
                Edit
              </Button>
              {currentUser?.id !== record.id && (
                <Button onClick={() => handleDeactivate(record.id)} danger>
                  Deactivate
                </Button>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  if (isLoading) return <Spin />;
  if (isError) return <p>Error loading users</p>;

  return (
    <div>
      <Search
        placeholder="Search users"
        onSearch={handleSearch}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Table
        dataSource={data?.data.users}
        columns={columns as any}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        current={queryParams.page}
        pageSize={queryParams.limit}
        total={data?.data.meta.total}
        onChange={handlePageChange}
        showSizeChanger
        style={{ marginTop: 16, textAlign: "right" }}
      />
      <Modal
        title="Edit User"
        open={!!editingUser}
        onOk={handleUpdate}
        onCancel={() => setEditingUser(null)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersList;
