const http = require('http')

let context = {
    get url() {
        return this.request.url
    },
    get body() {
        return this.response.body
    },
    set body(value) {
        this.response.body = value
    }
}

let request = {
    get url() {
        return this.req.url
    }
}
let response = {
    get body() {
        return this._body
    },
    set body(value) {
        this._body = value
    }
}

class Koa {
    constructor() {
        this.request = request
        this.response = response
        this.context = context
        this.middlewares = []
        this.callback = () => {}
    }
    compose(midds) {
        return function (context) {
            return dispatch(0)
            function dispatch(i) {
                let f = midds[i]
                if(!f) {
                    return Promise.resolve()
                }
                return Promise.resolve(f(context, function next() {
                    return dispatch(i + 1)
                }))
            }
        }
    }
    use(callback) {
        this.middlewares.push(callback)
    }
    listen(...args) {
        const server = http.createServer(async (req, res) => {
            let ctx = this.createCtx(req,res)
            const f = this.compose(this.middlewares)
            await f(ctx)
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    createCtx(req, res) {
        let ctx = Object.create(this.context)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = Koa

