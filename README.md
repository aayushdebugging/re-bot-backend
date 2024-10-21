# ReBot Backend

Welcome to the **ReBot Backend** project! This is a NestJS-based API that provides modular functionality for authentication, user management, inventory management, and financial operations. The documentation below will help you get started with setting up, running, and testing the project.

## Table of Contents
- [Project Setup](#project-setup)
- [Folder Structure Overview](#folder-structure-overview)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Auth Module](#auth-module)
  - [User Module](#user-module)
  - [Inventory Module](#inventory-module)
  - [Finance Module](#finance-module)
- [Using Postman](#using-postman)
  - [Setup and Import Requests](#setup-and-import-requests)
  - [Testing Authentication](#testing-authentication)
  - [Testing Inventory CRUD Operations](#testing-inventory-crud-operations)
- [Summary](#summary)

## 1. Project Setup

### Prerequisites
Before setting up the project, make sure you have the following:
- **Node.js** (v14.x or later)
- **MongoDB** (running locally or accessible via a network)
- **Postman** (for testing the API)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd re-bot-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 2. Folder Structure Overview

The project follows the modular structure of NestJS, with the following folder organization:

```
src/
├── address/
│   ├── address.controller.ts
│   ├── address.dto.ts
│   ├── address.module.ts
│   ├── address.schema.ts
│   └── address.service.ts
├── auth/
│   ├── auth.controller.ts
│   ├── auth.guard.ts
│   ├── auth.module.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── roles.decorator.ts
│   └── roles.guard.ts
├── finance/
│   ├── finance.controller.ts
│   ├── finance.dto.ts
│   ├── finance.module.ts
│   ├── finance.service.ts
│   ├── installment.schema.ts
│   └── payment-plan.schema.ts
├── inventory/
│   ├── inventory.controller.ts
│   ├── inventory.dto.ts
│   ├── inventory.module.ts
│   ├── inventory.schema.ts
│   └── inventory.service.ts
├── user/
│   ├── user.controller.ts
│   ├── user.dto.ts
│   ├── user.module.ts
│   ├── user.schema.ts
│   └── user.service.ts
└── app.module.ts
```

## 3. Environment Configuration

Create an `.env` file in the project root with the following content:

```bash
# Environment Variables
MONGODB_URI=mongodb://localhost:27017/rebot-backend
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=1h
```

## 4. Running the Application

### Development Mode

To run the application in development mode, use:

```bash
npm run start:dev
```

### Production Mode

To build and run the application in production mode, use:

```bash
npm run build
npm run start:prod
```

The server will be running at `http://localhost:3000`.

## 5. API Endpoints

### 1. Auth Module

- **Register a User:**
  - **[POST]** `/auth/register`
  - Request Body:
    ```json
    {
      "username": "agency1",
      "password": "password123",
      "role": "AGENCY"
    }
    ```
  - Response: User registration success message.

- **Login a User:**
  - **[POST]** `/auth/login`
  - Request Body:
    ```json
    {
      "username": "agency1",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "access_token": "JWT_TOKEN_HERE"
    }
    ```

### 2. User Module

- **Get User by Username:**
  - **[GET]** `/user/:username`
  - Response: User details in JSON format.

### 3. Inventory Module

- **Create Inventory (Agency Only):**
  - **[POST]** `/inventory`
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN_HERE>
    ```
  - Request Body:
    ```json
    {
      "type": "R",
      "subType": "Flat",
      "saleType": "off-plan",
      "project": "ObjectId_of_Project",
      "address": "ObjectId_of_Address",
      "paymentPlan": "ObjectId_of_PaymentPlan",
      "metadata": { "key": "value" },
      "dimension": "ObjectId_of_Dimension"
    }
    ```
  - Response: Created inventory details.

- **Get All Inventories with Filters:**
  - **[GET]** `/inventory`
  - Query Parameters (optional): `type`, `subType`, `locality`, `saleType`, `bhk`, `minPrice`, `maxPrice`.
  - Response: List of matching inventories.

- **Get Inventory by ID:**
  - **[GET]** `/inventory/:id`
  - Response: Inventory details in JSON format.

- **Update Inventory (Agency Only):**
  - **[PUT]** `/inventory/:id`
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN_HERE>
    ```
  - Request Body: Same as creating inventory.
  - Response: Updated inventory details.

- **Delete Inventory (Agency Only):**
  - **[DELETE]** `/inventory/:id`
  - Headers:
    ```bash
    Authorization: Bearer <JWT_TOKEN_HERE>
    ```
  - Response: Deletion success message.

### 4. Finance Module

- **Create Payment Plan:**
  - **[POST]** `/finance/payment-plan`
  - Request Body:
    ```json
    {
      "totalAmountRent": 2000,
      "totalAmountBuy": 100000,
      "paymentCriteria": "Installment"
    }
    ```
  - Response: Created payment plan details.

- **Create Installment:**
  - **[POST]** `/finance/installment`
  - Request Body:
    ```json
    {
      "percentage": "10%",
      "time": "6 months",
      "description": "Initial installment",
      "paymentPlan": "ObjectId_of_PaymentPlan"
    }
    ```
  - Response: Created installment details.

## 6. Using Postman

### Setup and Import Requests

1. Create a new collection in Postman and name it `ReBot Backend`.
2. Set the base URL: `http://localhost:3000`.
3. Create separate folders in the collection for each module (e.g., Auth, User, Inventory, Finance).
4. Add new requests for each endpoint as described in the API Endpoints section.

### Testing Authentication

- **Register a User:**
  - Method: **POST** `/auth/register`
  - Request Body: Add user details in JSON format.
  
- **Login a User:**
  - Method: **POST** `/auth/login`
  - Request Body: Add login credentials in JSON format.
  - Copy the JWT token from the response.

### Testing Inventory CRUD Operations

- **Create Inventory:**
  - Method: **POST** `/inventory`
  - Add the JWT token to the Authorization header:
    ```bash
    Authorization: Bearer <JWT_TOKEN>
    ```
  - Add inventory details in the request body.

- **Get All Inventories:**
  - Method: **GET** `/inventory`
  - Add optional query parameters for filtering.

- **Update/Delete Inventory:**
  - Use the **PUT** or **DELETE** method with the inventory ID and JWT token in the Authorization header.

## Summary

This documentation provides a comprehensive overview of how to set up, run, and test the NestJS backend using Postman. Use the provided API endpoints to perform authentication, CRUD operations, and manage inventory and financial operations.

Let me know if you need further details or assistance!
