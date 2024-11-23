import type {Activities} from '../../models/ExerTrackResponse';
import Activity from '../Activity/Activity';
import styles from './Activities.module.scss';

interface ActivitiesProps {
  activitiesList: Activities[];
}

export default function Activities({activitiesList}: ActivitiesProps) {
  return activitiesList.map((activity, i) => (
    <div className={styles.activityContainer} key={i}>
      <Activity activity={activity} />
    </div>
  ));
}
