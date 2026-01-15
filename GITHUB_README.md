# 🚀 MLab - Modern IT Services Portfolio

![Project Banner](public/images/readme-banner.png)
> *Note: Please replace `public/images/readme-banner.png` with an actual screenshot of your project's hero section.*

## 📋 Overview

**MLab Portfolio** is a cutting-edge, high-performance web application designed to showcase IT services and professional projects. Built with **Next.js 16**, **TypeScript**, and **React 19**, it represents a modern approach to web development, prioritizing **performance**, **accessibility**, and **user experience**.

This project is not just a static site; it includes dynamic integrations such as a **WhatsApp automated webhook**, **SMTP email handling**, and robust **Internationalization (i18n)** support for English, Spanish, and Italian audiences.

## ✨ Key Features

### 🎨 User Interface & Experience
- **Modern Design System**: Clean, responsive UI with a mobile-first approach.
- **Dark/Light Mode**: Fully supported theming with persistent state and smooth transitions.
- **Animations**: Powered by **Framer Motion** for engaging scroll reveals, micro-interactions, and smooth transitions.
- **Responsive Navigation**: Smart navbar that auto-hides on scroll and adapts to all screen sizes.

### 🛠️ Technical Excellence
- **Next.js 16 (App Router)**: Utilizing React Server Components for optimal performance and SEO.
- **TypeScript**: Strict type capability for code reliability and maintainability.
- **Internationalization (i18n)**: Complete multi-language support (ES, EN, IT) using `next-intl` with middleware routing.
- **Optimization**: Fast load times with optimized assets and Next.js built-in performance features.

### 🔌 Integrations & Backend
- **Contact Form**: Secure email delivery system (Nodemailer/Zoho/Resend).
- **WhatsApp Integration**: Custom webhook implementation for real-time messaging interactions (Twilio/Local/Ngrok).
- **Analytics Ready**: Structure prepared for SEO and analytics integration.

## � Documentation

For more detailed information about specific aspects of this project:

- [**Features Documentation**](FEATURES.md) - Deep dive into all implemented features.
- [**Deployment Guide**](DEPLOYMENT.md) - How to deploy this project to Vercel/Netlify.
- [**Customization Guide**](CUSTOMIZATION.md) - Instructions for tailoring the portfolio.
- [**WhatsApp Local Setup**](WHATSAPP-LOCAL-NGROK.md) - Testing the webhook locally.

## �💻 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Core** | ![Next JS](https://img.shields.io/badge/Next-white?style=flat&logo=next.js&logoColor=black) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white) |
| **Styling** | ![SASS](https://img.shields.io/badge/SASS-hotpink?style=flat&logo=SASS&logoColor=white) ![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=flat&logo=css-modules&logoColor=white) |
| **Animation** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=blue) ![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat&logo=swiper&logoColor=white) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) ![Nodemailer](https://img.shields.io/badge/Nodemailer-007ACC?style=flat&logo=gmail&logoColor=white) |
| **DevOps** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat&logo=eslint&logoColor=white) |

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mlab-portfolio.git
   cd mlab-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add necessary keys (Email config, Twilio auth, etc.).

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📂 Project Structure

```bash
mlab-portfolio/
├── messages/          # Locale JSON files (en, es, it)
├── public/            # Static assets
├── src/
│   ├── app/           # Next.js App Router pages & layouts
│   ├── components/    # Reusable UI components (Hero, About, etc.)
│   ├── contexts/      # React Contexts (Theme, etc.)
│   ├── data/          # Static data (portfolio items, etc.)
│   └── styles/        # Global SCSS and variables
└── ...configuration files
```

## 📬 Contact & Hire Me

I am currently open to new opportunities! If you like this portfolio and need a skilled Full Stack Developer, feel free to reach out.

- **Portfolio**: [Your Portfolio Link](https://your-portfolio.com)
- **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- **Email**: contact@your-email.com

---

*Built with ❤️ by [Your Name]*
