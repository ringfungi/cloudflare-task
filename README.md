# Test task for Cloudflare

Challenge details:

"The challenge is to build a HTTP-based RESTful API for managing Customers and their Certificates. Be thoughtful about the fact that the system must eventually support millions of certificates.

A Customer:
1. Has a name
2. Has an email address
3. Has a password
4. May have zero to many Certificates

A Certificate:
1. Belongs to one and only one Customer
2. Can be either active or inactive
3. Has a private key
4. Has a certificate body

Your solution must support:
1. Creating/Deleting Customers
2. Creating Certificates
3. Listing all of a Customer’s Active Certificates
4. Activating/Deactivating Certificates. If a certificate is either activated or de-activated, add the ability to notify an external system (via an HTTP post) about that fact. You could use http://httpbin.org or http://requestbin.com/ to exercise this.
5. Persistence (data must survive computer restarts)"

## Testing

1. Create a database in MongoDB with the name mentioned in the file config/database (default value: "Customer-API")
2. Open a terminal of your choice in the main folder and run `npm install`
3. Run `nodemon index`
4. Use curl or Postman to test the application's endpoints

### Endpoints

**Create Customer**

Request Type: POST 

URL: localhost:8080/api/customer/create

Example Body:
```
{
 	"name":"test",
 	"emailaddress":"test@gmail.com",
 	"password":"test"
}
```

**Create Certificate**

Request Type: POST 

URL: localhost:8080/api/customer/{customerID}/certificate

Example Body:
```
{
	"isActive":true,
	"privateKey":"foo",
	"body":"bar"
}
```

**Get Customer With Active Certificates**

Request Type: GET

URL: localhost:8080/api/customer/{customerID}

**Update Certificate**

Request Type: PUT

URL: localhost:8080/api/certificate/{certificateID}

Example Body:
```
{
	"isActive":false,
}
```
Calling this endpoint with an `isActive` value different than the current one will also trigger a POST request at `https://eb2f7e405ae3cee6ff0a450282d5ae49.m.pipedream.net`. You can change this endpoint to your own in the `certificateRoutes.js` file.

## Known issues

Most requests sent with incorrect or missing parameters will cause the app to crash, as will some other edge cases. These were purposely ignored for simplicity's sake. Also, inactive certificates won't show up, you'll need to find their ID on the DB to activate them. It is what it is *shrug*

## Authors

* **Guilherme Lopes** - [ringfungi](https://github.com/ringfungi)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Tools

https://code.visualstudio.com/
https://mongoosejs.com/
https://expressjs.com/
https://www.npmjs.com/package/bcryptjs
