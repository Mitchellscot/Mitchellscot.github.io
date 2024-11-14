export default class Captcha {
  readonly action: string = '';
  readonly challenge_ts: string = '';
  readonly hostname: string = '';
  readonly score: Number = 0;
  readonly success: boolean = false;

  constructor(data: RecursivePartial<Captcha>) {}
}
