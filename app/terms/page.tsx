export const metadata = {
  title: "Terms | Omela",
  description: "Terms for using Omela and Laura.",
};

const colors = {
  bg: "#F7F5F0",
  bgCard: "rgba(255,255,255,0.82)",
  bgSoft: "#F3EFE7",
  bgDark: "#090A0D",
  text: "#17181C",
  textMuted: "#616775",
  textLight: "#9298A6",
  border: "#E5E0D6",
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

export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        body {
          margin: 0;
          background: ${colors.bg};
          color: ${colors.text};
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        a { color: inherit; text-decoration: none; }
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
                }}
              />
              <div>
                <div style={{ fontSize: "15px", fontWeight: 800 }}>Omela</div>
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
                padding: "13px 20px",
                borderRadius: "999px",
                background: colors.bgDark,
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
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
                }}
              >
                Terms
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
                Terms of use,
                <br />
                simply stated.
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
                These terms govern your access to and use of Omela and Laura.
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
                  }}
                >
                  Last updated: 1st May, 2026
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
                }}
              >
                <Section number="01" title="Use of Omela">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    Omela and Laura are provided for information, care access,
                    triage support, navigation, and related service experiences.
                    They are not a substitute for emergency services or
                    definitive clinical diagnosis.
                  </p>
                </Section>

                <Section number="02" title="Acceptable use">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    You agree not to misuse Omela, interfere with the platform,
                    attempt unauthorised access, submit unlawful content, or use
                    the service in a way that could harm others.
                  </p>
                </Section>

                <Section number="03" title="No emergency use">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    Do not rely on Omela or Laura for emergency care. If you
                    believe you are experiencing an emergency, contact
                    emergency services or an appropriate urgent care provider
                    immediately.
                  </p>
                </Section>

                <Section number="04" title="Service availability">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    We may update, suspend, or change parts of Omela from time
                    to time. We do not guarantee uninterrupted availability.
                  </p>
                </Section>

                <Section number="05" title="Intellectual property">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    Omela, Laura, the website, and related branding, content,
                    and software are owned by or licensed to Omela unless
                    otherwise stated.
                  </p>
                </Section>

                <Section number="06" title="Contact">
                  <p style={{ marginTop: 0, marginBottom: 0 }}>
                    For legal or service questions, contact{" "}
                    <strong>notice@omela.ai</strong>.
                  </p>
                </Section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}