import './memorization.css'
import { ReactElement, useEffect, useMemo, useState } from 'react'

const getRandomNumber = (rows: number, columns: number): number[] => {
    const res: number[] = [];
    const count = rows * columns / 2

    while (res.length !== count) {
        res.push(Math.trunc(Math.random() * (9) + 1))
    }

    return [...res, ...res].sort(Math.random)
}

const generateRandomElements = (rows: number, columns: number): number[][] => {
    const res: number[][] = []
    const arrayOfNumbers: number[] = getRandomNumber(rows, columns)

    for (let i = 0; i < columns; i++) {
        res[i] = []
        for (let j = 0; j < rows; j++) {
            const value = arrayOfNumbers.pop()
            res[i][j] = value as number
        }
    }

    return res
}

export const Memorization:React.FC = () => {
    const [rowValue, setRowValue] = useState(2)
    const [columValue, setColumnValue] = useState(4)
    const [countOpenedField, setCountOpenedFields] = useState<Record<string, number>[]>([])
    const [matrix, setMatrix] = useState<number[][]>([])
    const [isDisabled, setIsDisabled] = useState(false)

    const handleChangeValue = (state: number, setState: React.Dispatch<React.SetStateAction<number>>) => (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(evt.target.value)

        if (state % 2 !== 0) {
            setState(value % 2 ? value + 1: value)
        } else {
            setState(value)
        }
    }

    const handleClickBlock = (id: string, value: number) => {
        setCountOpenedFields(prev => ([...prev, { [id]: value }]))
    }

    const field = useMemo(() => {
        return matrix.map(
            (column, indexColumn) => <div key={indexColumn} className="memorization-rows">{
                column.map((row, rowIndex) => (
                    <button
                        disabled={isDisabled}
                        key={rowIndex}
                        className="memorization-block"
                        onClick={() => handleClickBlock(`${indexColumn}${rowIndex}`, row)}
                    >
                        { countOpenedField.some(openedField => Object.keys(openedField)[0] === `${indexColumn}${rowIndex}`) && row }
                    </button>
                ))
            }</div>
        )
    }, [countOpenedField, isDisabled, matrix])

    useEffect(() => {
        const matrix = generateRandomElements(rowValue, columValue)

        setCountOpenedFields([])
        setMatrix(matrix)
    }, [rowValue, columValue])

    useEffect(() => {
        const value1 = countOpenedField[countOpenedField.length - 1] && Object.values(countOpenedField[countOpenedField.length - 1])[0]
        const value2 = countOpenedField[countOpenedField.length - 2] && Object.values(countOpenedField[countOpenedField.length - 2])[0]

        if (countOpenedField.length % 2 === 0 && value1 !== value2) {
            setIsDisabled(true)
            setTimeout(() => {
                setIsDisabled(false)
                setCountOpenedFields(prev => prev.slice(0, -2))
            }, 1000)
        }
    }, [countOpenedField])

    return (
        <div className="memorization">
            <h3>Field game</h3>
            <label>
                Rows: {rowValue}
                <input type="range" min="2" max="10" value={rowValue} onChange={handleChangeValue(columValue, setRowValue)} />
            </label>
            <label>
                Columns: {columValue}
                <input type="range" min="2" max="10" value={columValue} onChange={handleChangeValue(rowValue, setColumnValue)} />
            </label>
            <div className="field">{ field }</div>
        </div>
    )
}
