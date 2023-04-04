import {ITreeObject} from '../../../types'

export const deleteElement = (
    nestedObj: ITreeObject[],
    value: string,
): any => {
    const filterElem = nestedObj.filter(item => item.key !== value)
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
