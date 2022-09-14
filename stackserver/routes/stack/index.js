var express = require('express');
var router = express.Router();
const db = require('../../db')
/* GET users listing. */
router.get('/allstack', function(req, res, next) {
  const sql = 'select * from stackqueue'
  db.query(sql,(err,result)=>{
    res.send({
      data:result
    })
  })
});
router.get('/updatestack',(req,res) =>{
  const id = req.query.id
  const status = req.query.status
  console.log(status)
  console.log(id)
  // console.log(title)
  const sql = `update stackqueue set status = ${status} where id =${id}`
  console.log(sql)
  db.query(sql,(err,result)=>{
    if(err){
      res.send({
        meta:{
          status:500,
          msg:'失败'
        }
      })
      if(result.affectedRows == 1){
        res.send({
          meta:{
            status:200,
            msg:'添加成功！'
          }
        })
      }
    }
  })
})
router.get('/removestack',(req,res) =>{
  const title = req.query.title
  const status = req.query.status
  const sql = `delete from stackqueue where title = '${title}' and status == ${status}`
  console.log(sql)
  db.query(sql,(err,result)=>{
    if(err){
      res.send({
        meta:{
          status:500,
          msg:'失败'
        }
      })
      if(result.affectedRows == 1){
        res.send({
          meta:{
            status:200,
            msg:'添加成功！'
          }
        })
      }
    }
  })
})
module.exports = router;
