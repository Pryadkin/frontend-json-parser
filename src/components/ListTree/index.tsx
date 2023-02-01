/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'

import {
    DownOutlined,
} from '@ant-design/icons'
import {
    Tree,
} from 'antd'

import styles from './ListTree.module.scss'

interface Props {
    nestedObj?: any
}

export const ListTree: React.FC<Props> = ({nestedObj}) => {
    const onSelect = (value: any) => {
        console.log(value)
    }
    return (
        <div className={styles.wrapper}>
            <Tree
                switcherIcon={<DownOutlined />}
                showLine
                defaultExpandedKeys={['0-0-0']}
                onSelect={onSelect}
                treeData={nestedObj}
            />
        </div>
    )
}
