import { Button, Dropdown, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/ConfigStore";
import { getArticleData } from "../../store/selectors/ArticleSelector";
import { IArticleData } from "../../interfaces/IArticles";
import {
  deleteArticle,
  fetchArticleById,
  fetchArticles,
} from "../../store/actions/ArticleAction";
import moment from "moment";
import { MoreOutlined } from "@ant-design/icons";
import { MenuProps } from "rc-menu";
import "./_article.scss";
import { useNavigate } from "react-router-dom";
const ArticleLists = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { articleData, articleLoading } = useSelector(getArticleData);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 2,
    total: articleData.length,
  });
  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const items: MenuProps["items"] = [
    {
      label: "Edit",
      key: "edit",
    },
    {
      label: "Delete",
      key: "delete",
    },
  ];
  const handleTableChange = (pagination: any) => {
    navigate(`/articles/page/${pagination.current}`);
    setPagination((old) => ({ ...old, current: pagination.current }));
    if (pagination.current === 1) {
      navigate(`/articles`);
    }
  };
  const columns: ColumnsType<IArticleData> = [
    {
      title: "#",
      dataIndex: "key",
      rowScope: "row",
      render: (value, item, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      render: (_, { author }) => <div>{author.username}</div>,
    },
    {
      title: "Tag",
      dataIndex: "tagList",
      key: "tagList",
      render: (_, { tagList }) => tagList.toString(),
    },
    {
      title: "Excerpt",
      key: "body",
      dataIndex: "body",
      render: (_, { body }) => <div>{body.substring(0, 20)}</div>,
    },
    {
      title: "Created",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (_, { createdAt }) => moment(createdAt).format("MMMM Do YYYY"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, { slug }) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => onClickArticle({ key, slug }),
          }}
          trigger={["click"]}
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ];
  const onClickArticle = async ({ key, slug }: any) => {
    if (key === "delete") {
      await dispatch(deleteArticle(slug));
    } else if (key === "edit") {
      const result = await dispatch(fetchArticleById(slug));
      if (result.type === "articles/fetchArticleById/fulfilled") {
        navigate(`edit/${slug}`, { state: { id: slug } });
      }
    }
  };

  return (
    <div className="article-wrapper">
      <p className="header">{t("pages.article.articlePageTitle")}</p>
      <Table
        loading={articleLoading}
        scroll={{ x: 500 }}
        columns={columns}
        dataSource={articleData}
        onChange={handleTableChange}
        pagination={pagination}
      />
    </div>
  );
};

export default ArticleLists;
