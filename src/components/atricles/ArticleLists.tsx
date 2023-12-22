import { Button, Dropdown, Space, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/ConfigStore'
import { getArticleData } from '../../store/selectores/ArticleSelector'
import { IArticleData } from '../../interfaces/IArticles'
import { deleteArticle, fetchArticles } from '../../store/actions/ArticleAction'
import moment from 'moment'
import { MoreOutlined } from '@ant-design/icons'
import { MenuProps } from 'rc-menu'
import './_article.scss'
const ArticleLists = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch<AppDispatch>()
  const { articleCount, data, loading } = useSelector(getArticleData)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])
  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'edit',
    },
    {
      label: 'Delete',
      key: 'delete',
    },
  ]

  const columns: ColumnsType<IArticleData> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      render: (_, { author }) => <div>{author.username}</div>,
    },
    {
      title: 'Tag',
      dataIndex: 'tagList',
      key: 'tagList',
      render: (_, { tagList }) => tagList.toString(),
    },
    {
      title: 'Excerpt',
      key: 'body',
      dataIndex: 'body',
      render: (_, { body }) => <div>{body.substring(0, 20)}</div>,
    },
    {
      title: 'Created',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (_, { createdAt }) => moment(createdAt).format('MMMM Do YYYY'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { slug }) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => onClickArticle({ key, slug }),
          }}
          trigger={['click']}
        >
          <MoreOutlined />
        </Dropdown>
      ),
    },
  ]
  const onClickArticle = ({ key, slug }: any) => {
    debugger
    if (key === 'delete') {
      dispatch(deleteArticle(slug))
    }
  }

  return (
    <Table
      loading={loading}
      scroll={{ x: 500 }}
      columns={columns}
      dataSource={data}
    />
  )
}

export default ArticleLists
