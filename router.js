var express = require('express')

var fs = require('fs')
var students = require('./students')
var router = express.Router()

//渲染首页
router.get('/students', function (req, res) {
  students.Filedata(function (error, data) {
    if (error) {
      return res.status('500 not found')
    }
    data.forEach(item => {
      item.xingbei == 0
      if (item.xingbei == 0) {
        item.xingbei = "男"
      } else {
        item.xingbei = "女"
      }
    })
    res.render('index.html', {
      friut: [
        '香蕉',
        '苹果',
        '橘子',
        '葡萄'
      ],
      sdutens: data
    })
  })
})

//获取添加学生页面
router.get('/students/new', function (req, res) {
  res.render('post.html')
})

//添加学生
router.post('/students/new', function (req, res) {
  // console.log(req.body);
  students.save(req.body, function (error) {
    if (error) {
      return res.status('500 not found')
    }
    res.redirect('/students')
  })
})
//渲染编辑页面
router.get('/students/edit', function (req, res) {
  // console.log(req.query.id);
  students.edit(req.query.id, function (error, data) {
    if (error) {
      return res.status('500 not found')
    }
    res.render('edit.html', {
      data
    })
  })
})
//编辑后提交
router.post('/students/edit', function (req, res) {
  students.editsave(req.body, function (error) {
    if (error) {
      return res.status('500 not found')
    }

  res.redirect('/students')

  })
})

// 删除
router.get('/students/delete', function (req, res) {
  var id = req.query.id
  students.delete(id, function (error) {
    if (error) {
      return res.status('500 not found')
    }
    res.status('200 ok')
    res.redirect('/students')
  })

})



module.exports = router