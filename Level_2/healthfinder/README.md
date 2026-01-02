# HealthFinder

HealthFinder is a modern, responsive React application designed to help users in Rwanda easily locate trusted health services. Whether you're looking for a clinic, vaccination center, or hospital, HealthFinder provides a seamless experience to search by name, type, or location. The application is built with a focus on user experience, providing an intuitive interface and powerful search capabilities.

## Vision

The vision behind HealthFinder is to bridge the information gap between citizens and healthcare providers in Rwanda. By offering a centralized, easy-to-use platform, we aim to empower individuals to make informed decisions about their health. Our goal is to ensure that everyone has access to reliable information about healthcare facilities, ultimately contributing to a healthier community.

## Functionality

HealthFinder offers a range of features designed to make finding health services as easy as possible:

- **Search by Name, Type, or Location**: Users can search for facilities using various criteria, making it easy to find what they're looking for.
- **Proximity Search**: The application can use the user's location to find the nearest health services.
- **Interactive Map View**: Search results can be displayed on an interactive map, providing a visual representation of facility locations.
- **Detailed Facility Information**: Users can view detailed information about each facility, including its name, address, and contact information.
- **Responsive Design**: The application is fully responsive and works seamlessly on desktops, tablets, and mobile devices.
- **Fallback Data**: In case the backend API is unavailable, the application uses a local fallback dataset to ensure that users can still access essential information.

## Project Structure

The project is organized into a clean and maintainable structure, with a clear separation of concerns. Here's an overview of the main directories and files:

```
/
├── backend/
│   ├── data/
│   │   └── facilities.json
│   └── server.js
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   ├── data.js
│   │   └── healthService.js
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── Categories.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── MapView.jsx
│   │   ├── SearchBar.jsx
│   │   └── SearchResults.jsx
│   ├── data/
│   │   └── facilities.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── DistrictPage.jsx
│   │   ├── DistrictsPage.jsx
│   │   ├── FacilityDetailsPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── Privacy.jsx
│   │   ├── SavedPage.jsx
│   │   └── SearchResultsPage.jsx
│   ├── utils/
│   │   ├── bookmarks.js
│   │   └── geo.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

- **`backend/`**: Contains the backend server code, including the API and data sources.
- **`public/`**: Contains static assets that are publicly accessible.
- **`src/`**: The main source code directory, containing all the React components, pages, and business logic.
  - **`api/`**: Handles communication with the backend API.
  - **`assets/`**: Contains static assets like images and icons.
  - **`components/`**: Reusable React components used throughout the application.
  - **`data/`**: Contains the fallback data used when the backend is unavailable.
  - **`pages/`**: The main pages of the application, each corresponding to a specific route.
  - **`utils/`**: Utility functions used across the application.
  - **`App.jsx`**: The main application component, which sets up the routing.
  - **`main.jsx`**: The entry point of the application.
- **`package.json`**: Lists the project's dependencies and scripts.

## Getting Started

To get started with HealthFinder, follow these simple steps:

1. **Clone the Repository**

   First, clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/Mugisha-nar12/frontend-internship-codveda.git
   ```

2. **Navigate to the Project Directory**

   Next, navigate to the project directory:

   ```bash
   cd frontend-internship-codveda/Level_2/healthfinder
   ```

3. **Install Dependencies**

   Install the necessary dependencies using npm:

   ```bash
   npm install
   ```

4. **Start the Development Server**

   Finally, start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:5173](http://localhost:5173).

## Available Scripts

In the project directory, you can run the following scripts:

- **`npm run dev`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Lints the code using ESLint.
- **`npm run preview`**: Previews the production build locally.