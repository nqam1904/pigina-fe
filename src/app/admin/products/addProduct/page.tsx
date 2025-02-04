/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getCateByIdAction } from "@/actions/category/category";
import { getCategorySpecs } from "@/actions/category/specifications";
import { addProductAction, generateSpecTable } from "@/actions/product/product";
import BoardProductPreview from "@/components/admin/product-board-preview/ProductBoardPreview";
import TextEditor from "@/components/admin/text-editor/TextEditor";
import { MinusIcon } from "@/components/icons/svgIcons";
import { CONFIG } from "@/config-global";
import { dataOptions, formItemLayout } from "@/constants/constants";
import { TCategory } from "@/types/categories";
import { TDropDown } from "@/types/uiElements";
import { calculateDiscount } from "@/utils/utils";
import {
  HomeOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ProductSpec, SpecGroup } from "@prisma/client";
import {
  Breadcrumb,
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./addProduct.module.scss";

const optionsRadios = [
  { label: "Còn hàng", value: true },
  { label: "Hết hàng", value: false },
];
const TYPE_CATE = {
  CATEGORY: "CATEGORY",
  SUBCATEGORY: "SUBCATEGORY",
};
const AddProduct = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const [categoryList, setCategoryList] = useState<TDropDown[]>([]);
  const [loading, setLoading] = useState(false);
  const [categorySpecs, setCategorySpecs] = useState<SpecGroup[]>([]);
  const [specifications, setSpecifications] = useState<any[]>([]);
  const [onChangeImage, setOnChangeImage] = useState<string[]>([]);
  const [description, setDesciption] = useState("");
  const [percent, setPercent] = useState(0);
  const [productBoard, setProductBoard] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);

  const [specificationTable, setSpecificationTable] = useState<ProductSpec[]>(
    [],
  );
  const categoriesBrandRef = useRef<TDropDown[]>([]);
  const categoriesModelRef = useRef<TDropDown[]>([]);

  const onFinish = async (e: any) => {
    setLoading(true);
    try {
      if (!e.images.length) {
        setLoading(false);
        setIsValid(true);
        messageApi.open({
          type: "error",
          content: "Hình ảnh không được để trống!",
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const payload = {
        ...e,
        price: String(e.price),
        salePrice: String(e.salePrice),
        specifications: specifications,
        desc: description,
        categoryID: e.categoryID || e.categoryBrand || e.categoryGroup,
      };
      const result = await addProductAction(payload);
      if (result.error) {
        setLoading(false);
        messageApi.open({
          type: "error",
          content: `${result.error}`,
        });
        return;
      }
      if (result.res) {
        messageApi.open({
          type: "success",
          content: `Thành công!`,
        });
        setTimeout(() => {
          setLoading(false);
          router.replace(`${CONFIG.baseUrl}/admin/products`);
        }, 1500);
      }
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: `${error}`,
      });
    }
  };

  // ---------------------- GET DATA ----------------------

  const handleCategoryChange = (index: string) => {
    if (!index) {
      setCategorySpecs([]);
    } else {
      const getSpecGrous: any = categoryList.filter(
        (x: any) => x.value === index,
      );
      getSpecGroup(getSpecGrous?.[0]?.value || 0);
    }
  };

  const getSpecGroup = async (categoryID: string) => {
    const response = await getCategorySpecs(categoryID);
    if (response.res) {
      const specArray: ProductSpec[] = [];
      response.res.forEach((item) => {
        specArray.push({
          specGroupID: item.id,
          specValues: item.specs.map(() => ""),
        });
      });
      const dataSpecs = response.res;
      if (response.res) {
        const finalData = dataSpecs.reverse();
        setCategorySpecs(finalData);
      }
    }
  };

  const convertJSONtoDropdownList = (json: TCategory[]): any[] => {
    const dropDownData: any[] = [];
    json.forEach((group) => {
      dropDownData.push({
        label: group.name,
        value: group.id,
      });
    });

    return dropDownData;
  };

  const fetchCategories = async (id?: string, type?: string) => {
    try {
      const result = await getCateByIdAction(id);
      if (result.res) {
        if (type === TYPE_CATE.CATEGORY) {
          categoriesBrandRef.current = convertJSONtoDropdownList(result.res);
        } else if (type === TYPE_CATE.SUBCATEGORY) {
          categoriesModelRef.current = convertJSONtoDropdownList(result.res);
        } else {
          setCategoryList(convertJSONtoDropdownList(result.res));
        }
      }
    } catch (error) {
      console.log(error);
      categoriesBrandRef.current = [];
      categoriesModelRef.current = [];
      setCategoryList([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ---------------------- HANDLE SPECS GROUP CHANGE VALUE ----------------------
  const handleInputChange = (groupId: any, specIndex: any, value: any) => {
    const updatedSpecs = [...specifications];

    const groupIndex = updatedSpecs.findIndex(
      (specGroup) => specGroup.specGroupID === groupId,
    );

    if (groupIndex !== -1) {
      updatedSpecs[groupIndex].specValues[specIndex] = value;
    } else {
      const newSpecGroup: any = {
        specGroupID: groupId,
        specValues: [],
      };
      newSpecGroup.specValues[specIndex] = value;
      updatedSpecs.push(newSpecGroup);
    }

    setSpecifications(updatedSpecs);
  };

  // HANDLE DEBOUNCE FORM
  const handleChange = useCallback(
    debounce((fieldName, value) => {
      setProductBoard(value);
    }, 500),
    [],
  );

  const handleFormChange = (fieldName: any, allValues: any) => {
    handleChange(fieldName, allValues);
    if (allValues?.price || allValues?.salePrice) {
      if (allValues?.price < allValues?.salePrice) {
        messageApi.open({
          type: "error",
          content: "Giá khuyến mãi không được lớn hơn giá gốc!",
        });
      } else {
        const result = calculateDiscount(
          allValues?.price,
          allValues?.salePrice,
        );
        setPercent(result);
      }
    }
  };

  const handerSpecificationChange = async () => {
    try {
      const response = await generateSpecTable(specifications);
      setSpecificationTable(response || []);
    } catch (error) {
      setSpecificationTable([]);
    }
  };

  useEffect(() => {
    if (!specifications.length) return;
    handerSpecificationChange();
  }, [specifications]);

  // RENDER FORM
  return (
    <div className={styles.container}>
      {contextHolder}
      <h4>Thêm sản phẩm</h4>
      <Breadcrumb
        items={[
          {
            key: 1,
            href: "/admin",
            title: (
              <>
                <HomeOutlined />
                <span>Trang chủ</span>
              </>
            ),
          },
          {
            key: 2,
            title: "Sản phẩm",
            href: "/admin/products",
          },
          {
            key: 3,
            title: "Thêm sản phẩm",
          },
        ]}
      />

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ marginTop: 20 }}
        colon={false}
        onFinish={onFinish}
        disabled={loading}
        onValuesChange={handleFormChange}
        initialValues={{
          images: [],
          specialFeatures: [],
          name: "",
          price: 0,
          salePrice: 0,
          desc: "",
          isAvailable: false,
          warrantyPeriod: "Bao test 7 ngày 1 đổi 1, bảo hành 1 tháng",
          categoryGroup: null,
          categoryBrand: null,
          categoryID: null,
        }}
      >
        <Row gutter={24}>
          {/* SIDE LEFT */}
          <Col span={12}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item label="Hình ảnh">
                  <Form.List name="images">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            key={field.key}
                            {...formItemLayout}
                            required={true}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message:
                                    "Vui lòng nhập link hình hoặc xóa field",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="Link hình ảnh"
                                onChange={(e) => {
                                  setOnChangeImage([
                                    ...onChangeImage,
                                    e.target.value,
                                  ]);
                                  if (e.target.value) {
                                    setIsValid(false);
                                  }
                                }}
                                style={{ width: "80%", marginRight: 18 }}
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => {
                                remove(field.name);
                                setOnChangeImage([]);
                              }}
                            />
                          </Form.Item>
                        ))}

                        <Form.Item>
                          {fields.length < 5 && (
                            <Button
                              color={isValid ? "danger" : "default"}
                              variant="outlined"
                              onClick={() => {
                                add();
                              }}
                              icon={<PlusOutlined />}
                            >
                              Thêm hình
                            </Button>
                          )}

                          {errors && <Form.ErrorList errors={errors} />}
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên"
                  rules={[
                    {
                      required: true,
                      type: "string",
                      message: "Vui lòng nhập tên sản phẩm!",
                    },
                  ]}
                >
                  <TextArea
                    placeholder="Nhập tên sản phẩm..."
                    allowClear
                    autoSize={{ minRows: 2, maxRows: 6 }}
                  />
                </Form.Item>
                <Form.Item label="Tình trạng" name="isAvailable">
                  <Radio.Group
                    options={optionsRadios}
                    defaultValue={true}
                  ></Radio.Group>
                </Form.Item>

                <Form.Item label="Mô tả tình trạng">
                  <Form.List name="specialFeatures">
                    {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...formItemLayout}
                            key={index}
                            required={false}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: "Vui lòng nhập mô tả hoặc xóa field",
                                },
                              ]}
                              noStyle
                            >
                              <Input
                                placeholder="Mô tả..."
                                style={{ width: "80%", marginRight: 18 }}
                                maxLength={50}
                              />
                            </Form.Item>
                            <MinusCircleOutlined
                              className="dynamic-delete-button"
                              onClick={() => remove(field.name)}
                            />
                          </Form.Item>
                        ))}
                        {fields.length < 3 && (
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              icon={<PlusOutlined />}
                            >
                              Thêm mô tả
                            </Button>
                            {errors && <Form.ErrorList errors={errors} />}
                          </Form.Item>
                        )}
                      </>
                    )}
                  </Form.List>
                </Form.Item>

                {/* warranty */}
                <Form.Item
                  label="Tình trạng bảo hành"
                  name="warrantyPeriod"
                  rules={[
                    {
                      required: true,
                      type: "string",
                      message: "Vui lòng nhập tình trạng bảo hành!",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    allowClear
                    placeholder="Nhập mô tả..."
                    maxLength={50}
                  />
                </Form.Item>

                {/* price */}
                <Form.Item
                  name="price"
                  label="Giá tiền"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập giá sản phẩm!",
                      type: "number",
                    },
                    {
                      validator: (_, value) =>
                        value > 0
                          ? Promise.resolve()
                          : Promise.reject(
                              new Error("Giá sản phẩm phải lớn hơn 0!"),
                            ),
                    },
                  ]}
                >
                  <InputNumber
                    name="price"
                    defaultValue={0}
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value: any) =>
                      value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                    }
                    controls={false}
                    suffix="VND"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                {/* sale price */}
                <Flex align="center" gap="large">
                  <Button color="danger" variant="solid" style={{ width: 100 }}>
                    {percent ? `- ${percent}%` : "0%"}
                  </Button>

                  <Form.Item
                    name="salePrice"
                    label="Khuyến mãi"
                    rules={[
                      {
                        required: true,
                        type: "number",
                        message: "Vui lòng nhập giá thực tế!",
                      },
                      {
                        validator: (_, value) =>
                          value > 0
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Giá khuyến mãi phải lớn hơn 0!"),
                              ),
                      },
                    ]}
                  >
                    <InputNumber
                      name="salePrice"
                      defaultValue={0}
                      keyboard
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value: any) =>
                        value?.replace(/\$\s?|(,*)/g, "") as unknown as number
                      }
                      controls={false}
                      suffix="VND"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Flex>
              </Col>
            </Row>

            {/* categories */}
            <Form.Item
              label="Danh mục"
              name="categoryGroup"
              rules={[
                {
                  required: true,
                  type: "string",
                  message: "Vui lòng chọn danh mục!",
                },
              ]}
            >
              <Select
                options={categoryList}
                allowClear
                showSearch
                autoClearSearchValue
                placeholder="Chọn danh mục"
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={(e) => {
                  handleCategoryChange(e);
                  categoriesBrandRef.current = [];
                  categoriesModelRef.current = [];
                  form.setFieldsValue({ categoryBrand: null });
                  form.setFieldsValue({ categoryID: null });
                  fetchCategories(e, TYPE_CATE.CATEGORY);
                }}
              />
            </Form.Item>
            <Form.Item label="Danh mục hãng" name="categoryBrand">
              <Select
                options={categoriesBrandRef.current}
                allowClear
                showSearch
                autoClearSearchValue
                placeholder="Chọn danh mục hãng"
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onChange={(e) => {
                  categoriesModelRef.current = [];
                  form.setFieldsValue({ categoryID: null });
                  fetchCategories(e, TYPE_CATE.SUBCATEGORY);
                }}
              />
            </Form.Item>
            <Form.Item label="Danh mục model" name="categoryID">
              <Select
                options={categoriesModelRef.current}
                allowClear
                showSearch
                autoClearSearchValue
                placeholder="Chọn model"
                filterOption={(input, option: any) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>

            {/* specifications */}

            {categorySpecs.length > 0 ? (
              <Col span={24}>
                <Form.Item
                  label="Cấu hình sản phẩm"
                  rules={[
                    {
                      required: true,
                      type: "string",
                      message: "Không được để trống thông tin!",
                    },
                  ]}
                >
                  <div className={styles.wrapperSpecification}>
                    {categorySpecs.map((specGroup, groupIndex) => {
                      return (
                        <section key={groupIndex} className={styles.specGroup}>
                          <div className={styles.specGroupHead}>
                            <div>
                              <MinusIcon width={12} />
                              <MinusIcon width={12} />
                            </div>
                            <h3>{specGroup.title}</h3>
                          </div>
                          {specGroup.specs.map((spec, specIndex) => {
                            if (spec === "Model") {
                              return (
                                <Form.Item
                                  key={specIndex}
                                  label={spec}
                                  rules={[
                                    {
                                      required: true,
                                      type: "string",
                                      message: "Không được để trống thông tin!",
                                    },
                                  ]}
                                >
                                  <Select
                                    options={dataOptions}
                                    allowClear
                                    showSearch
                                    autoClearSearchValue
                                    placeholder="Chọn Model"
                                    filterOption={(input, option: any) =>
                                      (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    onChange={(e) =>
                                      handleInputChange(
                                        specGroup.id,
                                        specIndex,
                                        e,
                                      )
                                    }
                                  />
                                </Form.Item>
                              );
                            }

                            return (
                              <Form.Item
                                label={spec}
                                key={specIndex}
                                rules={[
                                  {
                                    required: true,
                                    type: "string",
                                    message: "Không được để trống thông tin!",
                                  },
                                ]}
                              >
                                <Input
                                  type="text"
                                  allowClear
                                  value={
                                    specifications.find(
                                      (group) =>
                                        group.specGroupID === specGroup.id,
                                    )?.specValues[specIndex] || ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      specGroup.id,
                                      specIndex,
                                      e.target.value,
                                    )
                                  }
                                />
                              </Form.Item>
                            );
                          })}
                        </section>
                      );
                    })}
                  </div>
                </Form.Item>
              </Col>
            ) : null}

            {/* keySearch */}

            <Form.Item label="Từ khóa tìm kiếm" name="keySearch">
              <Select
                allowClear
                mode="tags"
                suffixIcon={null}
                notFoundContent={null}
                filterOption={false}
                options={[].map((item: any) => ({
                  label: item,
                  value: item,
                }))}
              />
            </Form.Item>

            {/* desc */}

            <Form.Item label="Nội dung" name="desc">
              <TextEditor onChange={setDesciption} />
            </Form.Item>

            {/* Submit */}
            <Form.Item>
              <Flex justify="flex-end" style={{ marginTop: 40 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Xác nhận
                </Button>
              </Flex>
            </Form.Item>
          </Col>

          {/* SIDE RIGHT */}
          <Col span={12}>
            <Row gutter={[8, 8]}>
              <BoardProductPreview
                name={productBoard?.name}
                specialFeatures={productBoard?.specialFeatures}
                warrantyPeriod={productBoard?.warrantyPeriod}
                images={productBoard?.images}
                price={productBoard?.price}
                salePrice={productBoard?.salePrice}
                specifications={specificationTable}
                desc={productBoard?.desc}
              />
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default AddProduct;
