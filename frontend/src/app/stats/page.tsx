'use client';
import headings from '../../styles/typography/Heading.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import {baseEnv} from '../../utils/environment';
import http from '../../utils/http';
import {useSearchParams} from 'next/navigation';
import {APIResponse} from '../../models/API';
import {
  ChartInformation,
  ExerTrackResponse,
  StatsInformation,
} from '../../models/ExerTrackResponse';
import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import {timeEnd} from 'console';
//import StatsPagePlaceHolderData from '../../models/StatsPagePlaceHolderData';

type Time = 'month' | 'year' | 'all';
type Tag = 'run' | 'bike' | 'swim' | 'other' | 'all';

function setSportStatInformation(
  data: ExerTrackResponse,
  tag: Tag,
  time: Time
): StatsInformation {
  switch (tag) {
    case 'run':
      return time === 'month'
        ? data.running.stats.thisMonth
        : time === 'year'
          ? data.running.stats.pastYear
          : data.running.stats.allTime;
    case 'bike':
      return time === 'month'
        ? data.cycling.stats.thisMonth
        : time === 'year'
          ? data.cycling.stats.pastYear
          : data.cycling.stats.allTime;
    case 'swim':
      return time === 'month'
        ? data.swimming.stats.thisMonth
        : time === 'year'
          ? data.swimming.stats.pastYear
          : data.swimming.stats.allTime;
    case 'other':
      return time === 'month'
        ? data.other.stats.thisMonth
        : time === 'year'
          ? data.other.stats.pastYear
          : data.other.stats.allTime;
    default:
      return time === 'month'
        ? data.running.stats.thisMonth
        : time === 'year'
          ? data.running.stats.pastYear
          : data.running.stats.allTime;
  }
}
function setSportChartInformation(
  data: ExerTrackResponse,
  tag: Tag,
  time: Time
): ChartInformation {
  switch (tag) {
    case 'run':
      return time === 'month'
        ? data.running.charts.thisMonth
        : time === 'year'
          ? data.running.charts.pastYear
          : data.running.charts.allTime;
    case 'bike':
      return time === 'month'
        ? data.cycling.charts.thisMonth
        : time === 'year'
          ? data.cycling.charts.pastYear
          : data.cycling.charts.allTime;
    case 'swim':
      return time === 'month'
        ? data.swimming.charts.thisMonth
        : time === 'year'
          ? data.swimming.charts.pastYear
          : data.swimming.charts.allTime;
    case 'other':
      return time === 'month'
        ? data.other.charts.thisMonth
        : time === 'year'
          ? data.other.charts.pastYear
          : data.other.charts.allTime;
    default:
      return time === 'month'
        ? data.running.charts.thisMonth
        : time === 'year'
          ? data.running.charts.pastYear
          : data.running.charts.allTime;
  }
}
function convertMonthNumbersToNames(months: number[]): string[] {
  return months.map((month) => {
    switch (month) {
      case 1:
        return 'January';
      case 2:
        return 'February';
      case 3:
        return 'March';
      case 4:
        return 'April';
      case 5:
        return 'May';
      case 6:
        return 'June';
      case 7:
        return 'July';
      case 8:
        return 'August';
      case 9:
        return 'September';
      case 10:
        return 'October';
      case 11:
        return 'November';
      case 12:
        return 'December';
      default:
        return '';
    }
  });
}

export default function Stats() {
  const [tag, setTag] = useState<Tag>('all');
  const [time, setTime] = useState<Time>('all');
  const [data, setData] = useState<ExerTrackResponse | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setTag((searchParams.get('tag') as Tag) ?? 'all');
    setTime((searchParams.get('time') as Time) ?? 'all');
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await http.get<ExerTrackResponse>(
        baseEnv('http://localhost:3000').api.stats
      );
      console.log('Mitchell, response', response);
      setData(response.data ?? null);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chart) chart.destroy();
    const ctx = document.getElementById(
      `${tag}-${time}`
    ) as HTMLCanvasElement | null;

    if (ctx) ctx.getContext('2d');
    const chartStatistics = data
      ? setSportChartInformation(data, tag, time)
      : null;
    const labels =
      time === 'year'
        ? convertMonthNumbersToNames(chartStatistics!.labels)
        : chartStatistics?.labels.map((label) => label.toString());
    const newChart = new Chart(ctx!, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Distance',
            data: chartStatistics?.data ?? [],
            backgroundColor: '#00ffee',
            borderColor: '#00ffee',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    setChart(newChart);
  }, [data, tag, time]);

  const sportStatistics = data
    ? setSportStatInformation(data, tag, time)
    : null;
  const recentActivities = data?.recentActivities ?? [];

  const titleText = classNames(styles.title, headings.heading2);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.timeButtonContainer}>
          <Button
            label="Run"
            link={
              tag === 'run'
                ? `/stats?tag=all&time=${time}`
                : `/stats?tag=run&time=${time}`
            }
            variant={tag === 'run' ? 'active' : 'inactive'}
            arrowOptions="none"
            iconOptions="run"
          />
          <Button
            label="Bike"
            link={
              tag === 'bike'
                ? `/stats?tag=all&time=${time}`
                : `/stats?tag=bike&time=${time}`
            }
            variant={tag == 'bike' ? 'active' : 'inactive'}
            arrowOptions="none"
            iconOptions="bike"
          />
          <Button
            label="Swim"
            link={
              tag === 'swim'
                ? `/stats?tag=all&time=${time}`
                : `/stats?tag=swim&time=${time}`
            }
            variant={tag == 'swim' ? 'active' : 'inactive'}
            arrowOptions="none"
            iconOptions="swim"
          />
          <Button
            label="Other"
            link={
              tag === 'other'
                ? `/stats?tag=all&time=${time}`
                : `/stats?tag=other&time=${time}`
            }
            variant={tag == 'other' ? 'active' : 'inactive'}
            arrowOptions="none"
            iconOptions="weights"
          />
        </div>
        <div>
          <canvas id={`${tag}-${time}`}></canvas>
        </div>
        <div className={styles.timeButtonContainer}>
          <Button
            label="This Month"
            link={`/stats?tag=${tag}&time=month`}
            variant="transparent"
            arrowOptions="right"
          />
          <Button
            label="This Year"
            link={`/stats?tag=${tag}&time=year`}
            variant="transparent"
            arrowOptions="right"
          />
          <Button
            label="All Time"
            link={`/stats?tag=${tag}&time=all`}
            variant="transparent"
            arrowOptions="right"
          />
        </div>
        {sportStatistics?.totalDistance && (
          <div>Total Distance: {sportStatistics?.totalDistance} Miles</div>
        )}
        {sportStatistics?.totalDuration && (
          <div>Total Duration: {sportStatistics?.totalDuration}</div>
        )}
        {sportStatistics?.maxDistance && (
          <div>Max Distance: {sportStatistics?.maxDistance} Miles</div>
        )}
        {sportStatistics?.totalActivities && (
          <div>
            Total {tag}: {sportStatistics?.totalActivities}
          </div>
        )}
        <hr />
        <div>Recent Activities</div>
        {recentActivities.map((activity, i) => (
          <div key={i}>
            <div>{activity.actityType}</div>
            <div>{activity.date}</div>
            <div>{activity.distance} Miles</div>
            <div>{activity.duration}</div>
            <div>{activity.date}</div>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}
