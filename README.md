# 💎 Modern Expense Tracker Dashboard

**Live Demo**: [https://expensetracker-app-a45t.onrender.com](https://expensetracker-app-a45t.onrender.com)

A high-performance, visually stunning personal finance dashboard built with a modern **Glassmorphism UI**. Track your spending, manage categories, and visualize your financial health with real-time analytics.
# Demo Video 


https://github.com/user-attachments/assets/4d45148b-bcb3-40a1-923c-b3dd94c5b05f




## ✨ Features

- **🎨 Modern Aesthetics**: Premium Glassmorphism design system with vibrant mesh gradients and smooth micro-animations.
- **📅 Smart Calendar Integration**: Select any past or current date to add expenses specifically for that day.
- **📊 Real-time Analytics**: Dynamic stat cards showing Total Spend, Monthly Trends, and Top Categories.
- **🔒 Secure Authentication**: Robust session-based auth with personalized user profiles.
- **📱 Fully Responsive**: Seamless experience across mobile, tablet, and desktop devices.
- **🌑 Light/Dark Ready**: Curated color palettes designed for maximum readability and visual appeal.

## 🚀 Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (via Supabase), Drizzle ORM
- **State Management**: React Hooks & Context
- **Validation**: Zod (Full-stack type safety)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (`npm install -g pnpm`)
- PostgreSQL Database (or Supabase URL)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Asijain019/ExpenseTracker_App.git
   cd ExpenseTracker_App
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="your_postgresql_url"
   SESSION_SECRET="your_secret_key"
   ```

4. **Initialize the database:**
   ```bash
   pnpm -F @workspace/api-server db:push
   ```

5. **Run the development server:**
   ```bash
   pnpm dev
   ```

## 📂 Project Structure

- `client/`: React frontend source code and UI assets.
- `server/`: Express API server and database schema definitions.
- `.env.example`: Template for environment variables.

---

Built with ❤️ by [Asijain019](https://github.com/Asijain019)
