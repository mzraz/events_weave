# Event-Weave Backend Installation Guide

## Developer : Techinoid

## Step-1 : - Backend Node.js System Requirement and Specifications

- https://nodejs.org/ or later
- MacOS, Windows (including WSL), and Linux are supported

## Step-2 : -  Clone the Repository

https://github.com/baka-r/Event-Weave-Backend.git

# Step-3 : - Install Dependencies

Navigate to the cloned repository directory using the terminal and execute the following command to install the required dependencies:

npm install

# Step 4: - Create .env File

Create a .env file in the root directory of the project. This file will hold your environment variables. Open the .env file in a text editor and set the following variables:

# Database Configuration
DB_HOST
DB_USERNAME
DB_PASSWORD
DB_NAME

# Server Configuration
HTTP_PORT
LOCAL_HOST

# Authentication & Security
JWT_EXPIRES_IN
BCRYPT_SALT_ROUNDS
JWT_SECRET

## Step 5: - Restore the data base from the db folder

open postgres and create a data base names Event-Weave and restore the data base with the existing 
backup file

#### Step 5: - Run the Backend

Once you've set up the .env file and restored data base, you can start the backend server using the following command:

npm start

Make sure to replace any placeholder values like database information and secrets with actual values before using this `README.md` file.