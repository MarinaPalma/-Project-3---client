# Project Name

<br>

# Quick Compo

<br>

## Description

This is an app to search small, local and traditional restaurants called "tascas" and give them reviews.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start searching tascas.
- **Login:** As a user I can login to the platform so that I can access my profile and search tascas based on my location and preferences.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **User Profile Page Visitor**: As a logged in visitor I can visit my profile page so that I can see and manage all my favourite tascas.
- **View Restaurants List:** As a user I want to see all the tascas available and also serch the ones that meet my criteria by name or by location.
- **View Restaurant Details:** As a user I would like to see the tasca details, give reviews and add to favourite list. Also, I would like to delete my own reviews.
- **User Profile Page Admin**: As a logged in admin I can visit my profile page so that I can see and manage all the tascas in the database.
- **Create Restaurants:** As a logged in admin I can access the add restaurants page so that I can add a new tasca.
- **Edit Restaurants:** As a logged in admin I can access the edit restaurant page so that I can update it.
- **Delete Restaurants:** As a logged in admin I can delete a restaurant from the database.

## Backlog

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                              | Component             | Permissions                 | Behavior                                          |
| --------------------------------- | --------------------- | --------------------------- | ------------------------------------------------- |
| `/`                               | HomePage              | public `<Route>`            | Home page.                                        |
| `/login`                          | LoginPage             | anon only `<AnonRoute>`     | Login form, navigates to profile page after login.   |
| `/signup`                         | SignupPage            | anon only `<AnonRoute>`     | Signup form, navigates to login page after signup. |
| `/profile`                        | ProfilePage           | user only `<PrivateRoute>`  | User profile for the current user.                |
| `/restaurants`                    | RestaurantListPage    | user only `<PrivateRoute>`  | See the all the tascas in the database. Also can search tascas by name or location                                 |
| `/restaurants/add`                | CreateRestaurantPage  | admin only `<PrivateRoute>` | Create a new tasca.                          |
| `/restaurants/edit/:restaurantId` | EditRestaurantPage    | admin only `<PrivateRoute>` | Edit a tasca.                                  |
| `/restaurants/:restaurantId`      | RestaurantDetailsPage | user only `<PrivateRoute>`  |  Shows all infos about the selected tasca. |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- RestaurantListPage

- CreateRestaurantPage

- EditRestaurantPage

- RestaurantDetailsPage

Components:

- Navbar
- SearchBar
- CommentCard
- FavouriteRestaurant

# Server / Backend

## Models

**User model**

```javascript
{
email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
  },
  password: { type: String, required: [true, "Please enter a password"] },
  imageProfile: { type: String, default: "https://res.cloudinary.com/dnorytyjz/image/upload/v1654178687/Taskas/food_critic_default_ghd8oh.png" },
  name: { type: String, required: [true, "Please enter a name"] },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  favourites: [{ type: Schema.Types.ObjectId, ref: "Restaurant" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
}
```

**Restaurant model**

```javascript
 {
name: { type: String, required: true },
  imageUrl: { type: String },
  city: { type: String, required: true },
  contact: { type: Number, required: true },
  address: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  averagePrice: { type: Number, required: true},
  location: {
    address: String,
  },
 }
```

**Comments model**

```javascript
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant" },
    content: { type: String, required: true},
    imageUrl: [{ type: String }],
  },
  {
    timestamps: true,
  }

```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL                              | Request Body                                                                         | Success status | Error Status | Description                                                                                                                     |
| ----------- | -------------------------------- | ------------------------------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`                   | {name, email, password}                                                              | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`                    | {email, password}                                                                    | 200            | 401          | Checks if fields not empty (422), if email exists (404), and if password matches (404), then stores user in session             |
| GET         | `/auth/profile `                 | Saved session                                                                        | 200            | 404          | Check if user is logged in and return profile page                                                                              |
| PUT         | `/auth/profile/:userId `         | {name, imageProfile}                                                                 | 200            | 404          | Updates user profile                                                                                                            |
| GET         | `/api/restaurants`               |                                                                                      |                | 400          | Show all tascas                                                                                                            |
| GET         | `/api/restaurants/:restaurantId` |                                                                                      |                |              | Show specific tasca                                                                                                       |
| POST        | `/api/restaurants`               | { name, imageCover, city, contact, address, comments, averagePrice, imageUrl }       | 201            | 400          | Create and save a new tasca                                                                                                |
| PUT         | `/api/restaurants/:restaurantId` | { name, imageCover, city, contact, address, comments:[], averagePrice } | 200            | 400          | Edit a tasca                                                                                                               |
| DELETE      | `/api/restaurants/:restaurantId` |                                                                                      | 201            | 400          | Delete a tasca from the database                                                                                           |
| POST        | `/api/restaurants/comment`       | { author, restaurant, content, imageUrl }                                                      | 201            | 400          | Create and save a new comment                                                                                                   |
| DELETE      | `/api/restaurants/comment`       |                                                                                      | 201            | 400          | Delete a comment from the restaurant                                                                                            |
| POST        | `/api/restaurants/favourite`     |                                                                                      | 200            | 400          | Add a restaurant as favourite                                                                                                   |
| DELETE      | `/api/restaurants/favourite`     |                                                                                      | 201            | 400          | Delete a favourite                                                                                                              |

<br>

## API's

- Cloudinary;

<br>

## Bonus

- random restaurant;
- suggest a restaurant to admin;

<br>

## Packages

<br>

## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/MarinaPalma/-Project-3---client)

[Server repository Link](https://github.com/MarinaPalma/Project-3---server)

[Deployed App Link](https://tascas.netlify.app/)



### Contributors

Marina Palma - <https://github.com/MarinaPalma> - <https://www.linkedin.com/in/marina-palma/>

