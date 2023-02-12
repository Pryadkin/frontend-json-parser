import React, {useEffect} from 'react'

import {Button, Form, Input} from 'antd'

import {errorMessage} from '../../common/notifications'
import {deleteElement, renameElement} from '../../helpers/updateObjToTree'

import styles from './EditingForm.module.scss'

interface Props {
    selectElement: {key: string, title: string},
    updateNestedObj: any,
    setUpdateNestedObj: (value: any) => void
}

export const EditingForm: React.FC<Props> = ({
    selectElement,
    updateNestedObj,
    setUpdateNestedObj,
}) => {
    const [form] = Form.useForm()
    const onFinish = ({value}: any) => {
        const update = renameElement(updateNestedObj, {title: value, key: selectElement.key})
        setUpdateNestedObj(update)
        form.setFieldsValue({
            value: '',
        })
    }

    useEffect(() => {
        form.setFieldsValue({
            value: selectElement.title,
        })
    }, [form, selectElement])

    const onFinishFailed = (errorInfo: any) => {
        errorMessage(errorInfo, 'Unexpected error')
    }

    const handleBtnDelete = () => {
        const update = deleteElement(updateNestedObj, {title: selectElement.title, key: selectElement.key})
        setUpdateNestedObj(update)
    }
    return (
        <Form
            form={form}
            className={styles.form}
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 16}}
            style={{maxWidth: 600}}
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Title"
                name="value"
            >
                <Input value={selectElement.title} />
            </Form.Item>

            <Form.Item className={styles.formBtn}>
                <Button type="default" htmlType="submit">
                            Remane
                </Button>
                <Button type="primary" onClick={handleBtnDelete}>
                            Delete
                </Button>
            </Form.Item>
        </Form>
    )
}
