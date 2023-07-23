import React from 'react'
import { consoleUtil } from '@utils'

export const LifeCycleHook: React.FC = () => {
    const [state, setState] = React.useState({
        count: 1,
    })

    React.useEffect(() => {
        consoleUtil.info('useEffect')
    }, [])

    React.useLayoutEffect(() => {
        consoleUtil.info('useLayoutEffect')
    }, [])

    return (
        <div>Life Cycle Hook</div>
    )
}
