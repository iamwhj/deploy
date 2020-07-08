const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('./cors');
const serve = require('koa-static');

const app = new Koa()
const router = new Router()

app.use(serve(__dirname + "/web"))


// app.use(cors);
app.use(bodyParser())

router.post('/web/ssr', async ctx => {
    let user = ctx.request.body;
    console.log("参数为：" + JSON.stringify(user))
    ctx.body = "请求成功"
})

router.post('/web/list', async ctx => {
    ctx.body = [{name:'狒弟', age: 38}, {name:'欣妹', age: 36}]
})

router.post('/web/author', async ctx => {
    ctx.body = "Daw哥拖着欣儿和小狒扬长而来！！"
})

router.post('/web/info', async ctx => {
    const flag = ctx.request.body.sign;
    let data;
    if(flag) {
        data = {
            imgPath: 'logo.png'
        }
    }else {
        data = {
            name : "Dar",
            age : 22,
            hobby : "swiming"
        }
    }
    ctx.body = data;
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)

console.log('koaServe listen to 3000')