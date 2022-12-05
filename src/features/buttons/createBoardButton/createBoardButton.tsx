import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const CreateBoardButton = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('Create-board-button')

    const callbacks = {
        onCreate: useCallback(() => 
            dispatch(openModal({type: 'createBoard', 
                info: { operation: 'create-board', ids: { boardId: 'idle', columnId: 'idle', taskId: 'idle' } }})), 
        [dispatch])
    }

    return (
        <Button style={cn()} onClick={callbacks.onCreate} text={t('create-board').button_title} />
    )
}

export default React.memo(CreateBoardButton)