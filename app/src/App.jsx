import {Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    </Provider>
  );
}

export default App;