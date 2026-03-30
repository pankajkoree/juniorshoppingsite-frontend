# Junior Shopping Site Frontend

A modern, responsive e-commerce frontend built with Next.js for a junior shopping site. This application provides a seamless shopping experience with user authentication, product browsing, cart management, and order tracking.

## Features

- **User Authentication**: Secure login and signup functionality
- **Product Browsing**: View detailed product information with dynamic routing
- **Shopping Cart**: Add, remove, and manage cart items with context-based state management
- **Order Management**: Track ordered items
- **Responsive Design**: Mobile-first design using Tailwind CSS and Radix UI components
- **Real-time Updates**: Integrated with TanStack Query for efficient data fetching and caching
- **Toast Notifications**: User-friendly feedback with React Hot Toast

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives
- **State Management**: React Context API
- **Data Fetching**: TanStack React Query
- **HTTP Client**: Axios
- **Icons**: Lucide React and React Icons
- **Linting**: ESLint
- **Build Tool**: Next.js built-in

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd juniorshoppingsite-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_API_URL=https://juniorshoppingsite-backend-1.onrender.com/
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- **Home Page**: Browse featured products
- **Login/Signup**: Create an account or log in to access personalized features
- **Product Details**: Click on any product to view detailed information
- **Cart**: Add items to cart and proceed to checkout
- **Orders**: View your order history

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── carts/             # Shopping cart page
│   ├── login/             # Login page
│   ├── ordered/           # Order history page
│   ├── product/[id]/      # Dynamic product detail pages
│   ├── signup/            # Signup page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (Button, Input, etc.)
│   └── ...               # Custom components (Card, Footer, etc.)
├── context/               # React contexts for state management
│   ├── AuthContext.tsx   # Authentication state
│   └── CartContext.tsx   # Shopping cart state
├── lib/                   # Utility libraries
│   ├── api/              # API configuration
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TanStack Query](https://tanstack.com/query)
