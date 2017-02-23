//Right now all data is stored in local jsons for simplicity. 
//Ideally it should be extended to support whatever database desired
var express = require('express')
var app = express()
var fs = require("fs")
var currentReq
var drivers
var reviews
var response


app.get('/GetDriverReviews', function (req, res) {
   //Read from driver json file
   fs.readFile( __dirname + "/" + "drivers.json", 'utf8', function (err, data) {
   		//if (err) 
   		//	throw err
   		drivers = JSON.parse(data)
   		//Read from reviews json file
   		fs.readFile( __dirname + "/" + "reviews.json", 'utf8', function (err, data) {
   			//if (err)
   			//	throw err
   			reviews = JSON.parse(data)
   			var driverReviews = [];
   			for (i=0; i<reviews.length; i++)
   			{
   				if (reviews[i].driver_id == req.query.driver_id)
   				{
   					driverReviews.push(reviews[i])
   				}
   			}
   			console.log( driverReviews );
   			res.end( data );
   		});
   });
})

app.post('/CreateDeliveryReviews', function (req, res) {
   
   fs.readFile( __dirname + "/" + "drivers.json", 'utf8', function (err, data) {
   		//if (err) 
   		//	throw err
   		drivers = JSON.parse(data)

   		fs.readFile( __dirname + "/" + "reviews.json", 'utf8', function (err, data) {
   			//if (err)
   			//	throw err
   			reviews = JSON.parse(data)
   			
   			//Verify driver id
   			driver_id = req.query.driver_id
   			driverExists = false;

   			for (i=0; i<drivers.length; i++)
   			{
   				if (driver_id == drivers[i].id)
   					driverExists = true
   			}

   			if (driverExists)
   			{
   				//Verify review contents
   				rating = req.query.rating
   				//In most cases, I'd imagine these would actually be errors,
   				//But I'll assume malevolence for now
   				if (rating > 5)
   					rating = 5
   				if (rating < 1)
   					rating = 1


   				//Add to reviews
   				review = '{ "driver_id": "' + driver_id +
   					'", "delivery_id" : "' + req.query.delivery_id +
   					'", rating" : ' + rating +
   					', "description" " "' + req.query.description + '"';
   				console.log(reviewText)

   				reviews.push(review)
   				res.end( reviews )

   			}
   		});
   });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Driver Review test app listening at http://%s:%s", host, port)

})
