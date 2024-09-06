import {getStatsPage} from '../../utils/static-props';
import headings from '../../styles/typography/Heading.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import StatsPagePlaceHolderData from '../../models/StatsPagePlaceHolderData';

export default function Stats() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.timeButtonContainer}>
          <Button
            label="Run"
            link="/blog/tags"
            variant="active"
            arrowOptions="none"
            iconOptions="run"
          />
          <Button
            label="Bike"
            link="/blog/tags"
            variant="inactive"
            arrowOptions="none"
            iconOptions="bike"
          />
          <Button
            label="Swim"
            link="/blog/tags"
            variant="inactive"
            arrowOptions="none"
            iconOptions="swim"
          />
          <Button
            label="Other"
            link="/blog/tags"
            variant="inactive"
            arrowOptions="none"
            iconOptions="weights"
          />
        </div>
        <div>Chart goes here</div>
        <div className={styles.timeButtonContainer}>
          <Button
            label="This Month"
            link="/blog/tags"
            variant="transparent"
            arrowOptions="right"
          />
          <Button
            label="This Year"
            link="/blog/tags"
            variant="transparent"
            arrowOptions="right"
          />
          <Button
            label="All Time"
            link="/blog/tags"
            variant="transparent"
            arrowOptions="right"
          />
        </div>
        <div>Total Distance:</div>
      </div>
    </>
  );
}
