import {updateObjForTree} from './updateObjToTree'

import test1 from './treeForTests/test_1.json'
import test1Update from './treeForTests/test_1_update.json'
import test3 from './treeForTests/test_3.json'
import test3Update from './treeForTests/test_3_update.json'

describe('checking update object for tree', () => {
    test('to equal correct value', () => {
        const treeObjectJson = JSON.stringify(updateObjForTree((test1 as any)))
        const updateTreeObjJson = JSON.stringify(test1Update)
        console.log(treeObjectJson)
        console.log(updateTreeObjJson)

        expect(treeObjectJson)
            .toEqual(updateTreeObjJson)
    })
    test('to equal correct value', () => {
        const treeObjectJson = JSON.stringify(updateObjForTree((test3 as any)))
        console.log('555', treeObjectJson)
        const updateTreeObjJson = JSON.stringify(test3Update)
        console.log('5--', updateTreeObjJson)

        expect(treeObjectJson)
            .toEqual(updateTreeObjJson)
    })
})
