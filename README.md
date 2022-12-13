# Tier List Maker

## Steps to run:

1. In the project directory, run the `npm ci` command.

2. In the project directory, run the `docker-compose up -d` command.
This will take a while, as it needs to build the images and setup the database.
Please note that it may take a couple minutes after the mysql container is started to start the other containers.
This is because it takes some time for the initial sql script to finish running.

3. In the project directory, run the `npm start` command.

4. Go to http://localhost:3000 to run the app.
You will have to register a user for yourself before continuing to the main application.
This project also implements phpmyadmin, which allows you to easily see the database.
To access the database through pma, you can go to http://localhost:8080.
