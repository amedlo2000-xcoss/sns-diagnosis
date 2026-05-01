'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DiagnosisResult } from '@/lib/types';

const LINE_URL = 'https://lin.ee/6fub10f';
const TYPE_EMOJI: Record<string,string> = { '導線不足タイプ':'🔗','投稿迷子タイプ':'🗺️','商品設計不足タイプ':'📦','継続困難タイプ':'⏳','自動化未導入タイプ':'⚙️' };

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<DiagnosisResult|null>(null);
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    const raw = sessionStorage.getItem('diagnosisResult');
    const name = sessionStorage.getItem('diagnosisNickname')?? '';
    if(!raw){setError('診断結果が見つかりません。もう一度診断してください。');return;}
    try{setResult(JSON.parse(raw));setNickname(name);}catch{setError('結果の読み込みに失敗しました。');}
  },[]);

  const s = {
    main: { maxWidth:480, margin:'0 auto', padding:'0 20px 80px', minHeight:'100vh', background:'linear-gradient(160deg,#080B2A 0%,#12072B 50%,#0d1a3d 100%)' } as React.CSSProperties,
    header: { padding:'28px 0 20px', borderBottom:'1px solid rgba(255,255,255,0.08)', marginBottom:24 } as React.CSSProperties,
    headerSub: { fontSize:13, color:'#D8B4FE', marginBottom:6 } as React.CSSProperties,
    headerTitle: { fontSize:20, fontWeight:800, color:'#FFFFFF' } as React.CSSProperties,
    typeCard: { background:'linear-gradient(135deg,rgba(255,78,205,0.15),rgba(139,92,246,0.15))', border:'1px solid rgba(255,78,205,0.35)', borderRadius:24, padding:'24px 20px', marginBottom:20, textAlign:'center' as const, boxShadow:'0 0 30px rgba(255,78,205,0.2)' },
    typeLabel: { fontSize:12, color:'#D8B4FE', letterSpacing:'0.08em', marginBottom:10 } as React.CSSProperties,
    typeValue: { fontSize:24, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', gap:10, color:'#FF4ECD' } as React.CSSProperties,
    section: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'22px 20px', marginBottom:14, backdropFilter:'blur(10px)' } as React.CSSProperties,
    adviceSection: { background:'rgba(255,78,205,0.06)', border:'1px solid rgba(255,78,205,0.25)', borderRadius:20, padding:'22px 20px', marginBottom:14 } as React.CSSProperties,
    sectionTitle: { fontSize:15, fontWeight:700, color:'#FFFFFF', marginBottom:12 } as React.CSSProperties,
    sectionBody: { fontSize:15, lineHeight:1.8, color:'#D8B4FE' } as React.CSSProperties,
    caveat: { background:'rgba(255,155,234,0.08)', borderLeft:'4px solid #FF9BEA', borderRadius:'0 12px 12px 0', padding:'14px 16px', marginBottom:20, fontSize:14, color:'#FF9BEA', lineHeight:1.7 } as React.CSSProperties,
    automationSection: { background:'rgba(56,189,248,0.06)', border:'1px solid rgba(56,189,248,0.2)', borderRadius:20, padding:20, marginBottom:28 } as React.CSSProperties,
    automationText: { fontSize:15, fontWeight:700, color:'#38BDF8', marginBottom:8, lineHeight:1.6 } as React.CSSProperties,
    automationSub: { fontSize:14, color:'#D8B4FE', lineHeight:1.7 } as React.CSSProperties,
    ctaTitle: { fontSize:18, fontWeight:800, color:'#FFFFFF', textAlign:'center' as const, marginBottom:20, lineHeight:1.5 },
    lineBox: { background:'rgba(6,199,85,0.06)', border:'1px solid rgba(6,199,85,0.25)', borderRadius:20, padding:'22px 20px', marginBottom:16 } as React.CSSProperties,
    lineCta: { fontSize:14, color:'#D8B4FE', marginBottom:14, lineHeight:1.7, fontStyle:'italic' } as React.CSSProperties,
    lineNote: { fontSize:13, color:'#D8B4FE', lineHeight:1.8, marginBottom:18 } as React.CSSProperties,
    lineBtn: { display:'block', width:'100%', background:'linear-gradient(90deg,#06C755,#00a844)', color:'#fff', fontSize:17, fontWeight:700, padding:18, borderRadius:100, textAlign:'center' as const, boxShadow:'0 0 24px rgba(6,199,85,0.4)' } as React.CSSProperties,
    subCtaWrap: { display:'flex', flexDirection:'column' as const, gap:10 },
    subCtaLabel: { textAlign:'center' as const, fontSize:13, color:'#D8B4FE' },
    meetingBtn: { display:'block', width:'100%', background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)', color:'#fff', fontSize:15, fontWeight:700, padding:16, borderRadius:100, textAlign:'center' as const, boxShadow:'0 0 20px rgba(255,78,205,0.35)' } as React.CSSProperties,
    chatBtn: { display:'block', width:'100%', background:'rgba(255,255,255,0.04)', color:'#FFFFFF', border:'1px solid rgba(255,255,255,0.15)', fontSize:15, fontWeight:700, padding:15, borderRadius:100, textAlign:'center' as const } as React.CSSProperties,
    retryWrap: { textAlign:'center' as const, marginTop:24 },
    retryLink: { background:'none', color:'#D8B4FE', fontSize:13, textDecoration:'underline', cursor:'pointer', border:'none' } as React.CSSProperties,
    errCard: { margin:'60px auto', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, padding:'32px 20px', textAlign:'center' as const } as React.CSSProperties,
    retryBtn: { marginTop:20, background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)', color:'#fff', padding:'14px 28px', borderRadius:100, fontSize:15, fontWeight:700, border:'none', cursor:'pointer' } as React.CSSProperties,
    loading: { display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:20, minHeight:'60vh', color:'#D8B4FE', fontSize:14 },
  };

  if(error) return (
    <main style={s.main}>
      <div style={s.errCard}>
        <p style={{color:'#A1A1AA'}}>{error}</p>
        <button style={s.retryBtn} onClick={()=>router.push('/diagnosis')}>もう一度診断する</button>
      </div>
    </main>
  );

  if(!result) return (
    <main style={s.main}>
      <div style={s.loading}><p>読み込み中…</p></div>
    </main>
  );

  const emoji = TYPE_EMOJI[result.type]??'📊';

  return (
    <main style={s.main}>
      <div style={s.header}>
        <p style={s.headerSub}>{nickname}さんの診断結果</p>
        <h1 style={s.headerTitle}>SNS売上診断レポート</h1>
      </div>
      <div style={s.typeCard}>
        <p style={s.typeLabel}>あなたのタイプ</p>
        <div style={s.typeValue}><span>{emoji}</span><span>{result.type}</span></div>
      </div>
      <div style={s.section}>
        <h2 style={s.sectionTitle}>🔍 売上に繋がりにくい原因</h2>
        <p style={s.sectionBody}>{result.cause}</p>
      </div>
      <div style={s.adviceSection}>
        <h2 style={s.sectionTitle}>💡 今すぐできるアドバイス（1つだけ）</h2>
        <p style={s.sectionBody}>{result.advice}</p>
      </div>
      <div style={s.caveat}><p>⚠️ {result.next_step}</p></div>
      <div style={s.automationSection}>
        <p style={s.automationText}>売れている人は<strong>「投稿 → 興味 → LINE → 提案」</strong>まで仕組み化しています。</p>
        <p style={s.automationSub}>{result.automation_pitch}</p>
      </div>
      <h2 style={s.ctaTitle}>完全自動化SNS運用に興味がある方だけ</h2>
      <div style={s.lineBox}>
        <p style={s.lineCta}>{result.line_cta}</p>
        <p style={s.lineNote}>診断結果をもとに、あなたに合うSNS自動化の流れをLINEでお送りします。<br/>無理な営業はありません。<br/><strong style={{color:'#FFFFFF'}}>完全自動化SNS運用に興味がある方だけ</strong>ご登録ください。</p>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={s.lineBtn}>LINEで詳しく見る</a>
      </div>
      <div style={s.subCtaWrap}>
        <p style={s.subCtaLabel}>または</p>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={s.meetingBtn}>💬 LINEで相談する</a>
      </div>
      <div style={s.retryWrap}>
        <button style={s.retryLink} onClick={()=>router.push('/diagnosis')}>もう一度診断する</button>
      </div>
    </main>
  );
}
