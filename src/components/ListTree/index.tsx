/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useEffect, useState} from 'react'

import {
    DownOutlined,
} from '@ant-design/icons'
import {
    Tree,
    Button, Form, Input,
} from 'antd'

import {renameElement, deleteElement} from '../../helpers/updateObjToTree'

import styles from './ListTree.module.scss'

interface Props {
    nestedObj?: any
}

export const ListTree: React.FC<Props> = ({nestedObj}) => {
    const [form] = Form.useForm()
    const [updateNestedObj, setUpdateNestedObj] = useState(nestedObj)
    const [selectElement, setSelectElement] = useState({
        key: '',
        title: '',
    })
    const onSelect = (value: any, e: any) => {
        setSelectElement({key: e.node.key, title: e.node.title})
        form.setFieldsValue({
            value: e.node.title,
        })
    }

    useEffect(() => {
        setUpdateNestedObj(nestedObj)
    }, [nestedObj])

    const onFinish = ({value}: any) => {
        const update = renameElement(updateNestedObj, {title: value, key: selectElement.key})
        setUpdateNestedObj(update)
        form.setFieldsValue({
            value: '',
        })
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    const handleBtnDelete = () => {
        const update = deleteElement(updateNestedObj, {title: selectElement.title, key: selectElement.key})
        setUpdateNestedObj(update)
    }

    const handleSaveResultClick = () => {
        const jsonElementsTree = JSON.stringify(updateNestedObj)
        localStorage.setItem('elementsTree', jsonElementsTree)
    }

    const handleExportResultClick = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(updateNestedObj),
        )}`
        const link = document.createElement('a')
        link.href = jsonString
        link.download = 'data.json'

        link.click()
    }

    return (
        <div className={styles.wrapper}>
            <Tree
                className={styles.tree}
                switcherIcon={<DownOutlined />}
                showLine
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={updateNestedObj}
            />

            <div className={styles.btnWrapper}>
                <Button onClick={handleSaveResultClick}>
                    Сохранить результат проверки
                </Button>
                <Button onClick={handleExportResultClick}>
                    Экспортировать результат проверки
                </Button>
            </div>

            { selectElement.key && (
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
            )}

        </div>
    )
}
