import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';

const Dashboard = React.lazy(() => import('./pages/ToDoList'))
const Login = React.lazy(() => import('./pages/FirstPage'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
