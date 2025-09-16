import './App.css'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import Sidebar from './Sidebar'

const projects = [
  { key: 'project1', name: 'Project Alpha', avatar: '/assets/project_avatar1.svg' },
  { key: 'project2', name: 'Project Beta', avatar: '/assets/project_avatar2.svg' },
  { key: 'project3', name: 'Project Gamma', avatar: '/assets/project_avatar3.svg' },
  { key: 'project4', name: 'Project Delta', avatar: '/assets/project_avatar4.svg' },
]

const initialFiles = [
  { name: 'interview1.mp3', size: '2.1MB', progress: 60, status: 'uploading' },
  { name: 'notes.txt', size: '12KB', progress: 100, status: 'success' },
  { name: 'eyetrack.csv', size: '88KB', progress: 100, status: 'success' },
]

const allowedTypes = ['txt', 'mp3', 'csv']

export default function Upload() {
  const fileInput = useRef(null)
  const [files, setFiles] = useState([])
  const [dragActive, setDragActive] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const navigate = useNavigate()

  async function handleFileChange(e) {
    const newFiles = Array.from(e.target.files)
    const validFiles = newFiles.filter(f => ['text/plain', 'audio/mpeg', 'text/csv'].includes(f.type))
    if (validFiles.length !== newFiles.length) {
      setErrorMsg('Some files are not supported. Only .txt, .mp3, .csv allowed.')
      return
    }
    setErrorMsg('')
    setFiles(validFiles.map(f => ({ name: f.name, size: `${(f.size/1024).toFixed(1)}KB`, status: 'uploading', progress: 0 })))
    // 只支持单文件分析（如需多文件可循环）
    const file = validFiles[0]
    const formData = new FormData()
    formData.append('file', file)
    setAnalyzing(true)
    try {
      const res = await fetch('http://localhost:3001/api/analyze', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('AI analysis failed')
      const result = await res.json()
      setFiles([{ name: file.name, size: `${(file.size/1024).toFixed(1)}KB`, status: 'success', progress: 100 }])
      setAnalyzing(false)
      // 跳转并传递新文件和AI分析结果
      navigate('/workspace', { state: { newFile: { name: file.name, size: `${(file.size/1024).toFixed(1)}KB`, status: 'success' }, aiResult: result } })
    } catch (e) {
      setErrorMsg('AI analysis failed: ' + e.message)
      setFiles([{ name: file.name, size: `${(file.size/1024).toFixed(1)}KB`, status: 'error', progress: 100 }])
      setAnalyzing(false)
    }
  }
  function handleDelete(idx) {
    setFiles(files => files.filter((_, i) => i !== idx))
  }
  function handleDragOver(e) {
    e.preventDefault()
    setDragActive(true)
  }
  function handleDragLeave(e) {
    e.preventDefault()
    setDragActive(false)
  }
  function handleDrop(e) {
    e.preventDefault()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange({ target: { files: e.dataTransfer.files } })
    }
  }

  return (
    <div className="insights-root">
      <Sidebar />
      <main className="insights-main">
        <button className="go-back-btn" style={{margin: '24px 0 0 0', alignSelf: 'flex-start'}} onClick={() => navigate('/workspace')}><FaChevronLeft style={{marginRight: 8}} />Back to Workspace</button>
        <div className="upload-content upload-card">
          <h1 className="login-title" style={{marginBottom: 16}}>Upload your files</h1>
          <div className="login-heading-sub" style={{marginBottom: 24}}>Supported: .txt, .mp3, .csv</div>
          {errorMsg && <div className="upload-error-msg">{errorMsg}</div>}
          <div
            className={`upload-dropzone${dragActive ? ' drag-active' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInput.current && fileInput.current.click()}
          >
            <img src="/assets/upload_attachment.svg" alt="upload" />
            <div className="upload-dropzone-text">Drag & drop files here or <span className="upload-link">browse</span></div>
            <input
              type="file"
              multiple
              style={{ display: 'none' }}
              ref={fileInput}
              onChange={handleFileChange}
            />
          </div>
          <div className="upload-file-list compact">
            {files.map((file, idx) => (
              <div className={`upload-file-item${file.status==='error' ? ' error' : ''}`} key={file.name+idx}>
                <div className="upload-file-info">
                  <span className="upload-file-name">{file.name}</span>
                  <span className="upload-file-size">{file.size}</span>
                </div>
                <div className={`upload-progress-bar-bg small${file.status==='error' ? ' error' : ''}`} style={{marginBottom: 0}}>
                  <div className={`upload-progress-bar-fg${file.status==='error' ? ' error' : ''}`} style={{width: file.progress+'%'}}></div>
                </div>
                <div className="upload-file-status">
                  {file.status === 'success' && <span className="upload-success">Uploaded</span>}
                  {file.status === 'uploading' && <span className="upload-uploading">Uploading...</span>}
                  {file.status === 'error' && <span className="upload-failed">Failed: unsupported file type</span>}
                  <button className="upload-delete-btn" onClick={() => handleDelete(idx)}>✕</button>
                </div>
              </div>
            ))}
          </div>
          {analyzing && <div style={{marginTop: 32, color: '#87DDEE', fontWeight: 600, fontSize: 18}}>Analyzing with AI...</div>}
        </div>
      </main>
    </div>
  )
} 