import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const DeleteTaskButton = ({ boardId, columnId, taskId } : {boardId: string, columnId: string, taskId: string}) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('Delete-column-button')

    const callbacks = {
        logOut: useCallback(() => 
            dispatch(openModal({type: 'conformationModal', 
                info: { operation: 'delete-task', ids: { boardId, columnId, taskId } }})), 
        [dispatch, boardId, columnId, taskId])
    }

    return (
        <Button style={cn()} onClick={callbacks.logOut} text={t('delete-task').button_title} />
    )
}

export default React.memo(DeleteTaskButton)