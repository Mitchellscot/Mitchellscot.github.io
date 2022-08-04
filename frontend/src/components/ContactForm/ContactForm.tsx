import classNames from 'classnames';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import {ContactFormFields} from '../../models/ContactFormFields';
import styles from './ContactForm.module.scss';
import {useGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {useCallback, useEffect, useState} from 'react';
import Button from '../Button/Button';
import ContactFormInputError from '../ContactFormInputError/ContactFormInputError';
import RegEx from '../../constants/RegEx';
import RecaptchaLinks from '../RecaptchaLinks/RecaptchaLinks';
import typography from '../../styles/typography/Text.module.scss';

export default function ContactForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ContactFormFields>({mode: 'onBlur'});
  const nameInputContainer = classNames(styles.textInputContainer, {
    [styles.inputError]: Boolean(errors.name),
  });
  const requiredLabel = classNames(styles.required, styles.inputLabel);
  const emailInputContainer = classNames(styles.textInputContainer, {
    [styles.inputError]: Boolean(errors.email),
  });
  const messageTextAreaContainer = classNames(styles.textAreaContainer, {
    [styles.inputError]: Boolean(errors.message),
  });
  const thanksText = classNames(typography.textXl, styles.thanksText);

  const {executeRecaptcha} = useGoogleReCaptcha();
  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    return await executeRecaptcha('contact');
  }, [executeRecaptcha]);

  useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  async function onSubmitForm(data: ContactFormFields) {
    setIsSubmitting(true);
    try {
      const tokenResponse = await handleReCaptchaVerify();
      const response = await fetch('/api/contact', {
        body: JSON.stringify({
          token: tokenResponse,
          message: data,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      if (!response.ok) {
        //TODO: Handle a bad response
        alert(
          'there was a problem sending a message. Just email me at mitchellscott at me dot com.'
        );
        window.location.reload();

        return;
      }
      setTimeout(() => {
        router.push('/');
      }, 3000);
      if (response.ok) {
        handleEmailSent();
      }
    } catch (error) {
      console.error(error);
    }
  }
  function handleEmailSent() {
    const modal = document.getElementById('thanks') as HTMLElement;
    modal!.style!.display = 'block';
  }

  return (
    <div className={styles.container}>
      <div id="thanks" className={styles.thanksModal}>
        <div className={styles.modalContainer}>
          <p className={thanksText}>THANKS I will get back to you soon!</p>
        </div>
      </div>

      <form
        className={styles.form}
        noValidate
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <fieldset className={styles.fieldset}>
          <div className={nameInputContainer}>
            <label className={requiredLabel} htmlFor="name">
              Name
            </label>
            <input
              {...register('name', {
                required: 'Name is required',
              })}
              className={styles.input}
              id="name"
              maxLength={50}
              placeholder="Name"
              required
              type="text"
            />
            <ContactFormInputError errors={errors} name="name" />
          </div>

          <div className={emailInputContainer}>
            <label className={requiredLabel} htmlFor="email">
              Email Address
            </label>
            <input
              {...register('email', {
                required: 'Email address is required',
                pattern: {
                  value: RegEx.emailMatch,
                  message: 'Invalid Email Address',
                },
              })}
              className={styles.input}
              id="email"
              maxLength={50}
              placeholder="Email Address"
              required
              type="email"
            />
            <ContactFormInputError errors={errors} name="email" />
          </div>
          <div className={messageTextAreaContainer}>
            <label className={requiredLabel} htmlFor="message">
              Message
            </label>
            <textarea
              {...register('message', {
                required: 'Message is required',
              })}
              className={styles.textArea}
              id="message"
              maxLength={1000}
              placeholder="Message"
              required
            ></textarea>
            <ContactFormInputError errors={errors} name="message" />
          </div>
        </fieldset>
        <div className={styles.buttonContainer}>
          <Button
            label="Send message"
            disabled={isSubmitting}
            type={'submit'}
          />
          <RecaptchaLinks />
        </div>
      </form>
    </div>
  );
}
