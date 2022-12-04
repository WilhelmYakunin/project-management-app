import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const DeleteСolumnButton = ({ boardId, columnId } : { boardId: string, columnId: string}) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('Delete-column-button')

    const callbacks = {
        logOut: useCallback(() => 
            dispatch(openModal({type: 'conformationModal', 
                info: { operation: 'delete-column', ids: { boardId, columnId } }})), 
        [dispatch, boardId, columnId])
    }

    return (
        <Button style={cn()} onClick={callbacks.logOut} text={t('delete-column').button_title} />
    )
}

export default React.memo(DeleteСolumnButton)