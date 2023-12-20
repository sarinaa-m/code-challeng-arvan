export interface IAuthFormProp {
  title: string;
  isRegister?: boolean;
  additionalFields?: Array<{ label: string; name: string; rules: Array<any> }>;
}
