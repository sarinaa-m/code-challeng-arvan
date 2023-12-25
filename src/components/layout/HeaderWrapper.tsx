import { Button, Flex, Layout } from "antd";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ResponsiveSideBar from "./ResponsiveSideBar";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "use-media-antd-query";
import { AppDispatch } from "../../store/ConfigStore";
import { fetchCurrentUser } from "../../store/actions/AuthAction";
import { getUserDetail } from "../../store/selectors/AuthSelectors";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
const { Header } = Layout;

const HeaderWrapper = () => {
  const { t } = useTranslation();
  const windowSize = useMediaQuery();
  const dispatch = useDispatch<AppDispatch>();
  const userDetail = useSelector(getUserDetail);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <Header className="app-header">
      <Flex align="center">
        {(windowSize === "xs" || windowSize === "sm") && <ResponsiveSideBar />}
        <p>{t("components.layout.headerTitle")}</p>
        {windowSize !== "xs" && windowSize !== "sm" && (
          <div className="header-detail"> welcome {userDetail.username}</div>
        )}
      </Flex>

      <Button
        type="primary"
        ghost
        onClick={() => {
          secureLocalStorage.clear();
          navigate("/login");
        }}
      >
        {t("components.layout.logout")}
      </Button>
    </Header>
  );
};

export default HeaderWrapper;
