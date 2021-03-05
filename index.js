// JavaScript source code
//https://medium.com/@waelyasmina/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65

var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main',layoutsDir: __dirname + '/views/layouts'});
var bodyParser = require("body-parser");
var mysql = require("./dbcon.js");
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


app.get('/insertbook',function(req,res,next){
  var context = {};

//help from https://stackoverflow.com/questions/6752714/if-input-value-is-blank-assign-a-value-of-empty-with-javascript
if(req.query.name.length == 0)
{
	//console.log("BLANK HERE")
	return;	
}
else 
{
  mysql.pool.query("INSERT INTO book (`title`,`author`,`genre_id`) VALUES (?)", [req.query.searchboxtitle,req.query.searchboxauth,req.query.searchboxgenre], function(err, result){
    if(err){
        //next(err);
		console.log(err);
        return;
    }

  });

    mysql.pool.query('SELECT * FROM book', function(err, rows, fields){
   if(err){
      //next(err);
	  console.log(err);

       return;
    }
    context.results = JSON.stringify(rows);
	
	 //res.send(context.results)
	res.render('book',{items:rows})   
});

}
});

app.get('/genre',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('SELECT * FROM genre', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

    context.results = JSON.stringify(rows);

	res.render('genre',{items:rows})

});
});

app.get('/admingenre',function(req,res,next){
  var context = {};

	res.render('admingenre',context)

});

app.get('/adminbook',function(req,res,next){
  var context = {};

	res.render('adminbook',context)

});


app.get('/bookeadd',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('INSERT INTO `book`(title,author,genre_id) VALUES ((?),(?),(select genre_id from genre where genre.name = (?)))',[req.query.newtitle,req.query.newauthor,req.query.newgenre], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.render('book',context)

});
});









app.get('/genreadd',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('INSERT INTO `genre`(name,is_restricted) VALUES ((?),"0")',[req.query.newgenre], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.render('genre',context)

});
});

app.get('/genredelete',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('DELETE FROM `genre` WHERE name = (?)',[req.query.genre], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.render('genre',context)

});
});


app.get('/genreupdate',function(req,res,next){
  var context = {};
  console.log("Genre Request Recieved")

  mysql.pool.query('UPDATE `genre` SET name = (?) WHERE name = (?)',[req.query.genreold,req.query.genrenew], function(err, rows, fields){
    if(err){
      next(err);
      return;
    }

	res.render('genre',context)

});
});





app.get('/admin',function(req,res,next){
  var context = {};
	res.render('admin',context)

});


app.get('/search',function(req,res,next){
  var context = {};
  console.log("Request Recieved")
  mysql.pool.query('SELECT book_id,title,author,(select name from genre where genre.genre_id = book.genre_id) as genre FROM book', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
	console.log(rows)

	res.render('book',{items:rows})

  });
});







app.get('/book',function(req,res,next){
  var context = {};
  console.log("Request Recieved")

  mysql.pool.query('SELECT book_id,title,author,(select name from genre where genre.genre_id = book.genre_id) as genre FROM book where title = (?) or author = (?) or (select name from genre where genre.genre_id = book.genre_id) = (?)',[req.query.searchboxtitle,req.query.searchboxauth,req.query.searchboxgenre], function(err, rows, fields){

    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    //res.render('home', context);
	console.log("TEST HERE")
	res.render('book',{items:rows})

  });
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});




//Borrower code
app.get('/borrower',function(req,res,next){
  var context = {};
    /* this is to display the borrower */
    //function getBorrower(res, mysql, context, complete){
        mysql.pool.query('SELECT * FROM borrower where name = (?)', [req.query.name],function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error))
                res.end()
            }
            context.people = results;
            //complete()
        })
    });

    /* gets information to show the borrowers borrowing history */
//    function getBorrower_Borrowing_History(res, mysql, context, complete){
//        sql = ("select * from borrowing_history where borrowing_history_id = (select borrowing_history_id from borrower_borrowing_history where borrower_id = @InputBorrowerId))"
//        mysql.pool.query(sql, function(error, results, fields){
//            if(error){
//                res.write(JSON.stringify(error));
//                res.end()
//            }
//            context.certificates = results
//            complete();
//        });
//    }
//	return router;
//}();