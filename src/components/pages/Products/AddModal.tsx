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
import useSWR from 'swr';
import { RcFile } from 'antd/es/upload';

import { getAPI } from 'src/api/config';
import { ProductProps } from 'src/constants/types/product';
import useDebounce from 'src/hooks/useDebounce';
import { formatPrice, formatPriceInput } from 'src/utils/format';
import { randomString } from 'src/utils/randomString';
import { SupplierProps } from 'src/constants/types/supplier';
import { CategoryProp } from 'src/constants/types/category';
import { BrandProps } from 'src/constants/types/brand';
import { productTypeProps } from 'src/constants/types/productType';

const { Dragger } = Upload;
type Props = {
  isOpen: boolean;
  onSuccess: (values: any) => void;
  onCancel: () => void;
  editingProduct: ProductProps | null;
  modalType: 'add' | 'edit' | null;
};
const SUPPLIERSENDPOINT = '/api/nha-cung-cap?idCh=4';
const CATEGORIESENDPOINT = '/api/danh-muc-san-pham?idCh=4';
const BRANDSENDPOINT = '/api/thuong-hieu?idCh=4';
const PRODUCTTYPEENDPOINT = '/api/loai-san-pham';
const AddModal = (props: Props) => {
  const { isOpen, onCancel, onSuccess, modalType, editingProduct } = props;
  const [form] = Form.useForm();
  const { data: suppliersData } = useSWR(SUPPLIERSENDPOINT, getAPI);
  const { data: categoriesData } = useSWR(CATEGORIESENDPOINT, getAPI);
  const { data: brandsData } = useSWR(BRANDSENDPOINT, getAPI);
  const { data: productTypeData } = useSWR(PRODUCTTYPEENDPOINT, getAPI);
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
      // const { status } = info.file;
      // if (status !== 'uploading') {
      //   console.log(info.file, info.fileList);
      // }
      // if (status === 'done') {
      //   message.success(`${info.file.name} file uploaded successfully.`);
      // } else if (status === 'error') {
      //   message.error(`${info.file.name} file upload failed.`);
      // }
      setFileList([info.file]);
    },
    beforeUpload() {
      return false;
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  const handleShowProfit = useDebounce(() => {
    if (costValue && priceValue) setShowProfit(true);
  }, 500);
  // const convertImageToBase64 = (imageFile: any) => {
  //   return new Promise(resolve => {
  //     const reader = new FileReader();
  //     reader.onload = e => {
  //       if (e.target) {
  //         const base64String = btoa(e.target.result);
  //         resolve(base64String);
  //       }
  //     };
  //     reader.readAsBinaryString(imageFile);
  //   });
  // };
  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      const image = fileList[0];
      onSuccess({ ...values, img: image, anHien: 1 });
    } catch (error) {}
  };
  useEffect(() => {
    if (modalType === 'add') {
      form.resetFields();
      form.setFieldValue('code', randomString('SP'));
    }
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
              {modalType === 'edit' ? (
                <Form.Item label='Id sản phẩm' name={'id'}>
                  <Input placeholder='Id sản phẩm' tabIndex={3} disabled />
                </Form.Item>
              ) : null}

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
                label='Danh mục'
                name={'idDm'}
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder='Danh mục' tabIndex={4}>
                  {categoriesData &&
                    categoriesData?.map((item: CategoryProp, index: number) => {
                      return (
                        <Select.Option value={item.id.toString()} key={index}>
                          {item.ten}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label='Loại sản phẩm'
                name={'idLoai'}
                rules={[
                  { required: true, message: 'Vui lòng chọn loại sản phẩm' },
                ]}
              >
                <Select
                  placeholder='Loại sản phẩm'
                  tabIndex={2}
                  value={'tenLoaiSp'}
                >
                  {productTypeData &&
                    productTypeData?.map(
                      (item: productTypeProps, index: number) => {
                        return (
                          <Select.Option value={item.id.toString()} key={index}>
                            {item.ten}
                          </Select.Option>
                        );
                      },
                    )}
                </Select>
              </Form.Item>

              <Form.Item
                label='Nhà cung cấp'
                name={'idNcc'}
                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
              >
                <Select placeholder='Nhà cung cấp' tabIndex={4}>
                  {suppliersData &&
                    suppliersData?.map((item: SupplierProps, index: number) => {
                      return (
                        <Select.Option value={item.id.toString()} key={index}>
                          {item.ten}
                        </Select.Option>
                      );
                    })}
                </Select>
              </Form.Item>
              <Form.Item
                label='Thương hiệu'
                name={'idTh'}
                rules={[
                  { required: true, message: 'Vui lòng chọn thương hiệu' },
                ]}
              >
                <Select placeholder='Thương hiệu' tabIndex={6}>
                  {brandsData &&
                    brandsData?.map((item: BrandProps, index: number) => {
                      return (
                        <Select.Option value={item.id} key={index}>
                          {item.ten}
                        </Select.Option>
                      );
                    })}
                </Select>
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
              <Form.Item label='Khối lượng' name={'khoiLuong'}>
                <Input
                  placeholder='Khối lượng'
                  tabIndex={9}
                  addonAfter={selectWeight}
                />
              </Form.Item>
              <Form.Item label='Thể tích' name={'theTich'}>
                <Input
                  placeholder='Thể tích'
                  tabIndex={11}
                  addonAfter={selectVolume}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label='Tồn kho'
                name={'soLuong'}
                rules={[
                  { required: true, message: 'Vui lòng nhập số lượng tồn kho' },
                ]}
              >
                <InputNumber
                  placeholder='Tồn kho'
                  tabIndex={10}
                  className='w-full'
                />
              </Form.Item>
              <Form.Item
                label='Đơn vị'
                name={'donVi'}
                rules={[
                  { required: true, message: 'Vui lòng đơn vị của sản phẩm' },
                ]}
              >
                <Select defaultValue='1'>
                  <Select.Option value='1'>Lon</Select.Option>
                  <Select.Option value='2'>Gói</Select.Option>
                  <Select.Option value='3'>Bao</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </Modal>
  );
};

export default AddModal;
