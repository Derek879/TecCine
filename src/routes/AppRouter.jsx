import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import PrivateRoute from './PrivateRoute'

import Home from '../pages/user/Home'
import Cartelera from '../pages/user/Cartelera'
import MovieDetail from '../pages/user/MovieDetail'
import Checkout from '../pages/user/Checkout'
import Historial from '../pages/user/Historial'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

import Dashboard from '../pages/admin/Dashboard'
import ManageMovies from '../pages/admin/ManageMovies'
import ManageUsers from '../pages/admin/ManageUsers'
import Reports from '../pages/admin/Reports'
import ManageFunctions from '../pages/admin/ManageFunctions'

import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cartelera" element={<Cartelera />} />
          <Route path="/pelicula/:id" element={<MovieDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/checkout/:id"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />

          <Route
            path="/historial"
            element={
              <PrivateRoute>
                <Historial />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/movies"
            element={
              <PrivateRoute adminOnly>
                <ManageMovies />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute adminOnly>
                <ManageUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <PrivateRoute adminOnly>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/functions"
            element={
              <PrivateRoute adminOnly>
                <ManageFunctions />
              </PrivateRoute>
            }
          />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  )
}