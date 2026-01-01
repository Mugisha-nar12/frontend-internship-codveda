import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import FacilityDetailsPage from "./pages/FacilityDetailsPage";
import SavedPage from "./pages/SavedPage";
import AboutPage from "./pages/About";
import Privacy from "./pages/Privacy";
import DistrictsPage from "./pages/DistrictsPage";
import DistrictPage from "./pages/DistrictPage";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/facility/:id" element={<FacilityDetailsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/districts" element={<DistrictsPage />} />
        <Route path="/district/:district" element={<DistrictPage />} />
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
