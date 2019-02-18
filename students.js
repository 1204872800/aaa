var fs = require('fs')

var db = './db.json'
//查
exports.Filedata = function (callback) {
  fs.readFile(db, 'utf8', function (error, data) {
    if (error) {
      return callback(error)
    }
    callback(null, JSON.parse(data).sdutens)
  })


}

// 增
exports.save = function (dx, callback) {
  fs.readFile(db, 'utf8', function (error, data) {

    if (error) {
      return callback(error)
    }
    var students = JSON.parse(data).sdutens
    dx.id = parseInt(students[students.length - 1].id + 1)
    students.push(dx)
    //  console.log(students);
    students = {
      sdutens: students
    }
    fs.writeFile(db, JSON.stringify(students), function (error) {
      if (error) {
        return console.log('500');
      }

      callback(null)
    })
  })
}

exports.edit = function (id, callback) {
  fs.readFile(db, 'utf8', function (error, data) {
    if (error) {
      return callback(error)
    }
    var students = JSON.parse(data).sdutens
    var ret = students.find(item => {
      return item.id == id
    })
    callback(null, ret)
  })
}

exports.editsave = function (dx, callback) {
  var id = parseInt(dx.id)
    dx.id=parseInt(dx.id)
  fs.readFile(db, 'utf8', function (error, data) {
    if (error) {
      return callback(error)
    }
    var students = JSON.parse(data).sdutens
    var ret = students.find(item => {
      return item.id == id
    })

     for (var key in dx) {
      ret[key] = dx[key]
    }

    var students = {
      sdutens: students
    }
    fs.writeFile(db, JSON.stringify(students), function (error) {
      if (error) {
        return callback(error)
      }
      callback(null)
    })
  })
}

//删
exports.delete = function (id, callback) {
  fs.readFile(db, 'utf8', function (error, data) {
    if (error) {
      return callback(error)
    }
    var students = JSON.parse(data).sdutens
    //  console.log(students);
    for (let i = 0; i < students.length; i++) {
      if (students[i].id == id) {
        students.splice(i, 1)
      }
    }
    students = {
      sdutens: students
    }
    fs.writeFile(db, JSON.stringify(students), function (error) {
      if (error) {
        return console.log('500');
      }
      callback(null)
    })
  })
}


//改