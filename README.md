# Project Name

<br>

# Quick Compo

<br>

## Description

This is an app to search small local restaurants and give them reviews.

## User Stories

- **404:** As a user I get to see a 404 page with a feedback message if I try to reach a page that does not exist so that I know it's my fault.
- **Signup:** As an anonymous user I can sign up on the platform so that I can start searching restaurants.
- **Login:** As a user I can login to the platform so that I can access my profile and search restaurants based on my location and preferences.
- **Logout:** As a logged in user I can logout from the platform so no one else can use it.
- **User Profile Page Visitor**: As a logged in visitor I can visit my profile page so that I can access the edit page, see and manage all my favourite restaurants and see my activity in comment section.
- **View Restaurants List:** As a user I want to see all the restaurants and also serch the ones that meet my criteria.
- **View Restaurant Details:** As a user I would like to see the retaurant details, and give reviews. Aso, I would like to edit or delete reviews.
- **User Profile Page Admin**: As a logged in admin I can visit my profile page so that I can access the edit page, and see and manage all the restaurants in the database.
- **Add Restaurants:** As a logged in admin I can access the add restaurants page so that I can add a new restaurant.
- **Edit Restaurants:** As a logged in admin I can access the edit restaurant page so that I can update it.
- **Delete Restaurants:** As a logged in admin I can delete a restaurant from the database.

## Backlog

<br>

# Client / Frontend

## React Router Routes (React App)

| Path                              | Component             | Permissions                 | Behavior                                          |
| --------------------------------- | --------------------- | --------------------------- | ------------------------------------------------- |
| `/`                               | HomePage              | public `<Route>`            | Home page.                                        |
| `/login`                          | LoginPage             | anon only `<AnonRoute>`     | Login form, navigates to home page after login.   |
| `/signup`                         | SignupPage            | anon only `<AnonRoute>`     | Signup form, navigates to home page after signup. |
| `/profile`                        | ProfilePage           | user only `<PrivateRoute>`  | User profile for the current user.                |
| `/profile/edit/:userId`           | EditProfilePage       | user only `<PrivateRoute>`  | Edit user profile form.                           |
| `/restaurants`                    | RestaurantListPage    | user only `<PrivateRoute>`  | Restaurants list.                                 |
| `/restaurants/add`                | CreateRestaurantPage  | admin only `<PrivateRoute>` | Create a new restaurant.                          |
| `/restaurants/edit/:restaurantId` | EditRestaurantPage    | admin only `<PrivateRoute>` | Edit restaurant.                                  |
| `/restaurants/:restaurantId`      | RestaurantDetailsPage | user only `<PrivateRoute>`  | Restaurant details. Shows info about restaurants. |

## Components

Pages:

- LoginPage

- SignupPage

- HomePage

- ProfilePage

- EditProfilePage

- RestaurantListPage

- CreateRestaurantPage

- EditRestaurantPage

- RestaurantDetailsPage

Components:

- Navbar
- SearchBar
- RestaurantListCard
- RestaurantDetailsCard
- CommentCard
- FavouriteRestaurant

# Server / Backend

## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageProfile: { type: String, default: "./src/assets/images"},
  name: {type: String, required: [true, "Please enter a name"]},
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  favourites  : [{ type: Schema.Types.ObjectId, ref:'Restaurant' }],
  comments: [ { type: Schema.Types.ObjectId, ref:'Comments' } ]
}
```

**Restaurant model**

```javascript
 {
   name: { type: String, required: true },
   imageCover: { type: String },
   city: { type: String, required: true },
   contact: {type:Number},
   address: { type: String, required: true },
   comments: [ { type: Schema.Types.ObjectId, ref:'Comment' } ],
   averagePrice: {type: Number},
   imageUrl :[{type: String}],

 }
```

**Comments model**

```javascript
{

author: { type: Schema.Types.ObjectId, ref:'User' },
restaurant: { type: Schema.Types.ObjectId, ref:'Restaurant' },
content: {type: String},
},
{
timestamps: true
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
| GET         | `/api/restaurants`               |                                                                                      |                | 400          | Show all restaurants                                                                                                            |
| GET         | `/api/restaurants/:restaurantId` |                                                                                      |                |              | Show specific restaurants                                                                                                       |
| POST        | `/api/restaurants`               | { name, imageCover, city, contact, address, comments, averagePrice, imageUrl }       | 201            | 400          | Create and save a new restaurant                                                                                                |
| PUT         | `/api/restaurants/:restaurantId` | { name, imageCover, city, contact, address, comments:[], averagePrice } | 200            | 400          | Edit a restaurant                                                                                                               |
| DELETE      | `/api/restaurants/:restaurantId` |                                                                                      | 201            | 400          | Delete a restaurant from the database                                                                                           |
| POST        | `/api/restaurants/comment`       | { author, restaurant, content, imageUrl }                                                      | 201            | 400          | Create and save a new comment                                                                                                   |
| PUT         | `/api/restaurants/comment`       | { author, restaurant, content,imageUrl }                                                      | 200            | 400          | Edit a comment                                                                                                                  |
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

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or a picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com) - The url to your _public_ presentation slides

### Contributors

FirstName LastName - <github-username> - <linkedin-profile-link>

FirstName LastName - <github-username> - <linkedin-profile-link>
