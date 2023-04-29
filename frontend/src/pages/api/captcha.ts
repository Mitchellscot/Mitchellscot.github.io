import {NextApiRequest, NextApiResponse} from 'next';
import absoluteUrl from 'next-absolute-url';
import QueryString from 'query-string';
import {baseEnv} from '../../utils/environment';
import {APIResponse} from '../../models/API';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import http from '../../utils/http';

const secret = process.env.RECAPTCHA_SECRET_KEY;

export default async function Captcha(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {token} = req.body;
  if (!token) {
    return res.status(500).end();
  }

  const {origin} = absoluteUrl(req);
  const endpoint: string = baseEnv(origin).api.verifyToken;
  const model = {
    secret,
    response: token,
  };
  const response: APIResponse<any, null> = await http.post(
    endpoint,
    QueryString.stringify(model)
  );

  if (response instanceof HttpErrorResponseModel) {
    return res.status(500).send(response);
  }

  return res.status(200).send(response);
}
