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
  <a href="https://ibb.co/VtWN1my"><img src="https://i.ibb.co/wRNLksH/mui-logo.png" alt="mui-logo" width = "60px" height = "60px"></a>

- **VSCODE**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" width="60px" height="60px">

## Project Structure

The project is divided into two main parts:

1. The Back-end (Subscriptions and Cinema Web Services (NodeJs RESTApi's))

2. The Front-end (Client)

<a href="https://ibb.co/L52XNv7"><img src="https://i.ibb.co/ySbc4Vj/project-architecture.png" alt="project-architecture" border="0"></a>

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

<a href="https://ibb.co/L1gzR4Q"><img src="https://i.ibb.co/2dM7hX8/login-page.png" alt="login-page" border="0"></a>

2. <b>CreateAccount Page (Register):</b> Allows new users to signup with their details

<a href="https://ibb.co/CV43sRP"><img src="https://i.ibb.co/MPKx5FB/signup-page.png" alt="signup-page" border="0"></a>

3. <b>Navigation menu:</b>

<a href="https://ibb.co/q0PhVqV"><img src="https://i.ibb.co/9wCBSKS/Navigation-menu.png" alt="Navigation-menu" border="0"></a>

4. <b>Dashboard Page:</b> Contains a menu for system movies and subscriptions options
   User management is only available for admin users who are defined by the admin

<a href="https://ibb.co/0DNLxWg"><img src="https://i.ibb.co/Wx9XLdb/Dashboard-page.png" alt="Dashboard-page" border="0"></a>

5. <b>Users dashboard Page</b> (Admin only) Allows the admin to manage all users

<a href="https://ibb.co/hFC9v1Q"><img src="https://i.ibb.co/XxVLTk0/Users-dashboard.png" alt="Users-dashboard" border="0"></a>

6. <b> Users page</b> Allows the admin to view the registered users

<a href="https://ibb.co/K2Kkp8s"><img src="https://i.ibb.co/6HXx7qt/Users-page.png" alt="Users-page" border="0"></a>

7.  <b>Add user page</b> Allows the admin to add new user to the system with permissions

<a href="https://ibb.co/Y21Ty3D"><img src="https://i.ibb.co/PxPz9NT/Add-user-page.png" alt="Add-user-page" border="0"></a>

8.  <b>Edit user</b> Allows admin to update user's data and their permissions

<a href="https://ibb.co/QHDSVzY"><img src="https://i.ibb.co/94ZK0zy/Edit-user-page.png" alt="Edit-user-page" border="0"></a>

9. <b>Movies dashboard Page</b> Allows users to Manage all movies and their data

<a href="https://ibb.co/cwNGwQw"><img src="https://i.ibb.co/RNCxNcN/Movies-Dashboard-page.png" alt="Movies-Dashboard-page" border="0"></a>

10. <b>Movies Page</b> Allows users to view all the movies in the system and search for specific movie

<a href="https://ibb.co/b7xLcVg"><img src="https://i.ibb.co/rvgMDhG/Movies-page.png" alt="Movies-page" border="0"></a>

- <b>Search movie</b>

<a href="https://ibb.co/TBsnR6R"><img src="https://i.ibb.co/1fkpK1K/Movies-search.png" alt="Movies-search" border="0"></a>

- <b>Movie not found</b>

<a href="https://ibb.co/bK66nCG"><img src="https://i.ibb.co/cryydZs/movie-not-found.png" alt="movie-not-found" border="0"></a>

11. <b>Add Movie Page</b> Allows to create a new movie

<a href="https://ibb.co/p3HV2cK"><img src="https://i.ibb.co/khLbKjD/Add-movie-page.png" alt="Add-movie-page" border="0"></a>

12. <b>Edit Movie Page</b> Allows to update a movie's data

<a href="https://ibb.co/khHs0pJ"><img src="https://i.ibb.co/p30BZgQ/Edit-Movie-page.png" alt="Edit-Movie-page" border="0"></a>

13. <b>Movie Page</b> Display information about a single movie

<a href="https://ibb.co/2KRdqKY"><img src="https://i.ibb.co/F7cz67q/Movie-page.png" alt="Movie-page" border="0"></a>

14. <b>Subscriptions dashboard Page</b> Manages all members and their movies subscriptions

<a href="https://ibb.co/0BbckzG"><img src="https://i.ibb.co/mvWGmPc/members-dashboard-page.png" alt="members-dashboard-page" border="0"></a>

15. <b>Members Page</b> Lists all the members and their subscriptions

<a href="https://ibb.co/bKc5j0R"><img src="https://i.ibb.co/4VhRwqg/All-members.png" alt="All-members" border="0"></a>

- <b>Search member</b>

<a href="https://ibb.co/K2wwGb7"><img src="https://i.ibb.co/rxsstFM/Member-search.png" alt="Member-search" border="0"></a>

- <b>Member not found</b>

<a href="https://ibb.co/Kxt8pZQ"><img src="https://i.ibb.co/WvrR49d/member-not-found.png" alt="member-not-found" border="0"></a>

- <b>Subscribe to new movie</b>

<a href="https://ibb.co/tL140q9"><img src="https://i.ibb.co/sWX2TKZ/Subscribe-to-movie.png" alt="Subscribe-to-movie" border="0"></a>

16. <b>Add Member Page</b> Allows to add a new member

<a href="https://ibb.co/XJctqLj"><img src="https://i.ibb.co/ZTqx0XG/Add-member-page.png" alt="Add-member-page" border="0"></a>

17. <b>Edit Member Page</b> Allows to update a member's data

<a href="https://ibb.co/4KnrvDH"><img src="https://i.ibb.co/Qp3wSq4/Edit-member-page.png" alt="Edit-member-page" border="0"></a>

18. <b>Page not found</b>

<a href="https://ibb.co/LPnsfZd"><img src="https://i.ibb.co/7z20F1t/page-not-found.png" alt="page-not-found" border="0"></a>
