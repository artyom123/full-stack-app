import React from 'react'
import { createPortal } from 'react-dom'
import { BACKGROUND_COLORS, MESSAGE_TEXT } from './portal.constants'

interface PortalProps {
    message: string;
    backgroundColor: string
}

export const Portal: React.FC<Partial<PortalProps>> = ({ message = MESSAGE_TEXT, backgroundColor }) => {
    const randomBackgroundColorIndex = Math.trunc(Math.random() * (BACKGROUND_COLORS.length - 1))
    const portal = document.getElementById('notification') as HTMLElement

    const renderNotification = React.useMemo(() =>
        <div
            style={{
                backgroundColor: backgroundColor || BACKGROUND_COLORS[randomBackgroundColorIndex]
            }}
        >
            {message}
        </div>,
        [])

    return createPortal(renderNotification, portal)
}
