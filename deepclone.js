let obj = {
  name: 'abc',
  age: 123,
  sex: 'fremale'
}

// var obj1 = {}

function clone (origin,target) {
  for(var prop in origin) {
    target[prop] = origin[prop]
  }
}

// 浅拷贝的实现
 // 一：Object.assgin()
 
const obj1 = Object.assign({}, obj);
console.log(obj1)


let obj2 = {
  name: 'def',
}
const obj2A = Object.assign(obj2,obj)
console.log('obj2A',obj2A);
console.log('obj2',obj2);

// 二： 扩展运算符 ...
const arg = {...obj}
console.log(arg)

// 三 ：slice / concat

// 模拟实现Object.assgin

  if(Object.assign2 != 'function'){
    Object.defineProperty(Object,'assgin2',{
      value:function(target){
        'use strict';
        console.log('target',target);
        if(target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        var to = Object(target);
        // console.log('target',target);
        console.log('arguments',arguments);
        for(var index = 0; index < arguments.length;index++){
          var nextSource = arguments[index];
          console.log('nextSource',nextSource)
          if(nextSource != null) {
            for (var nextKey in nextSource) {
              if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)) {
                to[nextKey] = nextSource[nextKey]
              }
            }
          }
        }
        return to;
      },
      writable:true,
      configurable:true
    })
  }

let qianA = {
  name: "advanced",
  age: 18
}
let qianB = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  }
}

let ccc = Object.assgin2(qianA,qianB);
// console.log('cccc',ccc)


// 深拷贝

let deep = {
  name: "muyiy",
  book: {
      title: "You Don't Know JS",
      price: "45"
  }
};

let deepA = JSON.parse(JSON.stringify(deep));

console.log(deepA)


var quanju = 'aaaaaaaaaaaaaaaa';

function foo (){
  console.log('this-->',this)
  console.log('检测是否可以调到全局的quanju',this.quanju)
}
var objThis = {
  quanju:'bbbbbbbbb',
  foo:foo
}
foo();
objThis.foo();

function foos (something) {
  return this.a + something;
}
var objB = {
  a:'hahahahh'
}
var bar = function () {
  return foos.apply(objB,arguments);
}

var b = bar(3);
console.log('b-->',b);


// 打开new的大门看看他干了什么
function createNew () {
  var obj = new Object();
  // 分开看
  console.log('arguments',arguments)
  Con = [].shift.call(arguments);
  console.log('Con-->',Con)
  obj._proto_ = Con.prototype; // 为了让obj可以访问到构造函数原型的属性
  var ret = Con.apply(obj,arguments); // 通过修改this,使得obj可以访问构造函数的属性，而不是通过原型去访问
  console.log('obj-->',obj)
  return ret instanceof Object ? ret : obj;
}


function Per () {

}
var per = createNew(Per)
console.log('per',per)

