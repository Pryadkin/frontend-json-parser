/* eslint-disable no-debugger */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */

import {ITreeObject} from '../types'

export const updateObjForTree = (nestedObj: ITreeObject, idx = '0'): any => {
    if (typeof nestedObj === 'string' || typeof nestedObj === 'number') {
        return {title: nestedObj, key: `${idx}-0`}
    }

    if (nestedObj === null) {
        return {title: 'null', key: `${idx}-${0}`}
    }

    if (Array.isArray(nestedObj)) {
        const aaa = nestedObj.map((el, index) => {
            const newIndex = `${idx}-${index}`

            // условие надо удалить видимо
            if (typeof el === 'string' || typeof el === 'number') {
                return {title: `${index + 1}`, key: newIndex}
            }

            const objFor = updateObjForTree(el, newIndex)
            return {
                title: `${index + 1}`,
                key: newIndex,
                children: objFor,
            }
        })

        return aaa
    }

    const newObj = Object.entries(nestedObj)
        .map(([key, value], index) => {
            // const newId = isChild ? idx : `${idx}-0`
            // const newIndex = `${idx}-${index}`
            // const newIndex = isChild ? idx : `${idx}-${index}`
            // const newIndex2 = idx === newIndex ? newId : `${idx}-${index}`
            const updateIdx = `${idx}-${index}`
            // if (value === null) {
            //     return ({
            //         title: key,
            //         key: `${idx}-${index}`,
            //         children: [
            //             {title: 'null', key: `${updateIdx}-${index}`},
            //         ],
            //     })
            // }

            const objForTree = updateObjForTree(value, updateIdx)

            return ({
                title: key,
                key: `${idx}-${index}`,
                children: Array.isArray(objForTree)
                    ? objForTree
                    : [objForTree],
            })
        })

    return newObj
}

export const updateObjTreeForExport = (obj: any[]): any => {
    let newObj: any = {}
    const arr: any[] = []

    if (Number(obj[0].title) && obj[0].children) {
        obj?.forEach(({title, children}) => {
            newObj = {
                ...newObj,
                [title]: updateObjTreeForExport(children),
            }

            arr.push(updateObjTreeForExport(children))
        })
    } else {
        obj?.forEach(({title, children}) => {
            if (children) {
                newObj = {
                    ...newObj,
                    [title]: updateObjTreeForExport(children),
                }
            } else if (title === 'null') {
                newObj = null
            } else if (obj.length === 1) {
                newObj = title
            } else {
                arr.push(title)
            }
        })
    }

    return arr.length > 0 ? arr : newObj
}
