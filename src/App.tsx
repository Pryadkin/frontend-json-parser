/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'

import {Button, Input} from 'antd'

import {errorMessage} from './common/notifications'
import {Dropzone} from './components/Dropzone'
import {ListTree} from './components/ListTree'
import {updateObjForTree} from './helpers/updateObjToTree'

import styles from './App.module.scss'

const {TextArea} = Input

const textAreaPlaceholder = 'Enter the text in json format'

const App = () => {
    const [textAreaValue, setTextAreaValue] = useState('')
    const [valObj, setValObj] = useState<any>()

    useEffect(() => {
        const jsonLocalNestedObj = localStorage.getItem('elementsTree')
        const localNestedObj = jsonLocalNestedObj && JSON.parse(jsonLocalNestedObj)
        setValObj(localNestedObj)
    }, [])

    const parseText = (valJson: string) => {
        try {
            const value = JSON.parse(valJson)
            const objForTree = updateObjForTree(value)
            console.log(objForTree)
            setValObj(objForTree)
            setTextAreaValue('')
        } catch (err) {
            if (err instanceof Error) {
                errorMessage(err, 'Error')
            } else {
                errorMessage((err as any), 'Unexpected error')
            }
        }
    }
    const handleTextAreaChange = (e: any) => {
        setTextAreaValue(e.target.value)
    }
    const handleStartCheckingButtonClick = () => {
        parseText(textAreaValue)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <Dropzone setValue={setTextAreaValue} />
                <TextArea
                    className={styles.textArea}
                    value={textAreaValue}
                    rows={10}
                    placeholder={textAreaPlaceholder}
                    onChange={handleTextAreaChange}
                />
            </div>

            <Button
                onClick={handleStartCheckingButtonClick}
                disabled={Boolean(!textAreaValue)}
            >
                Start checking
            </Button>

            {valObj && (
                <ListTree nestedObj={valObj} />
            )}
        </div>
    )
}

export default App
