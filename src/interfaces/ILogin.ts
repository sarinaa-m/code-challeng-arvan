export interface IAuthFormProp {
  title: string
  isRegister?: boolean
  additionalFields?: Array<IAuthAdditionalFields>
}

export interface IAuthAdditionalFields {
  label: string
  name: string
  rules: Array<IFormRules>
}
export interface IFormRules {
  required: boolean
  message: string
}
export interface IAuth {
  login: {
    loading: boolean
    error: string | undefined | null
  }
}
