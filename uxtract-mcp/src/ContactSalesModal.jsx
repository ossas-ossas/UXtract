import './App.css'
import { FaTimes, FaBuilding, FaEnvelope, FaUser, FaRegCommentDots } from 'react-icons/fa'
import { useState } from 'react'

export default function ContactSalesModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div style={{position:'relative',padding:'32px 32px 24px 32px',background:'none'}}>
      {onClose && (
        <button style={{position:'absolute',top:18,right:18,background:'none',border:'none',color:'#B6F09C',fontSize:24,cursor:'pointer',zIndex:2}} onClick={onClose} aria-label="关闭"><FaTimes /></button>
      )}
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
        <FaBuilding style={{fontSize:38,color:'#B6F09C'}} />
        <div>
          <div style={{fontWeight:700,fontSize:'1.25rem',color:'#fff'}}>企业定制与团队合作</div>
          <div style={{color:'#B6F09C',fontSize:'1rem',fontWeight:600}}>专属服务，满足大团队和企业需求</div>
        </div>
      </div>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:18}}>
          <div style={{display:'flex',gap:12}}>
            <div style={{flex:1,display:'flex',alignItems:'center',background:'#23272b',borderRadius:10,padding:'10px 14px',color:'#B6F09C'}}>
              <FaUser style={{marginRight:8}} />
              <input name="name" value={form.name} onChange={handleChange} placeholder="姓名" style={{background:'none',border:'none',outline:'none',color:'#fff',fontSize:15,width:'100%'}} required />
            </div>
            <div style={{flex:1,display:'flex',alignItems:'center',background:'#23272b',borderRadius:10,padding:'10px 14px',color:'#B6F09C'}}>
              <FaEnvelope style={{marginRight:8}} />
              <input name="email" value={form.email} onChange={handleChange} placeholder="邮箱" type="email" style={{background:'none',border:'none',outline:'none',color:'#fff',fontSize:15,width:'100%'}} required />
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',background:'#23272b',borderRadius:10,padding:'10px 14px',color:'#B6F09C',marginBottom:0}}>
            <FaBuilding style={{marginRight:8}} />
            <input name="company" value={form.company} onChange={handleChange} placeholder="公司/组织" style={{background:'none',border:'none',outline:'none',color:'#fff',fontSize:15,width:'100%'}} />
          </div>
          <div style={{display:'flex',alignItems:'flex-start',background:'#23272b',borderRadius:10,padding:'10px 14px',color:'#B6F09C'}}>
            <FaRegCommentDots style={{marginRight:8,marginTop:4}} />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="请简单描述您的需求或想了解的内容..." rows={3} style={{background:'none',border:'none',outline:'none',color:'#fff',fontSize:15,width:'100%',resize:'none'}} />
          </div>
          <button type="submit" className="billing-card-btn" style={{width:'100%',fontSize:'1.1rem',padding:'16px 0',marginTop:8,marginBottom:4,borderRadius:12,boxShadow:'0 2px 8px #b6f09c33'}} disabled={loading}>{loading?'提交中...':'提交需求，联系销售'}</button>
        </form>
      ) : (
        <div style={{textAlign:'center',marginTop:32}}>
          <FaRegCommentDots style={{color:'#B6F09C',fontSize:48,marginBottom:12}} />
          <div style={{fontSize:'1.2rem',fontWeight:700,marginBottom:8,color:'#fff'}}>提交成功！</div>
          <div style={{color:'#9B9C9E'}}>我们已收到您的信息，销售顾问会尽快与您联系。</div>
        </div>
      )}
    </div>
  )
} 