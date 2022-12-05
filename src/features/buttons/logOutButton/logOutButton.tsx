import React, { useCallback } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { useTranslate } from "../../../app/hooks"
import { openModal } from "../../modals/modalsSlice"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const LogOutButton = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslate()
    const cn = bem('Logout-button')

    const callbacks = {
        logOut: useCallback(() => 
            dispatch(openModal({type: 'conformationModal', 
                info: { operation: 'logout', ids: null }})), 
        [dispatch])
    }

    return (
        <Button style={cn()} onClick={callbacks.logOut} text={t('logout').button_title} />
    )
}

export default React.memo(LogOutButton)