import React, {useState} from 'react'

import {Button, Input} from 'antd'

import {ListTree} from './components/ListTree'
import {updateObjForTree} from './helpers/updateObjToTree'

import styles from './App.module.scss'

const {TextArea} = Input

const App = () => {
    const [textAreaValue, setTextAreaValue] = useState('')
    const [valObj, setValObj] = useState()
    const parseText = (valJson: string) => {
        try {
            const value = JSON.parse(valJson)
            const updateObj = updateObjForTree(value)
            setValObj(updateObj)
            setTextAreaValue('')
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
            } else {
                console.log('Unexpected error', err)
            }
        }
    }
    const handleTextAreaChange = (e: any) => {
        setTextAreaValue(e.target.value)
    }
    const handleButtonClick = () => {
        parseText(textAreaValue)
    }

    return (
        <div className={styles.wrapper}>
            <TextArea
                className={styles.textArea}
                value={textAreaValue}
                rows={10}
                placeholder="Введите текст в формате json"
                onChange={handleTextAreaChange}
            />
            <Button
                className={styles.btn}
                type="primary"
                onClick={handleButtonClick}
            >
                Начать проверку
            </Button>
            {valObj && (
                <ListTree nestedObj={valObj} />
            )}
        </div>
    )
}

export default App
