export const metadata = {
  title: "Privacy Notice | Omela",
  description:
    "Read how Omela collects, uses, stores, and protects personal information across the Omela platform and Laura experience.",
};

const colors = {
  bg: "#F7F5F0",
  bgCard: "rgba(255,255,255,0.82)",
  bgSoft: "#F3EFE7",
  bgDark: "#090A0D",
  text: "#17181C",
  textMuted: "#616775",
  textLight: "#9298A6",
  accent: "#2563EB",
  border: "#E5E0D6",
  success: "#16A34A",
};

function Section({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        paddingTop: "34px",
        paddingBottom: "34px",
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              minWidth: "40px",
              height: "40px",
              padding: "0 12px",
              borderRadius: "999px",
              background: colors.bgSoft,
              border: `1px solid ${colors.border}`,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 800,
              color: colors.textMuted,
            }}
          >
            {number}
          </div>

          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 34px)",
              lineHeight: 1.12,
              letterSpacing: "-0.035em",
              fontWeight: 800,
              color: colors.text,
              margin: 0,
            }}
          >
            {title}
          </h2>
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: 1.95,
            color: colors.textMuted,
          }}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        marginTop: "14px",
        paddingLeft: "20px",
        display: "grid",
        gap: "12px",
      }}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          background:
            radial-gradient(circle at top left, rgba(37,99,235,0.06), transparent 28%),
            radial-gradient(circle at top right, rgba(22,163,74,0.04), transparent 22%),
            ${colors.bg};
          color: ${colors.text};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        .mutedLink {
          color: ${colors.textLight};
          transition: color 0.2s ease;
        }

        .mutedLink:hover {
          color: ${colors.text};
        }

        @media (max-width: 720px) {
          .container {
            padding-left: 16px;
            padding-right: 16px;
          }
        }
      `}</style>

      <div style={{ minHeight: "100vh" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 20,
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            background: "rgba(247,245,240,0.82)",
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <div
            className="container"
            style={{
              minHeight: "84px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                minWidth: 0,
              }}
            >
              <img
                src="/omela-logo-mark.png"
                alt="Omela logo"
                width={44}
                height={44}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "14px",
                  objectFit: "contain",
                  flexShrink: 0,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                }}
              />

              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: colors.text,
                  }}
                >
                  Omela
                </div>
                <div
                  className="serif"
                  style={{
                    fontSize: "13px",
                    color: colors.textLight,
                    fontStyle: "italic",
                    marginTop: "2px",
                  }}
                >
                  Powered by Laura
                </div>
              </div>
            </a>

            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px 20px",
                borderRadius: "999px",
                background: colors.bgDark,
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
              }}
            >
              Back to Omela
            </a>
          </div>
        </header>

        <main style={{ paddingTop: "56px", paddingBottom: "80px" }}>
          <div className="container">
            <div style={{ maxWidth: "920px", margin: "0 auto" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.78)",
                  border: `1px solid ${colors.border}`,
                  color: colors.textMuted,
                  fontSize: "13px",
                  fontWeight: 700,
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.04)",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "999px",
                    background: colors.success,
                    display: "inline-block",
                    boxShadow: "0 0 0 6px rgba(22,163,74,0.10)",
                  }}
                />
                Privacy Notice
              </div>

              <h1
                className="serif"
                style={{
                  marginTop: "22px",
                  marginBottom: 0,
                  fontSize: "clamp(46px, 8vw, 88px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.055em",
                  color: colors.text,
                }}
              >
                Private by design.
                <br />
                Clear by default.
              </h1>

              <p
                style={{
                  marginTop: "22px",
                  maxWidth: "760px",
                  fontSize: "18px",
                  lineHeight: 1.9,
                  color: colors.textMuted,
                }}
              >
                This Privacy Notice explains how Omela collects, uses, stores,
                and protects personal information across the Omela platform and
                the Laura experience.
              </p>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    padding: "11px 14px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.82)",
                    border: `1px solid ${colors.border}`,
                    color: colors.text,
                    fontSize: "13px",
                    fontWeight: 700,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  Last updated: 1st May, 2026
                </div>

                <div
                  style={{
                    padding: "11px 14px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.82)",
                    border: `1px solid ${colors.border}`,
                    color: colors.textMuted,
                    fontSize: "13px",
                    fontWeight: 700,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                  }}
                >
                  United Kingdom
                </div>
              </div>

              <div
                style={{
                  marginTop: "34px",
                  background: colors.bgCard,
                  border: `1px solid ${colors.border}`,
                  borderRadius: "34px",
                  padding: "30px",
                  boxShadow: "0 24px 70px rgba(0,0,0,0.05)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                }}
              >
                <Section number="01" title="Introduction">
                  <p style={{ marginTop: 0 }}>
                    Omela respects your privacy and is committed to protecting
                    your personal information.
                  </p>
                  <p>
                    This Privacy Notice explains how we collect, use, store, and
                    share your personal information when you visit our website,
                    join our early access or beta list, contact us, interact
                    with Omela and Laura, or use related services, features, or
                    communications we make available.
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    Please read this Privacy Notice carefully.
                  </p>
                </Section>

                <Section number="02" title="Who we are">
                  <p style={{ marginTop: 0 }}>
                    Omela is a digital health startup building Laura, an
                    AI-powered care access, triage support, and provider
                    navigation experience.
                  </p>
                  <p>
                    For the purposes of UK data protection law, Omela is the
                    controller of the personal information described in this
                    Privacy Notice.
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <strong>Contact email:</strong> notice@omela.ai
                    <br />
                    <strong>Business address:</strong> London
                    <br />
                    <strong>Website:</strong> <a href="https://omela.ai">https://omela.ai</a>
                  </p>
                </Section>

                <Section number="03" title="The personal information we collect">
                  <p style={{ marginTop: 0 }}>
                    Depending on how you interact with us, we may collect the
                    following categories of information.
                  </p>

                  <p>
                    <strong>Information you give us directly</strong>
                  </p>
                  <BulletList
                    items={[
                      "your name;",
                      "your email address;",
                      "your phone number;",
                      "your organisation name;",
                      "your role, such as patient, provider, or developer;",
                      "messages, enquiries, or feedback you send to us;",
                      "booking or callback request details;",
                      "beta or waitlist preferences.",
                    ]}
                  />

                  <p style={{ marginTop: "18px" }}>
                    <strong>Information collected through your use of Omela</strong>
                  </p>
                  <BulletList
                    items={[
                      "chat content and prompts;",
                      "session history;",
                      "language preference;",
                      "location information or postcode where you provide it;",
                      "provider search requests;",
                      "technical information about your device and browser;",
                      "IP address or approximate location derived from IP;",
                      "usage and analytics information.",
                    ]}
                  />

                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    <strong>Health-related information</strong>
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    If you use Laura to discuss symptoms, care needs, or
                    healthcare access, we may process information relating to
                    your physical or mental health, care needs, or healthcare
                    services. This type of information may be treated as special
                    category data under UK data protection law.
                  </p>
                </Section>

                <Section number="04" title="How we use your personal information">
                  <p style={{ marginTop: 0 }}>We may use your personal information to:</p>
                  <BulletList
                    items={[
                      "operate, maintain, and improve Omela and Laura;",
                      "manage early access and beta signups;",
                      "communicate with you about your request, onboarding, or account;",
                      "respond to enquiries and support requests;",
                      "provide care access, provider discovery, callback, or booking assistance;",
                      "personalise responses and improve user experience;",
                      "analyse usage to improve performance, reliability, and safety;",
                      "ensure platform security, prevent misuse, and detect fraud;",
                      "comply with legal and regulatory obligations;",
                      "send product updates and service-related communications.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    Where required by law, we will obtain your consent before
                    sending marketing communications.
                  </p>
                </Section>

                <Section number="05" title="Lawful basis for processing">
                  <p style={{ marginTop: 0 }}>
                    Depending on the context, we may rely on one or more of the
                    following lawful bases:
                  </p>
                  <BulletList
                    items={[
                      "consent, where you voluntarily provide information, such as joining a waitlist or submitting health-related input;",
                      "legitimate interests, to operate, improve, and secure our services, provided these interests are not overridden by your rights;",
                      "contractual necessity, where processing is necessary to provide services you request;",
                      "legal obligation, where we are required to comply with the law.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    Where we process health-related information or other special
                    category data, we will also identify an appropriate Article
                    9 condition under UK data protection law.
                  </p>
                </Section>

                <Section number="06" title="Special category data">
                  <p style={{ marginTop: 0 }}>
                    If you share health-related information with Laura, that
                    information may require additional protection.
                  </p>
                  <p>Where relevant, we may process health-related information:</p>
                  <BulletList
                    items={[
                      "with your explicit consent;",
                      "where necessary to protect vital interests;",
                      "or under another condition permitted by law.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    We will seek to minimise the amount of health-related
                    information we collect and process.
                  </p>
                </Section>

                <Section number="07" title="How we share your information">
                  <p style={{ marginTop: 0 }}>We do not sell your personal data.</p>
                  <p>We may share your information with:</p>
                  <BulletList
                    items={[
                      "service providers such as hosting, database, analytics, security, communications, and infrastructure providers that support Omela;",
                      "healthcare providers or partners where necessary to facilitate booking requests, callback requests, or care access, and only with your involvement or consent;",
                      "legal or regulatory authorities where required by law or where necessary to protect rights, safety, or security.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    All third parties are required to handle personal data
                    securely and in accordance with applicable laws.
                  </p>
                </Section>

                <Section number="08" title="International data transfers">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    Your information may be processed outside the United Kingdom
                    or European Economic Area. Where this occurs, we will take
                    appropriate steps to ensure suitable safeguards are in place,
                    including contractual and organisational protections where
                    required.
                  </p>
                </Section>

                <Section number="09" title="Data retention">
                  <p style={{ marginTop: 0 }}>
                    We retain personal data only for as long as necessary to:
                  </p>
                  <BulletList
                    items={[
                      "provide our services;",
                      "manage early access and beta requests;",
                      "maintain safety, security, and audit records;",
                      "resolve disputes;",
                      "comply with legal obligations;",
                      "improve our systems and service quality.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    Health-related data is retained for the minimum period
                    reasonably necessary and handled with additional safeguards.
                  </p>
                </Section>

                <Section number="10" title="Security">
                  <p style={{ marginTop: 0 }}>
                    We implement appropriate technical and organisational
                    measures designed to protect your personal information,
                    including:
                  </p>
                  <BulletList
                    items={[
                      "encryption in transit and at rest where appropriate;",
                      "access controls;",
                      "monitoring and logging;",
                      "secure infrastructure and environment controls;",
                      "review of misuse, abuse, and suspicious activity.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    No internet-based system can be guaranteed to be completely
                    secure, but we take security seriously and work to apply
                    proportionate protections.
                  </p>
                </Section>

                <Section number="11" title="Your rights">
                  <p style={{ marginTop: 0 }}>
                    Depending on applicable law, you may have the right to:
                  </p>
                  <BulletList
                    items={[
                      "access your personal information;",
                      "request correction of inaccurate information;",
                      "request deletion of your information in some circumstances;",
                      "restrict or object to certain processing;",
                      "withdraw consent where we rely on consent;",
                      "request portability in some cases;",
                      "complain to the Information Commissioner’s Office.",
                    ]}
                  />
                  <p style={{ marginTop: "18px", marginBottom: 0 }}>
                    To exercise your rights, contact us at{" "}
                    <strong>notice@omela.ai</strong>.
                  </p>
                </Section>

                <Section number="12" title="Marketing communications">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    We may send you updates about Omela, Laura, product
                    availability, and related service developments where
                    permitted by law or where you have chosen to receive them.
                    You can opt out of marketing communications at any time by
                    using the unsubscribe link in an email or by contacting us
                    directly.
                  </p>
                </Section>

                <Section number="13" title="Cookies and similar technologies">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    We may use cookies and similar technologies to operate our
                    website and understand how it is used. Some cookies are
                    strictly necessary for the website to function. Other
                    cookies, such as analytics or advertising cookies, may
                    require your consent. We will provide further information in
                    a cookie notice if and when such technologies are enabled.
                  </p>
                </Section>

                <Section number="14" title="Children">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    Omela is not intended for use by children under 18 without
                    appropriate supervision. We do not knowingly collect
                    personal data from children without appropriate consent or
                    another lawful basis where required.
                  </p>
                </Section>

                <Section number="15" title="Changes to this notice">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    We may update this Privacy Notice from time to time. Where
                    appropriate, we will post the updated version on this page
                    and update the “Last updated” date above.
                  </p>
                </Section>

                <Section number="16" title="Contact">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    If you have any questions about this Privacy Notice or our
                    use of your personal information, contact:
                  </p>
                  <p style={{ marginBottom: 0 }}>
                    <strong>Omela</strong>
                    <br />
                    Email: <strong>notice@omela.ai</strong>
                    <br />
                    Location: <strong>United Kingdom</strong>
                  </p>
                </Section>
              </div>

              <div
                style={{
                  marginTop: "22px",
                  background: "rgba(255,255,255,0.82)",
                  border: `1px solid ${colors.border}`,
                  borderRadius: "24px",
                  padding: "22px",
                  boxShadow: "0 14px 34px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: colors.textLight,
                    marginBottom: "10px",
                  }}
                >
                  Important note
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "15px",
                    lineHeight: 1.85,
                    color: colors.textMuted,
                  }}
                >
                  This notice should be reviewed and expanded further as Omela
                  moves from landing page and waitlist collection into live beta,
                  provider routing, multilingual intake, and health-related
                  interactions.
                </p>
              </div>

              <footer
                style={{
                  marginTop: "26px",
                  paddingTop: "18px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <a href="/" className="mutedLink" style={{ fontSize: "14px", fontWeight: 600 }}>
                  Back to Omela
                </a>

                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontSize: "14px",
                  }}
                >
                  <a href="/privacy" className="mutedLink">
                    Privacy Notice
                  </a>
                  <a href="/terms" className="mutedLink">
                    Terms
                  </a>
                  <a href="mailto:notice@omela.ai" className="mutedLink">
                    notice@omela.ai
                  </a>
                </div>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}