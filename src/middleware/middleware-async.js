
async function f1(next) {
    console.log('f1')
    await next()
    console.log('f1 finish')
}

async function f2(next) {
    console.log('f2')
    await delay()
    await next()
    console.log('f2 finish')
}

async function f3() {
    console.log('f3')
}


function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        },2000)
    })
}

function compose(midds) {
    return function () {
        return dispatch(0)
        function dispatch(i) {
            let f = midds[i]
            if(!f) {
                return Promise.resolve()
            }
            return Promise.resolve(f(function next() {
                return dispatch(i + 1)
            }))
        }
    }
}

//test
let middlewares = [f1, f2, f3]
let f = compose(middlewares)
f()
