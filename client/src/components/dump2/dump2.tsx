import './dump2.css'
import React, { useEffect, useState } from 'react'
import { Popup } from '../popup/popup'
// import Popup from '../popup/popup'
import Dump2Services, { IDataPosts } from './dump2.services'

export const Dump2: React.FC = () => {
    const [data, setData] = useState<IDataPosts[]>([])
    const [filteredData, setFilteredData] = useState<IDataPosts[]>([])
    const [error, setError] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [isOpened, setIsOpened] = useState(false)
    const [selectedPost, setSelectedPost] = useState<Partial<IDataPosts>>({})

    const handleChangeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const value = evt.target.value
        const filteredData = data.filter(({ title }) => title.startsWith(value))

        setInputValue(value);
        setFilteredData(filteredData)
    }

    const handleClickDelete = (id: IDataPosts['id']) => {
        Dump2Services.delete(id)
            .then(() => {
                setFilteredData(prev => prev.filter(item => item.id !== id))
            })
            .catch(() => setError(`The error is happened: the id ${id} didn't delete`))
    }

    const handleClickUpdate = (post: IDataPosts) => {
        setSelectedPost(post)
        setIsOpened(true)
    }

    const handleSave = ({ title, body }: Omit<IDataPosts, 'id' | 'userId'>) => {
        const updatedPost = { ...selectedPost, title, body } as IDataPosts
        if (Object.keys(selectedPost).length) {
            Dump2Services.update(selectedPost.id!, updatedPost)
                .then(data => {
                    setFilteredData(prev => prev.map(item => item.id === data.id ? data : item))
                })
                .catch(() => setError(`The error is happened: the id ${selectedPost.id} didn't update`))
            setSelectedPost({})
        } else {
            Dump2Services.create(updatedPost)
                .then(data => {
                    setFilteredData(prev => [data, ...prev])
                })
                .catch(() => setError(`The error is happened: the id ${selectedPost.id} didn't create`))
            setSelectedPost({})
        }
    }

    useEffect(() => {
        Dump2Services.get()
            .then((data) => {
                setData(data)
                setFilteredData(data)
            })
            .catch(() => setError('The error is happened, please, look on the server'))
    }, [])

    return (
        <>
            {
                error
                    ? (<div>{error}</div>)
                    : (
                    <div className="container">
                        <div className="dump-input-container">
                            <label htmlFor="input" className="dump-label">
                                Search title:
                            </label>
                            <input
                                id="input"
                                className="dump-input"
                                type="text"
                                value={inputValue}
                                onChange={handleChangeInputValue}
                            />
                            <button
                                className="dump-button-create-post"
                                onClick={() => setIsOpened(true)}
                            >
                                Add new post
                            </button>
                        </div>
                        <ul className="dump-posts">
                            {
                                filteredData.map((item) => (
                                    <li key={item.id} className="dump-post">
                                        <div className="dump-post-info">
                                            <span>{ item.title }</span>
                                            <div>{ item.body }</div>
                                        </div>
                                        <div className="dump-post-actions">
                                            <button onClick={() => handleClickUpdate(item)}>Update</button>
                                            <button onClick={() => handleClickDelete(item.id)}>Delete</button>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        {
                            isOpened && <Popup onClose={() => setIsOpened(false)} body={selectedPost?.body} title={selectedPost?.title} onSave={handleSave} />
                        }
                    </div>
                )
            }
        </>
    )
}
