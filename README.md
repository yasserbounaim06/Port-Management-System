# Port Management System

A modern full-stack web application for managing port operations, containers, personnel, equipment, and more. Built with **Flask** (Python) for the backend and **Angular** for the frontend.

<img width="1920" height="1080" alt="Screenshot 2025-07-21 094354" src="https://github.com/user-attachments/assets/84aafffe-2237-47d4-90c7-11f4073fb32d" />
-
<img width="1832" height="914" alt="Screenshot 2025-07-21 094640" src="https://github.com/user-attachments/assets/d81090be-4a98-43b5-9026-9440b0abc62c" />

## 🚀 Features

- **Authentication & Authorization**
  - JWT-based login/logout
  - Role-based access control (Admin, Manager, Personnel)
- **Dashboard**
  - Dynamic dashboard showing only features relevant to the logged-in user's role
- **CRUD Operations**
  - Containers
  - Personnel
  - Operations
  - Shifts
  - Navires (Ships)
  - Engins (Equipment)
  - Arrêts (Downtime)
  - Missions
  - Occupations
- **Many-to-many relationships** (e.g., Operations & Personnel)
- **Responsive UI** with modern design
- **RESTful API** for all resources
- **MySQL** database support
- **CORS** enabled for frontend-backend communication
- **Secure password hashing**
- **YOLOv11 Computer Vision Integration**
  - Automatic detection of container numbers and ISO codes from images
  - OCR (Optical Character Recognition) for reading detected codes
  - Seamless integration with backend for automated data entry
- **Easy deployment** (Heroku, AWS, etc.)

---

## 🤖 ML/CV: YOLOv11 Container & ISO Code Detection

- **YOLOv11** is used for real-time object detection of:
  - **Container Numbers**
  - **ISO Codes**
- **OCR** (EasyOCR) extracts text from detected regions.
- **Workflow:**
  1. Upload or capture an image of a container.
  2. YOLOv11 model detects and crops regions containing container numbers and ISO codes.
  3. OCR reads the text from these regions.
  4. Results are sent to the backend and can be used to auto-populate forms or records.
- **Scripts & Models:**
  - All ML/CV scripts and models are in `Backend/YOLOv11/`
  - Includes training, prediction, and OCR scripts.
  - Pretrained weights and sample runs are provided.
- **Dependencies:**
  - `ultralytics`, `opencv-python`, `easyocr`, `torch`, `torchvision`

---

## 🧑‍💼 User Roles & Permissions

| Role      | Accessible Features                                      |
|-----------|---------------------------------------------------------|
| **Admin**     | All features (full CRUD on all resources)                |
| **Manager**   | Operations, Occupations, Missions, Personnel, Shifts, Navires, Engins |
| **Personnel** | Containers only (CRUD)                                 |

- The dashboard and navigation automatically adapt to the user's role.
- Unauthorized users cannot access or see restricted features.

---

## 🗂️ Project Structure

```
project/
├── Backend/                # Flask backend (API, models, migrations)
│   ├── app.py
│   ├── models/
│   ├── migrations/
│   ├── YOLOv11/           # ML/CV scripts, weights, and runs
│   ├── requirements.txt
│   └── ...
├── frontend/
│   └── containers/         # Angular frontend
│       ├── src/app/features/
│       ├── package.json
│       └── ...
├── README.md
└── requirements.txt        # (legacy, see Backend/requirements.txt)
```

---

## ⚙️ Backend Setup (Flask)

1. **Install dependencies:**
   ```bash
   pip install -r Backend/requirements.txt
   ```
2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your DB credentials and secret key.
3. **Run migrations:**
   ```bash
   flask db upgrade
   ```
4. **Start the backend server:**
   ```bash
   flask run
   ```

### Backend Main Dependencies
- Flask, Flask-SQLAlchemy, Flask-Cors, Flask-Login, Flask-Migrate
- PyMySQL, SQLAlchemy, python-dotenv
- easyocr, opencv-python, ultralytics (for ML/CV features)

See `Backend/requirements.txt` for the full list.

---

## 💻 Frontend Setup (Angular)

1. **Install dependencies:**
   ```bash
   cd frontend/containers
   npm install
   ```
2. **Start the Angular dev server:**
   ```bash
   ng serve --open
   ```

### Frontend Main Dependencies
- @angular/core, @angular/router, @angular/forms, rxjs, zone.js
- See `frontend/containers/package.json` for the full list.

---

## 🔒 API & Authentication
- The frontend expects the backend API at `http://127.0.0.1:5000/api` by default.
- JWT tokens are stored in localStorage and sent with each request.
- All protected routes require authentication and proper role/permission.

---

## 📝 Usage
- Register or login as an Admin, Manager, or Personnel.
- The dashboard and navigation will adapt to your role.
- Only authorized features and CRUD operations are visible and accessible.
- Use the top-right menu to logout securely.
- Use the ML/CV features to automate container and ISO code entry from images.

---

## 📦 Deployment
- **Frontend:** Deploy the Angular app to any static host (Netlify, Vercel, etc.)
- **Backend:** Deploy Flask to any Python-compatible host (Heroku, AWS, etc.)

---

## 🧾 License
[MIT](LICENSE)

---

For questions or support, please open an issue on GitHub after pushing your repository.
