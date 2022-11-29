import React, { MouseEventHandler, useCallback } from "react"
import { useAppDispatch } from "../../app/hooks"
import { useTranslate } from "../../app/hooks"
import { closeModal } from "./modalsSlice"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const LogOutForm = () => {
    const { t } = useTranslate()
    const dispatch = useAppDispatch()
    const cn = bem('Logout-modal')

    const callbacks = {
        onCloseModal: useCallback(() => dispatch(closeModal()), [dispatch]),
        onLogOut: useCallback(() => {
            // implement log out logic here ;)
            dispatch(closeModal())
        }, [dispatch]) 
    }

    return (
        <div className={cn()}>
            <div className={cn({default: true})}>
                <div className={cn('close', {default: true})}>
                    <Button text='X' onClick={callbacks.onCloseModal} />
                </div>
                <div>{t('logout_form').modal_close_dialog}</div>
                <div className={cn('footer', {default: true})}>
                    <Button style={cn('footer_button', {default: true})} text={t('logout_form').yes} onClick={callbacks.onLogOut}/>
                    <Button style={cn('footer_button', {default: true})} text={t('logout_form').no} onClick={callbacks.onCloseModal}/>
                </div>
            </div>
        </div>
    )
}

const Button = ({style, text, onClick} : { style?: string, text: string, onClick: MouseEventHandler }) => {
    return (
        <button type="button" className={style} onClick={onClick}>{text}</button>
    )
}


export default React.memo(LogOutForm)