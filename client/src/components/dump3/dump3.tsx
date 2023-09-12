import './dump3.css'
import { useEffect, useState } from 'react'

const URL = 'https://jsonplaceholder.typicode.com/albums/1/photos'

interface DataItem {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

const  throttling = (cb: (...arg: any[]) => void, count: number) => {
    let timerId: NodeJS.Timeout | null = null

    return function (...arg: any[]) {
        if (!timerId) {
            timerId = setTimeout(() => cb(...arg), count)
        }
    }
}

let timerId: NodeJS.Timeout | null = null
const debounce = (cb: (...arg: any[]) => void, count: number) => {

    return function (...arg: any[]) {
        if (timerId) {
            clearTimeout(timerId)
        }

        timerId = setTimeout(() => cb(...arg), count)
    }
}

export const Dump3: React.FC = () => {
    const [data, setData] = useState<DataItem[]>()
    const [inputValue, setInputValue] = useState('')
    const [filteredData, setFilteredData] = useState<DataItem[]>()

    const handleChangeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value
        setInputValue(value)
    }

    const renderImages = filteredData?.map(item => (
        <div key={item.id} className="dump3-block">
            <div>{item.title}</div>
            <img src={item.url} />
        </div>
    ))

    const handleDebounce = () => {
        const filteredData = data?.filter(item => item.title.startsWith(inputValue))
        setFilteredData(filteredData)
    }

    useEffect(() => {
        debounce(handleDebounce, 1000)()
    }, [handleDebounce])

    useEffect(() => {
        fetch(URL)
            .then(data => data.json())
            .then(data => {
                setData(data)
                setFilteredData(data)
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="container">
            <input type="text" value={inputValue} onChange={handleChangeInputValue}/>
            {renderImages}
        </div>
    )
}
