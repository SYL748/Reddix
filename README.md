# Reddix

A **Reddit clone** built with the **MERN stack** (MongoDB, Express, React, Node.js) and refactored into **TypeScript** with multiple other tools for a modern, scalable architecture.
## features
-- **Create Account / Login** – Fully styled with Material UI and built with React Hook Form (RHF) for validation and form handling 
-- **Authentication** – Session-based login and registration 
-- **Home Page** – Displays posts feed with order adjustment buttons
-- **Search** – Search posts base on keywords
-- **Backend Refactor** – Cleaner structure for scalability 
-- **Upcoming**:
  - GUI for creation of posts, comments, communities
  - Upvotes & downvotes system
  - User profile pages

## tech used
**Frontend**
- Vite
- React + TypeScript  
- Redux Toolkit (state management)  
- Material UI (styling)  
- React Router (navigation)
- React Hook Form (form management)
- Axios (data fetching)
- TanStack (combined with axios for efficient data fetching and caching)

**Backend**
- Node.js + Express  
- MongoDB + Mongoose  
- Session-based Authentication (Express sessions + cookies)
- Typescript
- bcrypt (password secure)

## Getting Started
1. Clone the repository
```
git clone <repository url>
cd <repository folder>
```
2. Install dependencies
```
cd frontend
npm install
cd ../backend
npm install
```
3. Initialize Database in Backend directory
```
cd backend
npm run init
```

4. Start the server
In the backend directory:
```npm run dev```

5. Start the client side
In the frontend directory
```npm run dev```

6. Open the browser(google chrome)
Enter url:
```http://localhost:5173```
