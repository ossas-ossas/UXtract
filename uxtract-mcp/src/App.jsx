import './App.css'
import './index.css'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InsightsNavigator from './InsightsNavigator'
import Welcome from './Welcome'
import Upload from './Upload'
import Workspace from './Workspace'
import Settings from './Settings'
import CreateProject from './CreateProject'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    // 伪登录，直接跳转
    navigate('/insights')
  }
  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-illustration">
          <img src="/illustration.png" alt="illustration" />
        </div>
        <div className="login-content">
          <h1 className="login-title">UXtract</h1>
          <div className="login-heading">
            <div className="login-heading-main">Let's extract insights!</div>
            <div className="login-heading-sub">Welcome back to UXtract – your AI-powered UX research assistant</div>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="login-field">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="login-btn" type="submit">Sign In</button>
          </form>
          <div className="login-divider">
            <div className="divider-line"></div>
            <span>or</span>
            <div className="divider-line"></div>
          </div>
          <div className="login-social">
            <button className="social-btn">
              <FcGoogle size={22} style={{marginRight: 8}} /> Google Account
            </button>
            <button className="social-btn">
              <FaApple size={22} style={{marginRight: 8}} /> Apple Account
            </button>
          </div>
          <div className="login-signup">
            <span className="signup-tip">Don't have an account?</span>
            <a className="signup-link" href="#">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/insights" element={<InsightsNavigator />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-project" element={<CreateProject />} />
      </Routes>
    </Router>
  )
}

export default App
