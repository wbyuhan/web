// 手写redux

// // 我们知道 createStore 返回三个函数 { subscribe, dispatch, getState }。
// 并且需要传入一个reducers 

function reducer(state = 0, action) {
    switch (action.type) {
        case '':
            return state
        default:
            return
    }
}


const createStore = (reducer) => {

    let currentState; // state
    let observers = [] // 观察者队列

    // 直接返回当前状态

    function getState() {
        return currentState
    }

    // 触发reducers内的方法 更改state

    function dispatch(action) {
        currentState = reducer(currentState, action)
        observers.forEach(fun => fun())
    }

    // // subscribe 将传入的回调加入观察者队列，触发dispatch的时候会触发所有回调
    // https://github.com/reduxjs/redux/blob/master/src/createStore.ts#L160
    // redux 使用了 proposal-observable 这个库的观察者模式
    // 地址:https://github.com/tc39/proposal-observable
    function subscribe(cb) {
        observers.push(cb)
    }

    // 初始化store数据

    dispatch({ type: 'INIT_SATATE' })

    return { getState, dispatch, subscribe }

}

export const store = createStore(reducer)

store.subscribe(() => {
    console.log(store.getState())
})