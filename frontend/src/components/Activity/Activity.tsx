import { Activities } from "../../models/ExerTrackResponse";
import { getReadableActivityTitle } from "../../utils/chartUtils";
import headings from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import ActivityIcon from "../ActivityIcon/ActivityIcon";
import styles from './Activity.module.scss';
import classNames from "classnames";

interface ActivityProps {
    activity: Activities;
}

export default function Activitiy({ activity }: ActivityProps) {
    const titleClasses = classNames(styles.activityTitle, text.textMd);
    const statClasses = classNames(styles.stat, text.textXs);
    const effortMissing = !activity.effort || activity.effort == 'Unknown';
    const iconColStyles = classNames(styles.iconCol, {
        [styles.effortMissing]: effortMissing
    });
    return (
        <>
            <div className={styles.statsCol}>
                <div className={titleClasses}>
                    {getReadableActivityTitle(activity.activityType)}
                </div>
                <div>
                    <div className={statClasses}>{activity.duration}</div>
                    {activity.readableDistance &&
                        <div className={statClasses}>
                            {activity.readableDistance}
                        </div>
                    }
                    {activity.pace &&
                        <div className={statClasses}>
                            {activity.pace}
                        </div>
                    }
                    <div className={statClasses}>
                        {activity.readableDate}
                    </div>
                </div>
            </div>
            <div className={iconColStyles}>
                <ActivityIcon activity={activity.activityType} />
                {!effortMissing &&
                    <div className={styles.pill}>
                        {activity.effort}
                    </div>}
            </div>
        </>
    )
}