//菜品类别相关的路由
//创建路由器
const express = require('express');
const pool = require('../../pool');
var router = express.Router();


module.exports = router;


// API :GET /admin/category
//含义：客户端获取所有的菜名类别，按编号升序排列
//返回值如下：
//[{cid:1,cname:'...'},{}]
router.get('/', (req, res) => {
    pool.query('SELECT * FROM xfn_category ORDER BY cid', (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

/*
API :DELETE /admin/category:cid
含义：客户端获取所有的菜名类别，删除该商品
返回值如下：
{code:200,msg:'1 category deleted'}
{code:400,msg:'0 category deleted'}
*/
router.delete('/:cid', (req, res) => {
    //注意删除菜品之前必须先把属于该类的菜品的类别编号设置为NULL
    var cid = req.params.cid;
    pool.query('UPDATE xfn_dish SET categoryId=NULL WHERE categoryId=?', cid, (err, result) => {
        if (err) throw err;
        //至此指定类别的菜品已经修改完毕
        var sql = 'DELETE FROM xfn_category WHERE cid=?'
        pool.query(sql, [cid], (err, result) => {
            if (err) throw err;
            //获取delete越剧在数据库照片那个影响的行数
            if (result.affectedRows > 0) {
                res.send({ code: 200, msg: '1 category deleted' })
            } else (
                res.send({ code: 400, msg: '0 category deleted' })
            )
        })
    })
})
//添加  
/*
API :POST /admin/category
请求参数：{cname:'xxx'}
含义：添加新的菜品类别
返回值如下：
{code:200,msg:'1 category added',cid:x}
*/
router.post('/',(req,res)=>{
   var data=req.body;
   pool.query('INSERT INTO xfn_category SET ?',data,(err,result)=>{//注意此处SQL语句的简写
    if(err) throw err
    res.send({code:200,msg:"1 category added"})
   })
})

/*
API :put /admin/category
请求参数：{cid:xx,cname:'xxx'}
含义：根据菜品类别编号修改类别
返回值如下：
{code:200,msg:'1 category modifield'}
{code:400,msg:'0 category modifield,not exists'}
{code:401,msg:'0 category modifield,not modification'}
*/
router.put('/',(req,res)=>{
    var data = req.body;
    pool.query('UPDATE xfn_category SET ? WHERE cid=?',[data,data.cid],(err,result)=>{
        if(err) throw err
        if(result.changedRows>0){//实际更新了一行
            res.send({code:200,msg:'1 category modifield'})
        }else if(result.affectedRows == 0){
            res.send({code:400,msg:'0 category modifield,not exists'})
        }else if(result.affectedRows == 1 && result.changedRows == 0){
            res.send({code:401,msg:'0 category modifield,not modification'})
        }
    })
})