import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - Justin',
  description: 'How Justin collects, uses, and protects your personal information.',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <h2
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: '#4A3B6B',
          letterSpacing: '-0.3px',
          margin: '0 0 12px',
        }}
      >
        {title}
      </h2>
      <div style={{ color: '#5a4f6b', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>

      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #f2eef7',
        }}
      >
        <div className="wrap flex items-center justify-between py-3.5">
          <a
            href="/"
            style={{ fontWeight: 800, fontSize: 26, letterSpacing: '-0.5px', textDecoration: 'none', lineHeight: 1 }}
          >
            <span style={{ color: '#4A3B6B' }}>just</span>
            <span style={{ color: '#C4849A' }}>in</span>
          </a>
          <span style={{ fontSize: 14, fontWeight: 500, color: '#8a8195' }}>Privacy Policy</span>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 32px 96px' }}>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 38px)',
            fontWeight: 800,
            letterSpacing: '-0.8px',
            color: '#2e2540',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: '#8a8195', margin: '0 0 52px' }}>Last updated: 23 June 2026</p>

        <p style={{ color: '#5a4f6b', lineHeight: 1.75, marginBottom: 24 }}>
          Justin is operated by Hecktown Pty Ltd (ABN 90 083 211 821), 17 Charles St, Redfern NSW 2016,
          Australia ("we", "us", "our"). This policy explains what personal information the Justin app
          collects, how we use it, and your choices. By using Justin you agree to this policy.
        </p>
        <p style={{ color: '#5a4f6b', lineHeight: 1.75, marginBottom: 52 }}>
          We built Justin to help people share voice messages with the people they love. We collect only
          what we need to provide that service. We do not sell your data, show advertising, or use
          third-party analytics or tracking.
        </p>

        <Section title="Information we collect">
          <p>When you use Justin, we collect:</p>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: '#4A3B6B' }}>Your phone number:</strong> used to create and verify your account (via a one-time code) and to connect gifts to the right person.</li>
            <li><strong style={{ color: '#4A3B6B' }}>Your name:</strong> the display name you choose, shown to people you send gifts to.</li>
            <li><strong style={{ color: '#4A3B6B' }}>Voice recordings:</strong> the audio messages you record as gifts.</li>
            <li><strong style={{ color: '#4A3B6B' }}>Photos:</strong> any images you attach to a gift.</li>
            <li><strong style={{ color: '#4A3B6B' }}>Written messages:</strong> any captions or text you add to a gift.</li>
            <li><strong style={{ color: '#4A3B6B' }}>People you add:</strong> the names, phone numbers, relationships, notes, and important dates you save for the people you want to send gifts to. This information is private to you.</li>
          </ul>
          <p>
            We do not collect location data, contacts from your device address book, advertising
            identifiers, or browsing activity. We do not use third-party analytics or tracking tools.
          </p>
        </Section>

        <Section title="How we use your information">
          <p>We use your information only to provide and operate Justin:</p>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>To create and secure your account.</li>
            <li>To deliver the voice gifts you create to the people you choose.</li>
            <li>To let gifts you send reach someone when they join Justin (matched by phone number).</li>
            <li>To show you reminders for important dates you have saved.</li>
            <li>To respond to support requests.</li>
          </ul>
          <p>We do not use your information for advertising, profiling, or sale to third parties.</p>
        </Section>

        <Section title="How your information is stored">
          <p>
            Your information is stored using Supabase, our backend and database provider, which hosts
            data securely on our behalf. Voice recordings and photos are stored in private storage. We
            take reasonable steps to protect your information, though no method of transmission or
            storage is completely secure.
          </p>
        </Section>

        <Section title="Sharing your information">
          <p>We do not sell or rent your personal information. We share information only:</p>
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: '#4A3B6B' }}>With the people you choose:</strong> when you send a voice gift, its contents are made available to that recipient.</li>
            <li><strong style={{ color: '#4A3B6B' }}>With service providers:</strong> such as Supabase (data hosting) and Apple (sign-in verification and app distribution), only as needed to operate the app.</li>
            <li><strong style={{ color: '#4A3B6B' }}>Where required by law:</strong> if compelled by a valid legal request.</li>
          </ul>
        </Section>

        <Section title="Your choices and rights">
          <ul style={{ margin: 0, paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <li>
              <strong style={{ color: '#4A3B6B' }}>Delete your account:</strong> you can permanently
              delete your account and your data from within the app at any time. When you delete your
              account, the gifts you received and your saved people, dates, and notes are removed. Gifts
              you have already given to others remain with those recipients, shown from a former user.
            </li>
            <li>
              <strong style={{ color: '#4A3B6B' }}>Access or correct your information:</strong> you can
              edit your name and account details in the app, or contact us.
            </li>
            <li>
              <strong style={{ color: '#4A3B6B' }}>Block:</strong> you can block another user so their
              gifts no longer reach you.
            </li>
          </ul>
          <p>
            To make a privacy request or ask a question, contact us at{' '}
            <a href="mailto:justintimetouch@gmail.com" style={{ color: '#7B6BA8' }}>
              justintimetouch@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="Children">
          <p>
            Justin is not intended for children under 13 (or the minimum age in your country). We do not
            knowingly collect information from children under that age. If you believe a child has
            provided us information, contact us and we will remove it.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. We will post the updated version here with a
            new "last updated" date.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Hecktown Pty Ltd, 17 Charles St, Redfern NSW 2016, Australia. ABN 90 083 211 821.
          </p>
          <p>
            Email:{' '}
            <a href="mailto:justintimetouch@gmail.com" style={{ color: '#7B6BA8' }}>
              justintimetouch@gmail.com
            </a>
          </p>
        </Section>
      </main>

      {/* Footer */}
      <footer style={{ background: '#241c33' }} className="py-10">
        <div
          className="wrap"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, textAlign: 'center' }}
        >
          <a
            href="/"
            style={{ fontWeight: 800, fontSize: 22, letterSpacing: '-0.5px', lineHeight: 1, textDecoration: 'none' }}
          >
            <span style={{ color: 'white' }}>just</span>
            <span style={{ color: '#C4849A' }}>in</span>
          </a>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>
            <Link href="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
            <span>·</span>
            <Link href="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
            <span>·</span>
            <a href="mailto:justintimetouch@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
              justintimetouch@gmail.com
            </a>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, fontStyle: 'italic', margin: 0 }}>
            Just in case. Just in time. Just in touch.
          </p>
        </div>
      </footer>
    </div>
  );
}
