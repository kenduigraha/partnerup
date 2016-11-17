# partnerup

## How to Run App
1. client
```sh
cd client
npm install
bower install
gulp
```
2. server
```sh
cd server
npm install
npm run dev
```

## Dependencies
1. express generator
2. passport
3. passport-local
4. passport-local-mongoose
5. dotenv
6. mongodb
7. mongoose
8. nodemon
9. jsonwebtoken
10. multer
11. bower
12. gulp
13. browser-sync
14. jwt-decode
15. jQuery
16. bootstrap

## Database
1. name : db_partnerup
2. collections : Users, Descriptions

### Schema
1. Users
```json
let UserSchema = new Schema ({
  "username" : String,
  "password" : String,
  "email"  : String,
  "photo" : String,
  "location" : {
    "lat" : String,
    "lng" : String
  }
},{
  "timestamps" : true
  })
```

2. Descriptions
```json
let DescriptionSchema = new Schema ({
  "title" : String,
  "content" : String,
  "looking_for" : String
},{
  "timestamps" : true
  })
```


## API
Default development port & host : http://localhost:3000

### Users
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/users | POST | register new user |
| /api/users/login | POST | login user |


### Descriptions
| Routes | HTTP | Description |
|--------|------|-------------|
| /api/description | POST | process new description |
| /api/description | GET | show all descriptions |
| /api/description/:id | PUT | edit a description |
| /api/description/:id | DELETE | deleet a description |

# Contributor
Ken Duigraha Putra &copy; 2016

# License
MIT
