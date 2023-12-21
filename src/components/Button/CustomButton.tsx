import { Button } from 'antd'
import React, { FC } from 'react'
import { ICostumeBtn } from '../../interfaces/IButton'
import { useTranslation } from 'react-i18next'

const CustomButton: React.FC<ICostumeBtn> = ({
  block,
  name,
  onSubmit,
  type,
}) => {
  const { t } = useTranslation()
  const onClickBtn = () => {
    onSubmit()
  }
  return (
    <Button
      onClick={() => {
        onClickBtn()
      }}
      block={block}
      type={type}
    >
      {t('action.btn', { name: name })}
    </Button>
  )
}

export default CustomButton
