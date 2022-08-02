export default class Captcha {
  readonly action: string = '';
  readonly challenge_ts: string = '';
  readonly hostname: string = '';
  readonly score: number = 0;
  readonly success: boolean = false;

  constructor(data: RecursivePartial<Captcha>) {}
}
