export interface Title {
  letter: string;
  color: string;
}

export enum MODAL_TYPE {
  REGISTER,
  LOGIN,
  RESET_PASSWORD
}

export type ChangeModalType  = (modalType: MODAL_TYPE) => void;

