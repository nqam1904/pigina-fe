"use client";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Flex, Form, FormProps, Image, Input, message } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./login.module.scss";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadings, setLoadings] = useState<boolean>(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    setLoadings(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          messageApi.open({
            type: "success",
            content: `Đăng nhập thành công!`,
          });
          router.push("/admin");
          return;
        }
        if (callback?.error) {
          setLoadings(false);
          messageApi.open({
            type: "error",
            content: callback.error,
          });
        }
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: error,
        });
      });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <div className={styles.header}>
        <Image width={150} alt="logo" src="/images/logo.png" preview={false} />
      </div>
      <div className={styles.login}>
        <div className={styles.wrapper}>
          <span>Đăng nhập</span>
          <Form
            name="basic"
            onFinish={onFinish}
            style={{ marginTop: 12 }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Mật khẩu"
                allowClear
              />
            </Form.Item>
            {/* BUTTON */}
            <Form.Item>
              <Flex
                gap="middle"
                flex={"space-between"}
                style={{ marginTop: 12 }}
              >
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  loading={loadings}
                >
                  Đăng nhập
                </Button>
              </Flex>
            </Form.Item>
            {/* FOOTER */}
            {/* <span className={styles.text_forget_password}>Quên mật khẩu</span> */}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
