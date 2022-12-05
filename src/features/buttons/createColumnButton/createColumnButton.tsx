import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const CreateColumnButton = ({ boardId } : {boardId: string }) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('create-task-button')

    const callbacks = {
        onCreate: useCallback(() => 
            dispatch(openModal({type: 'creatColumnModal', 
                info: { operation: 'create-column', ids: { boardId } }})), 
        [dispatch, boardId])
    }

    return (
        <Button style={cn()} onClick={callbacks.onCreate} text={t('create-column').button_title} />
    )
}

export default React.memo(CreateColumnButton)