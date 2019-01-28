/*
管理员相关路由
*/
const express = require('express');
const pool = require('../../pool');
const router = express.Router();
module.exports = router;

/*
* API: GET /admin/login
* 完成用户登录验证（提示：有的项目中在此处选择post请求）
* 返回数据：
* {code:200,msg:'login succ'}
* {code:400,msg:'aname or apwd err'}
*/
router.get('/login/:aname/:apwd',(req,res)=>{
    var aname = req.params.aname;
    console.log(aname)
    var apwd = req.params.apwd;
    console.log(apwd)
    pool.query('SELECT aid FROM xfn_admin  WHERE aname=? AND apwd=PASSWORD(?)',[aname,apwd],(err,result)=>{
        if(err) throw err
        if(result.length>0){//查询到一行，登录成功
            res.send({code:200,msg:'login succ'})
        }else{//没有查询导数据
            res.send({code:400,msg:'aname or apwd err'})  
        }
    })
})


/*
* API: PATCH /admin   //修改部分数据用patch
* 请求数据：{aname:'xxx',oldapwd:' xxxxxx',newapwd:' xxxxxx'}
* 根据管理员名和密码修改管理员密码
* 返回数据：
* {code:200,msg:'modified succ'}
* {code:400,msg:'aname or apwd err'}
* {code:401,msg:'apwd not modified'}
*/

router.patch('/login',(req,res)=>{
    var data = req.body;
    //首先根据aname和oldPwd查询该用户名是否存在；
    pool.query('SELECT aid FROM xfn_admin WHERE aname=? AND apwd=PASSWORD(?)',[data.aname,data.oldPwd],(err,result)=>{
        if(err) throw err
        if(result.length ==0){
            res.send({code:400,msg:'aname or apwd err'});
            return 
        }
       //如果查询到了用户名，再修改其密码
       pool.query('UPDATE xfn_admin SET apwd=PASSWORD(?) WHERE aname=?',[data.newPwd,data.aname],(err,result)=>{
           if(err) throw err
           if(result.changedRows>0){//密码修改完成
                res.send({code:200,msg:'modify succ'})
           }else{//新旧密码一样，未做修改
                res.send({code:401,msg:'pwd not modified'})
           }
       }) 
    })
})