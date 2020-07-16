const Koa = require('./koa')
let koa = new Koa()

koa.use(async ctx => {
    ctx.body = 'hello koa2 ' + ctx.url
})
koa.listen(9002, () => {
    console.log('a server start on port 9002')
})
