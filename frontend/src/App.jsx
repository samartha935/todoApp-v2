
import {BrowserRouter, Routes , Route } from "react-router-dom"
import { Root } from "./pages/Root"
import { Signup } from './pages/Signup'
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { UserAccount } from "./pages/UserAccount"

function App() {



  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root   />} />
      <Route path="/signup" element={<Signup   />} />
      <Route path="/signin" element={<Signin   />} />
      <Route path="/dashboard" element={<Dashboard   />} />
      <Route path="/user" element={<UserAccount   />} />
    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
