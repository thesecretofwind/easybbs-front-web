export interface IResponseType<T> {
  code: number;
  data: T;
  info: string;
  status: string;
}

export interface IHeaderBoard {
  boardId: number;
  boardDesc: string;
  boardName: string;
  cover: null;
  pBoardId: number;
  postType: number;
  sort: number;
  children: IHeaderBoard[];
}

export interface Board {
  pageNo: number;
  pBoardId?: number;
  boardId: number;
  orderType: number;
}

export interface Article {
  articleId: string;
  attachmentType: number;
  boardId: number;
  boardName: string;
  commentCount: number;
  content: null | string;
  cover: string;
  goodCount: number;
  nickName: string;
  pBoardId: number;
  pBoardName: string;
  postTime: string;
  readCount: number;
  status: number;
  summary: string;
  title: string;
  topType: number;
  userId: string;
  userIpAddress: string;
}

export interface Page {
  pageNo: number;
  pageSize: number;
  pageTotal: number;
  totalCount: number;
}

export interface ArticleList extends Page{
  list: Article[];
}

export interface HttpResult<T = null> {
  status: 'success' | 'error';
  code: number;
  info: string;
  data: T;
}

export interface MessageCount {
  downloadAttachment: number;
  likeComment: number;
  likePost: number;
  reply: number;
  sys: number;
  total: number;
}
