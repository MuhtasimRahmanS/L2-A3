# Library Management Application

A **TypeScript Express.js application** to manage a library system, leveraging **MongoDB** for database operations and **Mongoose** for schema modeling. This application provides efficient CRUD operations for books, borrow/return management, and revenue/statistics calculation.

---

## Features

### Books Management

- **Create:** Add new books with details like title, author, genre, ISBN, description, and stock quantity.
- **Read:** Retrieve all books or filter by title, author, or genre.
- **View Details:** Fetch detailed information for any specific book by its ID.
- **Update:** Modify book information, including quantity and availability status.
- **Delete:** Remove books from the library database.

### Borrow Management

- **Create Borrow:** Borrow books with automatic stock adjustment.
- **Stock Validation:** Prevent borrowing if stock is insufficient.
- **Borrow Summary:** View aggregated borrow statistics per book.
- **Return Books:** (Optional) Update stock when books are returned.

### Orders / Revenue

- **Revenue Calculation:** Track library fees or book orders using MongoDB's aggregation pipeline (if applicable).

### Error Handling

- Detailed and consistent error messages.
- Input validation at all stages using **Zod** to ensure data integrity.

### Performance Optimizations

- Efficient database queries with indexed fields for faster search.
- Aggregate pipelines for complex computations (e.g., borrow statistics, revenue calculations).

---

## Technologies Used

- **Backend Framework:** Express.js with TypeScript
- **Database:** MongoDB with Mongoose
- **Validation:** Zod and Mongoose schema validation
- **Development Tools:** ESLint, Prettier, Nodemon

---

## API Endpoints

### Books

| Method | Endpoint             | Description                                         |
| ------ | -------------------- | --------------------------------------------------- |
| POST   | `/api/books`         | Create a new book                                   |
| GET    | `/api/books`         | Get all books (supports `?searchTerm={term}` query) |
| GET    | `/api/books/:bookId` | Get a specific book by ID                           |
| PUT    | `/api/books/:bookId` | Update book details                                 |
| DELETE | `/api/books/:bookId` | Delete a book                                       |

### Borrow

| Method | Endpoint              | Description                            |
| ------ | --------------------- | -------------------------------------- |
| POST   | `/api/borrow`         | Borrow a book                          |
| GET    | `/api/borrow/summary` | Get aggregated borrow summary per book |

### Orders / Revenue (Optional)

| Method | Endpoint              | Description                        |
| ------ | --------------------- | ---------------------------------- |
| POST   | `/api/orders`         | Create a new order (if applicable) |
| GET    | `/api/orders/revenue` | Get total revenue                  |

---

## Setup Instructions

### Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **MongoDB** (local or cloud-based like MongoDB Atlas)

### Step-by-Step Setup

1. **Clone the Repository**

```bash

```
