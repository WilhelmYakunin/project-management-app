import React, { BaseSyntheticEvent, MouseEventHandler, useCallback, useEffect, useState } from "react"
import Spinner from "../../spinner/spinner"
import { useTranslate } from "../../../app/hooks"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getModalInfo, getModalStatus, getModalTitleErr, getItemLoadStatus, getItemData, getInitUsers } from "../../../app/selectors"
import { closeModal, onUpdate, setErrTitle, noErrTitle, loadItem, setIdle } from "../modalsSlice"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const UpdateColumnModal = () => {
    const { t } = useTranslate()
    const dispatch = useAppDispatch()
    const { operation, ids } = useAppSelector(getModalInfo)
    const users = useAppSelector(getInitUsers)
    const status = useAppSelector(getModalStatus)
    const titleErr = useAppSelector(getModalTitleErr)
    const itemLoadStatus = useAppSelector(getItemLoadStatus)
    const item = useAppSelector(getItemData)
    const [title, setTitle] = useState(item.title)

    const cn = bem('Update-board-modal')

    useEffect(() => {
        itemLoadStatus !== 'loaded' && dispatch(loadItem({operation: 'update-board', ids}))
        setTitle(item.title)
    }, [dispatch, item, itemLoadStatus, ids])

    const callbacks = {
        onReject: useCallback(() => {
            dispatch(closeModal())
            dispatch(setIdle())
        }, [dispatch]),
        onConfirm: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault() 
            const form = e.target
            const title = form[cn('title')].value
            const users = [form[cn('participant')].value]
            const data = { title, users, owner: 'string' }
            if (title === '') {
                return dispatch(setErrTitle())
            } dispatch(noErrTitle())
            dispatch(onUpdate({ operation, ids, data }))
            form.reset()
            dispatch(closeModal())
            dispatch(setIdle())
        }, [dispatch, cn, operation, ids]),
        onChangeTitleInput: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault() 
            e.target.value === '' ? dispatch(setErrTitle()) : dispatch(noErrTitle())
        }, [dispatch]),
        onChangeDescription: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault() 
        }, []),
        onChangeOrder: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault() 
        }, []),
    }

    const UpdateFormFields = () => (
        <>
            <div className={cn('body-item', { default: true })}>
                <label className={cn('body-item--label', { default: true })} htmlFor={cn('title')}>{t('update_form').task_title}</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} name={cn('title')} className={cn('body-item--input', { default: true })} type="text" id={cn('title')} />
                {titleErr && <span className={cn('body-item--err', { default: true })}>{t('update_form').title_err}</span>}
            </div>
            <div className={cn('body-item', { default: true })}>
                <label className={cn('body-item--label', { default: true })} htmlFor={cn('participant')}>{t('update_form').task_participants}</label>
                <select name={cn('participant')} className={cn('body-item--input', { default: true })} id={cn('participant')} >
                    {users.map((user: { name: string, _id: string}) => <option key={user._id} value={user.name}>{user.name}</option>)}
                </select>
            </div>
        </>
    )

    return ( 
        <div className={cn()}>
            {itemLoadStatus !== 'loaded' && <Spinner />}
            <div className={cn({default: true})}>
                <div className={cn('close', {default: true})}>
                    <div className={cn('title')}>{t(operation).modal_title}</div>
                    <Button text='X' onClick={callbacks.onReject} />
                </div>
                <form className={cn('body', {default: true})} onSubmit={callbacks.onConfirm} encType='multipart/form-data'>
                    <UpdateFormFields />
                    <div className={cn('footer', {default: true})}>
                        <Button 
                            style={cn('footer_button', {default: true})} 
                            text={t('update_form').no}
                            type={'button'} 
                            onClick={callbacks.onReject}
                            disabled={status === 'wait'} />
                        <Button 
                            style={cn('footer_button', {default: true})} 
                            text={t('update_form').yes}
                            type={'submit'}
                            disabled={status === 'wait' || titleErr} />
                    </div>
                </form>
            </div>
        </div>
    )
}

const Button = ({style, text, type, onClick, disabled} : { style?: string, text: string, type?: any, onClick?: MouseEventHandler, disabled?: boolean }) => {
    return (
        <button type={type} className={style} onClick={onClick} disabled={disabled}>{text}</button>
    )
}


export default React.memo(UpdateColumnModal)