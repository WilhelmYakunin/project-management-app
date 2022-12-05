import React, { BaseSyntheticEvent, useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const DeleteBoardButton = ({boardId } : {boardId: string}) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('Delete-board-button')

    const callbacks = {
        logOut: useCallback((e: BaseSyntheticEvent) => {
            e.preventDefault()
            e.stopPropagation()
            dispatch(openModal({type: 'conformationModal', 
            info: { operation: 'delete-board', ids: { boardId, columnId: 'idle' } }}))

        }, [dispatch, boardId])
    }

    return (
        <Button style={cn()} onClick={callbacks.logOut} text={t('delete-board').button_title} />
    )
}

export default React.memo(DeleteBoardButton)