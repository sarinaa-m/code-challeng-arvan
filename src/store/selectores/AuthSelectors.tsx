import { RootState } from "../ConfigStore";

export const getUserDetail = ({ auth }: RootState) => ({
  userDetail: auth.userData.userDetail.user,
});
