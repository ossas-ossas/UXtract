import './App.css'
import { useState } from 'react'
import { FaTachometerAlt, FaFolderOpen, FaUpload, FaCreditCard, FaSearch, FaPlus, FaCog, FaChartBar, FaRobot, FaUsers, FaClock } from 'react-icons/fa'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { CSSTransition } from 'react-transition-group'

const projects = [
  { key: 'project1', name: 'Project Alpha', avatar: '/assets/project_avatar1.svg' },
  { key: 'project2', name: 'Project Beta', avatar: '/assets/project_avatar2.svg' },
  { key: 'project3', name: 'Project Gamma', avatar: '/assets/project_avatar3.svg' },
  { key: 'project4', name: 'Project Delta', avatar: '/assets/project_avatar4.svg' },
]

const mainNav = [
  { key: 'dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { key: 'workspace', label: 'Workspace', icon: <FaFolderOpen /> },
  { key: 'upload', label: 'Upload', icon: <FaUpload /> },
]
const manageNav = [
  { key: 'billing', label: 'Billing', icon: <FaCreditCard /> },
  { key: 'search', label: 'Search', icon: <FaSearch /> },
]

export default function InsightsNavigator() {
  const [showSearch, setShowSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const tabFromUrl = params.get('tab')

  // 动态信息区块 mock
  const dashboardNotices = [
    { type: 'info', icon: <FaRobot />, text: 'AI analysis completed for Project Alpha.', time: '09:24' },
    { type: 'reminder', icon: <FaChartBar />, text: '3 new reports generated this week.', time: 'Yesterday' },
    { type: 'alert', icon: <FaUsers />, text: 'Team member Tom joined Project Beta.', time: '2 days ago' },
  ]

  function handleTabClick(type) {
    // 这里可以根据需要跳转页面，比如用react-router-dom
    // navigate(`/insights/${type}`)
  }
  function handleSearchInput(e) {
    setSearchValue(e.target.value)
    // 模拟搜索结果
    if (e.target.value.trim()) {
      setSearchResults([
        `UXtract help doc about "${e.target.value}"`,
        `How to use multi-color palettes in UXtract`,
        `UXtract upload FAQ`,
        `UXtract team collaboration guide`,
      ])
    } else {
      setSearchResults([])
    }
  }
  function handleCloseSearch() {
    setShowSearch(false)
    setSearchValue('')
    setSearchResults([])
  }
  function handleSettingsClick() {
    navigate('/settings')
  }

  return (
    <div className="insights-root">
      <Sidebar onSearchClick={() => setShowSearch(true)} />
      <main className="insights-main">
        {/* <header className="insights-topbar">
          <button className="go-back-btn" onClick={() => navigate(-1)}>Go Back ←</button>
        </header> */}
        <section className="insights-content">
          {tabFromUrl === 'billing' ? (
            <div className="billing-page">
              <h2 className="billing-title">Choose Your Plan</h2>
              <div className="billing-cards">
                <div className="billing-card billing-free">
                  <div className="billing-card-title">Free</div>
                  <ul className="billing-card-features">
                    <li>Up to 5 AI analyses/month</li>
                    <li>Export disabled</li>
                    <li>Solo use only</li>
                    <li>Standard support</li>
                  </ul>
                  <button className="billing-card-btn" disabled>Current Plan</button>
                </div>
                <div className="billing-card billing-pro">
                  <div className="billing-card-title">Pro</div>
                  <ul className="billing-card-features">
                    <li>Up to 50 AI analyses/month</li>
                    <li>Export to PDF & CSV</li>
                    <li>Advanced insights dashboard</li>
                    <li>Priority support</li>
                  </ul>
                  <button className="billing-card-btn">Upgrade</button>
                </div>
                <div className="billing-card billing-enterprise">
                  <div className="billing-card-title">Enterprise</div>
                  <ul className="billing-card-features">
                    <li>Unlimited AI analyses</li>
                    <li>Full export options (PDF, CSV, Markdown)</li>
                    <li>Team collaboration (up to 10 members)</li>
                    <li>Enterprise-level support</li>
                  </ul>
                  <button className="billing-card-btn">Contact Sales</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="dashboard-page">
              <h2 className="dashboard-title">Welcome back, Jane!</h2>
              <div className="dashboard-overview">
                <div className="dashboard-overview-card gradient-blue">
                  <div className="dashboard-overview-icon"><FaFolderOpen /></div>
                  <div className="dashboard-overview-label">Projects</div>
                  <div className="dashboard-overview-value dashboard-animate">4</div>
                  <svg className="dashboard-mini-chart" width="72" height="24"><rect x="2" y="10" width="8" height="12" rx="3" fill="#B6F09C"/><rect x="14" y="6" width="8" height="16" rx="3" fill="#87DDEE"/><rect x="26" y="2" width="8" height="20" rx="3" fill="#4D62E5"/><rect x="38" y="8" width="8" height="14" rx="3" fill="#B6F09C"/><rect x="50" y="12" width="8" height="10" rx="3" fill="#87DDEE"/></svg>
                  <div className="dashboard-overview-mini-bar"><div className="mini-bar" style={{width:'80%'}}></div></div>
                </div>
                <div className="dashboard-overview-card gradient-green">
                  <div className="dashboard-overview-icon"><FaRobot /></div>
                  <div className="dashboard-overview-label">AI Analyses</div>
                  <div className="dashboard-overview-value dashboard-animate">128</div>
                  <svg className="dashboard-mini-chart" width="72" height="24"><polyline points="0,20 12,10 24,14 36,6 48,12 60,4 72,8" fill="none" stroke="#4D62E5" strokeWidth="3"/><circle cx="12" cy="10" r="2.5" fill="#B6F09C"/><circle cx="36" cy="6" r="2.5" fill="#87DDEE"/><circle cx="60" cy="4" r="2.5" fill="#B6F09C"/></svg>
                  <div className="dashboard-overview-mini-bar"><div className="mini-bar" style={{width:'60%'}}></div></div>
                </div>
                <div className="dashboard-overview-card gradient-yellow">
                  <div className="dashboard-overview-icon"><FaUsers /></div>
                  <div className="dashboard-overview-label">Team Members</div>
                  <div className="dashboard-overview-value dashboard-animate">7</div>
                  <svg className="dashboard-mini-chart" width="72" height="24"><rect x="2" y="18" width="68" height="6" rx="3" fill="#B6F09C33"/><rect x="2" y="18" width="28" height="6" rx="3" fill="#4D62E5"/></svg>
                  <div className="dashboard-overview-mini-bar"><div className="mini-bar" style={{width:'35%'}}></div></div>
                </div>
              </div>
              <div className="dashboard-section">
                <div className="dashboard-section-header">
                  <span>Recent Projects</span>
                  <button className="dashboard-action-btn" onClick={()=>navigate('/workspace')}>View All</button>
                </div>
                <div className="dashboard-project-list">
                  {projects.slice(0,2).map(p => (
                    <div className="dashboard-project-item" key={p.key}>
                      <img src={p.avatar} alt={p.name} className="dashboard-project-avatar" />
                      <div className="dashboard-project-info">
                        <div className="dashboard-project-name">{p.name}</div>
                        <div className="dashboard-project-meta">Last updated: 2024-06-01</div>
                      </div>
                      <button className="dashboard-project-btn">Open</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="dashboard-dynamic-info timeline">
                <div className="dashboard-dynamic-title">Recent Updates</div>
                <ul className="dashboard-timeline-list">
                  {dashboardNotices.map((n,i) => (
                    <li key={i} className={`dashboard-timeline-item ${n.type}`}>
                      <div className="dashboard-timeline-icon">{n.icon}</div>
                      <div className="dashboard-timeline-content">
                        <div className="dashboard-timeline-text">{n.text}</div>
                        <div className="dashboard-timeline-time"><FaClock style={{marginRight:4}} />{n.time}</div>
                      </div>
                      {i < dashboardNotices.length-1 && <div className="dashboard-timeline-line"></div>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dashboard-quick-actions enhanced">
                <button className="dashboard-quick-btn enhanced">+ New Project</button>
                <button className="dashboard-quick-btn enhanced">Upload Files</button>
                <button className="dashboard-quick-btn enhanced">View Reports</button>
              </div>
            </div>
          )}
        </section>
        {/* 搜索弹窗动画 */}
        <CSSTransition in={showSearch} timeout={220} classNames="search-modal-anim" unmountOnExit>
          <div className="search-modal">
            <div className="search-modal-inner">
              <input
                className="search-input"
                placeholder="Search UXtract content or help..."
                value={searchValue}
                onChange={handleSearchInput}
                autoFocus
              />
              <button className="search-close-btn" onClick={handleCloseSearch}>&times;</button>
            </div>
            <div className="search-results">
              {searchValue.trim() ? (
                searchResults.map((r, i) => (
                  <div className="search-result-item" key={i}>{r}</div>
                ))
              ) : (
                <div className="search-result-tip">Enter a keyword to search</div>
              )}
            </div>
          </div>
        </CSSTransition>
      </main>
    </div>
  )
} 