# School Management System

A comprehensive school management system built with Next.js, TypeScript, and MySQL.

## Features

- User authentication (admin, teachers, parents, students)
- Student management
- Teacher management
- Parent management
- Class management
- Subject management
- Attendance tracking
- Exam and result management
- Events and announcements

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes, MySQL
- **Authentication**: JWT, bcrypt
- **Language**: TypeScript

## Prerequisites

- Node.js 18+
- MySQL 8.0+

## Getting Started

### Database Setup

1. Create a MySQL database:

```bash
mysql -u root -p
```

2. In the MySQL shell, run the SQL script from `src/lib/schema.sql`:

```sql
source path/to/src/lib/schema.sql
```

### Project Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd management-system
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on the provided example:

```
# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=school_management

# Authentication
JWT_SECRET=your_secure_random_string
JWT_EXPIRE=30d
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Endpoints

### Authentication

- `POST /api/auth/login` - Log in a user
- `POST /api/auth/logout` - Log out a user
- `POST /api/auth/register` - Register a new user
- `GET /api/auth/me` - Get current user profile

### Students

- `GET /api/students` - List all students (with pagination and filters)
- `POST /api/students` - Create a new student
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers

- `GET /api/teachers` - List all teachers
- `POST /api/teachers` - Create a new teacher
- `GET /api/teachers/:id` - Get teacher details
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classes

- `GET /api/classes` - List all classes
- `POST /api/classes` - Create a new class
- `GET /api/classes/:id` - Get class details
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class
- `GET /api/classes/:id/students` - Get students in a class

### Attendance

- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Create attendance records
- `GET /api/attendance/student/:id` - Get attendance for a student
- `GET /api/attendance/class/:id` - Get attendance for a class

### Exams and Results

- `GET /api/exams` - List all exams
- `POST /api/exams` - Create a new exam
- `GET /api/exams/:id` - Get exam details
- `PUT /api/exams/:id` - Update exam
- `DELETE /api/exams/:id` - Delete exam
- `GET /api/results/student/:id` - Get results for a student
- `POST /api/results` - Submit exam results

## Permissions

- **Admin**: Access to all features
- **Teachers**: Manage students, classes, attendance, exams, and results
- **Parents**: View their children's profiles, attendance, and results
- **Students**: View their profile, attendance, and results

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
"# management-system"
