# NebsIT Notice Management Task

A full-stack Notice Management application that allows users to create, view, filter, update, and delete notices with file upload and preview functionality.

---

## Live Application URLs

Frontend  
https://nebsit.netlify.app/

Backend  
https://nebsittask.onrender.com

---

## Technology Stack

Backend  
Node.js  
Express.js  
TypeScript  
Zod (validation)  
Multer (file upload)  
http-status  

Frontend  
React  
TypeScript  
Tailwind CSS  
Ant Design  
Axios  
SweetAlert2  

---

## Application Features

Notice List Page  
- View all notices in a table  
- Filter notices by published date, department, and status  
- Select multiple notices and delete them together  
- View notice details in a modal  
- View uploaded files from the notice details  

Create Notice Page  
- Form with required and optional fields  
- Validation before submitting data  
- File upload support  
- User-friendly alerts  

---

## Backend API Endpoints

Base API URL  
https://nebsittask.onrender.com/api/v1/notice

---

Get All Notices  
https://nebsittask.onrender.com/api/v1/notice/all-notices  

This API is used to fetch all notices with filtering and pagination options  
// ?status=&targetAudience=&date=&page=&limit=

---

Get Single Notice  
https://nebsittask.onrender.com/api/v1/notice/single-notice/:id  

This API is used to fetch full details of a single notice by notice ID

---

Update Notice  
https://nebsittask.onrender.com/api/v1/notice/update-notice/:id  

This API is used to update notice data or status  
// ?statusData=

---

Delete Notices  
https://nebsittask.onrender.com/api/v1/notice/delete-notices  

This API is used to delete multiple notices at the same time by passing selected notice IDs in the request body

---

View Uploaded File  
https://nebsittask.onrender.com/api/v1/notice/view-file/:filename  

This API is used to view or download an uploaded file related to a notice

---

## Validation and File Handling

All incoming requests are validated using Zod  
File uploads are handled using Multer  
Uploaded files can be viewed directly from the frontend

---

## Run Project Locally

### Step 1: Clone the Repository
Clone the GitHub repository to your local machine.

---

### Backend Setup

1. Open the backend folder in your code editor  
2. Install dependencies  
   npm install  

3. Create a `.env` file in the backend root directory and add the following environment variables  

   NODE_ENV=development  
   PORT=5000  
   DATABASE_URL=mongodb+srv://nebsit:D3rzwf7MF9kptfC8@cluster0.sikjemj.mongodb.net/nebsitTask?appName=Cluster0  

4. Start the backend server  
   npm run start:dev  

The backend server will run on port **5000**.

---

### Frontend Setup

1. Open the `client` folder in your code editor  
2. Install dependencies  
   npm install  

3. Start the frontend development server  
   npm run dev  

No environment variable setup is required for the frontend.
---

## Notes

REST API architecture  
Fully TypeScript-based project  
Supports filtering, pagination, and bulk deletion  

---

