
const query = require('../public/mysqlPool')
const express = require('express');
const app = express.Router();
const aes = require('../public/aes')
const { getAllUser } = require("../utils/index")
// const db = require('../public/redis')
/* 登录 */
app.post('/userLogin', async (req, res) => {
    try {
        let { email, password } = req.body;
        let sql = `select * from user where email='${email}' and password='${aes.encryption(password)}'`;
        const data = await query(sql);
        let obj = {};
        if (data.length > 0) {
            var timestamp = Date.parse(new Date());
            let token = timestamp + data[0].id + timestamp
            let userID = data[0].id;
            obj = { code: 200, data: { id: userID, token: token }, msg: 'success' }
            // db.setToken(userID, token);
        } else {
            obj = { code: 401, data: '用户名或密码无效!', msg: data }
        }
        res.json(obj);
        res.end();
        return;
    } catch (error) {
        res.json({ code: 500, data: '服务器出错了!', msg: error });
        res.end();
        return;
    }
})
/* 首页菜单 */
app.get('/getNavList', (req, res) => {
    let data = req.query;
    console.log('data', data)
    let sql = `select * from user where id>${data.id};`
    query(sql, (error, vals) => {
        res.json({ data: vals });
        res.end();
        return;
    })
})

// 注册
app.post("/register", async (req, res) => {
    const allUser = await getAllUser();
    if(allUser.find(({ email }) => email === req.body.name)) {
        return res.send("存在")
    }
    const sql = `insert into user ( email, password, user_name, account, sex ) values ("${req.body.name}","${aes.encryption(req.body.password)}","renYu","3457235764762","女")`
    const d =  await query(sql);
    console.log(d)


})

module.exports = app;
