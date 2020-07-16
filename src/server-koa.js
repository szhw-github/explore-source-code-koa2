const Koa = require('./koa')
let koa = new Koa()
koa.use(() => {
    res.writeHead(200)
    res.end('hello koa2')
})
koa.listen(9002, () => {
    console.log('a server start on port 9002')
})
