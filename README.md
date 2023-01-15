# labecommerce-backend


Documentação da API Labecommerce-backend  https://documenter.getpostman.com/view/24460688/2s8ZDU4P9e

POSTPost Users
http://localhost:3003/users
BODYraw
   {

     "name": "blusa",
     "price": 6,
     "category": "acessórios"
    }


Example Request
Post Users
curl --location --request POST 'http://localhost:3003/users' \
--data-raw '   {

     "name": "blusa",
     "price": 6,
     "category": "acessórios"
    }'
GETGet User
http://localhost:3003/users


Example Request
Get User
curl --location --request GET 'http://localhost:3003/users' \
--data-raw ''
Example Response
200 OK
BodyHeader
(8)
View More
[
  {
    "id": "12345",
    "email": "polyana@labenu.com",
    "password": "1234567"
  },
  {
    "id": "12395",
    "email": "izabel@labenu.com",
    "password": "1034567"
  }
GETGet User Purchases by User id
http://localhost:3003/users/:id/purchases
PATH VARIABLES
id
BODYraw
{
    "id": "c004",
    "name": "typeScript",
    "lesson": "5",
    "stack": "back-end"
    }


Example Request
Get User Purchases by User id
curl --location --request GET 'http://localhost:3003/users/:id/purchases' \
--data-raw '{
    "id": "c004",
    "name": "typeScript",
    "lesson": "5",
    "stack": "back-end"
    }'
GETGet Products by id
http://localhost:3003/products/:id
PATH VARIABLES
id


Example Request
Get Products by id
curl --location --request GET 'http://localhost:3003/products/:id'
GETGet Product
http://localhost:3003/product


Example Request
Get Product
curl --location --request GET 'http://localhost:3003/product'
Example Response
200 OK
BodyHeader
(8)
View More
[
  {
    "id": "34567",
    "name": "camisa",
    "price": 10,
    "category": "Acessórios"
  },
  {
    "id": "37567",
    "name": "sapato",
    "price": 20,
GETGet Product Search
http://localhost:3003/product/search


Example Request
Get Product Search
curl --location --request GET 'http://localhost:3003/product/search'
POSTPost Product
http://localhost:3003/product


Example Request
Post Product
curl --location --request POST 'http://localhost:3003/product'
POSTPost Purchase
http://localhost:3003/purchases


Example Request
Post Purchase
curl --location --request POST 'http://localhost:3003/purchases'
DELDelete Users
http://localhost:3003/users:id


Example Request
Delete Users
curl --location --request DELETE 'http://localhost:3003/users:id'
DELDelete Products
http://localhost:3003/product:id


Example Request
Delete Products
curl --location --request DELETE 'http://localhost:3003/product:id'
PUTEdit Product by id
http://localhost:3003/products/:id
PATH VARIABLES
id


Example Request
Edit Product by id
curl --location --request PUT 'http://localhost:3003/products/:id'
PUTEdit User by id
http://localhost:3003/users:id
