import { ButtonType } from 'antd/es/button'

export interface ICostumeBtn {
  name: string
  block: boolean
  type: ButtonType
  onSubmit: (values: any) => void
}