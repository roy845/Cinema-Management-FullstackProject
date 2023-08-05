# Cinema Management System

This project is a web application for managing movies users and subscriptions. It's built using a full-stack JavaScript architecture, using MongoDB as the database, Node.js for the back-end, and React for the front-end.

## Technology stack

- **React**
  <img src="https://upload.wikimedia.org/wikipedia/he/a/a7/React-icon.svg" width="124px" height="124px">
- **MongoDB**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124px" height="124px">
- **NodeJs**
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124px" height="124px">

- **Express**
  <img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = "60px" height = "60px">

- **JWT (JSON Web Tokens)**
  <img src = "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width = "60px" height = "60px">

- **Material UI**
  <img src="https://imgtr.ee/images/2023/08/05/d973e444eea4230bcba93cb79b1168e0.png" alt="d973e444eea4230bcba93cb79b1168e0.png" width = "60px" height = "60px">

- **VSCODE**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="60px" height="60px">

## Project Structure

The project is divided into two main parts:

1. The Back-end (Subscriptions and Cinema Web Services (NodeJs RESTApi's))

2. The Front-end (Client)

<img src="https://imgtr.ee/images/2023/08/05/49a64ab9819a038506c71b45a502c08e.png" alt="49a64ab9819a038506c71b45a502c08e.png">

### Back-end

#### Subscriptions Web Service (WS)

The Subscriptions WS is a REST API developed with Node.js and Express. It fetches data from 2 external web services:

1. https://jsonplaceholder.typicode.com/users for the members data
2. https://api.tvmaze.com/shows for the movies data

and populates the relevant collections in the Subscriptions database and manage them.

#### Cinema Web Service

The Cinema WS is another Node.js and Express REST API that manages the users and their permissions in the database and files.

#### Files

- <b>Users.json</b>
  A json file stores the system users data. Each user has an ID from mongoDB & name

The **Users.json** stores the following data for every user

- Id (The \_id that created in the Data Base)
- First Name
- Last Name
- Created date
- SessionTimeOut (number) – the duration (in minutes) a user can work on the system
  once he logged in.

- <b>Permissions.json</b>
  A json file stores the users permissions. Each record (user) has a user id and array of permissions

The **Permissions.json** stores all the user permissions regarding the movies management system:

- Id (The \_id that created in the Data Base)
- Permissions - an array of permissions (strings)
- View Subscriptions
- Create Subscriptions
- Delete Subscriptions
- View Movies
- Create Movies
- Delete Movies

**A user can have many permissions !**

#### Databases

Two MongoDB databases are used

- <b>Users DB</b>
  The User DB database stored a collection with the following data

- \_Id (ObjectId)
- UserName (Required for login)
- FirstName (Required for register)
- LastName (Required for register)
- Password (Required for login)
- SessionTimeOut (number)

**_The system starts with only one (pre-defined) record of the
System Admin data (both in the json files and in the data base)_**

- <b>Subscriptions DB</b>
  A MongoDB database holds 3 collections

1. <b>Members – </b> A collection that stores the subscription members data pulled from the
   Members WS at https://jsonplaceholder.typicode.com/users :

- \_id (ObjectId)
- Name (String)
- Email ( String)
- City (String)

2. <b>Movies – </b> A collection that stores movies data pulled from the Movies WS as
   https://api.tvmaze.com/shows

- \_id (ObjectId)
- Name
- Genres ( Array od Strings)
- Image ( A string – The url of the image picture)
- Premiered ( Date)

3. <b>Subscriptions – </b> A collection stores the data of all the subscriptions:

- \_id (ObjectId)
- MemberId (ObjectId)
- Movies ( an Array of { movieId : Object Id, date : Date} ) - This field store all the movies the member (subscription) watched and their dates

### Front-end

The front-end part of the application is developed with React and Material UI. It consists of several pages for managing subscriptions, movies, and users.

### Installation and Setup

<b>Clone the repository</b>
git clone https://github.com/roy845/Cinema-Management-FullstackProject.git

#### Client

#### Install the dependencies and start the client

1. Open a new terminal in VSCODE.
2. Navigate to the client directory: cd client.
3. Install dependencies: npm/yarn install.
4. Run the client: npm/yarn start.

#### Server

##### Cinema Server

#### Install the dependencies and start the server

1. Open a new terminal in VSCODE.

2. Navigate to the server directory: cd cinemaServer.

3. Install dependencies: npm/yarn install.

Create a .env file in the root server directory.

In the .env file, set the following variables:

PORT: The port number on which the server will run (e.g., PORT=8801).

MONGO_DB_URI: The MongoDB connection URI for connecting to the database (e.g., MONGODB_URI=mongodb://localhost:27017/mydatabase).

JWT_SECRET_KEY:This key used for authentication and authorization. Here is how you can generate this key:

1. Open a terminal.

2. Type the following command and press Enter to generate a random JWT secret key

require('crypto').randomBytes(32).toString('hex')

3. Copy the generated secret key.

4. Open the .env file in the server directory.

5. Set the JWT_SECRET_KEY variable by pasting the generated secret key.

For example:

JWT_SECRET_KEY=generated_secret_key

Save the .env file.

6. Run the server: node server.js.

##### Subscriptions Server

#### Install the dependencies and start the server

1. Open a new terminal in VSCODE.

2. Navigate to the server directory: cd subscriptionsServer.

3. Install dependencies: npm/yarn install.

4. Create a .env file in the server directory.

In the .env file, set the following variables:

PORT: The port number on which the server will run (e.g., PORT=8800).

MONGO_DB_URI: The MongoDB connection URI for connecting to the database (e.g., MONGODB_URI=mongodb://localhost:27017/mydatabase).

5. Run the server: node server.js.

### Features

- User authentication and permissions
- Fetching movie and member data from external web services
- CRUD operations for Movies, Subscriptions, and Users
- Reactive user interface with React and Material UI
- <b>Auto logout:</b> For each user, there is a field in MongoDB called SessionTimeOut that controls the duration (in minutes) a user can work on the system once they have logged in. Once that time is up, the user is logged out from the system.

## Usage

The app has multiple pages for handling different functionalities:

1. <b>Login Page:</b> For user authentication

<img src="https://imgtr.ee/images/2023/08/05/fd04598798741f019b74e1913748b876.png" alt="fd04598798741f019b74e1913748b876.png" width="800px" height = "400px">

2. <b>CreateAccount Page (Register):</b> Allows new users to signup with their details

<img src="https://imgtr.ee/images/2023/08/05/bada4cf9281c7e28a7a5f9d3880bce27.png" alt="bada4cf9281c7e28a7a5f9d3880bce27.png" width="800px" height = "400px">

3. Navigation menu:

<img src="https://imgtr.ee/images/2023/08/05/c26437d0b1ef6da7860b9bb9540b468f.png" alt="c26437d0b1ef6da7860b9bb9540b468f.png" width="800px" height = "400px">

4. <b>Dashboard Page:</b> Contains a menu for system movies and subscriptions options
   User management is only available for admin users who are defined by the admin

<img src="https://imgtr.ee/images/2023/08/05/dd6ad625d2cca984c5b34197f3f554fa.png" alt="dd6ad625d2cca984c5b34197f3f554fa.png" width="800px" height = "400px">

5. <b>Users dashboard Page</b> (Admin only) Allows the admin to manage all users

<img src="https://imgtr.ee/images/2023/08/05/be8615095ddf06ea6bb9baec4bb68fcf.png" alt="be8615095ddf06ea6bb9baec4bb68fcf.png" width="800px" height = "400px">

6. <b> Users page</b> Allows the admin to view the registered users

<img src="https://imgtr.ee/images/2023/08/05/324b8a49d6eeffa403928503b1f1debd.png" alt="324b8a49d6eeffa403928503b1f1debd.png" width="800px" height = "400px">

7.  <b>Add user page</b> Allows the admin to add new user to the system with permissions

<img src="https://imgtr.ee/images/2023/08/05/53c3b46ee2d761a20f02860434efc3d0.png" alt="53c3b46ee2d761a20f02860434efc3d0.png" width="800px" height = "400px">

8.  <b>Edit user</b> Allows admin to update user's data and their permissions

<img src="https://imgtr.ee/images/2023/08/05/81b24448081a665b065aaaa3046b8b1f.png" alt="81b24448081a665b065aaaa3046b8b1f.png" width="800px" height = "400px">

9. <b>Movies dashboard Page</b> Allows users to Manage all movies and their data

<img src="https://imgtr.ee/images/2023/08/05/7e26cbe3d87d0c7f2d6bd4d8b91fd0b7.png" alt="7e26cbe3d87d0c7f2d6bd4d8b91fd0b7.png" width="800px" height = "400px">

10. <b>Movies Page</b> Allows users to view all the movies in the system and search for specific movie

<img src="https://imgtr.ee/images/2023/08/05/11879c806c89ca84e4d2ec81b1a55ce9.png" alt="11879c806c89ca84e4d2ec81b1a55ce9.png" width="800px" height = "400px">

- <b>Search movie</b>

<img src="https://imgtr.ee/images/2023/08/05/226360663c8613d0f1ee0ef62fb2e420.png" alt="226360663c8613d0f1ee0ef62fb2e420.png" width="800px" height = "400px">

- <b>Movie not found</b>

<img src="https://imgtr.ee/images/2023/08/05/33c89e7afa217f854f1d1e2ceb9c7fba.png" alt="33c89e7afa217f854f1d1e2ceb9c7fba.png" width="800px" height = "400px">

11. <b>Add Movie Page</b> Allows to create a new movie

<img src="https://imgtr.ee/images/2023/08/05/f065dddd2879def286484fd44eebf2b5.png" alt="f065dddd2879def286484fd44eebf2b5.png" width="800px" height = "400px">

12. <b>Edit Movie Page</b> Allows to update a movie's data

<img src="https://imgtr.ee/images/2023/08/05/ec49bf01b62d93cb2957863b81de1a0b.png" alt="ec49bf01b62d93cb2957863b81de1a0b.png" width="800px" height = "400px">

13. <b>Movie Page</b> Display information about a single movie

<img src="https://imgtr.ee/images/2023/08/05/c61497d3bf736c013ec4eae0a3e2fbe3.png" alt="c61497d3bf736c013ec4eae0a3e2fbe3.png" width="800px" height = "400px">

14. <b>Subscriptions dashboard Page</b> Manages all members and their movies subscriptions

<img src="https://imgtr.ee/images/2023/08/05/13d5dcdadd0014dae7fdef70751dae34.png" alt="13d5dcdadd0014dae7fdef70751dae34.png" width="800px" height = "400px">

15. <b>Members Page</b> Lists all the members and their subscriptions

<img src="https://imgtr.ee/images/2023/08/05/3c04c39509cc7f13cd43ee65f372a4e7.png" alt="3c04c39509cc7f13cd43ee65f372a4e7.png" width="800px" height = "400px">

- <b>Search member</b>

<img src="https://imgtr.ee/images/2023/08/05/73f6d25f1426e7ea66249574d11dbe25.png" alt="73f6d25f1426e7ea66249574d11dbe25.png" width="800px" height = "400px">

- <b>Member not found</b>

<img src="https://imgtr.ee/images/2023/08/05/64e39fd45b9eb5844fea94fd665a231d.png" alt="64e39fd45b9eb5844fea94fd665a231d.png"  width="800px" height = "400px">

- <b>Subscribe to new movie</b>

<img src="https://imgtr.ee/images/2023/08/05/3d6333f7b269a569347316111cf27bd1.png" alt="3d6333f7b269a569347316111cf27bd1.png" width="800px" height = "400px">

16. <b>Add Member Page</b> Allows to add a new member

<img src="https://imgtr.ee/images/2023/08/05/48a90a3dc532575e1c7eca736d88fe3f.png" alt="48a90a3dc532575e1c7eca736d88fe3f.png" width="800px" height = "400px">

17. <b>Edit Member Page</b> Allows to update a member's data

<img src="https://imgtr.ee/images/2023/08/05/d72ec65e80650451eabccd375f381eb7.png" alt="d72ec65e80650451eabccd375f381eb7.png" width="800px" height = "400px">

18. <b>Page not found</b>

<img src="https://imgtr.ee/images/2023/08/05/19b106b694b6ab5d560c0749587811c6.png" alt="19b106b694b6ab5d560c0749587811c6.png" width="800px" height = "400px">
