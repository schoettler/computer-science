import { describe, expect, it } from 'bun:test'
import { BinaryTree } from 'data-types/bintary-tree'
import { mirrorBinaryTree } from './mirror-binary-tree'
import { breadthSearchIterator } from './breadth-search-iterator'

describe('Mirror binary tree tests', () => {
  it('should handle a normal binary search tree', () => {
    const input = [100, 50, 200, 25, 75, 125, 350]
    const tree = new BinaryTree(input)
    mirrorBinaryTree(tree.root)
    const mirroredTree = tree.getTreeDeepCopy()
    const mirroredTreeString = breadthSearchIterator(mirroredTree.root)

    expect(mirroredTreeString).toBe('100 : 200, 50 : 350, 125, 75, 25')
  })

  it('should handle any binary tree', () => {
    const tree = new BinaryTree([100])
    tree.insert(50)
    tree.insert(200)
    tree.insert(25)
    // Add a node at an incorrect position
    tree.insertBT(110)
    tree.insert(125)
    tree.insert(350)
    mirrorBinaryTree(tree.root)
    const mirroredTree = tree.getTreeDeepCopy()
    const mirroredTreeString = breadthSearchIterator(mirroredTree.root)

    expect(mirroredTreeString).toBe('100 : 200, 50 : 350, 125, 110, 25')
  })
})
