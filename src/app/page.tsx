'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  return (
    <main style={{ minHeight:'100vh', background:'linear-gradient(160deg,#080B2A 0%,#12072B 40%,#1a0a3d 70%,#0d1a3d 100%)', position:'relative', overflow:'hidden' }}>

      {/* 背景装飾 */}
      <div style={{ position:'fixed', top:'-30%', left:'-20%', width:'70vw', height:'70vw', borderRadius:'50%', background:'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', bottom:'-20%', right:'-15%', width:'60vw', height:'60vw', borderRadius:'50%', background:'radial-gradient(circle,rgba(255,78,205,0.1) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'fixed', top:'30%', right:'10%', width:'30vw', height:'30vw', borderRadius:'50%', background:'radial-gradient(circle,rgba(56,189,248,0.08) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }}/>

      <div style={{ maxWidth:560, margin:'0 auto', padding:'0 20px 80px', position:'relative', zIndex:1 }}>

        {/* バッジ */}
        <div style={{ paddingTop:32, display:'flex', justifyContent:'center', marginBottom:20 }}>
          <span style={{ background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)', padding:'6px 20px', borderRadius:100, fontSize:12, fontWeight:700, letterSpacing:'0.08em', color:'#fff' }}>
            ✨ AI診断 完全無料
          </span>
        </div>

        {/* サブテキスト */}
        <p style={{ textAlign:'center', fontSize:13, color:'#D8B4FE', marginBottom:16 }}>
          毎日投稿してるのに売れていない方へ
        </p>

        {/* メインビジュアル画像 */}
        <div style={{ position:'relative', width:'100%', marginBottom:28, borderRadius:24, overflow:'hidden', boxShadow:'0 0 40px rgba(255,78,205,0.35), 0 0 80px rgba(56,189,248,0.18)', border:'1px solid rgba(255,255,255,0.12)' }}>
          <Image
            src="/top-character-diagnosis.png"
            alt="SNS診断 5キャラクタータイプ"
            width={1200}
            height={630}
            style={{ width:'100%', height:'auto', display:'block' }}
            priority
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(135deg,rgba(255,78,205,0.1),rgba(139,92,246,0.1))', display:'flex', alignItems:'center', justifyContent:'center', minHeight:200 }}>
          </div>
        </div>

        {/* メインCTAボタン */}
        <button
          onClick={() => router.push('/diagnosis')}
          style={{
            display:'block', width:'100%',
            background:'linear-gradient(90deg,#FF4ECD,#8B5CF6)',
            color:'#fff', fontSize:20, fontWeight:900,
            padding:'22px 20px', borderRadius:100,
            border:'none', cursor:'pointer',
            boxShadow:'0 0 40px rgba(255,78,205,0.5), 0 0 80px rgba(139,92,246,0.3)',
            letterSpacing:'0.05em', marginBottom:12,
            transition:'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='scale(1.02)'; e.currentTarget.style.boxShadow='0 0 60px rgba(255,78,205,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='0 0 40px rgba(255,78,205,0.5)'; }}
        >
          ✦ 無料で診断をはじめる →
        </button>
        <p style={{ textAlign:'center', fontSize:12, color:'#D8B4FE', marginBottom:40 }}>登録不要・所要時間30秒〜1分・スマホで完結</p>

        {/* 診断でわかること */}
        <div style={{ marginBottom:40 }}>
          <h2 style={{ fontSize:15, fontWeight:700, textAlign:'center', marginBottom:16, color:'#D8B4FE', letterSpacing:'0.05em' }}>── 診断でわかること ──</h2>
          {[
            { icon:'🔍', title:'売れない原因タイプ', desc:'あなたのSNSが伸びない本当の理由を特定します', color:'#38BDF8' },
            { icon:'💡', title:'今すぐできる改善策', desc:'難しいことなしに、今日から試せる1つのアクション', color:'#FF4ECD' },
            { icon:'⚙️', title:'整えるべき導線', desc:'売上につながるSNS自動化の考え方をご提案', color:'#8B5CF6' },
          ].map(b => (
            <div key={b.title} style={{ display:'flex', alignItems:'flex-start', gap:14, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:16, padding:16, marginBottom:10, backdropFilter:'blur(10px)' }}>
              <span style={{ fontSize:24, flexShrink:0 }}>{b.icon}</span>
              <div>
                <strong style={{ display:'block', fontSize:15, color:b.color, marginBottom:4 }}>{b.title}</strong>
                <p style={{ fontSize:13, color:'#D8B4FE', lineHeight:1.6 }}>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <footer style={{ marginTop:48, textAlign:'center', fontSize:11, color:'#D8B4FE' }}>© 2025 SNS売上診断</footer>
      </div>
    </main>
  );
}
