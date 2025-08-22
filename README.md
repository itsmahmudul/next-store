Next.js E-Commerce Store with Authentication
https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js
https://img.shields.io/badge/NextAuth.js-5.0-purple?style=for-the-badge
https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript
https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css

A modern e-commerce application built with Next.js 15 featuring public and protected pages with authentication using NextAuth.js. Users can browse products, view details, and after logging in, access a protected dashboard to manage products.

✨ Features
Public Landing Page with navigation, hero section, product highlights, and footer

Authentication System using NextAuth.js with social login (Google)

Product Catalog with listing and detail pages

Protected Dashboard for product management

Responsive Design with Tailwind CSS

Theme Toggle for light/dark mode

🚀 Live Demo
🌐 Live Application: https://next-store-silk-one.vercel.app/

📦 Getting Started
Prerequisites
Node.js 18.0 or higher

npm, yarn, pnpm, or bun

Google OAuth credentials (for social login)

Installation
Clone the repository:

bash
git clone https://github.com/itsmahmudul/next-store.git
cd next-store
Install dependencies:

bash
npm install
# or
yarn install
# or
pnpm install
Set up environment variables:

bash
cp .env.example .env.local
Configure your environment variables in .env.local:

env
# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database (if using)
DATABASE_URL=your-database-url
Run the development server:

bash
npm run dev
# or
yarn dev
# or
pnpm dev
Open http://localhost:3000 in your browser.

🛣️ Route Summary
Public Routes
/ - Landing page with hero section and product highlights

/products - Product listing page

/products/[id] - Individual product details page

/login - Authentication page

Protected Routes (Requires Authentication)
/dashboard - User dashboard

/dashboard/add-product - Add new product form

/dashboard/products - Manage existing products

API Routes
/api/auth/[...nextauth] - NextAuth.js authentication endpoints

/api/products - Product CRUD operations

/api/products/[id] - Single product operations

🏗️ Project Structure
text
next-store/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   ├── products/
│   │   └── products/[id]/
│   ├── dashboard/
│   │   ├── add-product/
│   │   ├── products/
│   │   └── page.js
│   ├── products/
│   │   └── [id]/
│   ├── login/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── auth/
│   ├── dashboard/
│   ├── products/
│   ├── ui/
│   └── layout/
├── lib/
│   ├── auth.js
│   ├── db.js
│   └── utils.js
├── types/
├── public/
└── styles/
🔐 Authentication
This application uses NextAuth.js for authentication with the following providers:

Google OAuth - Social login

Credentials (optional) - Email/password login

Setting up Google OAuth
Go to the Google Cloud Console

Create a new project or select an existing one

Navigate to "APIs & Services" > "Credentials"

Create an OAuth 2.0 Client ID

Add http://localhost:3000/api/auth/callback/google to authorized redirect URIs

Copy the Client ID and Client Secret to your .env.local file

🛠️ Technologies Used
Framework: Next.js 15 with App Router

Authentication: NextAuth.js

Styling: Tailwind CSS

Language: TypeScript

Database: JSON file (can be replaced with any database)

Icons: Lucide React

Form Handling: React Hook Form

Validation: Zod

📦 Building for Production
Create a production build:

bash
npm run build
# or
yarn build
# or
pnpm build
Start the production server:

bash
npm start
# or
yarn start
# or
pnpm start
🚀 Deployment
Deploy to Vercel (Recommended)
Push your code to GitHub

Connect your repository to Vercel

Add your environment variables in the Vercel dashboard

Vercel will automatically deploy your application

Environment Variables for Production
Make sure to set these environment variables in your production environment:

NEXTAUTH_URL - Your production URL

NEXTAUTH_SECRET - A secure random string

GOOGLE_CLIENT_ID - Your production Google Client ID

GOOGLE_CLIENT_SECRET - Your production Google Client Secret

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request


📞 Support
If you have any questions or need help:

Open an issue on GitHub

Check the Next.js documentation

Refer to the NextAuth.js documentation

🙏 Acknowledgments
Next.js team for the amazing framework

NextAuth.js team for authentication solution

Tailwind CSS for the utility-first CSS framework

Vercel for seamless deployment

