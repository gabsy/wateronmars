# Wateronmars

Wateronmars is a personal project built with React, designed for managing water consumption per apartment in a small condominium. The application provides a user-friendly interface to display water consumption readings by month for selected apartments. The system is designed to be secure, with authentication implemented using Clerk, allowing only admin users to perform write actions such as adding apartments, adding readings, updating, or deleting records.

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
  - Regular Users: Can view water consumption readings but cannot perform any write actions.

- **Apartment Management:**
  - Admin can add new apartments.
  - Admin can update apartment details.

- **Water Consumption:**
  - Each apartment has its water consumption readings listed by month.
  - Readings can be added, updated, or deleted by the admin.

## Demo

[Demo Version](https://demo.marte30.online/)
