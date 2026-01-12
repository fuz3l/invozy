import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';

import CreateInvoice from './pages/CreateInvoice';
import InvoiceList from './pages/InvoiceList';
import PrintPreview from './pages/PrintPreview';

// Private Route Component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="create-invoice" element={<CreateInvoice />} />
            <Route path="invoices" element={<InvoiceList />} />
            <Route path="print-preview" element={<PrintPreview />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
