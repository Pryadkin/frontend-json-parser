import {updateObjForTree} from './updateObjToTree'

import test1 from './treeForTests/test_1.json'
import test1Update from './treeForTests/test_1_update.json'
import test2 from './treeForTests/test_2.json'
import test2Update from './treeForTests/test_2_update.json'
// import test3 from './treeForTests/test_3.json'
// import test3Update from './treeForTests/test_3_update.json'

describe('checking update object for tree', () => {
    test('to equal correct value', () => {
        const treeObjectJson = JSON.stringify(updateObjForTree((test1 as any)))
        const updateTreeObjJson = JSON.stringify(test1Update)

        expect(treeObjectJson)
            .toEqual(updateTreeObjJson)
    })
    test('to equal correct value', () => {
        const treeObjectJson = JSON.stringify(updateObjForTree((test2 as any)))
        const updateTreeObjJson = JSON.stringify(test2Update)

        expect(treeObjectJson)
            .toEqual(updateTreeObjJson)
    })
})
