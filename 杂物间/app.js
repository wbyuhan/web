// alert(123)
var colors = ['red','blue','green']

//es5
for(var i = 0;i<colors.length; i++){
    //console.log(colors[i])
}
 
//es6 forEach

colors.forEach(function(color){
   // console.log(color)
})


// 练习：遍历数组的值并计算总和

var numbers = [1,2,3,4,5]
var sum = 0
// numbers.forEach(function(number){
//     sum += number;
// })
//console.log(sum)

//抽离

function adder(number){
    sum += number;
}
numbers.forEach(adder)
console.log(sum)

// se6 map


// 场景1

// 假定有一个数组（A）,讲A数组中的值以双倍的形式放到B数组

var nums = [1,2,3]

var doubleNum = []

//es5

// for (var i = 0; i<nums.length;i++){
//     doubleNum.push(nums[i]*2)
// }

// console.log(doubleNum)

// for (var i = 0; i<doubleNum.length;i++){
//     console.log(doubleNum[i])
// }

//es6 map

nums.forEach(function(num){
    doubleNum.push(num*2)
})
console.log(doubleNum)

doubleNum.map(function(dou){
    console.log(dou)
})  

// var double = nums.map(function(num){
//     return num * 2
// })

// double.forEach(function(dou){
//     console.log(dou)
// })



// 场景2 

// 对象数组A，讲A数组的某个属性值存储到B数组中


var cars = [
    {model:'Buick',price:'CHEAP'},
    {model:'BMw',price:'expensive'}
]

var prices = cars.map(function(car){
    return car.price;
})

console.log(prices)

//es6 filter
// 场景1

// 假定一个数组A，获取数组中指定；类型的对象放到B数组中

var products = [
    {name:'cucumber',type:"vegetable"},
    {name:'banan',type:"fruit"},
    {name:'celery',type:"vegetable"},
    {name:'orange',type:"fruit"}
]

//es5

var filteredProducts = []

for(var i = 0; i<products.length;i++){
    if(products[i].type === "fruit"){
        filteredProducts.push(products[i])

    }
}
console.log(filteredProducts)



var filtered2 = products.filter(function(product){
    return product.type === "vegetable"
})
console.log(filtered2)


// 场景2

// 假定一个数组A，过滤掉不满足一下条件的对象
// 条件：蔬菜 数量大于0，价格小于10



var prooducts = [
    {name:'cucumber',type:"vegetable",quantity:0,price:1},
    {name:'banan',type:"fruit",quantity:10,price:16},
    {name:'celery',type:"vegetable",quantity:20,price:8},
    {name:'orange',type:"fruit",quantity:4,price:7}
]



 var pros = prooducts.filter((p)=>{
     return p.type === 'vegetable'
     && p.price < 10
     && p.quantity > 0 
 })

 console.log(pros)



// 场景3
// 假定有两个数组（A, B）,根据A的id过滤B数组不符合的数据



var posts = {id:4, title:"javaScript"}


var comments = [
    {postId:4,content:'Angular4'},
    {postId:2,content:'Vue.js'},
    {postId:3,content:'Node.js'},
    {postId:1,content:'resct.js'},
    {postId:5,content:'navae'},
    {postId:4,content:'hahahah'}
]


function commentsForPost (posts,comments){
    return comments.filter((com) =>{
        return com.postId === posts.id;
    })


}

console.log(commentsForPost(posts,comments))



// es6 find

// 场景1

// 假定有一个对象数组（A），找到符合条件的对象


var users = [
    {name:'jill'},
    {name:'Alex',id:1},
    {name:'Bill'},
    {name:'Alex',id:2}
]

 var user ;
// for (let i = 0; i < users.length; i++) {
//     if(users[i].name === 'Alex'){
//         user = users[i]
//         break;
//     }
// }

// console.log(user)

//find  只会找到第一个，后面的就不会再继续寻找

user = users.find((us)=>{
    return us.name === "Alex"
})

console.log(user)


// 场景2 
// 假定有一个数组对象（A），根据指定对象的条件找到数组中符合条件的对象


var posets = [
    {id:1,title:'node.js'},
    {id:2,title:"Vue.js"}
]

var  commen = {postId:1,content:"hello"}

function postForCommen(posets,commen){
    return posets.find((po) =>{
        return po.id === commen.postId
    })
}
console.log(postForCommen(posets,commen))



//reduce

// c场景1 计算所有数组中所有值得和


var nubeers = [10 , 20 ,30]

var sum = 0

//es5

for(var i = 0; i<nubeers.length;i++){
    sum +=nubeers[i]
}

console.log(sum)


//es6

var sumVlue = nubeers.reduce((sum2,n) =>{
    console.log(sum2)
    return sum2 + n
},0) //此处的0代表初始化sum2 = 0


console.log(sumVlue)





// 场景2，将数组中对象的某个属性抽离到另外一个数组中



var  primaryColor = [
    {color:"red"},
    {color:"yellow"},
    {color:"blue"},
]

var colorings = primaryColor.reduce((colors,pr) =>{
    colors.push(pr.color)
    return colors
},[])

console.log(colorings)


// 判断字符串的括号是否对称

function balancedParens(string){
    return !string.split('').reduce((pr ,ch) =>{
        console.log(pr)
        if(pr < 0) {
            return pr
        }
        if(ch == "("){
            return ++pr
        }
       
        if(ch == ")"){
            return --pr
        }
        return pr
        
    },0)
}


console.log(balancedParens( ")(((())))" ))


function splits(string){
    return string.split('')
}

console.log(splits("(((())))))"))
// let pro = new Promise()
// console.log(pro)



const cols = new Array(3)

console.log(cols)

const nams = new Array("xuqian")

console.log(nams)



var numsers = Math.random()

console.log(numsers)

console.log(numsers * 10)

console.log(numsers * 10 + 1)

var zheng = Math.floor(numsers * 10 + 1)

console.log(zheng)

// Object.definePrototype({
    
// })
function sumsss (arg) {
    let result = 0
    // for(let i in arg){
    //     result += arg[i]
    // }
    console.log(arguments)
    console.log('result' + result)
}
sumsss(1,2,3,4,5,6)
var funcccc = function () {
    console.log('函数表达式式执行函数')
}();