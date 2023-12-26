export interface IAuthFormProp {
  title: string;
  isRegister?: boolean;
  additionalFields?: Array<IAuthAdditionalFields>;
}

export interface IAuthAdditionalFields {
  label: string;
  name: string;
  rules: Array<IFormRules>;
}
export interface IFormRules {
  required: boolean;
  message: string;
}
export interface IAuth {
  modifyUser: {
    loading: boolean;
    error: string | undefined | null;
    data: {
      user: {
        email: string;
        username: string;
        bio: null;
        image: string;
        token: string;
      };
    };
  };
  userData: IUserData;
  login: ILogin;
}

interface ILogin {
  loading: boolean;
  error: null | string | undefined;
}
interface IUserData {
  loading: boolean;
  error: null | string | undefined;
  userDetail: IUserDetail;
}

interface IUserDetail {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string;
    image: string;
  };
}
