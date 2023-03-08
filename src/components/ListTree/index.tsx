import React, {useEffect, useState} from 'react'

import {
    DownOutlined,
} from '@ant-design/icons'
import {
    Tree,
    Button,
} from 'antd'

import {updateObjTreeForExport} from '../../helpers/updateObjToTree'
import {EditingForm} from '../EditingForm'

import styles from './ListTree.module.scss'

interface Props {
    nestedObj?: any
}

export const ListTree: React.FC<Props> = ({nestedObj}) => {
    const [updateNestedObj, setUpdateNestedObj] = useState(nestedObj)
    const [selectElement, setSelectElement] = useState({
        key: '',
        title: '',
    })
    const onSelect = (value: any, e: any) => {
        setSelectElement({key: e.node.key, title: e.node.title})
    }

    useEffect(() => {
        setUpdateNestedObj(nestedObj)
    }, [nestedObj])

    const handleSaveResultClick = () => {
        const jsonElementsTree = JSON.stringify(updateNestedObj)
        localStorage.setItem('elementsTree', jsonElementsTree)
    }

    const handleExportResultClick = () => {
        const objTreeForExport = updateObjTreeForExport(updateNestedObj)
        console.log(updateNestedObj)
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(objTreeForExport),
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
                    Save the checking result
                </Button>
                <Button onClick={handleExportResultClick}>
                    Export the check result
                </Button>
            </div>

            { selectElement.key && (
                <EditingForm
                    selectElement={selectElement}
                    updateNestedObj={updateNestedObj}
                    setUpdateNestedObj={setUpdateNestedObj}
                />
            )}
        </div>
    )
}
