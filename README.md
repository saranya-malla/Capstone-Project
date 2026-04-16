# 🌍 India Location API Platform

## 📌 Project Overview

This project is a scalable backend API platform that provides hierarchical location data of India including:

* States
* Districts
* Subdistricts
* Villages

It is designed for real-world applications such as:

* Address forms
* KYC systems
* Logistics & delivery platforms

---

## 🚀 Features

* RESTful APIs for hierarchical location data
* Pagination support for large datasets
* Search functionality for villages
* API key-based authentication (configurable)
* Rate limiting for secure usage
* Demo frontend for real-time API integration

---

## 🛠️ Tech Stack

* **Backend:** Node.js (Express)
* **Database:** MySQL
* **Frontend:** HTML, JavaScript
* **Tools:** VS Code, Thunder Client

---

## 🔐 API Authentication

APIs support API key authentication using headers:

```
x-api-key: 123456
```

*(Currently disabled for demo testing)*

---

## 🌐 API Endpoints (Tested)

### 🔹 Base URL

```
http://localhost:5000
```

---

### ✅ 1. Test API

```
http://localhost:5000/
```

---

### ✅ 2. Get All States

```
http://localhost:5000/states
```

---

### ✅ 3. Get Districts by State

```
http://localhost:5000/districts?state_id=2
```

---

### ✅ 4. Get Subdistricts by District

```
http://localhost:5000/subdistricts?district_id=23
```

---

### ✅ 5. Get Villages by Subdistrict

```
http://localhost:5000/villages?subdistrict_id=1730
```

---

### ✅ 6. Pagination

```
http://localhost:5000/villages?subdistrict_id=1730&page=1&limit=10
```

---

### ✅ 7. Search

```
http://localhost:5000/villages?subdistrict_id=1730&search=New
```

---

### ✅ 8. Search + Pagination

```
http://localhost:5000/villages?subdistrict_id=1730&page=1&limit=10&search=New
```

---

## 📸 Demo Output

<img width="635" height="589" alt="image" src="https://github.com/user-attachments/assets/2a71564e-fdfe-451c-ad21-edcd80b71a58" />


**Note:** The above demo uses a valid dataset to ensure consistent village output.
Due to partial dataset availability, some selections may not display results, but the API works correctly for all valid inputs.

---

## 📂 Project Structure

```
Capstone-Project/
│
├── data/                 # Dataset files
├── scripts/              # Python scripts for data import
│   ├── import_subdistricts.py
│   ├── test_connection.py
│
├── server.js             # Backend APIs
├── index.html            # Demo frontend
├── package.json
├── .gitignore
├── README.md
```

---

## 📊 Dataset Note

* Partial dataset (~20K rows) used for testing
* Some hierarchy combinations may not return data
* System is designed to scale for full dataset

---

## 🎯 Key Learnings

* Backend API development using Node.js
* Handling large datasets in MySQL
* Implementing search and pagination
* API security using API keys
* Full-stack integration (frontend + backend)
* Data preprocessing using Python

---

## 🏁 Conclusion

This project simulates a **production-level SaaS API system** used in real-world applications for managing hierarchical location data efficiently and securely.

---

## 👩‍💻 Author

**Saranya Malla**
