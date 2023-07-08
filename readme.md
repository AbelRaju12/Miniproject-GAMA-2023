Mini project | E-commerce website | 2023 | GAMA | CEC


Overview
------------------


 Views ---> It holds all the sub folders and files with views of the website (ejs files)   
 
 
 Controllers -->  It controls the fucntions that must be executed on a particular action  


 Models --> It contains details for particular models like product, user


 Routes -->  Connecting(Path) all the different files(functionalities) together


 
Common Terms
------------------



 const > It is used to declare a variable whose value doesnt change

 module.exports > tells which features/objects in the particular file should be exposed/available to other files.

 ejs > EJS (Embedded JavaScript Templating) is one of the most popular template engines for JavaScript. As the name suggests,
       it lets us embed JavaScript code in a template language that is then used to generate HTML.

 req res > The req object represents the HTTP request and has properties for the request query string, parameters, body, and HTTP headers.
            The res object represents the HTTP response that an Express app sends when it gets an HTTP request 
             
 res.locals >  res. locals is an object that contains the local variables for the response which are scoped to the request only
               and therefore just available for the views rendered during that request or response cycle.                

 asyn await > The keyword async before a function makes the function return a promise.    
 
 middlewares > used to decrease size of app.js

 next() > forwards requests to next middleware line

 session() >pieces of data stored on server connected via cookies


Services & API & APP.JS
------------------

Services >enhances the website
API > Application program interface

conect_mongodb-session to store sessions on database :: This module exports a single function which takes an instance of connect (or Express)
                                                         and returns a MongoDBStore class that can be used to store sessions in MongoDB.
express-session  :: express-session is a middleware module in Express. js that allows you to create sessions in your web application. It stores session data on the server side,
                       using a variety of different storage options, and allows you to track the activity of a user across requests.

//NodeJS is runtime-environment for Javascript

//Node. js is an open source, cross-platform runtime environment for developing server-side 
//and networking applications. Nodemon is like a live-server for your node application.

//Nodemon will start the server server by starting the app.js file

//POST changing something on server

//JS alone doesnot support http, requests, files

const express = require('express');  //Express is a minimal and flexible Node.js web 
//application framework that provides a robust set of features for web and mobile applications

//JS alone doesnot support http, requests, files

const csrf = require('csurf');

const expressSession = require('express-session');  //you can add sesion via const or use config file

app.listen(3000);  //our site/app.js can be run on localhost:3000

app.use('/admin',adminRoutes); //anyreq with /admin will only work

app.set('view engine','ejs');  //activating and setting options. setting ejs.
app.set('views',path.join(__dirname,'views')); //path is builtin nodejs. __dirname is global folder and then to views folder.

