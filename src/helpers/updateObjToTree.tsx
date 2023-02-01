/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'

import {
    CheckOutlined,
} from '@ant-design/icons'
import {v4 as uuidv4} from 'uuid'

export const toLowerKeys = (nestedObj: any) => {
    const lowerCaseObj: any = {}
    Object.entries(nestedObj)
        .forEach(([key, value]) => {
            const lowerKey = key.toLowerCase()
            lowerCaseObj[lowerKey] = value
            if (Array.isArray(value)) {
                lowerCaseObj[lowerKey] = []
                value.forEach(el => {
                    if (typeof el === 'string') {
                        lowerCaseObj[lowerKey].push(el)
                    } else {
                        lowerCaseObj[lowerKey].push(toLowerKeys(el))
                    }
                })
            } else if (value && typeof value === 'object') {
                lowerCaseObj[lowerKey] = toLowerKeys(value)
            }
        })
    return lowerCaseObj
}

export const updateObjForTree = (nestedObj: any): any => {
    if (typeof nestedObj === 'string' || typeof nestedObj === 'number') {
        return {title: nestedObj, key: uuidv4()}
    }
    if (Array.isArray(nestedObj)) {
        return nestedObj.map(el => {
            if (typeof el === 'string' || typeof el === 'number') {
                return {title: el, key: uuidv4()}
            }
            return updateObjForTree(el)
        })
    }
    return Object.entries(nestedObj)
        .map(([key, value]) => ({
            icon: <CheckOutlined />,
            title: key,
            key: uuidv4(),
            children: Array.isArray(updateObjForTree(value)) ? updateObjForTree(value) : [updateObjForTree(value)],
        }))
}
