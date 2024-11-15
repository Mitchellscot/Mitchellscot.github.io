import styles from './RunChart.module.scss';
import {Chart} from 'chart.js';

type Time = 'month' | 'year' | 'all';

type RunChartProps = {
  time: Time;
  data: any;
};

export default function RunChart() {
  return <></>;
}
