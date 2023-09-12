import './hocVSRenderProps.css'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { cards } from './hocVSRenderProps.constants'

enum TYPE_FILTER {
    TITLE = 'title',
    TEXT = 'text'
}

interface HocVSRenderPropsProps{
    cards: typeof cards
    startedFilter?: number
    render?: () => React.ReactNode
}

const Component: React.FC<HocVSRenderPropsProps> = ({ cards, startedFilter = 0, render }) => {
    const [typeFilter, setTypeFilter] = useState(TYPE_FILTER.TITLE)
    const [inputValue, setInputValue] = useState('')
    const [filteredCards, setFilteredCards] = useState(cards)

    const handleChangeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value

        filterCards(value)
        setInputValue(value)
    }

    const filterCards = (value: string = inputValue) => {
        if (startedFilter <= value.length) {
            const filteredCards = cards.map(card => (
                card.filter((item) => item[typeFilter].startsWith(value))
            ))

            setFilteredCards(filteredCards)
        } else {
            setFilteredCards(cards)
        }
    }

    const fileds = useMemo(() => {
        return filteredCards.map((card, cardIndex) => (
            <div key={cardIndex} className="how-vs-render-props-rows">{
                card.map((item, itemIndex) => (
                    <div key={itemIndex}>
                        <span>{ item.title }</span>
                        <span>{ item.text }</span>
                    </div>
                ))
            }</div>
        ))
    }, [filteredCards])

    useEffect(() => {
        filterCards()
    }, [typeFilter, startedFilter])

    return (
        <div className="container">
            <label>
                {typeFilter}
                <input
                    type="radio"
                    name="type_filter"
                    value={TYPE_FILTER.TITLE}
                    onChange={() => setTypeFilter(TYPE_FILTER.TITLE)}
                    checked={typeFilter === TYPE_FILTER.TITLE}
                />
                <input
                    type="radio"
                    name="type_filter"
                    value={TYPE_FILTER.TEXT}
                    onChange={() => setTypeFilter(TYPE_FILTER.TEXT)}
                    checked={typeFilter === TYPE_FILTER.TEXT}
                />
            </label>
            <span>
                Additinal functionality
                {render && render()}
            </span>
            <input type="text" value={inputValue} onChange={handleChangeInputValue} />
            { fileds }
        </div>
    )
}

function withHOK<T extends HocVSRenderPropsProps>(WrappedComponent: React.ComponentType<T>) {
    const Component: React.FC<T> = (props) => {
        const [startedFilter, setStartedFilter] = useState(7)

        return (
            <WrappedComponent
                {...props}
                startedFilter={startedFilter}
                render={
                    () => {
                        return (
                            <>
                                <button onClick={() => setStartedFilter(prev => prev += 1)}>Increment</button>
                                <button onClick={() => setStartedFilter(prev => prev -= 1)}>Decrement</button>
                                <div>The Filter start to work after <strong>{startedFilter}</strong> symbols</div>
                            </>
                        )
                    }
                }
            />
        )
    }

    return Component
}

export const HocVSRenderProps = withHOK(Component)
