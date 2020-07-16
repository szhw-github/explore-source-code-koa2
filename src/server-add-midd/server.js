const Koa = require('./koa')
let koa = new Koa()

koa.use(async (ctx, next)=> {
    ctx.body = '1'
    await next()
    ctx.body += '2'
})
koa.use(async (ctx, next)=> {
    ctx.body += '3'
    await delay()
    await next()
    ctx.body += '4'
})
koa.use(async (ctx)=> {
    ctx.body += '5'
})
koa.listen(9002, () => {
    console.log('a server start on port 9002')
})

function delay() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        },2000)
    })
}
