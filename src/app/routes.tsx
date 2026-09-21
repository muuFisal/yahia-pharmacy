import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazyRoute, standaloneLazyRoute } from '../components/layout/lazyRouteHelpers';
import MainLayout from '../components/layout/MainLayout';
import {
  importHomePage,
  importProductsPage,
  importAboutPage,
  importContactPage,
  importNotFoundPage,
  importDashboardLayout,
  importAdminLoginPage,
  importDashboardOverview,
  importForbiddenPage,
} from './routeImporters';
import { RequireGuest } from '../features/dashboard/guards/RequireGuest';

// ── Dashboard Routes (nested under DashboardLayout) ─────────
const dashboardRoutes = (
  <>
    <Route index element={lazyRoute(importDashboardOverview)} />
    <Route path="forbidden" element={lazyRoute(importForbiddenPage)} />
    <Route path="*" element={lazyRoute(importNotFoundPage)} />
  </>
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Website Routes ── */}
        <Route element={<MainLayout />}>
          <Route index element={lazyRoute(importHomePage)} />
          <Route path="products" element={lazyRoute(importProductsPage)} />
          <Route path="about" element={lazyRoute(importAboutPage)} />
          <Route path="contact" element={lazyRoute(importContactPage)} />
          <Route path="*" element={lazyRoute(importNotFoundPage)} />
        </Route>

        {/* ── Dashboard Routes ── */}
        <Route
          path="/admin/login"
          element={
            <RequireGuest>
              {standaloneLazyRoute(importAdminLoginPage)}
            </RequireGuest>
          }
        />
        <Route
          path="/dashboard/login"
          element={
            <RequireGuest>
              {standaloneLazyRoute(importAdminLoginPage)}
            </RequireGuest>
          }
        />
        <Route path="/admin/dashboard" element={lazyRoute(importDashboardLayout)}>
          {dashboardRoutes}
        </Route>
        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Redirect /admin → /admin/dashboard */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
