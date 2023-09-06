import './memory.css'
import { useCallback, useEffect, useState } from 'react'

const gerRandomValueFromMinToMax = (value: number, min = 0, max = Math.pow(value, 2)) => Math.trunc(Math.random() * (max - min + 1) + min)

const generateRandomAnswerIds = (value: number): Set<number> => {
    const set: Set<number> = new Set()

    while (set.size !== value) {
        const newValue = gerRandomValueFromMinToMax(value)
        set.add(newValue)
    }

    return set
}


export const Memory: React.FC = () => {
    const [difficulty, setDifficulty] = useState(5)
    const [isStarted, setIsStarted] = useState(false)
    const [isShownAnswers, setIsShownAnswers] = useState(false)
    const [result, setResult] = useState<{ wrong: number[]; right: number[] }>({
        wrong: [],
        right: [],
    })
    const [answerIds, setAnswerIds] = useState(generateRandomAnswerIds(difficulty))

    const handleChangeDifficulty = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const difficulty = Number(evt.target.value)

        reset(difficulty)
        setDifficulty(difficulty)
    }

    const handleClickStart = () => {
        if (isStarted) {
            reset()
        } else {
            setIsShownAnswers(true)
            setIsStarted(true)
        }
    }

    const handleClickBlock = (index: number) => {
        setResult(prev => ({
            ...prev,
            ...(answerIds.has(index) ? { right: [...prev.right, index] } : { wrong: [...prev.wrong, index] } ),
        }))
    }

    const reset = useCallback((newDifficulty?: number) => {
        setAnswerIds(generateRandomAnswerIds(newDifficulty ?? difficulty))
        setIsStarted(false)
        setResult({
            right: [],
            wrong: [],
        })
    }, [difficulty])

    const getBackgroundColor = (index: number): string => {
        let color = 'gray'

        if (isShownAnswers) {
            color = answerIds.has(index) ? 'green' : 'gray'
        }

        if (isStarted && result.wrong.includes(index)) {
            color = 'red'
        } else if (isStarted && result.right.includes(index)) {
            color = 'green'
        } else if (isStarted && result.right.length === answerIds.size) {
            color = 'yellow'
        }

        return color
    }

    useEffect(() => {
        isStarted && isShownAnswers && setTimeout(() => setIsShownAnswers(false), 1000)
    }, [isShownAnswers, isStarted])

    return (
        <>
            <label>
                Difficulty: {difficulty}
                <input type="range" min="2" max="20" value={difficulty} onChange={handleChangeDifficulty} />
            </label>
            <div>Memory Game</div>
            <button onClick={handleClickStart}>{ isStarted ? "Reset" : "Play" }</button>
            {
                isStarted && <span>Answers right:{result.right.length} and wrong:{result.wrong.length}</span>
            }
            <section style={{
                display: 'grid',
                gridTemplateRows: `repeat(${difficulty}, 1fr)`,
                gridTemplateColumns: `repeat(${difficulty}, 1fr)`,
                gap: 8,
                width: '500px',
            }}>
                { [...Array(Math.pow(difficulty, 2))].map((item, index) => (
                    <
                        button
                        disabled={!isStarted || isShownAnswers}
                        key={index}
                        style={{
                            background: getBackgroundColor(index),
                        }}
                        onClick={() => handleClickBlock(index)}
                    />
                )) }
            </section>
        </>
    )
}
