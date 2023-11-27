import { EditOutlined, UnlockOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tag,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';

import authApi from 'src/api/authApi';
import district_json from 'src/mocks/quan_huyen.json';

type ChangePasswordModalProps = {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  mail: string;
};
const ChangePasswordModal = ({
  visible,
  onCancel,
  onSuccess,
  mail,
}: ChangePasswordModalProps) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) return;
      const data = JSON.parse(userInfo);
      const values = await form.validateFields();
      const res = await authApi.changePassword({
        id: data.id,
        checkpass: values.checkpass,
        newpass: values.newpass,
      });
      if (res.data.status) {
        message.success(res.data.message);
        onSuccess();
        form.resetFields();
      } else {
        message.error(res.data.message);
      }
      console.log('res:', res);
    } catch (error) {
      console.error('da co loi: ', error);
    }
  };
  const handleSendMail = async () => {
    // navigate('/xac-thuc');
    const sendData = {
      email: mail,
    };
    try {
      // const response = await authApi.sendcode(sendData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCancle = () => {
    onCancel();
  };
  return (
    <Modal
      title='Đổi mật khẩu'
      open={visible}
      onCancel={handleCancle}
      onOk={handleOk}
      width={350}
      okText='Xác nhận'
      cancelText='Huỷ'
    >
      <Form form={form} labelAlign='left' layout='vertical'>
        <Form.Item
          label='Mật khẩu hiện tại'
          name='checkpass'
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
        >
          <Input.Password style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='newpass'
          label='Mật khẩu mới'
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            {
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự!',
            },
          ]}
        >
          <Input.Password style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name='checkNewPass'
          label='Xác nhận mật khẩu mới'
          // Additional rules for validating checkNewPass
          rules={[
            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
            {
              min: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự!',
            },
            () => ({
              validator(_, value) {
                if (value !== form.getFieldValue('newpass')) {
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
                } else {
                  return Promise.resolve();
                }
              },
            }),
          ]}
        >
          <Input.Password style={{ width: '100%' }} />
        </Form.Item>
        <a onClick={() => handleSendMail()}>Quên mật khẩu?</a>
      </Form>
    </Modal>
  );
};

const districtJson = Object.values(district_json);
const UserProfilePage = () => {
  const [userData, setUserData] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const loadUserInfo = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const data = JSON.parse(userInfo);
      const sample = {
        HoTen: data.HoTen,
        sdt: data.sdt,
        quan: data.quan,
        email: data.email,
        Diachi: data.Diachi,
      };
      setUserData(sample);
    }
  };
  useEffect(() => {
    loadUserInfo();
  }, []);

  useEffect(() => {
    if (userData) {
      const data = {
        ...userData,
        quan: districtJson.find(
          (item: any) => item.name_with_type === userData.quan,
        )?.code,
      };
      console.log('data:', data);

      form.setFieldsValue(data);
    }
  }, [userData, form]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleChangeUserInfo = async () => {
    try {
      const values = form.getFieldsValue();

      console.log(values);
      const userInfo = localStorage.getItem('userInfo');
      if (!userInfo) return;
      const oldData = JSON.parse(userInfo);

      const edtiData = {
        ...oldData,
        ...values,
        quan: districtJson.find((item: any) => item.code === values.quan)
          ?.name_with_type,
      };
      const resEdit = await authApi.editUserInfo(edtiData);
      if (resEdit.data.status) {
        console.log('resEdit:', resEdit);
        setEditMode(false);
        localStorage.setItem(
          'userInfo',
          JSON.stringify(resEdit.data?.datalink),
        );
        loadUserInfo();
        message.success(resEdit.data.message || 'Sửa thông tin thành công');
      } else {
        message.error('Sửa thông tin thất bại');
      }
    } catch (error) {
      console.error('Failed to save edits: ', error);
    }
  };

  const handleChangePasswordSuccess = async () => {
    setModalVisible(false);
    console.log('success');
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Card
        className='m-3 rounded'
        title={
          <Tag color='#0FAC56'>
            <h3>Thông tin tài khoản</h3>
          </Tag>
        }
        extra={
          <Space>
            {!editMode ? (
              <Button
                icon={<EditOutlined />}
                type='default'
                onClick={handleEditClick}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <>
                <Space>
                  <Button onClick={handleCancelClick}>Huỷ</Button>
                  <Button type='primary' onClick={handleChangeUserInfo}>
                    Lưu
                  </Button>
                </Space>
              </>
            )}
            <Button
              type='default'
              onClick={() => setModalVisible(true)}
              icon={<UnlockOutlined />}
            >
              Đổi mật khẩu
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name='editUserInfo'
          // onFinish={onFinish}
          layout='vertical'
          initialValues={userData}
          scrollToFirstError
        >
          <Descriptions layout='vertical' column={{ xs: 2, sm: 3, lg: 4 }}>
            <Descriptions.Item label='Email'>
              {userData?.email}
            </Descriptions.Item>
            <Descriptions.Item label='Họ tên'>
              {editMode ? (
                <Form.Item
                  name='HoTen'
                  rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                >
                  <Input />
                </Form.Item>
              ) : (
                userData?.HoTen
              )}
            </Descriptions.Item>
            <Descriptions.Item label='Điện thoại'>
              {editMode ? (
                <Form.Item
                  name='sdt'
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    {
                      pattern: new RegExp(/^[0-9\b]+$/),
                      message: 'Vui lòng nhập số!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                userData?.sdt
              )}
            </Descriptions.Item>
            <Descriptions.Item label='Quận'>
              {editMode ? (
                <Form.Item
                  name='quan'
                  rules={[{ required: true, message: 'Vui lòng nhập quận!' }]}
                >
                  <Select
                    options={districtJson.map((item: any) => ({
                      label: item.name_with_type,
                      value: item.code,
                    }))}
                    className='min-w-[300px]'
                  ></Select>
                </Form.Item>
              ) : (
                userData?.quan
              )}
            </Descriptions.Item>
            <Descriptions.Item label='Địa chỉ'>
              {editMode ? (
                <Form.Item
                  name='Diachi'
                  rules={[
                    { required: true, message: 'Vui lòng nhập địa chỉ!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              ) : (
                userData?.Diachi
              )}
            </Descriptions.Item>
          </Descriptions>
        </Form>
      </Card>

      <ChangePasswordModal
        visible={modalVisible}
        mail={userData?.email}
        onCancel={() => setModalVisible(false)}
        onSuccess={handleChangePasswordSuccess}
      />
    </Space>
  );
};

export default UserProfilePage;
