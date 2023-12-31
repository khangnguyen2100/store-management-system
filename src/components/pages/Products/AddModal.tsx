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
import { memo, useEffect, useState } from 'react';
import useSWR from 'swr';

import { getAPI } from 'src/api/config';
import { ProductProps } from 'src/constants/types/product';
import useDebounce from 'src/hooks/useDebounce';
import { formatPrice, formatPriceInput } from 'src/utils/format';
import { randomString } from 'src/utils/randomString';
import { SupplierProps } from 'src/constants/types/supplier';
import { CategoryProp } from 'src/constants/types/category';
import { BrandProps } from 'src/constants/types/brand';
import { productTypeProps } from 'src/constants/types/productType';
import { getIdCh, getImage } from 'src/utils/common';

const { Dragger } = Upload;
type Props = {
  isOpen: boolean;
  onSuccess: (values: any) => void;
  onCancel: () => void;
  editingProduct: ProductProps | null;
  modalType: 'add' | 'edit' | null;
};

const SUPPLIERSENDPOINT = `/api/nha-cung-cap?idCh=${getIdCh()}`;
const CATEGORIESENDPOINT = `/api/danh-muc-san-pham?idCh=${getIdCh()}`;
const BRANDSENDPOINT = `/api/thuong-hieu?idCh=${getIdCh()}`;
const PRODUCTTYPEENDPOINT = `/api/loai-san-pham`;
const AddModal = (props: Props) => {
  const { isOpen, onCancel, onSuccess, modalType, editingProduct } = props;
  const [form] = Form.useForm();
  const { data: suppliersData, isLoading: supplierLoading } =
    useSWR(SUPPLIERSENDPOINT);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useSWR(CATEGORIESENDPOINT);
  const { data: brandsData, isLoading: brandsLoading } = useSWR(BRANDSENDPOINT);
  const { data: productTypeData, isLoading: productTypeLoading } =
    useSWR(PRODUCTTYPEENDPOINT);
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
    onRemove() {
      setFileList([]);
    },
    onChange(info) {
      setFileList(info.fileList);
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
  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      let imageData;
      if (fileList.length > 0) {
        const image = fileList[0];
        imageData = image.originFileObj;
      } else {
        imageData = undefined;
      }

      onSuccess({ ...values, img: imageData, anHien: 1 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (modalType === 'add') {
      form.resetFields();
      form.setFieldValue('maSp', randomString('SP'));
    }
    if (modalType === 'edit' && editingProduct) {
      setFileList([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          preview: getImage(editingProduct.img || ''),
          url: getImage(editingProduct.img || ''),
        },
      ]);
      form.setFieldsValue({
        ...editingProduct,
      });
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
      getContainer={false}
    >
      <Form form={form} layout='vertical' className='flex flex-col gap-y-4'>
        <Card size='small' title='Thông tin chung'>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              {modalType === 'edit' ? (
                <Form.Item label='Id sản phẩm' name={'id'} hidden>
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
                  {!categoriesLoading &&
                    categoriesData?.data?.map(
                      (item: CategoryProp, index: number) => {
                        return (
                          <Select.Option value={item.id.toString()} key={index}>
                            {item.ten}
                          </Select.Option>
                        );
                      },
                    )}
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
                  {!productTypeLoading &&
                    productTypeData?.data?.map(
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
                  {!supplierLoading &&
                    suppliersData?.data?.map(
                      (item: SupplierProps, index: number) => {
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
                label='Thương hiệu'
                name={'idTh'}
                rules={[
                  { required: true, message: 'Vui lòng chọn thương hiệu' },
                ]}
              >
                <Select placeholder='Thương hiệu' tabIndex={6}>
                  {!brandsLoading &&
                    brandsData?.data?.map((item: BrandProps, index: number) => {
                      return (
                        <Select.Option value={item.id.toString()} key={index}>
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
                rules={[
                  { required: true, message: 'Vui lòng nhập giá vốn' },
                  // {
                  //   type: 'number',
                  //   min: 0,
                  //   message: 'Vui lòng nhập số dương! ',
                  // },
                ]}
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
                rules={[
                  { required: true, message: 'Vui lòng nhập giá bán' },
                  // {
                  //   type: 'number',
                  //   min: 0,
                  //   message: 'Vui lòng nhập số dương! ',
                  // },
                ]}
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
                  formatter={value => formatPriceInput(value)}
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
                <Select defaultActiveFirstOption={true}>
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

export default memo(AddModal);
