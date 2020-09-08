// ji排序方式

// 思路 1. 在数据集中选中 中间的某个元素为基准 分而治之 然后递归

const quickSort = (arr) => {
    if (arr.length < 1) return arr
    const centerIndex = Math.floor(arr.length / 2)
    const centerValue = arr.splice(centerIndex, 1)[0]
    let left = [],
        right = []
    arr.forEach(item => {
        if (item < centerValue) {
            left.push(item)
        }
        if (item > centerValue) {
            right.push(item)
        }
    });
    return quickSort(left).concat(centerValue, quickSort(right))
}

//