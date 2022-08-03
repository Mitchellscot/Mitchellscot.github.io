/* eslint-disable @typescript-eslint/no-explicit-any */
import {BaseModel} from 'sjs-base-model';
import {v4 as uuid} from 'uuid';

export interface IError {
  readonly id: string;
  readonly message: string;
}

export default class HttpErrorResponseModel
  extends BaseModel
  implements IError
{
  readonly id: string = uuid();
  status: number = 0;
  message: string = '';
  errors: string[] = [];
  url: string = '';
  raw: any = null;

  constructor(data: RecursivePartial<HttpErrorResponseModel>) {
    super();

    this.update(data);
  }
}
