import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {NextSeo} from 'next-seo';
import ContactPageData from '../models/ContactPageData';
import pageTitle from '../utils/pageTitle';
import {getContactPage} from '../utils/static-props';
import styles from '../styles/pages/Contact.module.scss';
import classNames from 'classnames';
import headings from '../styles/typography/Heading.module.scss';
import ContactForm from '../components/ContactForm/ContactForm';

export default function Contact(
  contactPageData: InferGetStaticPropsType<typeof getStaticProps>
) {
  const titleText = classNames(styles.title, headings.heading2);
  return (
    <>
      <NextSeo
        title={pageTitle(contactPageData.pageTitle)}
        description={contactPageData.metaDescription}
      />
      <div className={titleText}>{contactPageData.title}</div>
      <div className={styles.contactFormRow}>
        <ContactForm />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<ContactPageData> = async (
  context
) => getContactPage(context);
