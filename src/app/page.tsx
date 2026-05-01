'use client';
import { useRouter } from 'next/navigation';

const CHARACTERS = [
  { id:'trust',    name:'信頼構築タイプ', desc:'丁寧な発信で深い信頼を築く',         color:'#38BDF8', emoji:'🤝' },
  { id:'viral',    name:'拡散タイプ',     desc:'バズる投稿で一気に認知を広げる',     color:'#FF4ECD', emoji:'🔥' },
  { id:'analysis', name:'分析タイプ',     desc:'データで最適な戦略を導き出す',       color:'#D6FF00', emoji:'📊' },
  { id:'empathy',  name:'共感タイプ',     desc:'感情に寄り添い熱狂的ファンを作る',   color:'#8B5CF6', emoji:'💖' },
  { id:'challenge',name:'挑戦タイプ',     desc:'新しいことに挑戦し道を切り開く',     color:'#FF9BEA', emoji:'⚡' },
];

export default function LandingPage() {
  const router = useRouter();
  return (
    <main style={{ minHeight:'100vh', background:'linear-gradient(135deg,#12072B 0%,#1a0a3d 50%,#0d1a3d 100%)', position:'relative', overflow:'hidden' }}>
      {/* 背景装飾 */}
      <div style={{ position:'fixed', top:'-20%', left:'-10%', width:'60vw', height:'60vw', borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.15) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', bottom:'-20%', right:'-10%', width:'50vw', height:'50vw', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,78,205,0.12) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>

      <div style={{ maxWidth:480, margin:'0 auto', padding:'0 20px 80px', position:'relative', zIndex:1, animation:'fadeIn 0.6s ease' }}>

        {/* バッジ */}
        <div style={{ paddingTop:32, display:'flex', justifyContent:'center' }}>
          <span style={{ background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)', padding:'6px 20px', borderRadius:100, fontSize:12, fontWeight:700, letterSpacing:'0.08em' }}>
            🤖 AI診断 完全無料
          </span>
        </div>

        {/* ヒーロー */}
        <div style={{ textAlign:'center', marginTop:24, paddingBottom:32 }}>
          <p style={{ fontSize:13, color:'#D8B4FE', marginBottom:12 }}>毎日投稿してるのに売れていない方へ</p>
          <h1 style={{ fontSize:28, fontWeight:900, lineHeight:1.4, marginBottom:16 }}>
            あなたのSNSが<br/>
            <span style={{ background:'linear-gradient(90deg,#FF4ECD,#8B5CF6,#38BDF8)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
              売上に繋がらない原因
            </span>
            を<br/>30秒で診断します
          </h1>
          <p style={{ fontSize:14, color:'#D8B4FE', background:'rgba(255,255,255,0.05)', padding:'10px 16px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)' }}>
            10問以内の選択式・無料・すぐ結果が出ます
          </p>
        </div>

        {/* メインCTA */}
        <button
          onClick={() => router.push('/diagnosis')}
          style={{ display:'block', width:'100%', background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)', color:'#fff', fontSize:18, fontWeight:800, padding:20, borderRadius:16, border:'none', cursor:'pointer', boxShadow:'0 0 30px rgba(255,78,205,0.4)', marginBottom:8, animation:'glow 2s ease-in-out infinite' }}
        >
          無料診断をはじめる →
        </button>
        <p style={{ textAlign:'center', fontSize:12, color:'#D8B4FE', marginBottom:40 }}>登録不要・所要時間30秒〜1分</p>

        {/* 診断でわかること */}
        <div style={{ marginBottom:40 }}>
          <h2 style={{ fontSize:16, fontWeight:700, textAlign:'center', marginBottom:16, color:'#D8B4FE' }}>診断でわかること</h2>
          {[
            { icon:'🔍', title:'売れない原因タイプ', desc:'あなたのSNSが伸びない本当の理由を特定します', color:'#38BDF8' },
            { icon:'💡', title:'今すぐできる改善策', desc:'難しいことなしに、今日から試せる1つのアクション', color:'#FF4ECD' },
            { icon:'⚙️', title:'整えるべき導線', desc:'売上につながるSNS自動化の考え方をご提案', color:'#8B5CF6' },
          ].map(b => (
            <div key={b.title} style={{ display:'flex', alignItems:'flex-start', gap:14, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, padding:16, marginBottom:10, backdropFilter:'blur(10px)' }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{b.icon}</span>
              <div>
                <strong style={{ display:'block', fontSize:15, color:b.color, marginBottom:4 }}>{b.title}</strong>
                <p style={{ fontSize:13, color:'#D8B4FE', lineHeight:1.6 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 5キャラカード */}
        <div style={{ marginBottom:40 }}>
          <h2 style={{ fontSize:16, fontWeight:700, textAlign:'center', marginBottom:4, color:'#D8B4FE' }}>あなたはどのタイプ？</h2>
          <p style={{ fontSize:13, color:'#D8B4FE', textAlign:'center', marginBottom:16 }}>5つの診断タイプから判定します</p>
          <div style={{ display:'flex', gap:12, overflowX:'auto', paddingBottom:8, scrollbarWidth:'none' as const }}>
            {CHARACTERS.map(c => (
              <div key={c.id}
                style={{ flexShrink:0, width:140, background:'rgba(255,255,255,0.05)', border:`1px solid ${c.color}40`, borderRadius:24, overflow:'hidden', transition:'transform 0.2s', cursor:'default' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width:'100%', height:100, background:`linear-gradient(135deg,${c.color}30,rgba(18,7,43,0.8))`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:40 }}>
                  {c.emoji}
                </div>
                <div style={{ padding:'10px 12px' }}>
                  <p style={{ fontSize:12, fontWeight:700, color:c.color, marginBottom:4 }}>{c.name}</p>
                  <p style={{ fontSize:11, color:'#D8B4FE', lineHeight:1.5 }}>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 安心バッジ */}
        <div style={{ display:'flex', gap:8, justifyContent:'center', marginBottom:32, flexWrap:'wrap' }}>
          {['✅ 無料','✅ 10問以内','✅ スマホで完結'].map(t => (
            <span key={t} style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', padding:'8px 16px', borderRadius:100, fontSize:13, color:'#D8B4FE' }}>{t}</span>
          ))}
        </div>

        {/* 再度CTA */}
        <button
          onClick={() => router.push('/diagnosis')}
          style={{ display:'block', width:'100%', background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)', color:'#fff', fontSize:18, fontWeight:800, padding:20, borderRadius:16, border:'none', cursor:'pointer', boxShadow:'0 0 30px rgba(255,78,205,0.4)' }}
        >
          無料診断をはじめる →
        </button>

        <footer style={{ marginTop:48, textAlign:'center', fontSize:11, color:'#D8B4FE' }}>© 2025 SNS売上診断</footer>
      </div>
    </main>
  );
}
