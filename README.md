# MyMedJournal


Go check it out [here](https://medappfrontend.web.app/)!

## Description

### Overview
MyMedJournal is a web-app I created to help me manage the medical/bio-related research papers I was interested in reading. The application currently has three main features:
1. Search
    * Users can search any query and obtain a set of relevant documents that are in the famous PubMed database, a part of the U.S.A's National Center for Biotechnology Information (NCBI).
    * Upon searching, the returned elements will contain the title and abstract of relevant documents, along with a link to the associated study for further reading.

2. Favorites Playlist (Requires Account)
    * Users can easiliy develop their own set of favorite research articles. Users can add articles they find interesting or relevant to their research to a 'Favorites playlist' to come back to later without needing to search again.
    * Playlist persists on a MongoDB database -- so users can always come back to view and modify their playlist

3. Study Notes (Requires Account)
    *  If there are any terms/topics one finds confusing or there is simply something users want to make note of, they can create, edit, and delete notes about their confusions or findings. 
    * Personal notes are also persisted on a MongoDB database; thus, can always retrieve and modify notes when needed.

## Technology Stack

* ### Backend: Node.js and Express.js
    * Developed a Node backend using the Express framework to serve client requests.
    * Created a backend API that conducts CRUD operations on a database to manage users, their favorites, and their notes.
    * Used the NCBI API to fetch relevant articles based on user queries.
    * Managed user authentication using JavaScript Web Tokens (JWT).

* ### Database: MongoDB 
    * User information, notes, and favorites playlist all persist on a MongoDB database. 
    * NoSQL-based database was used since the data managed was quite document-centric and doesn't necessarily require the structure of a relation database.
    * Mongoose provides great ODM library to communicate with MongoDB collections from the Node.js backend.

* ### Frontend: React.js, Redux, & React-Router
    * Created an aesthetically pleasing frontend interface via React.js to provide a good user experience. 
    * Managed authenticated users using Redux to protect private frontend routes.
    * Managed routing by using React-Router library to ensure clear and easy navigation across the website. 

## Usage

[The website](https://medappfrontend.web.app/) is now up and running! If you want to run this locally, see the steps below.

### Requirements
* Node.js: >=14.20.0
* npm
* <b>MongoDB</b> -- Required only if you want to store notes and create a favorites playlist. If you don't want to use these cool features, comment out lines 8 and 25 in the `MyMedJournal/server/app.js` that read: `const dbConnect = require('./db/dbConnect')` and `dbConnect()`, respectively. 

### Steps

1. Clone this repository, i.e., `git clone https://github.com/Pedja-Djape/MyMedJournal.git`
2. Open two terminals on your computer
    * Terminal 1
        * `cd MyMedJournal/server`
        * Create a file .env file in this directory. You will need to store a database connection string. You should add the following lines to your .env file:
            * `DB_URL=mongodb+srv://<mdb_username>:<mdb_password>@cluster0.9oeyuny.mongodb.net/?retryWrites=true&w=majority`
                * <b>Make sure to sub in your own connection string.</b>
            * `ACCESS_TOKEN_SECRET=<SECRET_KEY>`
                * SECRET_KEY can be anything but I recommend you use some random key generator since it will generate some random unpredictable key you can use to sign sensitive information with.
        * `npm install`
        * `npm start`
    * Terminal 2, run
        * `cd MyMedJournal/client`
        * `npm install`
        * `npm start`


