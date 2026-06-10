import { PageHero } from "@/components/PageHero";

// Legal page — cache for 24h
export const revalidate = 86400;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        description="How OnlineLearnership.co.za collects, uses, and protects your personal information."
        breadcrumb={[{ label: "Privacy policy" }]}
      />
      <article className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-slate-700">
          <p className="text-sm text-slate-500">Effective Date: November 2025</p>

          <p>
            Welcome to OnlineLearnership.co.za. We are committed to protecting the personal
            information shared by website visitors and users who communicate with us at
            <a href="mailto:info@onlinelearnership.co.za" className="text-brand-700 hover:underline"> info@onlinelearnership.co.za</a>.
            This Privacy Policy explains how we collect, use, and safeguard your information.
          </p>

          <Block title="1. Information we collect">
            <p>We collect two categories of data:</p>
            <p className="mt-3">
              <strong>Personal identification information</strong> — names, email addresses,
              phone numbers, locations and CV / resume details that you provide voluntarily during
              registration or application processes.
            </p>
            <p className="mt-3">
              <strong>Non-personal identification information</strong> — gathered automatically
              including browser type, operating system, IP addresses, pages visited, timestamps,
              referral sources and cookie data, used to analyse trends and improve user experience.
            </p>
          </Block>

          <Block title="2. How we use your information">
            We use the information collected to operate our services, process learnership
            applications, respond to enquiries, personalise your experience, send newsletters,
            monitor site performance, and meet our legal obligations.
            <strong className="block mt-3 text-slate-900">
              We do not sell, trade, or rent your personal identification information to others.
            </strong>
          </Block>

          <Block title="3. Security measures">
            We implement SSL encryption, restrict access to personal data to authorised personnel
            only, conduct regular security assessments, and maintain safeguards against malware.
            However, please note that no method of transmission over the internet or method of
            electronic storage is 100% secure.
          </Block>

          <Block title="4. Cookies and tracking">
            Our site uses three types of cookies:
            <ul className="mt-3 list-disc pl-6 space-y-1">
              <li><strong>Essential cookies</strong> required for site operation.</li>
              <li><strong>Performance cookies</strong> for usage analysis.</li>
              <li><strong>Advertising cookies</strong> from third-party partners like Google AdSense.</li>
            </ul>
          </Block>

          <Block title="5. Data sharing">
            We share information only with trusted service providers, for legal compliance, to
            protect user safety, or during business transfers — always while maintaining data
            protection standards.
          </Block>

          <Block title="6. Your rights">
            You may request access to, correction of, or deletion of your personal data, and you
            may opt out of marketing communications by contacting us at
            <a href="mailto:info@onlinelearnership.co.za" className="text-brand-700 hover:underline"> info@onlinelearnership.co.za</a>.
          </Block>

          <Block title="7. Additional provisions">
            <ul className="list-disc pl-6 space-y-1">
              <li>Data is retained only for as long as necessary for the purposes outlined.</li>
              <li>Our service is not intended for children under 13.</li>
              <li>International users should note that data may be processed in South Africa.</li>
              <li>This policy may be updated periodically — we will post the new effective date.</li>
            </ul>
          </Block>

          <Block title="8. Contact us">
            Questions about this policy? Email
            <a href="mailto:info@onlinelearnership.co.za" className="text-brand-700 hover:underline"> info@onlinelearnership.co.za</a>.
          </Block>
        </div>
      </article>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-2 text-base leading-relaxed">{children}</div>
    </section>
  );
}
