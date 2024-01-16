# Wateronmars
Wateronmars is a personal project built with React, designed for managing water consumption per apartment in a small condominium. The application provides a user-friendly interface to display water consumption readings by month for selected apartments.
It is using authentication implemented with [Clerk](https://clerk.com), allowing only admin users to perform write actions such as adding apartments, adding readings, updating, or deleting records. Regular users can only see, by default, their apartment data.


<img width="1589" alt="CleanShot 2024-01-16 at 15 36 20@2x" src="https://github.com/gabsy/wateronmars/assets/871700/0615241e-f6ee-4198-9d47-65a432fcd4a1">



## Demo

[Demo Version](https://demo.marte30.online/)


## Key Features

- **Technology Stack:**
  - Frontend: React
  - State Management: Context API
  - HTTP Requests: Axios
  - Authentication: Clerk with a custom signup page and form

- **Backend:**
  - Database: MongoDB
  - Endpoints: Custom endpoints for MongoDB, facilitating data operations.

- **User Roles:**
  - Admin: Can perform read and write actions.
  - Regular Users: Can view water consumption readings of their apartment but cannot perform any write actions.

- **Apartment Management:**
  - Admin can addm update or delete apartments.

- **Water Consumption:**
  - Each apartment has its water consumption readings listed by month.
  - Readings can be added, updated, or deleted by the admin.
