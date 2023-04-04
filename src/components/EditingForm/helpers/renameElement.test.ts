import {ITreeObject} from '../../../types'

import {renameElement} from './renameElement'

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
                    children: [
                        {
                            icon: '<div>icon</div>',
                            key: '0-1-1-0',
                            title: 'renameElemChild',
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

describe('checking an deep object on rename', () => {
    test('exist child element', () => {
        const value = {title: 'renameElemChild', key: '0-1-1-0'}
        const treeObjectJson = JSON.stringify(renameElement(treeObject, value))
        const updateTreeObjJson = JSON.stringify(updateTreeObj)

        expect(treeObjectJson)
            .toEqual(updateTreeObjJson)
    })

    test('not exist child element, and treeObject dont change', () => {
        const value = {title: 'renameElemChild', key: '0455-0'}
        const treeObjectJson = JSON.stringify(renameElement(treeObject, value))
        const updateTreeObjJson = JSON.stringify(updateTreeObj)

        expect(treeObjectJson)
            .not
            .toEqual(updateTreeObjJson)
        expect(treeObjectJson)
            .toEqual(treeObjectJson)
    })
})
