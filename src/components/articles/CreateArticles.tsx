import "./_article.scss";
import { Checkbox, Col, Flex, Form, Input, Row, Skeleton, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "../Button/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getArticleData } from "../../store/selectors/ArticleSelector";
import { AppDispatch } from "../../store/ConfigStore";
import {
  addArticle,
  fetchTagList,
  updateArticle,
} from "../../store/actions/ArticleAction";
import { setTagList } from "../../store/reducers/ArticleSlice";
import { useNavigate } from "react-router";

const CreateArticles = function () {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { addArticleLoading, addArticleData, tagData, tagLoading } =
    useSelector(getArticleData);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchTagList());
  }, []);

  useEffect(() => {
    if (addArticleData?.slug) {
      form.setFieldsValue(addArticleData);
      setSelectedTags(addArticleData.tagList || []);
    } else {
      form.resetFields();
      setSelectedTags([]);
    }
  }, [addArticleData]);

  const onFinish = async (values: any) => {
    const formValues = {
      article: {
        ...values,
        tagList: selectedTags,
      },
    };
    if (values.slug) {
      const result = await dispatch(updateArticle(formValues));
      if (result.type === "articles/updateArticle/fulfilled") {
        navigate("/articles");
        form.resetFields();
        setSelectedTags([]);
      }
    } else {
      const result = await dispatch(addArticle(formValues));

      if (result.type === "articles/addArticle/fulfilled") {
        navigate("/articles");
        form.resetFields();
        setSelectedTags([]);
      }
    }
  };

  const onRenderTagList = () => {
    const sortedDataTag: any = [...tagData];
    if (tagLoading) {
      return Array(10)
        .fill(null)
        .map((_, index) => (
          <Flex key={index}>
            <Skeleton.Button
              active={true}
              size={"small"}
              style={{ marginRight: 12, marginBottom: 12 }}
            />
            <Skeleton.Input active={true} size={"small"} block={true} />
          </Flex>
        ));
    } else {
      return (
        <Form.Item
          name={"tagList"}
          className="tag-wrapper"
          valuePropName="checked"
        >
          {Array.isArray(sortedDataTag) && sortedDataTag.length > 0 ? (
            sortedDataTag.sort().map((item) => (
              <Flex key={item} align="center" className="tag-item">
                <Checkbox
                  checked={selectedTags.includes(item)}
                  name={item}
                  onChange={() => onTagChange(item)}
                >
                  {item}
                </Checkbox>
              </Flex>
            ))
          ) : (
            <p>No Data</p>
          )}
        </Form.Item>
      );
    }
  };

  const onTagChange = (tag: string) => {
    const newSelectedTags = [...selectedTags];
    if (newSelectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1);
    } else {
      newSelectedTags.push(tag);
    }
    setSelectedTags(newSelectedTags);
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = () => {
    if (inputValue.trim() !== "") {
      dispatch(setTagList(inputValue));
      setInputValue("");
    }
  };

  return addArticleLoading ? (
    <Spin className="loading" size="large" />
  ) : (
    <Form
      form={form}
      layout="vertical"
      name="create-article"
      onFinish={onFinish}
      className="create-article-form"
    >
      <Row gutter={[16, 0]}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row>
            <Col span={24}>
              <Form.Item
                name={"title"}
                label={t("pages.article.title")}
                rules={[{ required: true, message: t("error.enterTitle") }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={"slug"} hidden>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={"description"}
                label={t("pages.article.description")}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={"body"} label={t("pages.article.body")}>
                <TextArea
                  maxLength={100}
                  style={{ height: 200, resize: "none" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item label={t("pages.article.tags")}>
            <Input
              onChange={handleInputChange}
              onPressEnter={handleEnterPress}
              value={inputValue}
            />
          </Form.Item>
          {onRenderTagList()}
        </Col>
        <Col xs={24} sm={24} md={24} lg={6}>
          <Form.Item>
            <CustomButton
              block={false}
              name="submit"
              type="primary"
              onSubmit={form.submit}
              loading={addArticleLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateArticles;
