import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head />

      <Preview>Your verification code is {otp}</Preview>

      <Tailwind>
        <Body className="m-0 bg-zinc-100 px-5 py-10 font-sans">
          <Container className="mx-auto max-w-[560px] overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <Section className="bg-zinc-950 px-10 py-7">
              <Text className="m-0 text-xl font-bold tracking-tight text-white">
                MYSTERY
                <span className="text-violet-500">MESSAGE</span>
              </Text>
            </Section>

            <Section className="px-10 py-12">
              <Heading className="m-0 mb-5 text-[30px] font-bold leading-[38px] tracking-tight text-zinc-900">
                Verify your account
              </Heading>

              <Text className="m-0 mb-3 text-base font-semibold leading-6 text-zinc-800">
                Hello {username},
              </Text>

              <Text className="m-0 mb-8 text-[15px] leading-6 text-zinc-500">
                Thanks for signing up. Use the verification code below to verify
                your email address and continue.
              </Text>

              <Section className="rounded-2xl border border-violet-200 bg-violet-50 px-7 py-7 text-center">
                <Text className="m-0 mb-3 text-[11px] font-bold tracking-[1.5px] text-violet-600">
                  VERIFICATION CODE
                </Text>

                <Text className="m-0 text-[38px] font-bold leading-[46px] tracking-[10px] text-zinc-900">
                  {otp}
                </Text>

                <Text className="m-0 mt-3 text-xs leading-[18px] text-zinc-500">
                  This code expires in 10 minutes.
                </Text>
              </Section>

              <Text className="m-0 my-7 text-[13px] leading-[21px] text-zinc-600">
                For your security, never share this code with anyone. Our team
                will never ask you for it.
              </Text>

              <Hr className="my-7 border-zinc-200" />

              <Text className="m-0 text-[13px] leading-[21px] text-zinc-500">
                If you didn&apos;t request this verification code, you can
                safely ignore this email.
              </Text>
            </Section>

            <Section className="border-t border-zinc-200 bg-zinc-50 px-10 py-6 text-center">
              <Text className="m-0 text-xs font-bold tracking-[1px] text-zinc-900">
                MYSTERY MESSAGE
              </Text>

              <Text className="m-0 mt-2 text-[11px] leading-4 text-zinc-400">
                © 2026 Mystery Message. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
