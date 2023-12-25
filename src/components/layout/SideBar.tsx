import { Menu, MenuProps, Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideBar = function () {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string[]>(["article"]);
  const items: MenuItem[] = [
    getItem(<Link to="/articles">{t("menu.allArticles")}</Link>, "article"),
    getItem(
      <Link to="/articles/create">{t("menu.newArticles")}</Link>,
      "create"
    ),
  ];

  useEffect(() => {
    // dispatch(resetAddArticle());
    if (location.pathname.includes("article")) {
      setActiveMenu(["article"]);
    }
    if (location.pathname.includes("create")) {
      setActiveMenu(["create"]);
    }
  }, [location]);

  return (
    <Sider>
      <Menu
        theme="dark"
        mode="vertical"
        items={items}
        selectedKeys={activeMenu}
      />
    </Sider>
  );
};

export default SideBar;
