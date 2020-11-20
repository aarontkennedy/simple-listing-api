# simple-listing-api

# Build instructions
1. clone the repository
2. npm install
3. create a mysql database
4. create a file called mySQLkeys.json with correct data for you mysql database in this format:
{
  "host": "127.0.0.1",
  "port": 3306,
  "user": "XXXX",
  "password": "XXXX",
  "database": "listings"
}
5. run nodemon index.js

# API Usage Examples
Create a listing
localhost:3000/create?mls_number=again&address=3442%202%201/2%20St.%20NE&city=New%20York&state=MN&zip=555555&country=USA&list_date=2020-09-18&price=125000&agent_id=123455

Retrieve a listing by mls number
localhost:3000/get?mls_number=99999999

Retrive listings by agent
localhost:3000/getbyagent?agent_id=12345
