import { PageHero } from "@/components/PageHero";

// Legal page — cache for 24h
export const revalidate = 86400;

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & conditions"
        description="Terms governing your use of www.onlinelearnership.co.za."
        breadcrumb={[{ label: "Terms & conditions" }]}
      />
      <article className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-slate-700">
          <p className="text-sm text-slate-500">Effective Date: November 2025</p>

          <p>
            Welcome to OnlineLearnership.co.za. These Terms and Conditions govern your use of
            the website located at www.onlinelearnership.co.za, operated by Online Learnership.
            By accessing or using the website, you agree to be bound by these terms. If you do
            not agree to these terms, please do not use the website.
          </p>

          <Block title="1. Use of the website">
            The content provided on this website is for informational purposes only. We strive
            to provide accurate and up-to-date information about learnerships, training
            opportunities, and related career resources.
            <p className="mt-3">
              You agree to use the website only for lawful purposes and in a manner that does
              not infringe the rights of, restrict, or inhibit others&apos; use and enjoyment of
              the website. You must not attempt to gain unauthorised access to any part of the
              website or any systems or networks connected to it.
            </p>
          </Block>

          <Block title="2. Intellectual property">
            All content — including text, images, logos, graphics and downloadable materials on
            this website — is owned by or licensed to Online Learnership and is protected by
            copyright and intellectual property laws.
            <p className="mt-3">
              You may not reproduce, distribute, modify or use any content from the website for
              commercial purposes without prior written permission from Online Learnership.
            </p>
          </Block>

          <Block title="3. User submissions">
            If you submit any information — including personal data or queries via contact forms
            or email — you consent to the use of such information in accordance with our Privacy
            Policy. You agree not to submit content that is unlawful, offensive, defamatory or
            infringes the rights of others.
          </Block>

          <Block title="4. External links">
            The website may contain links to third-party websites for convenience. Online
            Learnership does not control these sites and is not responsible for their content or
            availability. Inclusion of any links does not imply endorsement.
          </Block>

          <Block title="5. Disclaimers and limitation of liability">
            The website and all content are provided &ldquo;as is&rdquo; without warranties of any
            kind, either express or implied. Online Learnership does not guarantee the accuracy,
            completeness or reliability of any information on the website.
            <p className="mt-3">
              To the fullest extent permitted by law, Online Learnership will not be liable for
              any direct, indirect, incidental, consequential or punitive damages arising from
              your use of the website.
            </p>
          </Block>

          <Block title="6. Changes to terms">
            We reserve the right to update or modify these Terms at any time without prior
            notice. Your continued use of the website after any changes constitutes your
            acceptance of the updated Terms.
          </Block>

          <Block title="7. Governing law">
            These Terms are governed by and construed in accordance with the laws of the Republic
            of South Africa. Any disputes arising from these Terms or your use of the website
            shall be subject to the exclusive jurisdiction of the courts of South Africa.
          </Block>

          <Block title="8. Contact us">
            If you have any questions or concerns about these Terms and Conditions, please contact
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
