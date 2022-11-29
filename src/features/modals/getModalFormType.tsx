import { MemoExoticComponent, ReactElement, ReactNode } from 'react';
import LogOutForm from './logOutForm'

const modals: any = {
  logOutModal: LogOutForm,
};

const modal = (modalName: string) :  MemoExoticComponent<() => JSX.Element> => modals[modalName]

export default modal