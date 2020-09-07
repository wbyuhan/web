export class Element {
    constructor(type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }

}


export const createElement = (type, props, children) => {
    return new Element(type, props, children)
}


// 
export const setAttr = (node, key, value) => {
        switch (key) {
            case 'value':
                if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
                    node.value = value
                } else {
                    node.setAttribute(key, value)
                }
                break;
            case 'style':
                node.style.cssText = value
            default:
                node.setAttribute(key, value)
                break;
        }

    }
    // render 将vnode 转换成真是dom

export const render = (element) => {
    let el = document.createElement(element.type)
    Object.keys(element.props).forEach(key => {
        setAttr(el, key, element.props[key])
    })
    element.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child) // 判断是不是Element d的实例
        el.appendChild(child)
    })
    return el
}


export const renderDom = (el, target) => {
    target.appendChild(el)
}