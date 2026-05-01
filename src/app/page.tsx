'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const s: Record<string, React.CSSProperties> = {
    main: { maxWidth: 480, margin: '0 auto', padding: '0 20px 60px' },
    badge: { display: 'inline-block', background: '#D6FF00', color: '#0F1115', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 100, marginTop: 24, letterSpacing: '0.05em' },
    hero: { marginTop: 20, paddingBottom: 32, borderBottom: '1px solid #2A2D35', display: 'flex', alignItems: 'center', gap: 20 },
    heroText: { flex: 1 },
    heroSub: { fontSize: 13, color: '#A1A1AA', marginBottom: 12, fontWeight: 500 },
    heroTitle: { fontSize: 26, fontWeight: 800, lineHeight: 1.45, color: '#FFFFFF', marginBottom: 16 },
    accent: { color: '#D6FF00' },
    heroDesc: { fontSize: 14, color: '#A1A1AA', background: '#1A1D24', border: '1px solid #2A2D35', padding: '10px 16px', borderRadius: 12 },
    aiCharPlaceholder: { width: 100, height: 100, borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, #D6FF00 0%, #8BD3FF 50%, #FF9BEA 100%)', opacity: 0.85, flexShrink: 0, boxShadow: '0 0 30px rgba(214,255,0,0.3)' },
    sectionTitle: { fontSize: 17, fontWeight: 700, color: '#FFFFFF', margin: '32px 0 16px' },
    benefitList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 },
    benefitItem: { display: 'flex', alignItems: 'flex-start', gap: 14, background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: 16, padding: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.4)' },
    benefitIcon: { fontSize: 22, flexShrink: 0, marginTop: 2 },
    benefitStrong: { display: 'block', fontSize: 15, color: '#FFFFFF', marginBottom: 4 },
    benefitP: { fontSize: 13, color: '#A1A1AA', lineHeight: 1.6 },
    trustBadges: { display: 'flex', gap: 8, flexWrap: 'wrap', margin: '28px 0', justifyContent: 'center' },
    badge2: { background: '#1A1D24', color: '#D6FF00', border: '1px solid #2A2D35', fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 100 },
    ctaSection: { textAlign: 'center', marginTop: 8 },
    ctaButton: { display: 'block', width: '100%', background: '#D6FF00', color: '#0F1115', fontSize: 18, fontWeight: 700, padding: 20, borderRadius: 12, letterSpacing: '0.03em', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px rgba(214,255,0,0.25)' },
    ctaNote: { fontSize: 12, color: '#A1A1AA', marginTop: 10 },
    footer: { marginTop: 60, textAlign: 'center', fontSize: 11, color: '#A1A1AA' },
  };
  const benefits = [
    { icon: '🔍', title: '売れない原因タイプ', desc: 'あなたのSNSが伸びない本当の理由を特定します' },
    { icon: '💡', title: '今すぐできる改善策', desc: '難しいことなしに、今日から試せる1つのアクション' },
    { icon: '⚙️', title: '整えるべき導線', desc: '売上につながるSNS自動化の考え方をご提案' },
  ];
  return (
    <main style={s.main}>
      <div style={s.badge}>完全無料・スマホ完結</div>
      <section style={s.hero}>
        <div style={s.heroText}>
          <p style={s.heroSub}>毎日投稿してるのに売れていない方へ</p>
          <h1 style={s.heroTitle}>あなたのSNSが<br /><span style={s.accent}>売上に繋がらない原因</span>を<br />30秒で診断します</h1>
          <p style={s.heroDesc}>10問以内の選択式・無料・すぐ結果が出ます</p>
        </div>
        <div className="ai-char-wrap">
          <div style={s.aiCharPlaceholder} />
        </div>
      </section>
      <h2 style={s.sectionTitle}>診断でわかること</h2>
      <ul style={s.benefitList}>
        {benefits.map(b => (
          <li key={b.title} style={s.benefitItem}>
            <span style={s.benefitIcon}>{b.icon}</span>
            <div><strong style={s.benefitStrong}>{b.title}</strong><p style={s.benefitP}>{b.desc}</p></div>
          </li>
        ))}
      </ul>
      <div style={s.trustBadges}>
        {['✅ 無料','✅ 10問以内','✅ スマホで完結'].map(t => <div key={t} style={s.badge2}>{t}</div>)}
      </div>
      <div style={s.ctaSection}>
        <button style={s.ctaButton} onClick={() => router.push('/diagnosis')}>無料診断をはじめる →</button>
        <p style={s.ctaNote}>登録不要・所要時間30秒〜1分</p>
      </div>
      <footer style={s.footer}><p>© 2025 SNS売上診断</p></footer>
    </main>
  );
}
