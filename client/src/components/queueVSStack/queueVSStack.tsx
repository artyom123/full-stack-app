import './queue-vs-stack.css'
import { useMemo, useState } from 'react'

const TYPES = {
    queue: ['FIFO', 'First in, first out'],
    stack: ['LIFO',  'Last in, first out',]
} as const

const [queue, stack] = Object.keys(TYPES) as ['queue', 'stack']

export const QueueVSStack: React.FC = () => {
    const [valueInput, setInputValue] = useState('')
    const [valueTextArea, setValueTextArea] = useState('')
    const [todos, setTodos] = useState<{ id: string; title: string; text: string}[]>([])
    const [type, setType] = useState<keyof typeof TYPES>('queue')

    const handleChangeValueInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value)
    }

    const handleChangeValueTextArea = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValueTextArea(evt.target.value)
    }

    const handleClickAdd = () => {
        const id = Date.now().toString(16)

        setTodos(prev => [
            ...prev,
            {
                id,
                title: valueInput,
                text: valueTextArea,
            }
        ])
        setInputValue('')
        setValueTextArea('')
    }

    const handleClickDelete = () => {
        setTodos(prev => type === 'queue' ? prev.slice(1, prev.length) : prev.slice(0, -1))
    }

    return (
        <div className="container">
            <div className="queue-vs-stack-form">
                <h2>To do</h2>
                <span>Peak: {todos.length}</span>
                <span>{ TYPES[type][0] }({ TYPES[type][1] })</span>
                <div className="queue-vs-stack-group-radio">
                    <label>
                        { queue }:
                        <input
                            name="type_of_structure"
                            type="radio"
                            value={queue}
                            checked={type === queue}
                            onChange={() => setType(queue)}
                        />
                    </label>
                    <label>
                        { stack }:
                        <input
                            name="type_of_structure"
                            type="radio"
                            value={stack}
                            checked={type === stack}
                            onChange={() => setType(stack)}
                        />
                    </label>
                </div>
                <label htmlFor="inputtext">
                    Title
                </label>
                <input id="inputtext" type="text" value={valueInput} onChange={handleChangeValueInput}/>
                <label htmlFor="textarea">
                    Text
                </label>
                <textarea id="textarea" rows={4} cols={5} value={valueTextArea} onChange={handleChangeValueTextArea} />
                <div className="queue-vs-stack-actions">
                    <button onClick={handleClickAdd}>Add</button>
                    <button onClick={handleClickDelete}>Delete</button>
                </div>
            </div>
            <ul className="queue-vs-stack-list">
                {
                    todos.map(todo => (
                        <li
                            className="queue-vs-stack-list-item"
                            key={todo.id}
                        >
                            <h4>{ todo.title }</h4>
                            <span>{ todo.text }</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
