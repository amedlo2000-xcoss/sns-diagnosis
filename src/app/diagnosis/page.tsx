'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { DiagnosisFormData } from '@/lib/types';

const STEPS = [
  { id: 'sns', question: '現在使っているSNSは？（複数選択可）', type: 'multi', options: ['Instagram','X（旧Twitter）','TikTok','YouTube','Facebook','その他'] },
  { id: 'frequency', question: '投稿頻度は？', type: 'single', options: ['毎日','週3〜5回','週1〜2回','月数回以下'] },
  { id: 'followers', question: 'フォロワー数は？', type: 'single', options: ['〜500人','500〜1,000人','1,000〜5,000人','5,000人以上'] },
  { id: 'hasProduct', question: '販売している商品またはサービスはありますか？', type: 'single', options: ['はい、すでに販売中','準備中・構想中','まだない'] },
  { id: 'salesStatus', question: '現在の売上状況は？', type: 'single', options: ['月10万円以上','月1〜10万円','たまに売れる程度','ほぼ0'] },
  { id: 'biggestProblem', question: '一番困っていることは？', type: 'single', options: ['フォロワーが増えない','投稿しても反応がない','売上に繋がらない','運用する時間がない','何を投稿すればいいか分からない'] },
  { id: 'hasFunnel', question: 'LINEやLPなどの集客導線はありますか？', type: 'single', options: ['ある','一部ある','ない・よく分からない'] },
  { id: 'timeAvailable', question: 'SNS運用にかけられる時間は？（1日あたり）', type: 'single', options: ['30分未満','30分〜1時間','1〜2時間','2時間以上'] },
  { id: 'interestedInAutomation', question: 'SNS運用の自動化に興味はありますか？', type: 'single', options: ['とても興味がある','まあ興味がある','あまり興味がない','よく分からない'] },
  { id: 'nickname', question: 'お名前またはニックネームを教えてください', type: 'text', placeholder: '例：山田さん、Yuki、など' },
];

const initialForm: DiagnosisFormData = { sns:[], frequency:'', followers:'', hasProduct:'', salesStatus:'', biggestProblem:'', hasFunnel:'', timeAvailable:'', interestedInAutomation:'', nickname:'' };

const css = {
  main: { maxWidth:480, margin:'0 auto', padding:'0 20px 80px', minHeight:'100vh', background:'linear-gradient(160deg,#080B2A 0%,#12072B 50%,#0d1a3d 100%)', position:'relative' as const },
  progressWrap: { height:6, background:'rgba(255,255,255,0.08)', borderRadius:100, margin:'0 -20px', overflow:'hidden' } as React.CSSProperties,
  progressBar: (w:number): React.CSSProperties => ({ height:'100%', background:'linear-gradient(90deg,#FF4ECD,#8B5CF6,#38BDF8)', width:`${w}%`, transition:'width 0.4s ease', boxShadow:'0 0 12px rgba(255,78,205,0.7)' }),
  progressText: { textAlign:'right' as const, fontSize:12, color:'#D8B4FE', margin:'8px 0 20px' },
  card: { background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:24, padding:'28px 20px', backdropFilter:'blur(20px)', boxShadow:'0 8px 32px rgba(0,0,0,0.5)' } as React.CSSProperties,
  question: { fontSize:17, fontWeight:700, color:'#FFFFFF', lineHeight:1.55, marginBottom:24 } as React.CSSProperties,
  optionList: { listStyle:'none', display:'flex', flexDirection:'column' as const, gap:10 },
  option: (sel:boolean): React.CSSProperties => ({
    display:'block', width:'100%', textAlign:'left', padding:'15px 18px', borderRadius:14,
    border:`2px solid ${sel?'#FF4ECD':'rgba(255,255,255,0.12)'}`,
    background: sel?'rgba(255,78,205,0.12)':'rgba(255,255,255,0.04)',
    fontSize:15, color: sel?'#FF4ECD':'#FFFFFF', fontWeight: sel?700:400,
    transition:'all 0.2s', cursor:'pointer',
    boxShadow: sel?'0 0 20px rgba(255,78,205,0.3)':'none',
  }),
  textInput: { width:'100%', padding:'15px 18px', borderRadius:14, border:'2px solid rgba(255,255,255,0.15)', fontSize:16, color:'#FFFFFF', outline:'none', fontFamily:'inherit', background:'rgba(255,255,255,0.06)', boxSizing:'border-box' as const },
  error: { marginTop:12, fontSize:13, color:'#FF9BEA', fontWeight:600 } as React.CSSProperties,
  nav: { display:'flex', gap:12, marginTop:20 } as React.CSSProperties,
  backBtn: { flex:'0 0 auto', padding:'16px 20px', borderRadius:14, background:'rgba(255,255,255,0.06)', color:'#D8B4FE', fontSize:15, fontWeight:600, border:'1px solid rgba(255,255,255,0.12)', cursor:'pointer' } as React.CSSProperties,
  nextBtn: (dis:boolean): React.CSSProperties => ({ flex:1, padding:16, borderRadius:14, background: dis?'rgba(255,255,255,0.08)':'linear-gradient(90deg,#FF4ECD,#8B5CF6)', color:'#fff', fontSize:17, fontWeight:700, opacity:dis?0.5:1, cursor:dis?'not-allowed':'pointer', border:'none', boxShadow: dis?'none':'0 0 24px rgba(255,78,205,0.4)' }),
  loadingWrap: { marginTop:32, textAlign:'center' as const, display:'flex', flexDirection:'column' as const, alignItems:'center', gap:16 },
  loadingText: { fontSize:14, color:'#D8B4FE' } as React.CSSProperties,
};

export default function DiagnosisPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DiagnosisFormData>(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const cur = STEPS[step];
  const progress = Math.round(((step+1)/STEPS.length)*100);
  const val = form[cur.id as keyof DiagnosisFormData];

  const handleSingle = (v:string) => { setForm(p=>({...p,[cur.id]:v})); setError(''); };
  const handleMulti = (v:string) => { const a=form.sns; setForm(p=>({...p,sns:a.includes(v)?a.filter(x=>x!==v):[...a,v]})); setError(''); };
  const handleText = (e:React.ChangeEvent<HTMLInputElement>) => { setForm(p=>({...p,nickname:e.target.value})); setError(''); };

  const validate = () => {
    if(cur.type==='multi'){ if((val as string[]).length===0){setError('1つ以上選択してください');return false;} }
    else if(cur.type==='text'){ if(!(val as string).trim()){setError('入力してください');return false;} }
    else { if(!val){setError('選択してください');return false;} }
    return true;
  };

  const handleNext = async () => {
    if(!validate())return;
    if(step<STEPS.length-1){ setStep(s=>s+1); }
    else {
      setLoading(true);
      try {
        const res = await fetch('/api/diagnose',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
        if(!res.ok)throw new Error();
        const data = await res.json();
        sessionStorage.setItem('diagnosisResult',JSON.stringify(data));
        sessionStorage.setItem('diagnosisNickname',form.nickname);
        router.push('/result');
      } catch { setError('診断に失敗しました。時間をおいて再度お試しください。'); }
      finally { setLoading(false); }
    }
  };

  return (
    <main style={css.main}>
      <div style={css.progressWrap}><div style={css.progressBar(progress)}/></div>
      <p style={css.progressText}>{step+1} / {STEPS.length}</p>
      <div style={css.card}>
        <h2 style={css.question}>Q{step+1}. {cur.question}</h2>
        {cur.type==='single' && <ul style={css.optionList}>{cur.options?.map(o=><li key={o}><button className="option-btn" style={css.option(val===o)} onClick={()=>handleSingle(o)}>{o}</button></li>)}</ul>}
        {cur.type==='multi' && <ul style={css.optionList}>{cur.options?.map(o=><li key={o}><button className="option-btn" style={css.option((val as string[]).includes(o))} onClick={()=>handleMulti(o)}>{o}</button></li>)}</ul>}
        {cur.type==='text' && <input style={css.textInput} type="text" placeholder={cur.placeholder} value={form.nickname} onChange={handleText} maxLength={30}/>}
        {error && <p style={css.error}>{error}</p>}
      </div>
      <div style={css.nav}>
        {step>0 && <button style={css.backBtn} onClick={()=>setStep(s=>s-1)}>← 戻る</button>}
        <button style={css.nextBtn(loading)} onClick={handleNext} disabled={loading}>
          {loading?'診断中…':step===STEPS.length-1?'診断結果を見る →':'次へ →'}
        </button>
      </div>
      {loading && <div style={css.loadingWrap}><p style={css.loadingText}>あなたの回答をもとに診断しています…</p></div>}
    </main>
  );
}
