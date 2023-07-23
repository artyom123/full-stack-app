import React from 'react'
import './timer.css'

enum TYPE_TIMER {
    INTERVAL = 'interval',
    TIMEOUT = 'timeOut',
}

const TIME_DELAY = 1000

export const Timer: React.FC = () => {
    const [count, setCount] = React.useState<number>(0)
    const [isStarted, setIsStarted] = React.useState(true)
    const [typeTimer, setTypeTimer] = React.useState(TYPE_TIMER.INTERVAL)
    const timerRef = React.useRef<NodeJS.Timeout | number>()
    const TIMER_FUNCTION = {
        [TYPE_TIMER.INTERVAL]: {
            clear: clearInterval.bind(null),
            start: setInterval.bind(null),
        },
        [TYPE_TIMER.TIMEOUT]: {
            clear: clearTimeout.bind(null),
            start: setTimeout.bind(null),
        },
    }

    const handleClickStart = () => {
        setIsStarted(true)
    }

    const handleClickStop = () => {
        setIsStarted(false)
    }

    const handleChangeType = (type: TYPE_TIMER) => {
        setIsStarted(true)
        setCount(0)
        setTypeTimer(type)
    }

    React.useEffect(() => {
        if (!timerRef.current && isStarted) {
            timerRef.current = TIMER_FUNCTION[typeTimer].start(() => setCount(prev => prev += 1), TIME_DELAY)
        }

        return () => {
            TIMER_FUNCTION[typeTimer].clear(timerRef.current)
            timerRef.current = undefined
        }
    }, [count, isStarted, typeTimer])

    return (
        <div className="timer">
            <div>Timer: { count }</div>
            <button onClick={handleClickStart}>Start</button>
            <button onClick={handleClickStop}>Stop</button>

            <fieldset className="group_radio">
                <label htmlFor={TYPE_TIMER.INTERVAL}>
                    setInterval
                    <input
                        id={TYPE_TIMER.INTERVAL}
                        type="radio"
                        value={TYPE_TIMER.INTERVAL}
                        checked={typeTimer === TYPE_TIMER.INTERVAL}
                        onChange={() => handleChangeType(TYPE_TIMER.INTERVAL)}
                    />
                </label>
                <label htmlFor={TYPE_TIMER.TIMEOUT}>
                    setTimeOut
                    <input
                        id={TYPE_TIMER.TIMEOUT}
                        type="radio"
                        value={TYPE_TIMER.TIMEOUT}
                        checked={typeTimer === TYPE_TIMER.TIMEOUT}
                        onChange={() => handleChangeType(TYPE_TIMER.TIMEOUT)}
                    />
                </label>
            </fieldset>
        </div>
    )
}
