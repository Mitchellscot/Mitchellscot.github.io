import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';

export const isDefined = <T>(t: T | null | undefined): t is T => t != null;

export const fillInErrorWithDefaults = (
  error: Partial<HttpErrorResponseModel>,
  request: Partial<Request>
): HttpErrorResponseModel => {
  const errors = error!.errors!.length
    ? error.errors
    : ['Error requesting data'];

  return new HttpErrorResponseModel({
    status: error.status || 0,
    message: error.message || 'Error requesting data',
    url: error.url || request.url,
    errors: errors!.filter(isDefined),
  });
};
