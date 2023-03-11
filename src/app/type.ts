
export interface VertifyEmailCode {
  email: string;
  checkCode: number;
  type: EmailCodeType;
}

export enum EmailCodeType {
  LOGIN_OR_REGISTER,
  VERTIFY_EMAIL,
}
