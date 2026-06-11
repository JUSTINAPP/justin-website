import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Justin',
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="font-nunito font-bold text-2xl text-brand-deep mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
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
        <h1 className="font-nunito font-bold text-4xl text-brand-deep mb-2">Privacy Policy</h1>
        <p className="text-gray-400 text-sm mb-12">Last updated: June 2025</p>

        <Section title="1. Introduction">
          <p>
            Justin App Pty Ltd ("Justin", "we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use the Justin mobile application and related services
            (collectively, the "Service").
          </p>
          <p>
            Justin is a personal emotional support application that allows users to invite trusted
            people (a "support network") to leave private messages, voice notes, photos, and short
            videos — accessible to the user when they need support. We take the sensitivity of this
            information seriously.
          </p>
          <p>
            By using the Service, you agree to the collection and use of information in accordance
            with this policy. If you do not agree, please do not use the Service.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following categories of information:</p>
          <p>
            <strong className="text-brand-deep">Account information:</strong> When you register,
            we collect your name, email address, and date of birth. This is used to create and
            manage your account.
          </p>
          <p>
            <strong className="text-brand-deep">Support network information:</strong> To invite
            people to your support network, you provide their name and contact details (email or
            phone number). These individuals do not need to create an account. We use this
            information solely to deliver your invitation.
          </p>
          <p>
            <strong className="text-brand-deep">User-generated content:</strong> Voice notes,
            photographs, short videos, and text messages uploaded by your support network members
            on your behalf are stored on our servers and associated with your account.
          </p>
          <p>
            <strong className="text-brand-deep">Usage data:</strong> We may collect anonymised
            information about how you interact with the Service (e.g., which features you use,
            session duration) to improve the app. This data cannot be used to identify you
            individually.
          </p>
          <p>
            <strong className="text-brand-deep">Device information:</strong> We collect your
            device type, operating system version, and push notification token to deliver
            notifications and ensure compatibility.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide, operate, and maintain the Service</li>
            <li>Send you push notifications when support network members add new content</li>
            <li>
              Quietly notify support network members when you open Justin (as part of the
              core support loop)
            </li>
            <li>Respond to your enquiries and provide customer support</li>
            <li>Improve and personalise the Service based on aggregated usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>
            We do not sell, trade, or rent your personal information to any third party, and we
            do not use your content for advertising or profiling purposes.
          </p>
        </Section>

        <Section title="4. Voice Notes, Photos, and Videos">
          <p>
            Messages left by your support network — including voice notes, photos, and short
            videos — are stored securely and are only accessible to you. Support network members
            cannot view, edit, or delete content once it has been submitted.
          </p>
          <p>
            All content is encrypted in transit using TLS and stored encrypted at rest. We do
            not review, listen to, or analyse the content of these messages.
          </p>
          <p>
            You may delete individual messages or your entire account at any time (see Section 8).
            Upon account deletion, all associated content is permanently removed from our servers
            within 30 days.
          </p>
        </Section>

        <Section title="5. Your Support Network">
          <p>
            The people you invite to your support network are not required to create a Justin
            account. We use their contact details only to send the initial invitation link.
            We do not store their contact information beyond what is necessary to manage your
            support network.
          </p>
          <p>
            Support network members are informed, at the point of uploading content, that their
            message will be stored and delivered to you, and that they are contributing to a
            personal support resource. No other use is made of their data.
          </p>
        </Section>

        <Section title="6. Data Storage and Security">
          <p>
            Your data is stored on servers located in Australia and/or the United States,
            operated by reputable cloud infrastructure providers. We implement
            industry-standard technical and organisational measures to protect your information
            against unauthorised access, disclosure, alteration, or destruction.
          </p>
          <p>
            No method of transmission over the internet or electronic storage is 100% secure.
            While we strive to protect your personal information, we cannot guarantee its
            absolute security. In the event of a data breach that is likely to result in serious
            harm, we will notify affected users and relevant authorities as required by law.
          </p>
        </Section>

        <Section title="7. Data Retention">
          <p>
            We retain your personal information and content for as long as your account is
            active. If you have not logged in for 24 consecutive months, we may contact you to
            confirm whether you wish to continue using the Service.
          </p>
          <p>
            Upon account deletion, we permanently erase your personal data and all associated
            content within 30 days, except where we are required to retain certain records by law.
          </p>
        </Section>

        <Section title="8. Your Rights">
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of your account and associated data</li>
            <li>Object to or restrict certain processing of your information</li>
            <li>Receive a portable copy of your data</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at{' '}
            <a href="mailto:hello@justinapp.com.au" className="text-brand-purple hover:underline">
              hello@justinapp.com.au
            </a>
            . We will respond within 30 days.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            Justin is not intended for children under the age of 13. We do not knowingly collect
            personal information from children under 13. If you believe we have inadvertently
            collected such information, please contact us and we will delete it promptly.
          </p>
          <p>
            For users aged 13–17, we recommend parental or guardian awareness of the Service.
            Support network invitations for minors should include a trusted adult.
          </p>
        </Section>

        <Section title="10. Mental Health Disclaimer">
          <p>
            Justin is a personal support and wellbeing tool. It is not a medical device, clinical
            service, or substitute for professional mental health care. The content provided
            through Justin is not reviewed by mental health professionals and does not constitute
            medical advice.
          </p>
          <p>
            If you are experiencing a mental health crisis or emergency, please contact a
            professional service immediately — in Australia, call Lifeline on{' '}
            <strong>13 11 14</strong> or Beyond Blue on <strong>1300 22 4636</strong>.
          </p>
        </Section>

        <Section title="11. Third-Party Services">
          <p>
            We may use third-party services for analytics, push notifications, and cloud
            infrastructure. These providers are contractually bound to use your data only as
            directed by us and in accordance with this policy. We do not allow third parties to
            use your personal information for their own purposes.
          </p>
        </Section>

        <Section title="12. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            "Last updated" date at the top of this page and, where the changes are material,
            notify you via email or in-app notification. Your continued use of the Service after
            any changes constitutes acceptance of the revised policy.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <p>
            If you have questions, concerns, or complaints about this Privacy Policy or our
            privacy practices, please contact us:
          </p>
          <p>
            <strong className="text-brand-deep">Justin App Pty Ltd</strong>
            <br />
            Email:{' '}
            <a href="mailto:hello@justinapp.com.au" className="text-brand-purple hover:underline">
              hello@justinapp.com.au
            </a>
          </p>
          <p>
            We are committed to resolving privacy concerns promptly and fairly. If you are
            located in Australia and are not satisfied with our response, you may lodge a
            complaint with the Office of the Australian Information Commissioner (OAIC) at
            www.oaic.gov.au.
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
