'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DiagnosisResult } from '@/lib/types';

const LINE_URL = 'https://lin.ee/6fub10f';
const CHAT_URL = 'https://lin.ee/6fub10f';
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
    main: { maxWidth:480, margin:'0 auto', padding:'0 20px 80px' } as React.CSSProperties,
    header: { padding:'28px 0 20px', borderBottom:'1px solid #E2EAF4', marginBottom:24 } as React.CSSProperties,
    headerSub: { fontSize:13, color:'#6B7A99', marginBottom:6 } as React.CSSProperties,
    headerTitle: { fontSize:20, fontWeight:800, color:'#1B2A4A' } as React.CSSProperties,
    typeCard: { background:'#1B2A4A', color:'#fff', borderRadius:16, padding:'24px 20px', marginBottom:20, textAlign:'center' as const },
    typeLabel: { fontSize:12, opacity:0.7, letterSpacing:'0.08em', marginBottom:10 } as React.CSSProperties,
    typeValue: { fontSize:24, fontWeight:800, display:'flex', alignItems:'center', justifyContent:'center', gap:10 } as React.CSSProperties,
    section: { background:'#fff', border:'1px solid #E2EAF4', borderRadius:16, padding:'22px 20px', marginBottom:14, boxShadow:'0 2px 16px rgba(27,42,74,0.08)' } as React.CSSProperties,
    adviceSection: { background:'#F0F7FF', border:'1px solid #5B9BD5', borderRadius:16, padding:'22px 20px', marginBottom:14 } as React.CSSProperties,
    sectionTitle: { fontSize:15, fontWeight:700, color:'#1B2A4A', marginBottom:12 } as React.CSSProperties,
    sectionBody: { fontSize:15, lineHeight:1.8, color:'#1A1A2E' } as React.CSSProperties,
    caveat: { background:'#FFF8EC', borderLeft:'4px solid #F5A623', borderRadius:'0 12px 12px 0', padding:'14px 16px', marginBottom:20, fontSize:14, color:'#7A5C00', lineHeight:1.7 } as React.CSSProperties,
    automationSection: { background:'#D6E8F7', borderRadius:16, padding:20, marginBottom:28 } as React.CSSProperties,
    automationText: { fontSize:15, fontWeight:700, color:'#1B2A4A', marginBottom:8, lineHeight:1.6 } as React.CSSProperties,
    automationSub: { fontSize:14, color:'#6B7A99', lineHeight:1.7 } as React.CSSProperties,
    ctaTitle: { fontSize:18, fontWeight:800, color:'#1B2A4A', textAlign:'center' as const, marginBottom:20, lineHeight:1.5 },
    lineBox: { background:'#F0FFF6', border:'2px solid #4CAF7D', borderRadius:16, padding:'22px 20px', marginBottom:16 } as React.CSSProperties,
    lineCta: { fontSize:14, color:'#1A1A2E', marginBottom:14, lineHeight:1.7, fontStyle:'italic' } as React.CSSProperties,
    lineNote: { fontSize:13, color:'#6B7A99', lineHeight:1.8, marginBottom:18 } as React.CSSProperties,
    lineBtn: { display:'block', width:'100%', background:'#06C755', color:'#fff', fontSize:17, fontWeight:700, padding:18, borderRadius:12, textAlign:'center' as const },
    subCtaWrap: { display:'flex', flexDirection:'column' as const, gap:10 },
    subCtaLabel: { textAlign:'center' as const, fontSize:13, color:'#6B7A99' },
    meetingBtn: { display:'block', width:'100%', background:'#06C755', color:'#fff', fontSize:15, fontWeight:700, padding:16, borderRadius:12, textAlign:'center' as const },
    chatBtn: { display:'block', width:'100%', background:'#fff', color:'#1B2A4A', border:'2px solid #1B2A4A', fontSize:15, fontWeight:700, padding:15, borderRadius:12, textAlign:'center' as const },
    retryWrap: { textAlign:'center' as const, marginTop:24 },
    retryLink: { background:'none', color:'#6B7A99', fontSize:13, textDecoration:'underline', cursor:'pointer', border:'none' } as React.CSSProperties,
    errCard: { margin:'60px auto', background:'#fff', border:'1px solid #E2EAF4', borderRadius:16, padding:'32px 20px', textAlign:'center' as const },
    retryBtn: { marginTop:20, background:'#1B2A4A', color:'#fff', padding:'14px 28px', borderRadius:12, fontSize:15, fontWeight:700, border:'none', cursor:'pointer' } as React.CSSProperties,
    loading: { display:'flex', flexDirection:'column' as const, alignItems:'center', justifyContent:'center', gap:20, minHeight:'60vh', color:'#6B7A99', fontSize:14 },
  };

  if(error) return (
    <main style={s.main}>
      <div style={s.errCard}>
        <p>{error}</p>
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
        <p style={s.lineNote}>診断結果をもとに、あなたに合うSNS自動化の流れをLINEでお送りします。<br/>無理な営業はありません。<br/><strong>完全自動化SNS運用に興味がある方だけ</strong>ご登録ください。</p>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={s.lineBtn}>LINEで詳しく見る</a>
      </div>
      <div style={s.subCtaWrap}>
        <p style={s.subCtaLabel}>または</p>
        <a href={LINE_URL} target="_blank" rel="noopener noreferrer" style={s.meetingBtn}>💬 LINEで相談する</a>
        <a href={CHAT_URL} target="_blank" rel="noopener noreferrer" style={s.chatBtn}>💬 チャットで問い合わせる</a>
      </div>
      <div style={s.retryWrap}>
        <button style={s.retryLink} onClick={()=>router.push('/diagnosis')}>もう一度診断する</button>
      </div>
    </main>
  );
}
