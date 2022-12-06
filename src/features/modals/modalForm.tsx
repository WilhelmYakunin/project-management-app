import React from 'react';
import { useAppSelector } from '../../app/hooks';
import getModalFormType from './getModalFormType';
import { getModalType } from '../../app/selectors';
import WindowFreezer from '../freezer/freezer';

const ModalForm = () => {
  const modalType = useAppSelector(getModalType);
  const ModalInner = getModalFormType(modalType);

  return modalType !== 'unset' ? (
    <WindowFreezer>
        <ModalInner />
    </WindowFreezer>
    ) : null
}

export default React.memo(ModalForm)