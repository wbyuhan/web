class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key])
        })
    }
    defineReactive(obj, key, val) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            enumerable: true,
            get() {
                console.log('%c 🍱 val: ', 'font-size:20px;background-color: #42b983;color:#fff;', val);
                return val
            },
            set(newValue) {
                if (newValue === val) return
                val = newValue
            }
        })
    }
}