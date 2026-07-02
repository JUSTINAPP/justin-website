import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Justin',
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

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'white' }}>

      {/* ── Header — matches Nav ── */}
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
          <span style={{ fontSize: 14, fontWeight: 500, color: '#8a8195' }}>Terms of Service</span>
        </div>
      </header>

      {/* ── Content ── */}
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
          Terms of Service
        </h1>
        <p style={{ fontSize: 14, color: '#8a8195', margin: '0 0 52px' }}>Last updated: June 2025</p>

        <Section title="1. Acceptance of Terms">
          <p>
            These Terms of Service ("Terms") govern your access to and use of the Justin mobile
            application and related services (collectively, the "Service"), operated by Justin
            App Pty Ltd ("Justin", "we", "us", or "our").
          </p>
          <p>
            By downloading, installing, or using the Service, you agree to be bound by these
            Terms. If you do not agree to these Terms, do not use the Service.
          </p>
          <p>
            We may update these Terms from time to time. We will notify you of material changes
            via email or in-app notification. Your continued use of the Service after such notice
            constitutes acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="2. Description of Service">
          <p>
            Justin is a personal emotional support application. It allows you (the "User") to
            invite up to five trusted people (your "support network") to leave private voice
            notes, photographs, short videos, and text messages — which you can access at any
            time when you need emotional support.
          </p>
          <p>
            When you open Justin, members of your support network may be quietly notified so
            they can reach out to you directly if they choose.
          </p>
          <p>
            Justin is a personal wellbeing tool only. It is not a clinical service, crisis
            intervention service, or substitute for professional mental health support.
          </p>
        </Section>

        <Section title="3. Eligibility">
          <p>
            You must be at least 13 years of age to use the Service. By using the Service, you
            represent and warrant that you meet this age requirement. If you are between 13 and
            17 years of age, you represent that a parent or guardian is aware of your use of the
            Service.
          </p>
          <p>
            The Service is available for personal, non-commercial use only. You may not use the
            Service on behalf of a business, organisation, or institution.
          </p>
        </Section>

        <Section title="4. Your Account">
          <p>
            To use the Service, you must create an account using your name and email address.
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activity that occurs under your account.
          </p>
          <p>
            You agree to notify us immediately at{' '}
            <a href="mailto:justintimetouch@gmail.com" className="text-brand-purple hover:underline">
              justintimetouch@gmail.com
            </a>{' '}
            if you suspect any unauthorised access to your account. We are not liable for any
            loss arising from your failure to safeguard your account.
          </p>
        </Section>

        <Section title="5. User Content">
          <p>
            The Service allows your support network members to upload content on your behalf,
            including voice recordings, photos, and videos ("User Content"). You retain ownership
            of all User Content associated with your account.
          </p>
          <p>
            By using the Service, you grant Justin a limited, non-exclusive, royalty-free licence
            to store and transmit User Content solely for the purpose of providing the Service
            to you. We do not use your content for any other purpose.
          </p>
          <p>You and your support network members must not upload content that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Is unlawful, harmful, threatening, abusive, or harassing</li>
            <li>Contains nudity, sexually explicit material, or graphic violence</li>
            <li>Violates the intellectual property rights of any third party</li>
            <li>Contains malware, viruses, or other malicious code</li>
            <li>Impersonates any person or entity</li>
          </ul>
          <p>
            We reserve the right to remove content that violates these Terms, and to suspend
            or terminate accounts responsible for repeated violations.
          </p>
        </Section>

        <Section title="6. Support Network Members">
          <p>
            When you invite someone to your support network, you are responsible for ensuring
            you have their consent to share their contact details with us and to invite them to
            leave messages for you.
          </p>
          <p>
            Support network members are not required to create a Justin account. By uploading
            content, they agree to our{' '}
            <Link href="/privacy" className="text-brand-purple hover:underline">
              Privacy Policy
            </Link>{' '}
            and confirm that the content they submit is appropriate and intended as genuine
            emotional support.
          </p>
        </Section>

        <Section title="7. Mental Health Disclaimer">
          <p>
            <strong style={{ color: '#2e2540' }}>
              Justin is not a crisis service, medical device, or mental health treatment.
            </strong>{' '}
            The content provided through Justin reflects the personal messages of your support
            network and does not constitute professional advice of any kind.
          </p>
          <p>
            If you are in crisis or experiencing a mental health emergency, please contact
            emergency services or a crisis support line immediately:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              <strong>Australia:</strong> Lifeline — 13 11 14 | Beyond Blue — 1300 22 4636
            </li>
            <li>
              <strong>UK:</strong> Samaritans — 116 123
            </li>
            <li>
              <strong>USA:</strong> 988 Suicide & Crisis Lifeline — call or text 988
            </li>
          </ul>
          <p>
            Justin and its affiliates are not liable for any harm arising from reliance on
            the Service as a substitute for professional care.
          </p>
        </Section>

        <Section title="8. Prohibited Uses">
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
            <li>Attempt to gain unauthorised access to any part of the Service or its systems</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Use automated tools to scrape, crawl, or extract data from the Service</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Service</li>
            <li>Create multiple accounts for the purpose of abuse or circumventing restrictions</li>
          </ul>
        </Section>

        <Section title="9. Intellectual Property">
          <p>
            The Service, including its design, features, code, and branding (excluding User
            Content), is owned by Justin App Pty Ltd and protected by Australian and
            international intellectual property laws.
          </p>
          <p>
            You are granted a limited, non-exclusive, non-transferable, revocable licence to
            use the Service for personal, non-commercial purposes only. No other rights are
            granted.
          </p>
        </Section>

        <Section title="10. Privacy">
          <p>
            Your use of the Service is also governed by our{' '}
            <Link href="/privacy" className="text-brand-purple hover:underline">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference. Please review it carefully.
          </p>
        </Section>

        <Section title="11. Termination">
          <p>
            You may delete your account at any time through the app settings. Upon deletion,
            your account and all associated content will be permanently removed within 30 days.
          </p>
          <p>
            We reserve the right to suspend or terminate your access to the Service at any time,
            with or without notice, for conduct that we believe violates these Terms or is
            harmful to other users, us, or third parties.
          </p>
        </Section>

        <Section title="12. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, Justin and its officers,
            directors, employees, and affiliates shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including loss of data,
            loss of profits, or loss of goodwill, arising out of or in connection with your
            use of the Service.
          </p>
          <p>
            Our total liability to you for any claim arising out of or relating to these Terms
            or the Service shall not exceed the amount you paid to us in the 12 months
            preceding the claim (or AUD $100 if you have not made any payments).
          </p>
        </Section>

        <Section title="13. Governing Law">
          <p>
            These Terms are governed by the laws of New South Wales, Australia. You agree to
            submit to the exclusive jurisdiction of the courts of New South Wales for the
            resolution of any disputes arising under these Terms.
          </p>
          <p>
            If any provision of these Terms is found to be unenforceable, the remaining
            provisions will continue in full force and effect.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>If you have any questions about these Terms, please contact us:</p>
          <p>
            <strong style={{ color: '#2e2540' }}>Justin App Pty Ltd</strong>
            <br />
            Email:{' '}
            <a href="mailto:justintimetouch@gmail.com" className="text-brand-purple hover:underline">
              justintimetouch@gmail.com
            </a>
          </p>
        </Section>
      </main>

      {/* ── Footer — matches main site Footer ── */}
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
