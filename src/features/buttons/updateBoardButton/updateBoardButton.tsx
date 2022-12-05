import React, { BaseSyntheticEvent, useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const UpdateColumnButton = ({ boardId } : {boardId: string }) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('Update-board-button')

    const callbacks = {
        onCreate: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(openModal({type: 'updateBoard', 
                info: { operation: 'update-board', ids: { boardId } }}))
        }, 
        [dispatch, boardId])
    }

    return (
        <Button style={cn()} onClick={callbacks.onCreate} text={t('update-board').button_title} />
    )
}

export default React.memo(UpdateColumnButton)