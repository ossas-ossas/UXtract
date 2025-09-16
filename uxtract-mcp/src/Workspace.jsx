import './App.css'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import { FaBolt, FaFileExport, FaRegCopy, FaChevronDown, FaComments, FaSearch, FaPlus, FaUserCircle, FaInfoCircle, FaListUl, FaFileAlt } from 'react-icons/fa'

const projects = [
  { key: 'project1', name: 'Project Alpha', avatar: '/assets/project_avatar1.svg', updated: '2024-06-01', members: [1,2,3] },
  { key: 'project2', name: 'Project Beta', avatar: '/assets/project_avatar2.svg', updated: '2024-05-28', members: [2,3] },
  { key: 'project3', name: 'Project Gamma', avatar: '/assets/project_avatar3.svg', updated: '2024-05-20', members: [1,3] },
  { key: 'project4', name: 'Project Delta', avatar: '/assets/project_avatar4.svg', updated: '2024-05-10', members: [1] },
]
const members = {
  1: { name: 'Jane', avatar: '' },
  2: { name: 'Tom', avatar: '' },
  3: { name: 'Alex', avatar: '' },
}

const initialFiles = [
  { name: 'interview1.mp3', size: '2.1MB', status: 'success' },
  { name: 'notes.txt', size: '12KB', status: 'success' },
  { name: 'eyetrack.csv', size: '88KB', status: 'success' },
]

const models = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-3.5', label: 'GPT-3.5' },
  { value: 'claude', label: 'Claude' },
  { value: 'gemini', label: 'Gemini' },
]

const sentimentTabs = ['Negative', 'Neutral', 'Positive']

// interview1.txt mock全文
const interview1Text = `Project Title: Usability Test for HealthTrack – Mobile Health Monitoring App\nParticipant ID: P01\nFacilitator: UX Researcher\nDate: 2025-05-01\n\n[Introduction]\n\nResearcher: Thank you for joining us today. We're testing the usability of HealthTrack, a mobile app that helps users monitor their fitness and medical conditions. This session will take around 30 minutes. Please feel free to think aloud as you interact with the app.\n\nParticipant: Sure, sounds good.\n\n[Task 1: Set a Daily Step Goal]\n\nResearcher: Please open the app and set a daily step goal.\n\nParticipant: Okay... hmm... where do I do that? I'm clicking on the profile... No, maybe it's under settings... oh here, 'Goals'.\nResearcher: What are you thinking?\nParticipant: It's not super intuitive. I expected to find the goal-setting on the home screen.\n\n[Task 2: Log Today's Meal]\n\nResearcher: Now, please try to log your lunch.\n\nParticipant: Alright. I'm tapping "Food Log"... now I need to search for 'Chicken Salad'... Hmm, this search bar is lagging a bit.\nResearcher: Anything surprising?\nParticipant: Yeah, I thought it would suggest items automatically. Also, the nutritional info is a bit hard to read.\n\n[Task 3: Check Blood Pressure History]\n\nResearcher: Please find your previous blood pressure readings.\n\nParticipant: Umm... I don't see anything that says 'Blood Pressure'. Maybe under 'Vitals'?... oh got it.\nResearcher: How was that experience?\nParticipant: Took me a while. The icons are not very clear—maybe add some text labels?\n\n[General Impressions]\n\nResearcher: How would you describe your overall experience using the app?\n\nParticipant: Overall, it's okay. The app looks modern and clean, but some features are buried too deep. Also, the font is small—I had to squint a few times. But I like the reminders and daily summaries.\n\n[Closing]\n\nResearcher: Thank you so much. Is there anything else you'd like to share?\n\nParticipant: Maybe just a simpler home screen and more personalized recommendations would be nice. Thanks.`

// interview.txt 专用 mock insight 数据
const interviewTxtInsights = {
  Negative: [
    {
      sentiment: 'Negative',
      summary: '“It was frustrating.”',
      timestamp: '',
      topics: ['frustration', 'missing feedback'],
      confidence: 78,
      explain: 'Lack of confirmation after clicking caused confusion and user frustration.'
    }
  ],
  Neutral: [
    {
      sentiment: 'Neutral',
      summary: '“I clicked around the page, but nothing worked.”',
      timestamp: '',
      topics: ['navigation', 'form interaction'],
      confidence: 65,
      explain: "User explored multiple interface elements but didn't get any meaningful system response."
    }
  ],
  Positive: []
}

export default function Workspace() {
  const [files, setFiles] = useState(initialFiles)
  const [selectedFileIdx, setSelectedFileIdx] = useState(0)
  const [model, setModel] = useState(models[0].value)
  const [analysisHistory, setAnalysisHistory] = useState([
    [
      // Negative
      {
        sentiment: 'Negative',
        summary: 'User had difficulty finding the sign-up button and clicked multiple areas before discovering it at the bottom of the screen.',
        timestamp: '18:02:46',
        topics: ['signup', 'frustration'],
        confidence: 82,
        explain: 'The user struggled to locate the sign-up button, indicating a navigation issue and potential for onboarding drop-off.'
      },
      {
        sentiment: 'Negative',
        summary: 'No feedback was shown after pressing submit. The user expressed confusion and wasn't sure if the action worked.',
        timestamp: '18:03:03',
        topics: ['missing feedback', 'usability'],
        confidence: 88,
        explain: 'Lack of confirmation or feedback after submission led to uncertainty about task completion.'
      },
      // Neutral
      {
        sentiment: 'Neutral',
        summary: 'User explored the settings menu to adjust preferences.',
        timestamp: '18:04:10',
        topics: ['settings', 'exploration'],
        confidence: 70,
        explain: 'The user navigated through settings without expressing strong emotion.'
      },
      // Positive
      {
        sentiment: 'Positive',
        summary: 'User appreciated the clean layout and daily summary reminders.',
        timestamp: '18:05:22',
        topics: ['layout', 'reminders'],
        confidence: 90,
        explain: 'Positive feedback on visual design and helpful reminders.'
      }
    ],
    [],
    [],
  ])
  const [loading, setLoading] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState([
    { role: 'ai', content: 'Hi! I am your AI assistant. How can I help you analyze your files?' }
  ])
  const [aiOpen, setAiOpen] = useState(false)
  const [sentimentTab, setSentimentTab] = useState('Negative')
  const [tabAnim, setTabAnim] = useState('')
  const chatEndRef = useRef(null)
  const fileInput = useRef(null)
  const navigate = useNavigate()
  const [selectedProject, setSelectedProject] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const location = useLocation()
  const [showTranscript, setShowTranscript] = useState(true)

  useEffect(() => {
    if (location.state && location.state.newFile && location.state.aiResult) {
      setFiles(prev => [...prev, location.state.newFile])
      setAnalysisHistory(prev => [...prev, [location.state.aiResult]])
      setSelectedFileIdx(files.length)
      window.history.replaceState({}, document.title)
    }
    // eslint-disable-next-line
  }, [location.state])

  function handleUploadClick() {
    navigate('/upload')
  }
  function handleFileChange(e) {
    const newFiles = Array.from(e.target.files)
    const validFiles = newFiles.filter(f => ['text/plain', 'audio/mpeg', 'text/csv'].includes(f.type))
    setFiles(prev => [...prev, ...validFiles.map(f => ({ name: f.name, size: `${(f.size/1024).toFixed(1)}KB`, status: 'success' }))])
    setAnalysisHistory(prev => [...prev, ...validFiles.map(() => [])])
    if (files.length === 0 && validFiles.length > 0) setSelectedFileIdx(0)
  }
  function handleAnalyze(idx) {
    setSelectedFileIdx(idx)
    setLoading(true)
    setTimeout(() => {
      const conf = Math.floor(Math.random()*26)+70
      const newResult = {
        sentiment: sentimentTabs[Math.floor(Math.random()*3)],
        summary: 'AI found new insights for this file.',
        timestamp: new Date().toLocaleTimeString(),
        topics: ['AI', 'insight'],
        confidence: conf,
        explain: 'This insight was generated based on keyword and sentiment pattern matches in the uploaded text.'
      }
      setAnalysisHistory(prev => prev.map((arr, i) => i === idx ? [...arr, newResult] : arr))
      setLoading(false)
    }, 1200)
  }
  function handleSelectFile(idx) {
    setSelectedFileIdx(idx)
    setSentimentTab('Negative')
  }
  function handleSend() {
    if (!chatInput.trim()) return
    setChatHistory(prev => [
      ...prev,
      { role: 'user', content: chatInput },
      { role: 'ai', content: `You asked: "${chatInput}"\nHere is an AI-generated answer based on ${model}.` }
    ])
    setChatInput('')
  }
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatHistory])

  const selectedFile = files[selectedFileIdx]
  const selectedHistory = analysisHistory[selectedFileIdx] || []
  const filteredHistory = selectedHistory.filter(r => r.sentiment === sentimentTab)

  function handleExport(result) {
    const blob = new Blob([
      `Sentiment: ${result.sentiment}\nSummary: ${result.summary}\nTopics: ${result.topics.join(', ')}\nTimestamp: ${result.timestamp}`
    ], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedFile.name}-insight.txt`
    a.click()
    URL.revokeObjectURL(url)
  }
  function handleCopy(result) {
    navigator.clipboard.writeText(
      `Sentiment: ${result.sentiment}\nSummary: ${result.summary}\nTopics: ${result.topics.join(', ')}\nTimestamp: ${result.timestamp}`
    )
  }

  function handleSentimentTab(tab) {
    setTabAnim('tab-anim')
    setTimeout(() => setTabAnim(''), 350)
    setSentimentTab(tab)
  }

  // 卡片筛选与搜索
  const filteredProjects = projects.filter(p =>
    (filter === 'all' || p.members.length === (filter === 'multi' ? 2 : 1)) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  // interview.txt 专用判断
  const isInterviewTxt = selectedFile && selectedFile.name === 'interview.txt'

  return (
    <div className="insights-root">
      <Sidebar />
      <main className="insights-main workspace-main">
        {!selectedProject ? (
          <div className="workspace-projects-page">
            <div className="workspace-projects-topbar">
              <div className="workspace-projects-search">
                <FaSearch className="workspace-projects-search-icon" />
                <input
                  className="workspace-projects-search-input"
                  placeholder="Search projects..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="workspace-projects-actions">
                <button className="workspace-projects-filter-btn" onClick={() => setFilter(f => f==='all'?'multi':'all')}>
                  {filter==='all' ? 'All Projects' : 'Multi-member'}
                </button>
              </div>
            </div>
            <div className="workspace-projects-list">
              {filteredProjects.map(p => (
                <div className="workspace-project-card" key={p.key} onClick={()=>setSelectedProject(p)}>
                  <img src={p.avatar} alt={p.name} className="workspace-project-avatar" />
                  <div className="workspace-project-info">
                    <div className="workspace-project-title">{p.name}</div>
                    <div className="workspace-project-meta">Last updated: {p.updated}</div>
                    <div className="workspace-project-members">
                      {p.members.map(id =>
                        members[id].avatar ? (
                          <img key={id} src={members[id].avatar} alt={members[id].name} className="workspace-project-member-avatar" />
                        ) : (
                          <FaUserCircle key={id} className="workspace-project-member-avatar" />
                        )
                      )}
                    </div>
                  </div>
                  <button className="workspace-project-open-btn">Open</button>
                </div>
              ))}
              <div className="workspace-project-card workspace-project-add-card" onClick={()=>navigate('/create-project')}>
                <div className="workspace-project-add-inner">
                  <FaPlus className="workspace-project-add-icon" />
                  <div className="workspace-project-add-label">New Project</div>
                </div>
              </div>
              {filteredProjects.length === 0 && <div className="workspace-placeholder">No projects found.</div>}
            </div>
          </div>
        ) : (
          <div className="workspace-split">
            <button className="go-back-btn" style={{marginBottom:24}} onClick={()=>setSelectedProject(null)}>← Back to Projects</button>
            {/* 左侧：文件列表+上传+Analyze */}
            <div className="workspace-files-panel">
              <button className="workspace-upload-btn" aria-label="Upload File" onClick={handleUploadClick}>Upload File</button>
              <input type="file" style={{display:'none'}} ref={fileInput} onChange={handleFileChange} multiple />
              <div className="workspace-file-list">
                {files.map((file, idx) => (
                  <div
                    key={file.name+idx}
                    className={`workspace-file-item${selectedFileIdx === idx ? ' selected' : ''}`}
                  >
                    <span className="workspace-file-name" onClick={() => {handleSelectFile(idx); handleAnalyze(idx)}}>{file.name}</span>
                    <button className="analyze-btn" title="Analyze this file" onClick={() => handleAnalyze(idx)}>
                      <FaBolt />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* 右侧：分析与AI助手 */}
            <div className="workspace-analysis-panel">
              {selectedFile ? (
                <>
                  {/* 顶部提示条+切换文件（下拉） */}
                  <div className="workspace-file-bar">
                    <span>Currently analyzing: <b>{selectedFile.name}</b></span>
                    <select
                      className="workspace-switch-btn"
                      value={selectedFileIdx}
                      onChange={e => { handleSelectFile(Number(e.target.value)); handleAnalyze(Number(e.target.value)) }}
                      aria-label="Switch File"
                    >
                      {files.map((file, idx) => (
                        <option value={idx} key={file.name+idx}>{file.name}</option>
                      ))}
                    </select>
                  </div>
                  {/* 情感Tab切换 */}
                  <div className={`workspace-sentiment-tabs ${tabAnim}`}>
                    {sentimentTabs.map(tab => (
                      <button
                        key={tab}
                        className={`sentiment-tab${sentimentTab === tab ? ' active' : ''}`}
                        onClick={() => handleSentimentTab(tab)}
                        tabIndex={0}
                      >{tab}</button>
                    ))}
                  </div>
                  {selectedFile && selectedFile.name.endsWith('.txt') ? (
                    <>
                      <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:16}}>
                        <button onClick={()=>setShowTranscript(true)} style={{background:showTranscript?'#23272b':'none',color:showTranscript?'#B6F09C':'#87DDEE',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}><FaFileAlt/> Full Transcript</button>
                        <button onClick={()=>setShowTranscript(false)} style={{background:!showTranscript?'#23272b':'none',color:!showTranscript?'#B6F09C':'#87DDEE',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,display:'flex',alignItems:'center',gap:6,cursor:'pointer'}}><FaListUl/> Insight Cards</button>
                      </div>
                      {showTranscript ? (
                        <InterviewTranscriptView text={interview1Text} />
                      ) : (
                        <div className="workspace-analysis-history">
                          {isInterviewTxt ? (
                            interviewTxtInsights[sentimentTab].length === 0 ? (
                              <div className="workspace-placeholder">No positive sentiment was detected in this transcript.</div>
                            ) : (
                              interviewTxtInsights[sentimentTab].map((result, idx) => (
                                <InsightCard
                                  key={idx}
                                  result={result}
                                  isTxt={true}
                                />
                              ))
                            )
                          ) : (
                            filteredHistory.length === 0 && !loading ? (
                              <div className="workspace-placeholder">No {sentimentTab} analysis yet. Click Analyze to get insights.</div>
                            ) : null
                          )}
                          {!isInterviewTxt && loading && <div className="workspace-analysis-loading">AI is analyzing your file...</div>}
                          {!isInterviewTxt && filteredHistory.map((result, idx) => (
                            <InsightCard
                              key={idx}
                              result={result}
                              isTxt={true}
                            />
                          ))}
                        </div>
                      )}
                      {/* AI标签区 */}
                      <div style={{marginTop:18,display:'flex',gap:10,flexWrap:'wrap'}}>
                        <span style={{background:'#23272b',color:'#B6F09C',borderRadius:8,padding:'6px 16px',fontWeight:600,fontSize:15}}>signup</span>
                        <span style={{background:'#23272b',color:'#B6F09C',borderRadius:8,padding:'6px 16px',fontWeight:600,fontSize:15}}>frustration</span>
                        <span style={{background:'#23272b',color:'#B6F09C',borderRadius:8,padding:'6px 16px',fontWeight:600,fontSize:15}}>missing feedback</span>
                        <span style={{background:'#23272b',color:'#B6F09C',borderRadius:8,padding:'6px 16px',fontWeight:600,fontSize:15}}>navigation</span>
                        <span style={{background:'#23272b',color:'#B6F09C',borderRadius:8,padding:'6px 16px',fontWeight:600,fontSize:15}}>usability</span>
                      </div>
                    </>
                  ) : (
                    <div className="workspace-analysis-history">
                      {filteredHistory.length === 0 && !loading && (
                        <div className="workspace-placeholder">No {sentimentTab} analysis yet. Click Analyze to get insights.</div>
                      )}
                      {loading && <div className="workspace-analysis-loading">AI is analyzing your file...</div>}
                      {filteredHistory.map((result, idx) => (
                        <InsightCard
                          key={idx}
                          result={result}
                          isTxt={false}
                        />
                      ))}
                    </div>
                  )}
                  {/* AI助手气泡 */}
                  <div className={`workspace-ai-fab${aiOpen ? ' open' : ''}`} onClick={() => setAiOpen(v => !v)}>
                    <FaComments />
                  </div>
                  {aiOpen && (
                    <div className="workspace-ai-chat-popup">
                      <div className="workspace-chat-history">
                        {chatHistory.map((msg, idx) => (
                          <div key={idx} className={`workspace-chat-msg ${msg.role}`}>{msg.content}</div>
                        ))}
                        <div ref={chatEndRef}></div>
                      </div>
                      <div className="workspace-chat-input-row">
                        <input
                          className="workspace-chat-input"
                          type="text"
                          placeholder="Ask AI about your file..."
                          value={chatInput}
                          onChange={e => setChatInput(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
                        />
                        <button className="workspace-chat-send-btn" onClick={handleSend} disabled={!chatInput.trim()}>Send</button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="workspace-placeholder">Select or upload a file to start analysis</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function InsightCard({ result, isTxt }) {
  const [showExplain, setShowExplain] = useState(false)
  return (
    <div className="workspace-analysis-card" style={{position:'relative'}}>
      <div className="workspace-analysis-row card-header">
        <span className={`workspace-sentiment sentiment-${result.sentiment.toLowerCase()}`}>{result.sentiment}</span>
        <span className="workspace-analysis-time">{result.timestamp}</span>
        {isTxt && (
          <span style={{marginLeft:'auto',marginRight:8,display:'flex',alignItems:'center',gap:6}}>
            <span title="AI Confidence" style={{display:'inline-block',background:'rgba(182,240,156,0.13)',color:'#B6F09C',borderRadius:'50%',width:36,height:36,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:16,border:'2px solid #B6F09C'}}>{result.confidence}%</span>
          </span>
        )}
        <div className="card-actions">
          <button className="card-action-btn" onClick={() => handleExport(result)}>
            <FaFileExport />
            <span className="card-tooltip">Export</span>
          </button>
          <button className="card-action-btn" onClick={() => handleCopy(result)}>
            <FaRegCopy />
            <span className="card-tooltip">Copy</span>
          </button>
        </div>
      </div>
      <div className="workspace-analysis-summary" style={{display:'flex',alignItems:'center',gap:8}}>
        {result.summary}
        {isTxt && (
          <FaInfoCircle style={{color:'#87DDEE',cursor:'pointer'}} title="Why this insight?" onClick={()=>setShowExplain(v=>!v)} />
        )}
      </div>
      <div className="workspace-analysis-topics">
        {result.topics.map((t, i) => <span className="workspace-topic" key={i}>{t}</span>)}
      </div>
      {isTxt && showExplain && (
        <div style={{background:'#23272b',color:'#B6F09C',borderRadius:10,padding:'12px 16px',marginTop:10,fontSize:15,boxShadow:'0 2px 8px #b6f09c22'}}>
          <b>AI reasoning:</b> {result.explain}
        </div>
      )}
    </div>
  )
}

// InterviewTranscriptView 组件
function InterviewTranscriptView({ text }) {
  // 高亮关键语句
  const highlights = [
    "I couldn't find the submit button.",
    'It was frustrating.',
    'There was nothing.'
  ]
  // 分割文本并高亮
  let html = text
  highlights.forEach(q => {
    html = html.replace(q, `<span style="background:#B6F09C22;color:#B6F09C;font-weight:700;padding:2px 4px;border-radius:6px;">${q}</span>`)
  })
  return (
    <div style={{maxHeight:340,overflowY:'auto',background:'#181b1f',borderRadius:12,padding:'20px 24px',fontFamily:'monospace,monospace',color:'#E8E9E9',fontSize:15,lineHeight:1.7,boxShadow:'0 2px 8px #b6f09c11',marginBottom:8}} dangerouslySetInnerHTML={{__html:html.replace(/\n/g,'<br/>')}} />
  )
} 