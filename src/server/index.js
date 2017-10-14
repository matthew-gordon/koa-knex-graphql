const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const port = process.env.PORT || 3000
const router = new Router()

router.get('/', async (ctx) => {
   ctx.body = {
     message: 'Hello world!'
   }
})

app.use(router.routes())
app.use(router.allowedMethods())

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
