
export interface VertifyEmailCode {
  email: string;
  checkCode: number;
  type: EmailCodeType;
}

export enum EmailCodeType {
  LOGIN_OR_REGISTER,
  VERTIFY_EMAIL,
}


export interface UserState {
  userId: string;
  avatarUrl: string;
}

export interface Register {
  email: string;
  nickName: string;
  password: string;
  emailCode: number;
  checkCode: string;
}

export interface Login {
  email: string;
  password: string;
  checkCode: string;
}

export interface LoginResult {
  nickName: string;
  province: string;
  userId: string;
  isAdmin: boolean;
}

export interface Board {
  pageNo: number;
  pBoardId: number;
  boardId: number;
  orderType: number;
}

export type ResetPassword = Login;
export type ResetPasswordResult = LoginResult;
