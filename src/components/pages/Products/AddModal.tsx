import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
} from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { ProductProps } from 'src/constants/types/product';
import useDebounce from 'src/hooks/useDebounce';
import { formatPrice, formatPriceInput } from 'src/utils/format';
import { randomString } from 'src/utils/randomString';

const { Dragger } = Upload;
type Props = {
  isOpen: boolean;
  onSuccess: (values: any) => void;
  onCancel: () => void;
  editingProduct: ProductProps | null;
  modalType: 'add' | 'edit' | null;
};

const AddModal = (props: Props) => {
  const { isOpen, onCancel, onSuccess, modalType, editingProduct } = props;
  const [form] = Form.useForm();

  const [costValue, setCostValue] = useState<number>(0);
  const [priceValue, setPriceValue] = useState<number>(0);
  const [showProfit, setShowProfit] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const selectWeight = (
    <Select defaultValue='kilogram'>
      <Select.Option value='kilogram'>kilogram</Select.Option>
      <Select.Option value='gram'>gram</Select.Option>
    </Select>
  );
  const selectVolume = (
    <Select defaultValue='mili-lit'>
      <Select.Option value='mili-lit'>mili lít</Select.Option>
      <Select.Option value='lit'>lít</Select.Option>
    </Select>
  );

  const draggerProps: UploadProps = {
    name: 'file',
    multiple: true,
    maxCount: 1,
    accept: '.jpg, .png, .jpeg',
    listType: 'picture',
    fileList,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      setFileList([...info.fileList]);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const handleShowProfit = useDebounce(() => {
    if (costValue && priceValue) setShowProfit(true);
  }, 500);
  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      console.log('values:', values);
      onSuccess({
        ...values,
        idCh: 1,
        idTh: 1,
        idDm: 1,
        idNcc: 1,
        idLoai: 1,
      });
    } catch (error) {}
  };
  useEffect(() => {
    form.resetFields();
    if (modalType === 'add') form.setFieldValue('code', randomString('SP'));
    if (modalType === 'edit' && editingProduct) {
      form.setFieldsValue(editingProduct);
      setShowProfit(true);
    }
  }, [modalType, editingProduct?.id]);

  return (
    <Modal
      title={`${modalType === 'edit' ? 'Sửa' : 'Thêm'} sản phẩm`}
      okText={`${modalType === 'edit' ? 'Lưu' : 'Thêm mới'}`}
      cancelText='Hủy'
      open={isOpen}
      onOk={handleSubmitForm}
      onCancel={onCancel}
      width={800}
      destroyOnClose
      className='add-product-modal'
    >
      <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
        <Card size='small' title='Thông tin chung'>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label='Tên sản phẩm'
                rules={[
                  { required: true, message: 'Vui lòng nhập tên sản phẩm' },
                ]}
                name={'ten'}
              >
                <Input placeholder='Tên sản phẩm' tabIndex={1} />
              </Form.Item>
              <Form.Item
                label='Mã sản phẩm'
                rules={[
                  { required: true, message: 'Vui lòng nhập mã sản phẩm' },
                ]}
                name={'maSp'}
              >
                <Input placeholder='Mã sản phẩm' tabIndex={3} />
              </Form.Item>
              <Form.Item
                label='Cửa hàng'
                name={'idCh'}
                // rules={[{ required: true, message: 'Vui lòng chọn cửa hàng' }]}
              >
                <Select placeholder='Cửa hàng' tabIndex={5} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label='Loại sản phẩm'
                name={'idLoai'}
                // rules={[
                //   { required: true, message: 'Vui lòng chọn loại sản phẩm' },
                // ]}
              >
                <Select placeholder='Loại sản phẩm' tabIndex={2} />
              </Form.Item>
              <Form.Item
                label='Danh mục'
                name={'idDm'}
                // rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder='Danh mục' tabIndex={4} />
              </Form.Item>
              <Form.Item
                label='Nhà cung cấp'
                name={'idSupplier'}
                // rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder='Danh mục' tabIndex={4} />
              </Form.Item>
              <Form.Item
                label='Thương hiệu'
                name={'idTh'}
                // rules={[
                //   { required: true, message: 'Vui lòng chọn thương hiệu' },
                // ]}
              >
                <Select placeholder='Thương hiệu' tabIndex={6} />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card size='small' title='Giá sản phẩm'>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                label='Giá vốn'
                name='giaVon'
                rules={[{ required: true, message: 'Vui lòng nhập giá vốn' }]}
              >
                <InputNumber
                  placeholder='Giá vốn'
                  tabIndex={7}
                  formatter={value => formatPriceInput(value)}
                  className='w-full'
                  onChange={value => {
                    setShowProfit(false);
                    setCostValue(Number(value));
                  }}
                  value={costValue}
                  addonAfter='VNĐ'
                  onBlur={handleShowProfit}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label='Giá bán'
                name='giaBan'
                rules={[{ required: true, message: 'Vui lòng nhập giá bán' }]}
              >
                <InputNumber
                  placeholder='Giá bán'
                  tabIndex={8}
                  formatter={value => formatPriceInput(value)}
                  className='w-full'
                  onChange={value => {
                    setShowProfit(false);
                    setPriceValue(Number(value));
                  }}
                  value={priceValue}
                  addonAfter='VNĐ'
                  onBlur={handleShowProfit}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='mt-3'>
            {showProfit ? (
              <>
                <div className='text-typo-3'>
                  Biên lợi nhuận:
                  <span className='font-bold text-typo-1'>
                    {(((priceValue - costValue) / priceValue) * 100).toFixed(2)}
                    %
                  </span>
                </div>
                <div className='ml-3 text-typo-3'>
                  Lợi nhuận:{' '}
                  <span className='font-bold text-typo-1'>
                    {formatPrice((priceValue - costValue).toString())}/sản phẩm
                  </span>
                </div>
              </>
            ) : (
              <></>
            )}
          </Row>
        </Card>
        <Card
          size='small'
          title='Hình ảnh sản phẩm'
          className={clsx(
            'transition-md',
            fileList.length > 0 && 'file-uploaded',
          )}
        >
          <Dragger {...draggerProps}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text px-4'>
              Kéo thả file hoặc click vào đây để upload
            </p>
          </Dragger>
        </Card>
        <Card size='small' title='Thông tin khác'>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label='Khối lượng' name={'weight'}>
                <Input
                  placeholder='Khối lượng'
                  tabIndex={9}
                  addonAfter={selectWeight}
                />
              </Form.Item>
              <Form.Item label='Thể tích' name={'capacity'}>
                <Input
                  placeholder='Thể tích'
                  tabIndex={11}
                  addonAfter={selectVolume}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label='Tồn kho' name={'quantity'}>
                <InputNumber
                  placeholder='Tồn kho'
                  tabIndex={10}
                  className='w-full'
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
};

export default AddModal;
