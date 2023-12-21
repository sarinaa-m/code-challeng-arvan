import React from 'react'
import { Button, Form, Input } from 'antd'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { IAuthFormProp } from '../../interfaces/ILogin'
import { AppDispatch } from '../../store/ConfigStore'
import login from '../../store/actions/AuthAction'

const AuthForm: React.FC<IAuthFormProp> = function ({
  isRegister,
  additionalFields,
  title,
}) {
  const [form] = Form.useForm()
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()

  const onFinish = (values: any) => {
    dispatch(login(values))
  }

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
      <Form.Item label={t('pages.login.email')} name="email">
        <Input />
      </Form.Item>

      <Form.Item
        label={t('pages.login.password')}
        name="password"
        rules={[{ required: true, message: t('error.enterPassword') }]}
      >
        <Input.Password />
      </Form.Item>
      <p>
        {isRegister ? (
          <>
            {t('pages.login.haveAccount')}
            <Link to="/login">{t('pages.login.login')}</Link>
          </>
        ) : (
          <>
            {t('pages.login.noAccount')}
            <Link to="/register">{t('pages.login.registerAccount')}</Link>
          </>
        )}
      </p>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          {t('pages.login.login')}
        </Button>
      </Form.Item>
    </Form>
  )
}

export default AuthForm
