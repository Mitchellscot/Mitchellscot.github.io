import * as mail from '@sendgrid/mail';
import {verifyCaptchaToken} from './verifyCaptchaToken';
import {NextRequest, NextResponse} from 'next/server';
import Captcha from '../models/Captcha';

export const sendEmail = async (req: NextRequest) => {
  mail.setApiKey(process.env.SENDGRID_API_KEY!);
  const {token, message} = await req.json();
  if (!token || !message) {
    return NextResponse.json(
      {error: 'Token or form data missing'},
      {status: 500}
    );
  }

  async function SendMail(score: Number) {
    const {name, email, message: body} = message;
    const isPotentiallySpam =
      score < new Number(process.env.RECAPTCHA_MINIMUM_SCORE);
    const subject = isPotentiallySpam
      ? `(Potential Spam) Message from ${name} via mitchellscott.me`
      : `Message from ${name} via mitchellscott.me`;

    const address = process.env.CONNECT_EMAIL_ADDRESS ?? 'mitchellscott@me.com';

    const websiteMessage = {
      to: address,
      from: address,
      subject: subject,
      html: `
      <ul>
        <li><strong>reCaptcha Score:</strong> ${score}</li>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Message:</strong>  ${body}</li>
      </ul>
      <a href="mailto:${email}?subject=RE: Your Response from mitchellscott.me">Click here to reply to this message</a>
    `,
    };

    try {
      return await mail.send(websiteMessage);
    } catch (error) {
      console.log(error);
      return NextResponse.json({error: error}, {status: 500});
    }
  }

  try {
    const captcha: Captcha = await verifyCaptchaToken(token);

    if (captcha.score === 0 || captcha.success === false) {
      console.log(`Recaptcha validation failed`);
      return NextResponse.json(
        {error: `Recaptcha score failed`},
        {status: 500}
      );
    }

    const minimumCaptchaScore = new Number(
      process.env.RECAPTCHA_MINIMUM_SCORE ?? 0.4
    );
    if (captcha.score !== 0 && captcha.score < minimumCaptchaScore) {
      console.log(`Captcha score low: ${captcha.score}`);
      await SendMail(captcha.score);
      return NextResponse.json('Ok', {status: 200});
    }

    await SendMail(captcha.score);

    return NextResponse.json('Ok', {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error: error}, {status: 500});
  }
};
