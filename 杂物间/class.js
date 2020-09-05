// function getData(){
//     return ('number1')
//   }
//   let data
//   setTimeout(() =>{
//       data = getData()
//       console.log(data)
//   },5000)


//   const axios = require('axios');
let data = {
    name: '我是第一个请求数据'
}
axios.post('http://47.107.66.116:3306/post', data,

    )
    .then((res) => {
        console.log(res)
    })

class Public {
    constructor() {
        this.value = []
        this._temp = '';
    }
    add(ob) {
        this.value.push(ob)
    }
    get statement() {
        return this._temp;
    }

    set statement(value) {
        this._temp = value
        this.notice();
    }
    notice() {
        this.value.forEach((item) => {
            item.update(this.statement)
        })
    }

}


class Sub {
    constructor() {

    }
    update(data) {
        console.log(data)
    }
}

// 订阅者（观察者）
const obj1 = new Sub();
const obj2 = new Sub();

// 发布者
const pub = new Public()

pub.add(obj1)
pub.add(obj2)

pub.statement = "发布"
setTimeout(() => {
    pub.statement = "我已经被改变了"
}, 5000)



// 

var a = 1

test()

function test() {
    console.log(a) // undefined 第二次 NAN
    var a = a + 1
    console.log(a) // NAN // NAN
    return a
}

console.log(a) 1
console.log(test() + 1) // NAN