import { createSelector } from "reselect";
import { RootState } from "../ConfigStore";

// Create a base selector to get the userDetail from the auth state
const selectAuth = (state: RootState) => state.auth;
const getUserDetailFromAuth = (auth: RootState["auth"]) => ({
  user: auth.userData.userDetail.user,
  loginLoading: auth.login.loading,
  registerLoading: auth.modifyUser.loading,
});

// Create a memoized selector using createSelector
export const getUserDetail = createSelector(selectAuth, getUserDetailFromAuth);
