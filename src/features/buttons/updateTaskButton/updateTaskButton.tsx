import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const UpdateTaskButton = ({ boardId, columnId, userId, taskId } : {boardId: string, columnId: string, userId: string, taskId: string}) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('create-task-button')

    const callbacks = {
        onCreate: useCallback(() => 
            dispatch(openModal({type: 'updateTask', 
                info: { operation: 'update-task', ids: { boardId, columnId, userId, taskId } }})), 
        [dispatch, boardId, columnId, userId, taskId])
    }

    return (
        <Button style={cn()} onClick={callbacks.onCreate} text={t('update-task').button_title} />
    )
}

export default React.memo(UpdateTaskButton)