import React, { MouseEventHandler, useCallback } from "react"
import { useTranslate } from "../../../app/hooks"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getModalInfo, getModalStatus } from "../../../app/selectors"
import { closeModal, onDelete } from "../modalsSlice"
import { logOut } from "../../../app/reducers/user";

import { cn as bem } from "@bem-react/classname"
import './default.css'

const ConfirmationModal = () => {
    const { t } = useTranslate()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { operation, ids } = useAppSelector(getModalInfo)
    const status = useAppSelector(getModalStatus)
    const cn = bem('Conformation-modal')

    const callbacks = {
        onReject: useCallback(() => dispatch(closeModal()), [dispatch]),
        onConfirm: useCallback(() => {
            if (operation === 'logout') {
                dispatch(logOut())
                dispatch(closeModal())
            } else {
                dispatch(onDelete({ operation, ids }))
                dispatch(closeModal())
                dispatch(logOut())
                navigate('/')
            }
        }, [dispatch, navigate, operation, ids]) 
    }

    return (
        <div className={cn()}>
            <div className={cn({default: true})}>
                <div className={cn('close', {default: true})}>
                    <div className={cn('title')}>{t(operation).modal_title}</div>
                    <Button text='X' onClick={callbacks.onReject} />
                </div>
                <div className={cn('body')}>{t('confirm_form').dialog}{t(operation).question}</div>
                <div className={cn('footer', {default: true})}>
                <Button 
                            style={cn('footer_button', {default: true})} 
                            text={t('confirm_form').no} 
                            onClick={callbacks.onReject}
                            disabled={status === 'wait'} />
                        <Button 
                            style={cn('footer_button', {default: true})} 
                            text={t('confirm_form').yes} 
                            onClick={callbacks.onConfirm}
                            disabled={status === 'wait'} />
                </div>
            </div>
        </div>
    )
}

const Button = ({style, text, onClick, disabled} : { style?: string, text: string, onClick: MouseEventHandler, disabled?: boolean }) => {
    return (
        <button type="submit" className={style} onClick={onClick} disabled={disabled}>{text}</button>
    )
}


export default React.memo(ConfirmationModal)