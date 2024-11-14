import {Metadata} from 'next';
import ContactPageData from '../../models/ContactPageData';
import styles from './page.module.scss';
import classNames from 'classnames';
import headings from '../../styles/typography/Heading.module.scss';
import ContactForm from './ContactForm/ContactForm';
import queries from '../../constants/queries';
import sanityClient from '../../utils/sanityClient';
import CaptchaWrapper from './CaptchaProvider/CaptchaProvider';

export const metadata: Metadata = {
  title: 'Contact | Mitchell Scott',
  description: 'Contact Mitchell Scott',
};

async function getContactPage(): Promise<ContactPageData> {
  const data: ContactPageData = await sanityClient.fetch(queries.ContactPage);
  return data;
}

export default async function Contact() {
  const contactPageData = await getContactPage();
  const titleText = classNames(styles.title, headings.heading2);
  return (
    <CaptchaWrapper>
      <div className={titleText}>{contactPageData.title}</div>
      <div className={styles.contactFormRow}>
        <ContactForm />
      </div>
    </CaptchaWrapper>
  );
}
