export const baseEnv = (baseApi: string) => {
  return {
    baseApiUrl: baseApi,
    api: {
      contact: `${baseApi}/api/contact`,
      captcha: `${baseApi}/api/captcha`,
      stats: `${baseApi}/api/stats`,
      verifyToken: 'https://www.google.com/recaptcha/api/siteverify',
    },
    isServer: typeof window === 'undefined',
    isProduction: true,
  };
};
