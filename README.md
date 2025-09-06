# Airbnb Hotel Booking Frontend

A modern React-based frontend for a hotel booking platform inspired by Airbnb. This project allows users to browse, search, and book hotels with a clean and interactive user interface.

## Features

- **User Authentication:** Sign up and log in with form validation.
- **Hotel Listings:** Browse a curated list of hotels with images, prices, and locations.
- **Category Filters:** Filter hotels by categories such as Cabins, Beach, Luxury, and more.
- **Responsive Design:** Fully responsive layout for desktop and mobile devices.
- **Protected Routes:** Only authenticated users can access the main booking page.
- **Social Login UI:** UI for social logins (Facebook, Google, Apple).

## Tech Stack

- [React](https://react.dev/) (with Hooks)
- [Vite](https://vitejs.dev/) for fast development
- [React Router](https://reactrouter.com/) for routing
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Font Awesome](https://fontawesome.com/) for icons
- Custom CSS for styling

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Run the development server:**
   ```sh
   npm run dev
   ```

3. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) to view the app.

## Project Structure

```
src/
  components/      # Header, Footer, Body (hotel listings)
  pages/           # Home, Login, SignUp pages
  assets/          # Static assets (e.g., images)
  App.jsx          # Main app component with routing
  main.jsx         # Entry point
public/
  airbnb.jpeg      # Favicon/logo
```

## Usage

- **Sign Up:** Create a new account on the Sign Up page.
- **Log In:** Access your account using your credentials.
- **Browse Hotels:** View and filter available hotels on the Home page.
- **Book Hotels:** (UI only; booking functionality is not connected to a backend.)

## Customization

- Update hotel listings and categories in [`src/components/Body.jsx`](src/components/Body.jsx).
- Modify authentication logic in [`src/pages/Login.jsx`](src/pages/Login.jsx) and [`src/pages/SignUp.jsx`](src/pages/SignUp.jsx).

## License

This project is for educational/demo purposes only and is not affiliated