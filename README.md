CHALLENGE CHAPTER 7 GROUP 3

MAKE SURE YOU USE THIS SCHEMA ON DATABASE
![db diagram](https://user-images.githubusercontent.com/99533724/173175455-fefb5fdc-6ee6-4a3a-b952-90c253330aa2.PNG)

MODUL :
1. bcrypt
2. cookie-parser
3. ejs
4. express
5. express-flash
6. express-session
7. express-validation
8. express-validator
9. jsonwebtoken
10. morgan
11. nodemon
12. passport
13. passport-jwt
14. passport-local
15. pg
16. sequelize

HOW TO RUN :
1. Install all module on package.json using `npm install`
2. See database name on `config.json`
3. `sequelize db:migrate` to migrate a database
4. the program will run on `localhost:8000` and using port `8000`
5. Register user on `localhost:8000/register` (use with `POST` method) use `username`, `password`
6. Login user on `localhost:8000/login` (use with `POST` method)
7. After register and login, on postman will get a `accessToken`
8. `accessToken` can be check with `localhost:8000/login-token` to see that token working or not

-- All insturction Below Must Input Token From Login to Headers (Authorization)--

9. `/create-room` to create a new room, input `room_name` use string to write it
10. `room_name` must be unique
11. `/join-room` to join a room by input the `room_name` use string to write it
12. `view-room` to see all already room
12. Can view a room by id with `/view-room/:id` this API to view who player already in room
13. Fight room can be open at `/fight/:room_id` example `localhost:8000/fight/1`
14. User or Player can input `choose: R || P || S` on json (uppercase or lowercase is allowed)