import React, { BaseSyntheticEvent, MouseEventHandler, useCallback } from "react"
import { useTranslate } from "../../../app/hooks"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getModalInfo, getModalStatus, getInitUsers, getModalTitleErr, getModalDescErr } from "../../../app/selectors"
import { closeModal, onCreate, setErrTitle, noErrTitle, setErrDesc, noErrDesc } from "../modalsSlice"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const CreateTaskModal = () => {
    const { t } = useTranslate()
    const dispatch = useAppDispatch()
    const { operation, ids } = useAppSelector(getModalInfo)
    const users = useAppSelector(getInitUsers)
    const status = useAppSelector(getModalStatus)
    const titleErr = useAppSelector(getModalTitleErr)
    const descErr = useAppSelector(getModalDescErr)
    const cn = bem('Creating-modal')

    const callbacks = {
        onReject: useCallback(() => dispatch(closeModal()), [dispatch]),
        onConfirm: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault() 
            const form = e.target
            const title = form[cn('title')].value
            const description = form[cn('description')].value
            const users = [form[cn('participant')].value]
            const order = form[cn('order')].value
            const data = {
                title,
                description,
                users,
                order: Number(order),
                userId: Number(ids.userId)
            }
            if (title === '') {
                dispatch(setErrTitle())
            } else {
                dispatch(noErrTitle())
            }
            if (description === '') {
                return dispatch(setErrDesc())
            } else {
                dispatch(noErrDesc())
            }
            dispatch(noErrDesc())
            dispatch(onCreate({ operation, ids, data }))
            form.reset()
            dispatch(closeModal())
        }, [dispatch, cn, operation, ids]),
        onChange: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault() 
            e.target.value === '' ? dispatch(setErrTitle()) : dispatch(noErrTitle())
        }, [dispatch])
    }

    const CreateFormFields = () => (
        <>
            <div className={cn('body-item', { default: true })}>
                <label className={cn('body-item--label', { default: true })} htmlFor={cn('title')}>{t('create_form').task_title}</label>
                <input onChange={callbacks.onChange} name={cn('title')} className={cn('body-item--input', { default: true })} type="text" id={cn('title')} />
                {titleErr && <span className={cn('body-item--err', { default: true })}>{t('create_form').title_err}</span>}
            </div>
            <div className={cn('body-item', { default: true })}>
                <label className={cn('body-item--label', { default: true })} htmlFor={cn('description')}>{t('create_form').task_description}</label>
                <textarea name={cn('description')} className={cn('body-item--input', { default: true })} id={cn('description')} rows={4}></textarea>
                {descErr && <span className={cn('body-item--err', { default: true })}>{t('create_form').title_err}</span>}
            </div>
            <div className={cn('body-item', { default: true })}>
                <label className={cn('body-item--label', { default: true })} htmlFor={cn('participant')}>{t('create_form').task_participants}</label>
                <select name={cn('participant')} className={cn('body-item--input', { default: true })} id={cn('participant')} >
                    {users.map((user: { name: string, _id: string}) => <option key={user._id} value={user.name}>{user.name}</option>)}
                </select>
            </div>
            <div className={cn('body-item', { default: true })}>
                <label className={cn('body-item--label', { default: true })} htmlFor={cn('order')}>{t('create_form').task_order}</label>
                <select  name={cn('order')} className={cn('body-item--input', { default: true })} id={cn('order')}>
                    {JSON.parse(t('create_form').orders).map(({value, title} : { value: 0 | 1, title: string }) => 
                        <option key={value} value={value}>{title}</option>)}
                </select>
            </div>
        </>
    )

    return (
        <div className={cn()}>
            <div className={cn({default: true})}>
                <div className={cn('close', {default: true})}>
                    <div className={cn('title')}>{t(operation).modal_title}</div>
                    <Button text='X' onClick={callbacks.onReject} />
                </div>
                <form data-testid='createform' className={cn('body', {default: true})} onSubmit={callbacks.onConfirm} encType='multipart/form-data'>
                    <CreateFormFields />
                    <div className={cn('footer', {default: true})}>
                        <Button 
                            style={cn('footer_button', {default: true})} 
                            text={t('create_form').no}
                            type={'button'} 
                            onClick={callbacks.onReject}
                            disabled={status === 'wait'} />
                        <Button 
                            style={cn('footer_button', {default: true})} 
                            text={t('create_form').yes}
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


export default React.memo(CreateTaskModal)
