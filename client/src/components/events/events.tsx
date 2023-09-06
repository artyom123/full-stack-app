import './events.styles.css'
import { consoleUtil } from '@utils'
import React from 'react'
import { LOREM_IPSUM } from './events.constants'

export const Events: React.FC = () => {
    const handleScroll = React.useCallback(() => {
        consoleUtil.info(`scroll ======>>> ${window.scrollY}`, 'red')
    }, [])

    React.useEffect(() => {
        consoleUtil.info('scroll add event ======>>>', 'yellow')
        window.addEventListener('scroll', handleScroll)

        return () => {
            consoleUtil.info('scroll remove event ======>>>', 'yellow')
            window.removeEventListener('scroll', handleScroll)
        }
    }, [handleScroll])

    return(
        <div className="container">
            {
                Array(4).fill(undefined).map((item, i) => <span key={`${i}-text`}>{LOREM_IPSUM}</span>)
            }
        </div>
    )
}
