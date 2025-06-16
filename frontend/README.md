-> Important Notes for Reviewers

This file provides key information for testing and understanding the project behavior, especially related to roles and setup.

-> Admin Role Assignment

- By default, any newly registered user will have the role: `"user"`.

- To create an **admin**, you need to manually insert a document into the MongoDB `users` collection.

-> How to do it:

1. Open **MongoDB Compass** or connect via CLI.
2. Go to the `users` collection.
3. Insert a new user manually with the following data by postman/mongodb:

-> json
{
"name": "Admin",
"email": "admin@example.com",
"password": "123asd123",
"role": "admin"
}

-> Default User Behavior
When someone registers via the frontend, their role will automatically be "user".

=> They will not have access to create, update, or delete posts.

-> Only admins can access protected admin routes.

->technologies

Frontend
React (v19)

React Router DOM

Axios

jwt-decode

Tailwind CSS

Vite (for bundling)

Backend

Node.js

Express.js

MongoDB with Mongoose

JWT (jsonwebtoken)

bcrypt

CORS

Nodemon (for development)

-> Project Overview
Admin can: Login → Create, Update, Delete posts

User can: Sign up, log in, and view posts

Public homepage: Lists all posts

Authentication: JWT-based

Authorization: Role-based (admin/user)

-> Personal Note

Although my main frontend tech stack is Vue.js, for this full-stack project I used React, Node.js, Express, and MongoDB.
It was my first time doing backend, and honestly, it was a bit challenging at first but I learned a lot and really enjoyed the process.
