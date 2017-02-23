# WaitrTest
This is a simple JavaScript based programming test for Waitr on the domain of driver reviews

It should be setup to just use the command $npm start and the queries look like

http://127.0.0.1:8081/CreateDeliveryReviews?driver_id=2&delivery_id=5&rating=3&description=Hey one more
Which gives a success or error and updates the local json file.

http://127.0.0.1:8081/GetDriverReviews?driver_id=1
Which vomits forth all reviews for the appropriate driver_id

