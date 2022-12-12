# Tier List Maker

## Steps to run:

1. Before running any commands, you need to update a few things in the .env file.
You will have to change the WWWUSER and WWWGROUP variables to your user's id and group.
To find this, run the following command in a terminal: `whoami | id`.
The response should look something like this: `uid=1000(your_username) gid=1000(your_username)`.
In the .env file, change WWWUSER to the uid number (1000 in the earlier example), and change WWWGROUP to the gid number.

2. In the project directory, run the `npm ci` command.

3. In the project directory, run the `docker-compose up -d` command.
This will take a while, as it needs to build the images and setup the database.
Please note that it may take a couple minutes after the mysql container is started to start the other containers.
This is because it takes some time for the initial sql script to finish running.
Once all containers are started, you are good to go!

4. Go to http://localhost:3000 to run the app.
You will have to register a user for yourself before continuing to the main application.
This project also implements phpmyadmin, which allows you to easily see the database.
To access the database through pma, you can go to http://localhost:8080.
