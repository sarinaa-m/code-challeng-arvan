export interface IArticleState {
  articleLists: IArticleList
  tagList: ITagList
  addArticle: IAddArticle
}

interface IAddArticle {
  loading: boolean
  error: null | undefined | string
}
export interface ITagList {
  loading: boolean
  error: null | string | undefined
  data: Array<string>
}
export interface IArticleList {
  loading: boolean
  error: string | null | undefined
  data: Array<IArticleData>
  articlesCount: number
}

export interface IArticleData {
  slug: string
  title: string
  description: string
  body: string
  tagList: Array<string>
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: {
    username: string
    bio: string
    image: string
    following: boolean
  }
}
