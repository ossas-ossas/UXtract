import './App.css'
import { FaTachometerAlt, FaFolderOpen, FaUpload, FaCreditCard, FaSearch, FaPlus, FaCog } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const projects = [
  { key: 'project1', name: 'Project Alpha', avatar: '/assets/project_avatar1.svg' },
  { key: 'project2', name: 'Project Beta', avatar: '/assets/project_avatar2.svg' },
  { key: 'project3', name: 'Project Gamma', avatar: '/assets/project_avatar3.svg' },
  { key: 'project4', name: 'Project Delta', avatar: '/assets/project_avatar4.svg' },
]

const mainNav = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt />, path: '/insights' },
  { key: 'workspace', label: 'Workspace', icon: <FaFolderOpen />, path: '/workspace' },
]
const manageNav = [
  { key: 'billing', label: 'Billing', icon: <FaCreditCard />, path: '/insights?tab=billing' },
]

export default function Sidebar({ onSearchClick }) {
  const location = useLocation()
  const navigate = useNavigate()

  function isActive(path) {
    if (path === '/insights') return location.pathname === '/insights'
    if (path === '/workspace') return location.pathname === '/workspace'
    if (path === '/upload') return location.pathname === '/upload'
    if (path.startsWith('/insights?tab=billing')) return location.pathname === '/insights' && location.search.includes('billing')
    if (path.startsWith('/insights?tab=search')) return location.pathname === '/insights' && location.search.includes('search')
    return false
  }

  function handleNav(path) {
    navigate(path)
  }
  function handleSettingsClick() {
    navigate('/settings')
  }

  return (
    <aside className="sidebar-modern">
      <div className="sidebar-logo-gradient">UXtract</div>
      <div className="sidebar-search-btn-row">
        <button
          className="sidebar-search-btn"
          onClick={onSearchClick}
          aria-label="Open Search"
        >
          <FaSearch className="sidebar-search-icon" />
          <span className="sidebar-search-label">Search</span>
        </button>
      </div>
      <div className="sidebar-divider" />
      <div className="sidebar-section-title">MAIN</div>
      <nav className="sidebar-nav">
        {mainNav.map(item => (
          <div
            key={item.key}
            className={`sidebar-modern-item${isActive(item.path) ? ' active' : ''}`}
            onClick={() => handleNav(item.path)}
          >
            <span className="sidebar-modern-icon">{item.icon}</span>
            <span className="sidebar-modern-label">{item.label}</span>
            {isActive(item.path) && <span className="sidebar-modern-indicator" />}
          </div>
        ))}
      </nav>
      <div className="sidebar-divider" />
      <div className="sidebar-section-title">MANAGEMENT</div>
      <nav className="sidebar-nav">
        {manageNav.map(item => (
          <div
            key={item.key}
            className={`sidebar-modern-item${isActive(item.path) ? ' active' : ''}`}
            onClick={() => handleNav(item.path)}
          >
            <span className="sidebar-modern-icon">{item.icon}</span>
            <span className="sidebar-modern-label">{item.label}</span>
            {isActive(item.path) && <span className="sidebar-modern-indicator" />}
          </div>
        ))}
      </nav>
      <div className="sidebar-divider" />
      <div className="sidebar-section-title">PROJECTS</div>
      <nav className="sidebar-nav projects">
        {projects.map(p => (
          <div
            key={p.key}
            className={`sidebar-modern-item project`}
          >
            <img src={p.avatar} alt={p.name} className="sidebar-project-avatar" />
            <span className="sidebar-modern-label">{p.name}</span>
          </div>
        ))}
      </nav>
      <button
        className="sidebar-new-project-btn"
        onClick={() => navigate('/create-project')}
      >
        <FaPlus style={{marginRight:8}} /> New Project
      </button>
      <div className="sidebar-footer-modern">
        <img src="/assets/footer_user.svg" alt="footer user" className="sidebar-footer-avatar" />
        <div className="sidebar-footer-userinfo">
          <div className="sidebar-footer-row">
            <span className="sidebar-footer-name">Jane Doe</span>
            <span className="sidebar-footer-cog" onClick={handleSettingsClick}><FaCog /></span>
          </div>
          <div className="sidebar-footer-premium">Premium</div>
        </div>
      </div>
    </aside>
  )
} 