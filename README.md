# 🏟️ SportyVerse – Turf Booking System

### Distributed Full-Stack Application

SportyVerse is a distributed full-stack turf booking platform designed to simplify sports facility reservations through a scalable, reliable, and secure web application.

Built using **Java, Spring Boot, React.js, MySQL, and AWS**, the platform follows a multi-tier architecture with RESTful APIs and centralized application logging.

## 🚀 Key Features

- **Turf Booking Management:** Streamlined turf booking operations.
- **RESTful APIs:** Structured backend APIs with business logic and exception handling.
- **Role-Based Access Control:** Secure access management based on user roles.
- **Database Management:** Efficient relational data management using MySQL, JPA, and Hibernate.
- **Centralized Logging:** Application monitoring and runtime diagnostics using SLF4J and Logback.
- **Cloud Deployment:** AWS-based deployment architecture designed for scalability and availability.

## 🛠️ Technology Stack

| Category | Technologies |
|---|---|
| Programming Language | Java |
| Frontend | React.js, JavaScript |
| Backend | Spring Boot, Spring Boot Microservices |
| API | REST APIs |
| ORM | JPA, Hibernate |
| Database | MySQL, Amazon RDS |
| Logging | SLF4J, Logback |
| Cloud Infrastructure | AWS EC2, S3, RDS, VPC |
| Build Tool | Maven |
| Version Control | Git, GitHub |

## 🏗️ System Architecture

The application follows a multi-tier distributed architecture.

```text
          USER
            |
            v
      React Frontend
            |
            v
       REST APIs
            |
            v
    Spring Boot Backend
            |
      ----------------
      |              |
      v              v
 Business Logic   Authentication
      |
      v
   JPA / Hibernate
      |
      v
     MySQL
   (Amazon RDS)

   Centralized Logging
     SLF4J / Logback

      AWS Infrastructure
   EC2 | S3 | RDS | VPC
```

## 📂 Project Structure

```text
SportyVersePlatform/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── logger-service/
│   └── ...
│
└── .gitignore
```

## ⚙️ Getting Started

### Prerequisites

- Java JDK
- Maven
- Node.js and npm
- MySQL

### 1. Clone Repository

```bash
git clone https://github.com/ankit00004/SportyVersePlatform.git

cd SportyVersePlatform
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
```

Configure the database connection and required application properties before starting the backend.

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Configure the frontend API endpoint to match your backend configuration.

## ☁️ AWS Deployment

The application uses AWS services as part of its deployment architecture:

- **Amazon EC2:** Application compute infrastructure.
- **Amazon S3:** Cloud storage.
- **Amazon RDS:** Managed relational database.
- **Amazon VPC:** Network isolation and infrastructure configuration.

## 🎯 Engineering Highlights

- Designed a multi-tier distributed application architecture.
- Developed backend services using Spring Boot microservices.
- Implemented structured REST APIs and role-based access control.
- Integrated MySQL using JPA/Hibernate.
- Implemented centralized logging for application diagnostics.
- Utilized AWS infrastructure for scalable application deployment.

## 👨‍💻 Author

**Ankit Bhardwaj**

GitHub: [@ankit00004](https://github.com/ankit00004)

Project Repository: [SportyVersePlatform](https://github.com/ankit00004/SportyVersePlatform)

---

⭐ If you find this project interesting, feel free to explore the repository!
