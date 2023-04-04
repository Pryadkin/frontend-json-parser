import {ITreeObject} from '../../../types'

import {deleteElement} from '.'

const treeObject: ITreeObject[] = [{
    children: [
        {
            icon: '<div>icon</div>',
            key: '0-0',
            title: 'ElemChild',
            children: [],
        },
        {
            icon: '<div>icon</div>',
            key: '0-1',
            title: 'ElemChild',
            children: [
                {
                    icon: '<div>icon</div>',
                    key: '0-1-0',
                    title: 'ElemChild',
                    children: [],
                },
                {
                    icon: '<div>icon</div>',
                    key: '0-1-1',
                    title: 'ElemChild',
                    children: [
                        {
                            icon: '<div>icon</div>',
                            key: '0-1-1-0',
                            title: 'ElemChild',
                            children: [],
                        },
                    ],
                },
            ],
        },
    ],
    icon: '<div>icon</div>',
    key: '0',
    title: 'firstElem',
}]

const updateTreeObj = [{
    children: [
        {
            icon: '<div>icon</div>',
            key: '0-0',
            title: 'ElemChild',
            children: [],
        },
        {
            icon: '<div>icon</div>',
            key: '0-1',
            title: 'ElemChild',
            children: [
                {
                    icon: '<div>icon</div>',
                    key: '0-1-0',
                    title: 'ElemChild',
                    children: [],
                },
                {
                    icon: '<div>icon</div>',
                    key: '0-1-1',
                    title: 'ElemChild',
                    children: [],
                },
            ],
        },
    ],
    icon: '<div>icon</div>',
    key: '0',
    title: 'firstElem',
}]

describe('checking an deep object on delete', () => {
    test('exist child element', () => {
        const value = '0-1-1-0'
        const treeObjectJson = JSON.stringify(deleteElement(treeObject, value))
        const updateTreeObjJson = JSON.stringify(updateTreeObj)

        expect(treeObjectJson)
            .toEqual(updateTreeObjJson)
    })
    test('not exist child element', () => {
        const value = '0455'
        const treeObjectJson = JSON.stringify(deleteElement(treeObject, value))
        const updateTreeObjJson = JSON.stringify(updateTreeObj)

        expect(treeObjectJson)
            .not
            .toEqual(updateTreeObjJson)
    })
})
