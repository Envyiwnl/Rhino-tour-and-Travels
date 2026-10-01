import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import About from "./pages/About";
import Destinations from "./pages/Destinations";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";

const DestinationDetails = lazy(() => import("./pages/DestinationDetails"));
const Contact = lazy(() => import("./pages/Contact"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

function App() {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:not-sr-only focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
      >
        {t("accessibility.skipToMain")}
      </a>

      <Navbar />

      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/destinations" element={<Destinations />} />

            <Route
              path="/destinations/:slug"
              element={<DestinationDetails />}
            />

            <Route path="/login" element={<Login />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="/terms" element={<TermsConditions />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
