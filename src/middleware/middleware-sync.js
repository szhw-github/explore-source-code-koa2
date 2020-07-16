
function add(a, b) {
    return a + b
}

function double(c) {
    return c*2
}

const middlewares = [add, double]

function compose(midds) {
    return (...args) => {
        let res = midds[0](...args)
        for(let i = 1; i<midds.length; i++) {
            res = midds[i](res)
        }
        return res
    }
}

//test
let f = compose(middlewares)
console.log(f(1,2))
