# Tier List Maker

### Steps to Run

1. In the project directory, run the `npm ci` command.

2. In the project directory, run the `docker-compose up -d` command.
This will take a while, as it needs to build the images and set up the database.
Please note that it may take a couple of minutes after the mysql container is started to start the other containers.
This is because it takes some time for the initial sql script to finish running.

3. In the project directory, run the `npm start` command.

4. Go to http://localhost:3000 to run the app.
You will have to register a user for yourself before continuing to the main application.
This project also implements phpmyadmin, which allows you to easily see the database.
To access the database through pma, you can go to http://localhost:8080.

### Video

In progress...

### Development Documentation

The purpose of this app is to allow users to create and manage their own tier lists.
In developing this application, I decided that I wanted to make it as modular and organized as possible.
This led to me, very early in the project, create many ejs files as different, reusable components.
Eventually, I applied this same methodology to the backend routes, separating and organizing the routes into separate files.
Once I got the application connecting to the database, I decided to create models for each of my database tables, similar to how an MVC framework like Laravel would.
In doing this, I was able to abstract all the logic of creating sql statements into a single base Model class, that all my models could then inherit from.
Because I made my code modular, and abstracted much of the logic, the end result is something that I feel is pretty readable and reusable.
When I set up the docker environment, I decided that I also wanted the project to come with phpmyadmin, so that viewing and managing the database would be really easy.
Originally I had the node server also running as a docker container, however I had issues with this when trying to run the project on different systems.
Unfortunately, with the time I had remaining, I wasn't able to fix those issues.
By removing node as a container, and rather running the node server locally instead, I was able to get the app working on Linux, Mac, and Windows.
Around the midpoint of the project, I also set the project up as a git repository.
Doing this allowed my to better control the code and made adding new functionality easier.

The file structure of this project is as follows:
- The **public** directory stores all the static css, images, and javascript files.
  The **public/js** directory has two javascript files: **helpers.js**,
  which contains functions that are accessible by all ejs views,
  and **dragAndDrop.js**, which sets up the drag-and-drop functionality and posts tier updates to the server.
  Inside the **public/images** directory is the **item_images** directory, which is used to store user uploaded images.
- The **views** directory holds all the ejs views rendered by the application.
  Within this is the **index.ejs** file, which acts as a wrapper for all other views, and sets up the base html page.
  The **views/auth** directory holds all the views used for the user authentication screens.
  The **views/app** directory holds all the views used for the main application.
- The **backend** directory holds all the functionality for the server side of the application,
  besides the initial setup and configuration which is done in the **server.js** file in the project root.
  Within the **backend** directory there are a few files:
  **db.js**, which sets up the connection to the database,
  **middlewares.js**, which defines the middlewares used by the routes,
  **helpers.js**, which just holds helper functions for the backend,
  and **Model.js**, which hold the Model class, responsible for constructing and executing sql statements.
  The routes for the server are all organized and stored in the **backend/routes** directory.
  The **backend/models** directory holds classes for each of the tables in the database.
  The models are classes which the server uses to manipulate the database. Each model inherits from the base Model class.
- The **db** directory stores the **schema.sql** file, which docker runs to create the necessary tables.

The project uses the following frameworks/libraries:
- **Bootstrap**: Framework which supplied much of the base styling. Provided via CDN.
- **Font Awesome**: Library which supplied the icons used. Provided via CDN.
- **ejs**: Javascript view engine used for this application.
- **express**: Javascript library for creating and running the node server.
- **express-session**: Javascript library to make working with session very easy.
- **express-fileupload**: Javascript library to make working with file uploads easy.
- **dotenv**: Javascript library allowing me to create environment variables.
- **nodemon**: Javascript library to handle the hot reloading of the node server.
- **mysql2**: Javascript library to help with connecting to a mysql database.
- **bcrypt**: Javascript library to handle the creation of hashed passwords.
- **sortablejs**: Javascript library to handle drag-and-drop functionality. Provided via CDN.
