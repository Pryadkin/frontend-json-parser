/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'

// import {v4 as uuidv4} from 'uuid'
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

export const updateObjForTree = (nestedObj: ITreeObject, idx = '0'): any => {
    const newId = `${idx}-0`

    if (!nestedObj) return null

    if (typeof nestedObj === 'string' || typeof nestedObj === 'number') {
        return {title: nestedObj, key: newId}
    }

    if (Array.isArray(nestedObj)) {
        return nestedObj.map((el, index) => {
            const newIndex = `${idx}-${index}`
            if (typeof el === 'string' || typeof el === 'number') {
                return {title: el, key: newIndex}
            }
            return updateObjForTree(el, newIndex)
        })
    }

    return Object.entries(nestedObj)
        .map(([key, value], index) => {
            const newIndex = `${idx}-${index}`
            const objForTree = updateObjForTree(value, newIndex)

            return ({
                title: key,
                key: newIndex,
                children: Array.isArray(objForTree)
                    ? objForTree
                    : [objForTree],
            })
        })
}

export const updateObjTreeForExport = (obj: any[]): any => {
    let newObj: any = {}
    const arr: any[] = []

    obj.forEach(({title, children}) => {
        if (children) {
            newObj = {
                ...newObj,
                [title]: updateObjTreeForExport(children),
            }
        } else if (obj.length === 1) {
            newObj = title
        } else {
            arr.push(title)
        }
    })

    return arr.length > 0 ? arr : newObj
}
