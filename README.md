# Restaurant Reservation System

This Project is designed to help restaurant managers schedule and maintain a restaurants reservations. 
This system allows Managers to Create new reservations, Create new Seating areas for thier restaurant, edit reservations. This system is set where the restaurant is closed Teusdays and before 10:30am and after 09:30pm. 

This project takes advantage of React.JS to handle front-end queries, Javascirpt, HTML, and CSS were all chosen to create the user expereince. 
The back-end was created using Knex, this allows for the intergration of PostgresSQL into Javascript.

Installation
1 Fork/clone the code into a local GIT repo
2 Create an ElephantSQL database
3 change the URL's in the .env file for the back end to your personal ElephantSQL database URL
4 Run "npm run start" or "npm run start:dev" from inside the back-end folder
5 Run "npm run start" from inside the front-end folder. 
    (if you see warnings in the console, stop the server "run npm run build" then restart the server)
The application will automatically run on Localhost/5000 for the server and localhost/3000 for the UI
