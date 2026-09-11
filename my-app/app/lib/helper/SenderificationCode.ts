import { resend } from "@/app/lib/resend";
import VerificationEmail from "@/app/emails/VerificationEmail";
import { ApiResponse } from "@/app/types/ApiResponse";

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> {
  try {
    if (!FROM_EMAIL) {
      throw new Error("RESEND_FROM_EMAIL is not configured");
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });

    if (error) {
      console.error("Resend error:", error);

      return {
        success: false,
        message: "Failed to send verification email.",
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Verification email error:", error);

    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
