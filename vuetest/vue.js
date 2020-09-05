class Vue {
    constructor(options) {
        console.log('%c 🥝 options: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', options);
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        this._proxData(this.$data)
        new Observer(this.$data)
    }
    _proxData(data) {
        Object.keys(data).forEach(key => {
            console.log('%c 🍡 key: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', key);
            console.log('%c 🍐 this: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', this);
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get() {
                    return data[key]
                },
                set(newVal) {
                    if (newVal === data[key]) return
                    data[key] = newVal
                }
            })
        })
    }
}