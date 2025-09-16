import './App.css'
import { useState } from 'react'
import { FaChevronRight, FaChevronLeft, FaRobot, FaShieldAlt, FaSlidersH, FaStickyNote } from 'react-icons/fa'
import Sidebar from './Sidebar'

const settingsList = [
  {
    key: 'ai',
    icon: <FaRobot />,
    title: 'AI Preferences & Control',
    desc: 'Manage AI model, usage and controls.'
  },
  {
    key: 'data',
    icon: <FaShieldAlt />,
    title: 'Data Management & Privacy',
    desc: 'Export, privacy and data deletion.'
  },
  {
    key: 'workspace',
    icon: <FaSlidersH />,
    title: 'Workspace Configuration',
    desc: 'Theme, layout and notifications.'
  },
  {
    key: 'note',
    icon: <FaStickyNote />,
    title: 'Note-taking & Annotation Tools',
    desc: 'Notes, annotation and collaboration.'
  }
]

const detailContent = {
  ai: {
    title: 'AI Preferences & Control',
    content: (
      <>
        <div className="settings-form-group">
          <label className="settings-label">AI Model</label>
          <select className="settings-input">
            <option>GPT-4</option>
            <option>GPT-3.5</option>
            <option>Claude</option>
            <option>Gemini</option>
          </select>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Enable AI Usage Limit</label>
          <input type="checkbox" className="settings-switch" />
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Enable Advanced AI Features</label>
          <input type="checkbox" className="settings-switch" />
        </div>
      </>
    )
  },
  data: {
    title: 'Data Management & Privacy',
    content: (
      <>
        <div className="settings-form-group">
          <label className="settings-label">Export Data</label>
          <button className="settings-btn">Export as CSV</button>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Enable Privacy Mode</label>
          <input type="checkbox" className="settings-switch" />
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Delete All Data</label>
          <button className="settings-btn settings-btn-danger">Delete</button>
        </div>
      </>
    )
  },
  workspace: {
    title: 'Workspace Configuration',
    content: (
      <>
        <div className="settings-form-group">
          <label className="settings-label">Theme</label>
          <select className="settings-input">
            <option>Dark</option>
            <option>Light</option>
            <option>System</option>
          </select>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Layout</label>
          <select className="settings-input">
            <option>Modern</option>
            <option>Classic</option>
          </select>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Enable Notifications</label>
          <input type="checkbox" className="settings-switch" />
        </div>
      </>
    )
  },
  note: {
    title: 'Note-taking & Annotation Tools',
    content: (
      <>
        <div className="settings-form-group">
          <label className="settings-label">Quick Note</label>
          <textarea className="settings-input" rows={3} placeholder="Write your note..."></textarea>
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Enable Annotation Tools</label>
          <input type="checkbox" className="settings-switch" />
        </div>
        <div className="settings-form-group">
          <label className="settings-label">Collaborators</label>
          <div className="settings-collaborators">
            <span className="settings-collaborator">Jane Doe</span>
            <span className="settings-collaborator">John Smith</span>
            <span className="settings-collaborator">Alice Lee</span>
          </div>
        </div>
      </>
    )
  }
}

export default function Settings() {
  const [detail, setDetail] = useState(null)
  return (
    <div className="insights-root">
      <Sidebar />
      <main className="insights-main settings-main-centered">
        {!detail ? (
          <div className="settings-list-centered">
            <h1 className="settings-title">Settings</h1>
            {settingsList.map(item => (
              <div className="settings-card-btn" key={item.key} onClick={() => setDetail(item.key)}>
                <span className="settings-card-icon">{item.icon}</span>
                <div className="settings-card-info">
                  <div className="settings-card-title">{item.title}</div>
                  <div className="settings-card-desc">{item.desc}</div>
                </div>
                <span className="settings-card-arrow"><FaChevronRight /></span>
              </div>
            ))}
          </div>
        ) : (
          <div className="settings-detail-card">
            <button className="settings-back-btn" onClick={() => setDetail(null)}><FaChevronLeft /> Back to Settings</button>
            <h2 className="settings-detail-title">{detailContent[detail].title}</h2>
            <div className="settings-detail-content">{detailContent[detail].content}</div>
          </div>
        )}
      </main>
    </div>
  )
} 