import React, { useEffect } from "react";
import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IAuthFormProp } from "../../interfaces/ILogin";
import { AppDispatch } from "../../store/ConfigStore";
import CustomButton from "../Button/CustomButton";
import { loginUser, registerUser } from "../../store/actions/AuthAction";
import "./_login.scss";
export const AuthForm: React.FC<IAuthFormProp> = ({
  title,
  additionalFields,
  isRegister = false,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/articles");
    }
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [isRegister]);

  const onFinish = async (values: any) => {
    if (isRegister) {
      const result = await dispatch(registerUser(values));
      if (result.type === "auth/registerUser/fulfilled") {
        navigate("/login");
      }
    } else {
      const result = await dispatch(loginUser(values));
      if (result.type === "auth/loginUser/fulfilled") {
        navigate("/articles");
      }
    }
  };

  return (
    <Form
      name="login-form"
      layout="vertical"
      onFinish={onFinish}
      className="login-form"
      autoComplete="off"
      form={form}
    >
      <h2 className="header">{t(`pages.login.${title}`)}</h2>
      {additionalFields &&
        additionalFields.map((field: string | any) => (
          <Form.Item
            key={field.name}
            label={t(`pages.login.${field.label}`)}
            name={field.name}
            rules={field.rules}
          >
            <Input />
          </Form.Item>
        ))}
      <Form.Item label={t("pages.login.email")} name="email">
        <Input />
      </Form.Item>

      <Form.Item
        label={t("pages.login.password")}
        name="password"
        rules={[{ required: true, message: t("error.enterPassword") }]}
      >
        <Input.Password />
      </Form.Item>
      <p>
        {isRegister ? (
          <>
            {t("pages.login.haveAccount")}
            <Link to="/login">{t("pages.login.login")}</Link>
          </>
        ) : (
          <>
            {t("pages.login.noAccount")}
            <Link to="/register">{t("pages.login.registerAccount")}</Link>
          </>
        )}
      </p>
      <Form.Item>
        <CustomButton
          block={true}
          name={isRegister ? "Register" : "Login"}
          type="primary"
          onSubmit={form.submit}
          loading={false}
        />
      </Form.Item>
    </Form>
  );
};
