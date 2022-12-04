import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const DeleteTaskButton = ({ boardId, columnId, userId } : {boardId: string, columnId: string, userId: string}) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('create-task-button')

    const callbacks = {
        onCreate: useCallback(() => 
            dispatch(openModal({type: 'creatingModal', 
                info: { operation: 'create-task', ids: { boardId, columnId, userId } }})), 
        [dispatch, boardId, columnId, userId])
    }

    return (
        <Button style={cn()} onClick={callbacks.onCreate} text={t('create-task').button_title} />
    )
}

export default React.memo(DeleteTaskButton)