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
   		if (err)
		{
			return console.log("Error fetching review: " + err)
		}
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
   			if (err)
			{
				return console.log("Error adding review: " + err)
			}
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

   				reviews.push({ "driver_id" : driver_id.toString(),
   					"delivery_id" : req.query.delivery_id.toString(),
   					"rating" : rating.toString(), 
   					"description" : req.query.description.toString()})
   				console.log(reviews)
   				res.end( "Review added" )//JSON.stringify(reviews) )

   				fs.truncate(__dirname + "/" + "reviews.json", 0, function (err, data)
   				{
   					fs.writeFile(__dirname + "/" + "reviews.json", JSON.stringify(reviews), function (err, data)
   					{
   						if (err)
   						{
   							return console.log("Error writing file: " + err)
   						}
   					});
   				});

   			}
   			else
   			{
   				res.end( "ERROR: Invalid driver")
   			}
   		});
   });
})

var server = app.listen(8082, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Driver Review test app listening at http://%s:%s", host, port)

})
