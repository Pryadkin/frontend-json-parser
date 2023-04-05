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
            const newIndex: string = `${idx}-${index}`

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
            const updateIdx = `${idx}-${index}`
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
