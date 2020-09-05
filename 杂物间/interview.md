## js面试
* 说说promise
> Promise 译成中文是承诺的意思，这个承诺会在未来有一个确切的答复
promise有三种状态：等待（pending）完成（resolved）拒绝（rejected）
这个承诺从等待状态变更为其他状态就不能再次更改，但是reject可以变成resolved
当构造Promise的时候，函数内部是立即执行的
Promise实现了链式调用

* instanceof
> instanceof 运算符用来判断一个构造函数的prototype属性所指向的对象是否存在另外一个要检测对象的的原型链上

* 判断复杂数据类型
> 1. Object.prototype.toString.call() // 复杂简单都可以判断 返回[Object,数据类型]
> 2. obj instanceof Array/Function/Number
> 3. obj constructor Array/Function/Number // 为null时控制台报错
* 柯理化函数
> 1. ``` 
    function bind(fn, ctx) {
        function boundFn(a) {
                var l = arguments.length;
                return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx)
            }
            // record original fn length
            boundFn._length = fn.length;
            return boundFn
    }
```