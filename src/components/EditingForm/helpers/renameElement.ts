import {ITreeObject} from '../../../types'

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
