import * as mail from '@sendgrid/mail';
import {NextApiRequest, NextApiResponse} from 'next';
import absoluteUrl from 'next-absolute-url';
import {baseEnv} from '../../utils/environment';
import {APIResponse} from '../../models/API';
import Captcha from '../../models/Captcha';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import http from '../../utils/http';

mail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {token, message} = req.body;
  if (!token || !message) {
    return res.status(500).end();
  }

  async function VerifyCaptchaToken(): Promise<
    HttpErrorResponseModel | Captcha
  > {
    const {origin} = absoluteUrl(req);
    const endpoint: string = baseEnv(origin).api.captcha;
    const config = {
      headers: {
        'content-type': 'application/json',
      },
    };
    const response: APIResponse<any, null> = await http.post(
      endpoint,
      {token},
      config
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data.data as Captcha;
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
      return res.status(500).send(error);
    }
  }

  try {
    const captcha = await VerifyCaptchaToken();
    console.log('verifyCaptchaToken: ', captcha);

    if (captcha instanceof HttpErrorResponseModel) {
      console.log(
        `Recaptcha validation failed: ${
          captcha.message
        } \nWith errors: ${captcha.errors.toString()}`
      );
      return res.status(500).send(captcha);
    }

    const minimumCaptchaScore = new Number(
      process.env.RECAPTCHA_MINIMUM_SCORE ?? 0.4
    );
    if (!captcha.success || (captcha.score as Number) < minimumCaptchaScore) {
      console.log(`Captcha score too low: ${captcha.score}`);
      await SendMail(captcha.score);
      return res.status(500).send(captcha);
    }

    await SendMail(captcha.score);

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
