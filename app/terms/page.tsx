import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Justin',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-nunito font-bold text-2xl text-brand-deep mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <header className="bg-brand-deep px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/">
            <Image
              src="/assets/justin-logo-no-background.png"
              alt="Justin — Home"
              width={160}
              height={56}
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-14">
        <h1 className="font-nunito font-bold text-4xl text-brand-deep mb-2">Terms of Service</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: June 2025</p>

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
            <a href="mailto:hello@justinapp.com.au" className="text-brand-purple hover:underline">
              hello@justinapp.com.au
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
            <strong className="text-brand-deep">
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
            <li>
              Use automated tools to scrape, crawl, or extract data from the Service
            </li>
            <li>
              Reverse engineer, decompile, or disassemble any part of the Service
            </li>
            <li>
              Create multiple accounts for the purpose of abuse or circumventing restrictions
            </li>
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
            <strong className="text-brand-deep">Justin App Pty Ltd</strong>
            <br />
            Email:{' '}
            <a href="mailto:hello@justinapp.com.au" className="text-brand-purple hover:underline">
              hello@justinapp.com.au
            </a>
          </p>
        </Section>
      </main>

      <footer className="bg-brand-deep py-8 px-6 text-center">
        <p className="text-white/30 text-sm">© 2025 Justin App. All rights reserved.</p>
        <div className="flex justify-center gap-6 mt-2 text-white/40 text-sm">
          <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white/70 transition-colors">Terms</Link>
          <span>·</span>
          <a href="mailto:hello@justinapp.com.au" className="hover:text-white/70 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
