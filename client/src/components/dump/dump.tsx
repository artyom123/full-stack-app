import './dump.styles.css'
import React from 'react'
import { consoleUtil } from '@utils'

enum CHECKBOX {
    ONE,
    TWO
}

enum RADIO {
    ONE,
    TWO,
    THREE
}

const SELECT_OPTIONS = [
    { value: '1', label: 'one' },
    { value: '2', label: 'two' },
    { value: '3', label: 'three' },
] as const

export const Dump = () => {
    const [inputTextValue, setInputTextValue] = React.useState('input text');
    const [checkboxValue, setCheckboxValue] = React.useState<Record<CHECKBOX, boolean>>({
        [CHECKBOX.ONE]: true,
        [CHECKBOX.TWO]: false,
    });
    const [radioValue, setRadioValue] = React.useState<RADIO | undefined>()
    const [selectValue, setSelectValue] = React.useState<any>(SELECT_OPTIONS[2].value)

    const handleChangeInputValue = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(evt.target.value)
    }, [])

    const handleCheckBox = React.useCallback((id: CHECKBOX) => (evt: React.ChangeEvent<HTMLInputElement>) => {
        consoleUtil.debug(evt.target.checked, 'checkbox')
        setCheckboxValue(prev => ({
            ...prev,
            [id]: evt.target.checked,
        }))
    }, [])

    const handleChangeRadio = React.useCallback((evt: React.ChangeEvent<HTMLInputElement>) => {
        consoleUtil.debug(evt.target.name, 'radio name: ')
        consoleUtil.debug(evt.target.value, 'radio value: ')
        setRadioValue(Number(evt.target.value))
    }, [])

    const handleChangeSelectValue = React.useCallback((evt: React.ChangeEvent<HTMLSelectElement>) => {
        consoleUtil.debug(evt.target.value, 'select: ')
        setSelectValue(evt.target.value)
        // keyof typeof SELECT_OPTIONS
    }, [])

    return (
        <div className="dump">
            <label htmlFor="inputText">
                Input text:
                <input id="inputText" type="text" value={inputTextValue} onChange={handleChangeInputValue} />
            </label>
            <label htmlFor="time">
                Time:
                <input id="time" type="time" />
            </label>
            <label htmlFor="color">
                Color:
                <input id="color" type="color" />
            </label>
            <label>
                Checkboxes group:
                <input type="checkbox" onChange={handleCheckBox(CHECKBOX.ONE)} checked={checkboxValue[CHECKBOX.ONE]}/>
                <input type="checkbox" onChange={handleCheckBox(CHECKBOX.TWO)} checked={checkboxValue[CHECKBOX.TWO]}/>
            </label>
            <label>
                Radio buttons group:
                <input type="radio" name="radioGroup" value={RADIO.ONE} onChange={handleChangeRadio} checked={RADIO.ONE === radioValue}/>
                <input type="radio" name="radioGroup" value={RADIO.TWO} onChange={handleChangeRadio} checked={RADIO.TWO === radioValue}/>
                <input type="radio" name="radioGroup" value={RADIO.THREE} onChange={handleChangeRadio} checked={RADIO.THREE === radioValue}/>
            </label>
            <div>
                <label htmlFor="select"> Choose: {selectValue} </label>
                <select id="select" value={selectValue} onChange={handleChangeSelectValue}>
                    {
                        SELECT_OPTIONS.map(({ value, label }) => <option value={value}>{label}</option>)
                    }
                </select>
            </div>
        </div>
    )
}
