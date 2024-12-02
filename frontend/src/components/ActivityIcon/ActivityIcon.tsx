import {ActivityTypes} from '../../utils/sportMap';
import {
  FaPersonSwimming,
  FaPersonRunning,
  FaPersonWalking,
  FaPersonDrowning,
  FaWater,
  FaMountain,
} from 'react-icons/fa6';
import {TbTreadmill} from 'react-icons/tb';
import {TbStretching} from 'react-icons/tb';
import {TbMountain} from 'react-icons/tb';
import {LuBike} from 'react-icons/lu';
import {GrBike} from 'react-icons/gr';
import {FaDumbbell} from 'react-icons/fa6';
import {GiTrail} from 'react-icons/gi';
import {FaHeartbeat} from 'react-icons/fa';
import {RiBikeFill} from 'react-icons/ri';
import {MdOutlineSnowshoeing} from 'react-icons/md';

interface ActivityProps {
  activity: string;
}

export default function ActivityIcon({activity}: ActivityProps) {
  if (!(activity in ActivityTypes)) {
    return <FaPersonDrowning />;
  }
  const activityName = ActivityTypes[activity as keyof typeof ActivityTypes];

  switch (activityName) {
    case ActivityTypes.running:
      return <FaPersonRunning />;
    case ActivityTypes.treadmill_running:
      return <TbTreadmill />;
    case ActivityTypes.trail_running:
      return <GiTrail />;
    case ActivityTypes.indoor_cycling:
      return <RiBikeFill />;
    case ActivityTypes.mountain_biking:
      return <TbMountain />;
    case ActivityTypes.gravel_cycling:
      return <GrBike />;
    case ActivityTypes.cycling:
      return <LuBike />;
    case ActivityTypes.lap_swimming:
      return <FaPersonSwimming />;
    case ActivityTypes.open_water_swimming:
      return <FaWater />;
    case ActivityTypes.walking:
      return <FaPersonWalking />;
    case ActivityTypes.yoga:
      return <TbStretching />;
    case ActivityTypes.strength_training:
      return <FaDumbbell />;
    case ActivityTypes.snow_shoe_ws:
      return <MdOutlineSnowshoeing />;
    case ActivityTypes.other:
      return <FaHeartbeat />;
    default:
      return <FaHeartbeat />;
  }
}
