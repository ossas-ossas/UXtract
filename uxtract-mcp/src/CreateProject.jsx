import './App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaUsers, FaChevronRight, FaChevronLeft, FaUpload, FaCheckCircle, FaPlus, FaTimes } from 'react-icons/fa'
import Sidebar from './Sidebar'

const steps = [
  'Select Type',
  'Project Info',
  'Invite Members',
  'Upload Files',
]

export default function CreateProject() {
  const [step, setStep] = useState(0)
  const [type, setType] = useState('private')
  const [info, setInfo] = useState({ name: '', desc: '', cover: '', tags: '' })
  const [members, setMembers] = useState([])
  const [invite, setInvite] = useState('')
  const [role, setRole] = useState('Editor')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleNext() {
    if (step === 0) {
      setStep(1)
    } else if (step === 1) {
      if (!info.name.trim()) {
        setError('Project name is required')
        return
      }
      setError('')
      setStep(type === 'private' ? 3 : 2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      // 模拟创建成功，跳转上传
      navigate('/upload')
    }
  }
  function handlePrev() {
    if (step === 2 && type === 'private') setStep(1)
    else if (step === 3 && type === 'private') setStep(1)
    else setStep(Math.max(0, step - 1))
  }
  function handleAddMember() {
    if (!invite.trim()) return
    setMembers([...members, { email: invite, role }])
    setInvite('')
  }
  function handleRemoveMember(idx) {
    setMembers(members.filter((_, i) => i !== idx))
  }
  return (
    <div className="insights-root">
      <Sidebar />
      <main className="insights-main" style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh'}}>
        <div className="create-project-card">
          {step === 0 && (
            <button className="create-project-back-btn" onClick={()=>navigate(-1)}>
              <FaChevronLeft style={{marginRight:6}} />Back
            </button>
          )}
          <div className="create-project-steps">
            {steps.map((s, i) => (
              <div key={i} className={`create-project-step${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}>{i+1}</div>
            ))}
          </div>
          <div className="create-project-content">
            {step === 0 && (
              <>
                <h2 className="create-project-title">Select Project Type</h2>
                <div className="create-project-type-row">
                  <div className={`create-project-type-card${type==='private'?' selected':''}`} onClick={()=>setType('private')}>
                    <FaUser className="create-project-type-icon" />
                    <div className="create-project-type-label">Private Project</div>
                  </div>
                  <div className={`create-project-type-card${type==='team'?' selected':''}`} onClick={()=>setType('team')}>
                    <FaUsers className="create-project-type-icon" />
                    <div className="create-project-type-label">Team Project</div>
                  </div>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="create-project-title">Project Info</h2>
                <div className="create-project-form-group">
                  <label>Project Name <span style={{color:'#FF6B6B'}}>*</span></label>
                  <input className="create-project-input" value={info.name} onChange={e=>setInfo({...info, name:e.target.value})} placeholder="Enter project name" />
                </div>
                <div className="create-project-form-group">
                  <label>Description</label>
                  <textarea className="create-project-input" value={info.desc} onChange={e=>setInfo({...info, desc:e.target.value})} placeholder="Describe your project (optional)" />
                </div>
                <div className="create-project-form-group">
                  <label>Cover/Icon</label>
                  <input className="create-project-input" value={info.cover} onChange={e=>setInfo({...info, cover:e.target.value})} placeholder="Paste image URL (optional)" />
                </div>
                <div className="create-project-form-group">
                  <label>Tags / Category</label>
                  <input className="create-project-input" value={info.tags} onChange={e=>setInfo({...info, tags:e.target.value})} placeholder="e.g. research, design, AI" />
                </div>
                {error && <div className="create-project-error">{error}</div>}
              </>
            )}
            {step === 2 && type === 'team' && (
              <>
                <h2 className="create-project-title">Invite Members</h2>
                <div className="create-project-form-group">
                  <label>Add by Email</label>
                  <div className="create-project-invite-row">
                    <input className="create-project-input" value={invite} onChange={e=>setInvite(e.target.value)} placeholder="Enter email" />
                    <select className="create-project-input" style={{maxWidth:120}} value={role} onChange={e=>setRole(e.target.value)}>
                      <option>Owner</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                    <button className="create-project-invite-btn" onClick={handleAddMember}><FaPlus /></button>
                  </div>
                </div>
                <div className="create-project-members-list">
                  {members.map((m,i)=>(
                    <div className="create-project-member-item" key={i}>
                      <span>{m.email}</span>
                      <span className="create-project-member-role">{m.role}</span>
                      <FaTimes className="create-project-member-remove" onClick={()=>handleRemoveMember(i)} />
                    </div>
                  ))}
                  {members.length === 0 && <div className="create-project-member-empty">No members invited yet.</div>}
                </div>
                <div className="create-project-tip">You can manage members later in project settings.</div>
              </>
            )}
            {step === 3 && (
              <>
                <h2 className="create-project-title">Upload Files</h2>
                <div className="create-project-upload-area">
                  <FaUpload className="create-project-upload-icon" />
                  <div className="create-project-upload-tip">You can upload files after project is created.</div>
                </div>
                <div className="create-project-success-row">
                  <FaCheckCircle className="create-project-success-icon" />
                  <span>Project created successfully!</span>
                </div>
              </>
            )}
          </div>
          <div className="create-project-footer">
            {step > 0 && <button className="create-project-nav-btn" onClick={handlePrev}><FaChevronLeft style={{marginRight:6}} />Prev</button>}
            <div style={{flex:1}}></div>
            <button className="create-project-nav-btn primary" onClick={handleNext}>
              {step === 3 ? 'Go to Upload' : 'Next'} <FaChevronRight style={{marginLeft:6}} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
} 