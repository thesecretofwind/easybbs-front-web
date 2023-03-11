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

export interface HttpResult<T = null> {
  status: "success" | "error";
  code: number;
  info: string;
  data: T;
}
