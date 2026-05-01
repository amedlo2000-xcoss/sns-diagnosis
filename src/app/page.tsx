'use client';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const s: Record<string, React.CSSProperties> = {
    main: { maxWidth: 480, margin: '0 auto', padding: '0 20px 60px' },
    badge: { display: 'inline-block', background: 'var(--color-blue-pastel)', color: 'var(--color-navy)', fontSize: 12, fontWeight: 700, padding: '6px 16px', borderRadius: 100, marginTop: 24, letterSpacing: '0.05em' },
    hero: { marginTop: 20, paddingBottom: 32, borderBottom: '1px solid var(--color-border)' },
    heroSub: { fontSize: 13, color: 'var(--color-sub)', marginBottom: 12, fontWeight: 500 },
    heroTitle: { fontSize: 26, fontWeight: 800, lineHeight: 1.45, color: 'var(--color-navy)', marginBottom: 16 },
    accent: { color: 'var(--color-accent)' },
    heroDesc: { fontSize: 14, color: 'var(--color-sub)', background: 'var(--color-blue-pastel)', padding: '10px 16px', borderRadius: 'var(--radius)' },
    sectionTitle: { fontSize: 17, fontWeight: 700, color: 'var(--color-navy)', margin: '32px 0 16px' },
    benefitList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 },
    benefitItem: { display: 'flex', alignItems: 'flex-start', gap: 14, background: '#F8FBFF', border: '1px solid var(--color-border)', borderRadius: 'var(--radius)', padding: 16 },
    benefitIcon: { fontSize: 22, flexShrink: 0, marginTop: 2 },
    benefitStrong: { display: 'block', fontSize: 15, color: 'var(--color-navy)', marginBottom: 4 },
    benefitP: { fontSize: 13, color: 'var(--color-sub)', lineHeight: 1.6 },
    trustBadges: { display: 'flex', gap: 8, flexWrap: 'wrap', margin: '28px 0', justifyContent: 'center' },
    badge2: { background: 'var(--color-blue-pastel)', color: 'var(--color-navy)', fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 100 },
    ctaSection: { textAlign: 'center', marginTop: 8 },
    ctaButton: { display: 'block', width: '100%', background: 'var(--color-navy)', color: '#fff', fontSize: 18, fontWeight: 700, padding: 20, borderRadius: 'var(--radius)', boxShadow: 'var(--shadow)', letterSpacing: '0.03em' },
    ctaNote: { fontSize: 12, color: 'var(--color-sub)', marginTop: 10 },
    footer: { marginTop: 60, textAlign: 'center', fontSize: 11, color: 'var(--color-sub)' },
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
        <p style={s.heroSub}>毎日投稿してるのに売れていない方へ</p>
        <h1 style={s.heroTitle}>あなたのSNSが<br /><span style={s.accent}>売上に繋がらない原因</span>を<br />30秒で診断します</h1>
        <p style={s.heroDesc}>10問以内の選択式・無料・すぐ結果が出ます</p>
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
