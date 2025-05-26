import {
  Font,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verify Your Email</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Arial"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Preview>Your verification code is: {otp}</Preview>

      <Section style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
        <Row>
          <Heading as="h2" style={{ fontFamily: 'Roboto', marginBottom: '10px' }}>
            Hi {username},
          </Heading>
        </Row>

        <Row>
          <Text style={{ fontFamily: 'Roboto', fontSize: '16px', lineHeight: '1.5' }}>
            Welcome! Use the code below to verify your email address and complete your registration.
          </Text>
        </Row>

        <Row>
          <Text
            style={{
              fontFamily: 'Roboto',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: '#e0f7fa',
              padding: '10px 20px',
              borderRadius: '8px',
              textAlign: 'center',
              margin: '20px 0',
              display: 'inline-block',
            }}
          >
            {otp}
          </Text>
        </Row>

        <Row>
          <Text style={{ fontFamily: 'Roboto', fontSize: '14px', color: '#555' }}>
            This code is valid for a limited time. If you did not request this, you can safely ignore this email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
