import './popup.css'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { IDataPosts } from '../dump2/dump2.services'

type DataProp = Partial<Omit<IDataPosts, 'id' | 'userId'>>

type PopupProps = DataProp & { onSave: (data: Required<DataProp>) => void; onClose: VoidFunction; }

export const Popup: React.FC<PopupProps> = ({ title, body, onSave, onClose }) => {
    const popup = document.getElementById('popup') as HTMLDivElement
    const [inputValue, setInputValue] = useState(title || '')
    const [textAreaValue, setTextAreaValue] = useState(body || '')
    const isUpdated = !!(title && body)
    const handleChangeInputValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(evt.target.value)
    }

    const handleChangeTextAreaValue = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(evt.target.value)
    }

    const handleClickSave = () => {
        onSave({
            title: inputValue,
            body: textAreaValue,
        })
        onClose()
    }

    const handleClickCancel = () => {
        onClose()
    }

    const renderPopup = React.useMemo(() => {
      return (
          <>
              <div className="overloop"></div>
              <div className="popup-container">
                  <button className="popup-button-close" onClick={onClose}>x</button>
                  <span>{isUpdated ? 'Update data' : 'Create new post'}</span>
                  <input type="text" value={inputValue} onChange={handleChangeInputValue}/>
                  <textarea value={textAreaValue} onChange={handleChangeTextAreaValue} rows={10} />
                  <div>
                      <button onClick={handleClickSave}>{ isUpdated ? 'Save' : 'Create' }</button>
                      <button onClick={handleClickCancel}>Cancel</button>
                  </div>
              </div>
          </>
      )
    }, [handleClickCancel, handleClickSave, inputValue, onClose, textAreaValue])

    return createPortal(renderPopup, popup)
}
