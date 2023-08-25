import React from 'react'
import { consoleUtil } from '@utils'

export const LifeCycleHookFC: React.FC = () => {
    const [inputTextValue, setInputTextValue] = React.useState('input text')
    const [count, setCount] = React.useState(0)

    const handleChangeInputText = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(evt.target.value)
    }, [])

    const handleClickIncrease = React.useCallback(() => {
        setCount(prev => prev += 1)
    }, [])

    const handleClickDecrease = React.useCallback(() => {
        setCount(prev => prev -= 1)
    }, [])

    React.useEffect(() => {
        consoleUtil.info('useEffect empty: mount')

        return () => {
            consoleUtil.info('useEffect empty: umount')
        }
    }, [])

    React.useLayoutEffect(() => {
        consoleUtil.info('useLayoutEffect empty: mount')

        return () => {
            consoleUtil.info('useLayoutEffect empty: umount')
        }
    }, [])

    React.useEffect(() => {
        consoleUtil.info(`useEffect for "count" mount: ${count}`, 'blue')

        return () => {
            consoleUtil.info(`useEffect for "count" umount: ${count}`, 'blue')
        }
    }, [count])

    React.useLayoutEffect(() => {
        consoleUtil.info(`useLayoutEffect for "count" mount: ${count}`, 'blue')

        return () => {
            consoleUtil.info(`useLayoutEffect for "count" umount: ${count}`, 'blue')
        }
    }, [count])

    React.useEffect(() => {
        consoleUtil.info(`useEffect for "inputTextValue" mount: ${inputTextValue}`, 'yellow')

        return () => {
            consoleUtil.info(`useEffect for "inputTextValue" umount: ${inputTextValue}`, 'yellow')
        }
    }, [inputTextValue])

    React.useLayoutEffect(() => {
        consoleUtil.info(`useLayoutEffect for "inputTextValue" mount: ${inputTextValue}`, 'yellow')

        return () => {
            consoleUtil.info(`useLayoutEffect for "inputTextValue" umount: ${inputTextValue}`, 'yellow')
        }
    }, [inputTextValue])

    return (
        <>
            <div>Life Cycle Function Component</div>
            <input type="text" value={inputTextValue} onChange={handleChangeInputText} />
            <span>Count: {count}</span>
            <button onClick={handleClickIncrease}>Increase</button>
            <button onClick={handleClickDecrease}>Decrease</button>
        </>
    )
}

LifeCycleHookFC.displayName = 'LifeCycleHookFC'
