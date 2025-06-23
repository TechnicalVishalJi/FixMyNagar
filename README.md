#  FixMyNagar – Civic Problem Reporter with AI (Backend)

This is the **backend** service for FixMyNagar, that allows citizens to report civic issues (like potholes, garbage, water leaks) with photo and location. 

---

##  API Routes

###  Report an Issue
`POST /api/report` 
(http://localhost:5000/api/report) 
Upload a civic issue with location, image, and description.

- **Body (form-data):**
  - `lat`: Latitude (e.g., `26.85`) //lat - latitude
  - `lng`: Longitude (e.g., `80.95`) //lng - longitude
  - `address`: Short address
  - `description`: Problem description
  - `image`: File upload

---

###  Get All Issues
`GET /api/issues`  
(http://localhost:5000/api/issues)
Returns all reported issues (can later be filtered by location).

---

###  Upvote an Issue
`POST /api/issues/:id/vote`  
(http://localhost:5000/api/issues/1/vote)
Increments vote count for a report.

---

###  Add a Comment
`POST /api/issues/:id/comment`  
(http://localhost:5000/api/issues/:id/comment)
Add a comment on a specific report.

- **Body (JSON):**
```json
{
  "text": "This needs attention",
  "user": "Payal"
}
```

---

###  Admin Panel (Optional)

- `GET /api/admin/issues` – View all issues
- `POST /api/admin/issues/:id/status` – Update status (e.g., Resolved) 

```json
e.g., {
  "status" : "Resolved"
}
```
---

##  Tech Stack
- Node.js + Express.js
- (Optionally MongoDB when DB is connected)
- Multer for file upload
- Cloudinary for image storage (future)
- In-memory storage used for demo (no DB needed, DB is not connected)
---

##  Testing (Hoppscotch)
1. Run: `npm install`
2. Run server: `npm start` or `node index.js`
3. Use tools like [Hoppscotch.io](https://hoppscotch.io) or Postman to hit the above routes.

---


##  Folder Structure

```
controllers/
    # Functions for create, vote, comment, get 
routes/
    # API route definitions
index.js                
    # Main Express server setup
```

---

##  Contributors


