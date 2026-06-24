import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";

import Layout from "./layout/Layout";

// Lazy-loaded page components for better bundle size and performance
const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UrlScanner = lazy(() => import("./pages/UrlScanner"));
const EmailScanner = lazy(() => import("./pages/EmailScanner"));
const JobScanner = lazy(() => import("./pages/JobScanner"));
const DeepfakeScanner = lazy(() => import("./pages/DeepfakeScanner"));
const ThreatIntel = lazy(() => import("./pages/ThreatIntel"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Reports = lazy(() => import("./pages/Reports"));

// Instantiate the TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Premium cyber loading fallback
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
    <div className="w-12 h-12 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="text-xs font-mono text-cyan-400 tracking-widest animate-pulse uppercase">decrypting data terminal...</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* The landing page should be the raw entry point */}
              <Route path="/" element={<Landing />} />
              
              {/* Other console views wrapped in our cybersecurity Layout */}
              <Route
                path="/dashboard"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route
                path="/url"
                element={
                  <Layout>
                    <UrlScanner />
                  </Layout>
                }
              />
              <Route
                path="/email"
                element={
                  <Layout>
                    <EmailScanner />
                  </Layout>
                }
              />
              <Route
                path="/job"
                element={
                  <Layout>
                    <JobScanner />
                  </Layout>
                }
              />
              <Route
                path="/deepfake"
                element={
                  <Layout>
                    <DeepfakeScanner />
                  </Layout>
                }
              />
              <Route
                path="/threat-intel"
                element={
                  <Layout>
                    <ThreatIntel />
                  </Layout>
                }
              />
              <Route
                path="/analytics"
                element={
                  <Layout>
                    <Analytics />
                  </Layout>
                }
              />
              <Route
                path="/reports"
                element={
                  <Layout>
                    <Reports />
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;