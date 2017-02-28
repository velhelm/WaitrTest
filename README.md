# WaitrTest
This is a simple JavaScript based programming test for Waitr on the domain of driver reviews

Dependencies:

Express

Postgres - the database schema is outlined in ./migrations

Knex

Nodemon


--------------------------------------------


"http://127.0.0.1:8082/CreateDeliveryReviews?driver_id=2&delivery_id=5&rating=3&description=some description"

Which gives a success or error and updates the local json file.

http://127.0.0.1:8082/GetDriverReviews?driver_id=1

Which vomits forth all reviews for the appropriate driver_id

