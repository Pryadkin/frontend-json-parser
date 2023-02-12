/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'

import {v4 as uuidv4} from 'uuid'

interface ITreeObject {
    children: ITreeObject[],
    icon: any,
    key: string,
    title: string,
}

export const deleteElement = (
    nestedObj: ITreeObject[],
    value: {title: string, key: string},
): any => {
    const filterElem = nestedObj.filter(item => item.key !== value.key)
    if (filterElem.length !== nestedObj.length) return filterElem
    return nestedObj.map(item => {
        if (item.children) {
            return {
                ...item,
                children: deleteElement(item.children, value),
            }
        }
        return item
    })
}

export const renameElement = (
    nestedObj: ITreeObject[],
    value: {title: string, key: string},
): any => nestedObj.map(item => {
    if (item.key === value.key) {
        return {
            ...item,
            title: value.title,
        }
    }
    if (item.children) {
        return {
            ...item,
            children: renameElement(item.children, value),
        }
    }
    return item
})

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
            title: key,
            key: uuidv4(),
            children: Array.isArray(updateObjForTree(value)) ? updateObjForTree(value) : [updateObjForTree(value)],
        }))
}
