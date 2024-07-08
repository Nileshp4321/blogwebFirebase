Blog Application README
Getting Started
Running the Application Locally
Clone the repository: git clone https://github.com/your-username/blog-app.git
Install dependencies: npm install or yarn install
Start the development server: npm run dev or yarn dev
Open http://localhost:3000 in your browser
Deployed Application
The application is deployed on Vercel: https://blog-app.vercel.app

Features
Display a list of blog posts on the homepage
Single Blog Page to read the full blog
Login/Signup functionality using Firebase Authentication
Users can submit new blog posts with title, description, and cover image
Users can edit and delete their own blog posts
State management using Redux Toolkit
Well-organized code following React best practices
Bonus Features
Pagination for the list of blog posts
Persist Logged In User
** Firebase Configuration**
Create a Firebase project and enable Authentication
Create a firebaseConfig.js file with your Firebase configuration
Import the firebaseConfig in src/firebase.js
Redux Toolkit Configuration
The Redux store is configured in src/store.js
The blog post data is managed using Redux Toolkit
