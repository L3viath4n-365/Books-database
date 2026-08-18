# 📚 Book Saver - Personal Book Tracking Application

A full-featured web application for tracking books you've read, want to read, and the insights you've gained from them. Inspired by Derek Sivers' book notes site, built with Node.js, Express, PostgreSQL, EJS, and Tailwind CSS.

---

## 🚀 Live Site

[View Live Site](https://permalist-project-34t8.onrender.com)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
  - [Routing Flow](#routing-flow)
  - [Styling System](#styling-system)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🧐 Overview

**Book Saver** is a clean, minimal personal reading catalog. It helps you keep track of your library, document key takeaways, and monitor your overall reading habits without relying on third-party platforms.

Key capabilities include:
* Maintaining an organized shelf of read, currently reading, and wishlist books.
* Rating titles on a 1–5 star scale.
* Writing detailed notes, summaries, and key takeaways for quick review.

---

## ✨ Features

- **Full CRUD Management:** Create, read, update, and delete book entries seamlessy.
- **Dynamic Star Ratings:** Assign ratings from 1 to 5 stars.
- **Reading Status Categories:** Filter or track by `Read`, `Currently Reading`, or `To Read`.
- **Reflections & Notes:** Store personal reviews and structured takeaways.
- **Responsive Interface:** Mobile-friendly UI featuring dropdown navigation and modern typography.
- **Production-Ready Security & Performance:** Equipped with `Helmet.js` security headers, parameterized SQL queries to prevent injection, request logging via `Morgan`, and response compression.

---

## 🛠️ Tech Stack

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Server-side JavaScript runtime |
| **Framework** | Express.js | Web server framework and routing |
| **Database** | PostgreSQL (`pg`) | Relational database storage |
| **Templating** | EJS & Express EJS Layouts | Server-rendered dynamic HTML templates |
| **Styling** | Tailwind CSS | Utility-first CSS framework |
| **Security** | Helmet | Express security headers |
| **Utilities** | Morgan, Compression, Dotenv | Logging, gzip, and environment configuration |

---

## 📂 Project Structure

```text
books-database/
│
├── server.js                 # Application entry point
├── package.json              # Project dependencies & scripts
├── .env                      # Environment variables (gitignored)
├── .gitignore               # Git ignore rules
│
├── public/                   # Static assets
│   ├── css/
│   │   └── template.css      # Baseline custom CSS
│   ├── images/               # App icons & images
│   └── src/
│       ├── main.css          # Tailwind source CSS
│       └── output.css        # Compiled Tailwind output
│
├── routes/
│   └── main-route.js         # Express route handlers
│
├── services/
│   └── db.js                 # PostgreSQL connection setup & initialization
│
└── views/
    ├── layout.ejs            # Base HTML wrapper layout
    ├── index.ejs             # Landing page
    │
    ├── books/
    │   ├── book-list.ejs     # Main book gallery view
    │   ├── new.ejs           # Create new book form
    │   └── edit.ejs          # Edit book form
    │
    └── partials/
        ├── header.ejs        # Shared navigation header
        └── footer.ejs        # Shared page footer

```

---

## 💻 Getting Started

### Prerequisites

* **Node.js**: v18 or higher
* **PostgreSQL**: v12 or higher
* **npm**: Node package manager

### Installation

1. **Clone the repository:**

```bash
git clone [https://github.com/l3viath4n-365/permalist-project.git](https://github.com/l3viath4n-365/permalist-project.git)
cd permalist-project

```


2. **Install dependencies:**

```bash
npm install

```



### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
PGUSER=postgres
PGHOST=localhost
PGDATABASE=books_database
PGPASSWORD=your_postgres_password
PGPORT=5432
NODE_ENV=development

```

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Server listening port | `3000` |
| `PGUSER` | PostgreSQL user | `postgres` |
| `PGHOST` | Database host | `localhost` |
| `PGDATABASE` | Database name | `books_database` |
| `PGPASSWORD` | Database user password | *Required* |
| `PGPORT` | Database port | `5432` |
| `NODE_ENV` | Environment mode | `development` |

### Database Setup

The app automatically attempts to build the necessary table structure on startup. Alternatively, you can run the SQL schema manually in `psql`:

```sql
CREATE DATABASE books_database;

\c books_database;

CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(50) NOT NULL DEFAULT 'To Read',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

### Running the Application

```bash
# Development mode (Hot reloading & Tailwind watch)
npm run dev

# Compile Tailwind CSS output
npm run build

# Start Production Server
npm start

```

---

## ⚡ How It Works

### Routing Flow

```text
HTTP Request ➔ server.js ➔ main-route.js ➔ db.js (PostgreSQL Query) ➔ View Engine (EJS) ➔ HTML Response

```

### API & View Routes

| Method | Endpoint | Description | Request Body |
| --- | --- | --- | --- |
| `GET` | `/` | Home page | N/A |
| `GET` | `/books` | List all tracked books | N/A |
| `GET` | `/books/new` | Render form to add a book | N/A |
| `POST` | `/books` | Save a new book entry | `{ title, author, rating, status, notes }` |
| `GET` | `/books/:id/edit` | Render edit form for a book | N/A |
| `PUT` | `/books/:id` | Update existing book details | `{ title, author, rating, status, notes }` |
| `DELETE` | `/books/:id` | Delete a book record | N/A |

### Styling System

The layout combines base styling with utility classes:

1. **Baseline Custom Styles (`template.css`):** Handles core component defaults.
2. **Tailwind CSS (`output.css`):** Provides fast utility overlays and dynamic layout tweaks.

Ensure they are linked in your EJS `<head>` in this sequence:

```html
<link rel="stylesheet" href="/css/template.css">
<link rel="stylesheet" href="/src/output.css">

```

---

## ⚙️ Development Workflow

```bash
# Run server with nodemon
npm run start:server

# Watch Tailwind CSS changes
npm run build:css

# Run development tools concurrently
npm run dev

```

---

## 🚀 Deployment

When deploying to platforms like **Render**, **Heroku**, or **Railway**:

1. Set `NODE_ENV` to `production` in your cloud platform settings.
2. Add your PostgreSQL production configuration variables (`DATABASE_URL` or individual `PG` variables).
3. Ensure the start command is configured to `npm start`.

---

## ❓ Troubleshooting

* **PostgreSQL Connection Errors:** Check that your local PostgreSQL service is running (`sudo service postgresql status` on Linux) and verify that `.env` password and username match your setup.
* **Styles Not Rendering:** Ensure you have compiled the CSS output using `npm run build:css` before starting the application.
* **Port Conflict:** If port `3000` is in use, modify `PORT` in your `.env` file to an open port like `5000` or `8080`.

---

## 📄 License

This project is open-source under the [ISC License](https://opensource.org/licenses/ISC).