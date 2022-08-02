import styles from './RecaptchaLinks.module.scss';

export default function RecaptchaLinks() {
  return (
    <div className={styles.recaptcha}>
      This site is protected by reCAPTCHA and the
      <br /> Google{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://policies.google.com/privacy"
      >
        Privacy Policy
      </a>{' '}
      and{' '}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://policies.google.com/terms"
      >
        Terms of Service
      </a>{' '}
      apply.
    </div>
  );
}
