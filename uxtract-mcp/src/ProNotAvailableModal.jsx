import './App.css'
import { FaTimes, FaCrown } from 'react-icons/fa'

export default function ProNotAvailableModal({ onClose }) {
  return (
    <div style={{position:'relative',padding:'32px 32px 24px 32px',background:'none'}}>
      {onClose && (
        <button style={{position:'absolute',top:18,right:18,background:'none',border:'none',color:'#B6F09C',fontSize:24,cursor:'pointer',zIndex:2}} onClick={onClose} aria-label="关闭"><FaTimes /></button>
      )}
      <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:18}}>
        <FaCrown style={{fontSize:38,color:'#B6F09C'}} />
        <div>
          <div style={{fontWeight:700,fontSize:'1.25rem',color:'#fff'}}>Pro 功能暂未开放</div>
          <div style={{color:'#B6F09C',fontSize:'1rem',fontWeight:600}}>敬请期待，更多高级功能即将上线！</div>
        </div>
      </div>
      <div style={{color:'#9B9C9E',fontSize:'1.08rem',marginTop:18,textAlign:'center'}}>如需提前体验或有定制需求，欢迎联系销售团队。</div>
      <button className="billing-card-btn" style={{width:'100%',fontSize:'1.1rem',padding:'14px 0',marginTop:32,borderRadius:12,boxShadow:'0 2px 8px #b6f09c33'}} onClick={onClose}>我知道了</button>
    </div>
  )
} 