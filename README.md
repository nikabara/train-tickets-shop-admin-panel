# RailwayTicketsAdmin Documentation

This documentation provides a comprehensive overview of the **RailwayTicketsAdmin** project. It is the frontend administration dashboard designed to work in tandem with the [RailwayTicketsAPI](https://github.com/nikabara/RailwayTicketsAPI).

A modern, responsive Administrative Panel built with **Angular 19** for managing the Railway Ticket system. This dashboard allows administrators to manage train schedules, monitor ticket sales, and oversee system data.

## 🚀 Overview

**RailwayTicketsAdmin** provides a user-friendly interface for the backend Railway system. It is designed to handle administrative tasks such as adding new trains, defining routes, and managing user roles through a secure, Single Page Application (SPA) architecture.

### Technical Stack

* **Framework:** Angular 19
* **Language:** TypeScript
* **Styling:** SASS / Tailwind CSS (or Angular Material) / Bootstrap / Syncfusion
* **State Management:** RxJS
* **Communication:** HttpClient (REST API)

---

## 📂 Project Structure

The project follows the standard Angular modular structure with a focus on feature-based organization:

```text
train-tickets-shop-admin-panel/
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components (Sidebar, Navbar, Cards)
│   │   ├── pages/           # Main views (Dashboard, Trains, Tickets, Login)
│   │   ├── services/        # API communication logic
│   │   ├── models/          # TypeScript interfaces/classes
│   │   ├── guards/          # Auth guards for route protection
│   │   └── app.routes.ts    # Frontend routing configuration
│   ├── assets/              # Images, icons, and static files
│   └── environments/        # API endpoint configurations (Prod/Dev)
├── package.json             # Dependencies and scripts
└── angular.json             # Angular CLI configuration

```

---

## 🛠️ Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (LTS Version recommended)
* [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
* A running instance of the [RailwayTicketsAPI](https://github.com/nikabara/RailwayTicketsAPI)

### Installation

1. **Clone the repository (Specific Branch):**
To ensure you have the correct version, clone the `FInalProjectVersion` branch specifically:
```bash
git clone -b FInalProjectVersion https://github.com/nikabara/train-tickets-shop-admin-panel.git
cd train-tickets-shop-admin-panel

```


2. **Install Dependencies:**
```bash
npm install

```


3. **Configure Environment:**
Open `src/environments/environment.ts` and ensure the `apiUrl` points to your running .NET API:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};

```


4. **Run the Application:**
```bash
ng serve

```


The admin panel will be accessible at `http://localhost:4200`.

---

## 🖥️ Features & Functionality

### 📊 Dashboard

* Overview of total tickets sold and active train schedules.
* Visual representation of system statistics.

### 🚂 Train Management

* **Add/Edit Trains:** Define train types, capacity, and seat layouts.
* **Route Planning:** Assign trains to specific stations and set departure/arrival times.

### 🎫 Ticket Oversight

* View all booked tickets across the system.
* Ability to manually cancel or modify reservations if required.

### 🔐 Admin Authentication

* Secure login portal for authorized staff only.
* JWT storage and automatic attachment to API requests via HTTP Interceptors.

---

## 🔧 Build & Deployment

To build the project for a production environment:

```bash
ng build --configuration production

```

The compiled files will be located in the `dist/` folder, ready to be hosted on any static web server (Nginx, Firebase, Azure Static Web Apps, etc.).

---

## 📝 License

This project is part of the Railway Ticket System suite and is licensed under the MIT License.

## 👥 Contributors

* **Nika Baratashvili** ([@nikabara](https://github.com/nikabara)) - Frontend Architecture & UI/UX
