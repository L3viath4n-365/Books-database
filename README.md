# Book Saver - Personal Book Tracking Application

A full-featured web application for tracking books you've read, want to read, and the insights you've gained from them. Built with Node.js, Express, PostgreSQL, EJS templating, and Tailwind CSS.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
  - [Server Setup](#server-setup)
  - [Routing Flow](#routing-flow)
  - [View Rendering](#view-rendering)
  - [Styling System](#styling-system)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Development Workflow](#development-workflow)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Book Saver is a personal book tracking application inspired by Derek Sivers' book notes website. It allows users to:

- Maintain a collection of books they've read or want to read
- Rate books on a 1-5 scale
- Add personal notes and key takeaways
- Track reading status (Read, To Read, Currently Reading)

## Features

- **Book Management**: Create, read, update, and delete books
- **Rating System**: Rate books from 1-5 stars
- **Reading Status**: Track books as "Read", "To Read", "Currently Reading", or "Want to Read"
- **Notes**: Add detailed notes and reflections for each book
- **Responsive Design**: Mobile-first approach with dropdown navigation
- **Modern UI**: Clean interface with Tailwind CSS utilities
- **Security**: Helmet.js for security headers, rate limiting, and parameterized SQL queries
- **Performance**: Compression, method override, and optimized database queries

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **pg** | PostgreSQL client |
| **Node.js** | JavaScript runtime |
| **Express** | Web framework |
| **PostgreSQL** | Database |
| **EJS** | Server-side templating |
| **express-ejs-layouts** | Layout system for EJS |
| **Tailwind CSS** | Utility-first CSS framework |
| **Helmet** | Security headers |
| **Morgan** | HTTP request logging |
| **Compression** | Response compression |
| **Method-Override** | HTTP method override for forms |
| **Dotenv** | Environment variable management |
| **Nodemon** | Development auto-reload |
| **Browser-Sync** | Browser synchronization |

## Project Structure

````

Books database/
│
├── server.js                 # Main application entry point
├── package.json              # Project dependencies and scripts
├── .env                      # Environment variables (gitignored)
├── .gitignore               # Git ignore rules
│
├── public/                   # Static assets
│   ├── css/
│   │   └── template.css      # Baseline component styles
│   ├── images/               # Image assets
│   └── src/
│       ├── main.css          # Tailwind input file
│       └── output.css        # Compiled Tailwind output
│
├── routes/
│   └── main-route.js         # Main route definitions
│
├── services/
│   └── db.js                 # Database connection and initialization
│
└── views/
    ├── layout.ejs            # Main layout template
    ├── index.ejs             # Home page
    │
    ├── books/
    │   ├── book-list.ejs         # Books listing page
    │   ├── new.ejs           # Add new book form
    │   └── edit.ejs          # Edit book form
    │
    └── partials/
        ├── header.ejs        # Navigation header
        └── footer.ejs        # Footer content
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Books database"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env

   PORT=3000
   PGUSER=postgres
   PGHOST=localhost
   PGDATABASE=books_database || your_database_name
   PGPASSWORD=your_password
   PGPORT=5432
   NODE_ENV=development
   ```

4. **Initialize the database**

   ```bash
   # The database table will be created automatically on first run
   # Or manually:
   psql -U postgres -d books_database -c "
   CREATE TABLE IF NOT EXISTS items (
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     author VARCHAR(255) NOT NULL,
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     status VARCHAR(50) NOT NULL DEFAULT 'To Read',
     notes TEXT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );"
   ```

### Database Setup

The application automatically creates the necessary table on startup. The `items` table stores book information:

- **id**: Unique identifier (auto-incrementing)
- **title**: Book title (required)
- **author**: Book author (required)
- **rating**: Rating from 1-5 (optional)
- **status**: Reading status (required, defaults to "To Read")
- **notes**: Personal notes (optional)
- **created_at**: Timestamp when added

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `PGUSER` | PostgreSQL username | postgres |
| `PGHOST` | PostgreSQL host | localhost |
| `PGNAME` | Database name | books_database |
| `PGPASSWORD` | Database password | - |
| `PGPORT` | PostgreSQL port | 5432 |
| `NODE_ENV` | Environment mode | development |

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Production build (minified CSS)
npm run build

# Production server
npm start

# Production with NODE_ENV set
npm run start:prod
```

## How It Works

### Server Setup

The server (`server.js`) initializes with:

1. **Security middleware**: Helmet for security headers
2. **Logging**: Morgan for HTTP request logging
3. **Compression**: Gzip compression for responses
4. **Body parsing**: JSON and URL-encoded bodies
5. **Static files**: Serves from `public/` directory
6. **View engine**: EJS with layouts
7. **Routing**: Main router for all routes

### Routing Flow

```
User Request → server.js → routes/main-route.js → Database → View Rendering → Response
```

1. **GET /**: Renders home page
2. **GET /books**: Fetches all books from database
3. **GET /books/new**: Renders add book form
4. **POST /books**: Creates new book
5. **GET /books/:id/edit**: Renders edit form
6. **PUT /books/:id**: Updates existing book
7. **DELETE /books/:id**: Deletes book

### View Rendering

The application uses EJS with layouts:

1. **Layout** (`layout.ejs`): Main HTML structure
2. **Partials**: Header and footer components
3. **Views**: Page-specific content
4. **Data Passing**: Controllers pass data to views

Example:

```javascript
res.render('books/index', { 
  title: 'My Books', 
  books: result.rows 
});
```

### Styling System

**Two-layer styling approach:**

1. **Baseline CSS** (`template.css`):
   - Custom classes for major components
   - Low specificity (single class selectors)
   - Loads first

2. **Tailwind CSS** (`output.css`):
   - Utility classes for quick styling
   - Loads after baseline CSS
   - Overrides baseline styles when needed

**CSS Load Order:**

```html
<link rel="stylesheet" href="/css/template.css">  <!-- First -->
<link rel="stylesheet" href="/css/tailwind.css">  <!-- Second -->
```

## API Routes

| Method | Route | Description | Request Body | Response |
|--------|-------|-------------|--------------|----------|
| GET | `/books` | List all books | - | HTML page |
| GET | `/books/new` | Add book form | - | HTML page |
| POST | `/books` | Create book | `{title, author, rating, status, notes}` | Redirect |
| GET | `/books/:id/edit` | Edit form | - | HTML page |
| PUT | `/books/:id` | Update book | `{title, author, rating, status, notes}` | Redirect |
| DELETE | `/books/:id` | Delete book | - | Redirect |

## Database Schema

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  status VARCHAR(50) NOT NULL DEFAULT 'To Read',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development Workflow

### Development Scripts

```bash
# Start server with nodemon
npm run start:server

# Watch and compile Tailwind CSS
npm run build:css

# Sync browser
npm run sync:browser

# Run all development tools concurrently
npm run dev
```

### Adding New Features

1. **Add database query** in route file
2. **Create view** in appropriate directory
3. **Add styling** using Tailwind classes or custom CSS
4. **Test** with `npm run dev`

### CSS Customization

1. **Baseline styles**: Edit `public/css/template.css`
2. **Tailwind utilities**: Use directly in EJS files
3. **Custom Tailwind config**: Create `tailwind.config.js`

## Deployment

### Production Build

```bash
# Install dependencies
npm install

# Build minified CSS
npm run build

# Start production server
npm start
```

### Production Considerations

- Set `NODE_ENV=production`
- Use process manager (PM2, systemd)
- Configure reverse proxy (Nginx)
- Set up SSL certificate
- Use environment-specific database credentials

### PM2 Example

```bash
npm install -g pm2
pm2 start server.js --name "book-saver"
pm2 save
pm2 startup
```

## Troubleshooting

### Common Issues

1. **Database connection error**

   ```bash
   # Check PostgreSQL is running
   sudo service postgresql status
   
   # Verify credentials in .env
   ```

2. **View not found error**

   ```bash
   # Ensure view file exists in correct directory
   # Check views directory path in server.js
   ```

3. **Tailwind CSS not applying**

   ```bash
   # Rebuild Tailwind
   npm run build:css
   ```

4. **Port already in use**

   ```bash
   # Change PORT in .env or kill process
   lsof -i :3000
   ```

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## License

ISC License - Feel free to use and modify for personal or commercial projects.
