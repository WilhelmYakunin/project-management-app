import React, { useCallback } from "react"
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useTranslate } from "../../../app/hooks"
import Button from "./button"

import { cn as bem } from "@bem-react/classname"
import './default.css'

const EditProfileButton = () => {
    const user = useAppSelector((state) => state.user.current);
    const navigate = useNavigate()
    const { t } = useTranslate()
    const cn = bem('Create-board-button')

    const callbacks = {
        onCreate: useCallback(() => {
            const editProfilePage = '/profile/' + user.user._id
            navigate(editProfilePage)
        }, [navigate, user.user._id])
    }

    return (
        <Button style={cn()} onClick={callbacks.onCreate} text={`${t('user').button_title} ${user.user.name}`} />
    )
}

export default React.memo(EditProfileButton)