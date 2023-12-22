import './_article.scss'
import { Checkbox, Col, Flex, Form, Input, Row, Skeleton, Spin } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CustomButton from '../Button/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  addArticleData,
  getArticleById,
  getTagData,
} from '../../store/selectores/ArticleSelector'
import { AppDispatch } from '../../store/ConfigStore'
import {
  addArticle,
  fetchTagList,
  updateArticle,
} from '../../store/actions/ArticleAction'
import { setTagList } from '../../store/reducers/ArticleSlice'
import { redirect, useNavigate } from 'react-router'
const CreateArticles = function () {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { t } = useTranslation()

  const { data, loading } = useSelector(getTagData)
  const { loading: articleLoading } = useSelector(addArticleData)
  const { item } = useSelector(getArticleById)

  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    dispatch(fetchTagList())
  }, [])

  useEffect(() => {
    if (item?.slug) {
      form.setFieldsValue(item)
    }
  }, [item])

  const onFinish = async (values: any) => {
    const formValues = {
      ...values,
      tags: selectedTags,
    }
    if (values.slug) {
      const result = await dispatch(updateArticle(formValues))
      if (result.type === 'articles/update/fulfilled') {
        navigate('/articles')
        form.resetFields()
        setSelectedTags([])
      }
    } else {
      const result = await dispatch(addArticle(formValues))

      if (result.type === 'articles/addArticle/fulfilled') {
        navigate('/articles')
        form.resetFields()
        setSelectedTags([])
      }
    }
  }

  const onRenderTagList = () => {
    if (loading) {
      return Array(10)
        .fill(null)
        .map((_, index) => (
          <Flex key={index}>
            <Skeleton.Button
              active={true}
              size={'small'}
              style={{ marginRight: 12, marginBottom: 12 }}
            />
            <Skeleton.Input active={true} size={'small'} block={true} />
          </Flex>
        ))
    } else {
      return (
        <div>
          <Form.Item name={'tags'} className="tag-wrapper">
            {data.map((item) => (
              <Flex key={item} align="center" className="tag-item">
                <Checkbox
                  onChange={() => onTagChange(item)}
                  checked={selectedTags.includes(item)}
                >
                  {item}
                </Checkbox>
              </Flex>
            ))}
          </Form.Item>
        </div>
      )
    }
  }

  const onTagChange = (tag: string) => {
    const newSelectedTags = [...selectedTags]
    if (newSelectedTags.includes(tag)) {
      newSelectedTags.splice(newSelectedTags.indexOf(tag), 1)
    } else {
      newSelectedTags.push(tag)
    }
    setSelectedTags(newSelectedTags)
  }

  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleEnterPress = () => {
    if (inputValue.trim() !== '') {
      dispatch(setTagList(inputValue))
      setInputValue('')
    }
  }

  return articleLoading ? (
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
                name={'title'}
                label={t('pages.article.title')}
                rules={[{ required: true, message: t('error.enterTitle') }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name={'description'}
                label={t('pages.article.description')}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name={'body'} label={t('pages.article.body')}>
                <TextArea
                  maxLength={100}
                  style={{ height: 200, resize: 'none' }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={6}>
          <Form.Item label={t('pages.article.tags')}>
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
              loading={articleLoading}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default CreateArticles
