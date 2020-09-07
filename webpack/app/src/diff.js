// 创建diff算法

import { Element, render, setAttr } from "./createElement"


/**
 * 步骤： 一： 节点类型相同，去看下一个属性是否相同，产生一个patch（补丁包）{type：'Attrs',attr:{class}}
 *        二： 新的dom不存在 {type:'remove',index:xxx}
 *        三： 节点类型不同，直接使用替换模式{type:'replace',newNode:newNode}
 *        四： 文本变化 {type:'text',text:a}
 * @param {*} oldNode 
 * @param {*} newNode 
 */

const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0

const diffAttr = (oldAttrs, newAttrs) => {
    let patch = {}
    for (let key in oldAttrs) {
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key] // 有可能是undefined
        }
        for (let key in newAttrs) {
            if (!oldAttrs.hasOwnProperty(key)) {
                // 老节点没有新节点的属性
                patch[key] = newAttrs[key]
            }
        }
    }
    return patch
}

const diffChildren = (oldTChildren, newChildren, index, patchs) => {
    oldTChildren.forEach((child, idx) => {
        // 此处要传第二次以及以后的索引
        walk(child, newChildren[idx], ++Index, patchs)
    });
}

const isString = (node) => {
    return Object.prototype.toString.call(node) === '[object String]'
}


function walk(oldTree, newTree, index, patchs) {
    let currentPatch = []
    if (!newTree) {
        currentPatch.push({ type: REMOVE, index })
    } else if (isString(oldTree) && isString(newTree)) {
        if (oldTree !== newTree) { // 判断文本是否一致
            currentPatch.push({ type: 'TEXT', text: newTree })
        }
    } else if (oldTree.type === newTree.type) {
        // 对比属性
        const attrs = diffAttr(oldTree.props, newTree.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs })
        }
        // 如果有children 节点
        diffChildren(oldTree.children, newTree.children, index, patchs)
    } else {
        currentPatch.push({ type: REPLACE, newTree })
    }

    if (currentPatch.length > 0) {
        patchs[index] = currentPatch

    }
}

export const diff = (oldNode, newNode) => {
    let patchs = {}
    let index = 0
        // 递归
    walk(oldNode, newNode, index, patchs)
    return patchs
}


// patch

// 渲染替换节点

let num = 0
let allPatchs
export const patch = (node, patches) => {
    // 默认哪个需要替换元素
    allPatchs = patches
    walkPatch(node)
}

function walkPatch(node) {

    let currentPatch = allPatchs[num++]
    let childNodes = node.childNodes
    childNodes.forEach(child => walkPatch(child))
    if (currentPatch) {
        doPatch(node, currentPatch)
    }
}

function doPatch(node, patchs) {
    patchs.forEach(patch => {
        switch (patch.type) {
            case 'ATTRS':
                for (let key in patch.attrs) {
                    let value = patch.attrs[key]
                    if (value) {
                        setAttr(node, key, value)
                    } else {
                        node.removeAttribute(key)
                    }
                }
                break;
            case 'TEXT':
                node.textContent = patch.text
                break;
            case 'REPLACE':
                let newNode = (patch.newTree instanceof Element) ? render(patch.newTree) : document.createTextNode(patch.newTree)
                node.parentNode.replaceChild(newNode, node)
                break;
            case 'REMOVE':
                node.parentNode.removeChild(node)
                break;
            default:
                break;
        }
    })
}