# 🌍 Wanderlust - Travel & Accommodation Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-16.x-brightgreen)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248)](https://www.mongodb.com/)

Wanderlust is a full-stack web application that allows users to explore, review, and book unique travel accommodations around the world. Built with Node.js, Express, MongoDB, and EJS, this platform provides a seamless experience for travelers to discover their next adventure.

## 🚀 Features

- **User Authentication**
  - Secure signup and login functionality
  - Password hashing with bcrypt
  - Session management with express-session

- **Listings**
  - View all available travel accommodations
  - Detailed view for each listing
  - Create, edit, and delete listings (owner only)
  - Image uploads with Cloudinary integration

- **Reviews & Ratings**
  - Leave and read reviews
  - Star rating system
  - Edit and delete your own reviews

- **Interactive Map**
  - Location-based search
  - Interactive map view for each listing
  - Geolocation services

- **Responsive Design**
  - Mobile-first approach
  - Fully responsive layout
  - Optimized for all screen sizes

## 🛠️ Tech Stack

- **Frontend**
  - HTML5, CSS3, JavaScript (ES6+)
  - EJS templating engine
  - Bootstrap 5 for responsive design
  - Mapbox GL JS for interactive maps

- **Backend**
  - Node.js with Express.js
  - MongoDB with Mongoose ODM
  - Cloudinary for image storage
  - Passport.js for authentication
  - Express Validator for form validation

- **Development Tools**
  - Nodemon for automatic server restarts
  - Dotenv for environment variables
  - Git for version control

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn package manager
- Cloudinary account (for image uploads)
- Mapbox access token (for maps)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   MAPBOX_TOKEN=your_mapbox_token
   SESSION_SECRET=your_session_secret
   DB_URL=mongodb://localhost:27017/wanderlust
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Visit `http://localhost:3000` to see the application in action.

## 📱 Responsive Design

The application is fully responsive and works seamlessly across all device sizes. Key responsive features include:

- Fluid grid layouts that adapt to any screen size
- Flexible images and media queries
- Mobile-friendly navigation
- Optimized forms and buttons for touch interactions
- Full-screen mode for mobile devices

## 📂 Project Structure

```
wanderlust/
├── controllers/        # Route controllers
├── init/              # Initialization scripts
├── models/            # Database models
├── public/            # Static files
│   ├── css/           # Stylesheets
│   ├── js/            # Client-side JavaScript
│   └── images/        # Static images
├── routes/            # Route definitions
├── utils/             # Utility functions
├── views/             # EJS templates
│   ├── includes/      # Reusable components
│   ├── layouts/       # Layout templates
│   ├── listings/      # Listing-related views
│   └── users/         # User-related views
├── .env.example      # Example environment variables
├── app.js            # Main application file
├── package.json      # Project dependencies
└── README.md         # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for the responsive design framework
- [Cloudinary](https://cloudinary.com/) for image storage and manipulation
- [Mapbox](https://www.mapbox.com/) for interactive maps
- [Font Awesome](https://fontawesome.com/) for icons
- All the amazing open-source libraries that made this project possible