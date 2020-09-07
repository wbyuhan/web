require('../asstes/index.css')
import { createElement, render, renderDom } from './createElement';
import { diff, patch } from './diff'


// 高阶函数

// 判断元素类型的几种方式

// 1.typeOf(不能区分对象) 2. constructor(判断构造函数) 3. instanceof 4. Object.prototype.toString.call


// 函数柯理化 currening
function isType(typing) {
    console.log('%c 🥖 typing: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', typing);
    // 闭包
    return function(obj) {
        return Object.prototype.toString.call(obj) === `[object ${typing}]`
    }
}

let util = {}; // 存储挂载的自定义方法

['String', 'Number', 'Boolean'].forEach(method => {
    util['is' + method] = isType(method)
})

console.log(util.isString('123'))

// vitrm Dom

const vertralDom = createElement('ul', { class: 'list' }, [

    createElement('li', { class: 'item' }, ['a']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
    createElement('li', { class: 'item' }, ['d']),
    createElement('li', { class: 'item' }, ['e']),
    createElement('li', { class: 'item' }, ['f']),
    createElement('li', { class: 'item' }, ['g'])
])
const vertralDom2 = createElement('ul', { class: 'list-group' }, [

    createElement('li', { class: 'item' }, ['test1']),
    createElement('li', { class: 'item' }, ['b']),
    createElement('li', { class: 'item' }, ['c']),
    createElement('li', { class: 'item' }, ['d']),
    createElement('li', { class: 'item' }, ['test2']),
    createElement('li', { class: 'item' }, ['f']),
    createElement('div', { class: 'item' }, ['哈哈哈']),
])

// 虚拟dom转换成真实dom 渲染页面
const el = render(vertralDom)
const target = document.getElementById('app')
renderDom(el, target)
console.log('%c 🍨 el: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', el);
console.log('%c 🥥 vertralDom: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', vertralDom);



let patchs = diff(vertralDom, vertralDom2)

// 更新对比结果
patch(el, patchs)