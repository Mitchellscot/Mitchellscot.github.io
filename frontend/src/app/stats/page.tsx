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
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import {set} from 'react-hook-form';
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
interface AllSportsChartInformation {
  labels: string[] | undefined;
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    stack?: string;
  }[];
}
function getAllTimeSportChartData(data: ExerTrackResponse, tag: Tag): number[] {
  const longestContinuousYearlyData = data.running.charts.allTime.labels;
  switch (tag) {
    case 'run':
      return data.running.charts.allTime.data;
    case 'bike':
      return data.cycling.charts.allTime.data;
    case 'swim':
      return data.swimming.charts.allTime.data.map(
        (distance) => Math.round(distance * 0.000568182),
        1
      );
    case 'other':
      return data.other.charts.allTime.data;
    default:
      return data.running.charts.allTime.data;
  }
}
function setAllSportChartInformation(
  data: ExerTrackResponse
): AllSportsChartInformation {
  const annualChartLabels = data.running.charts.allTime.labels.map((label) =>
    label.toString()
  );
  const runChartInformation = getAllTimeSportChartData(data, 'run');
  const bikeChartInformation = getAllTimeSportChartData(data, 'bike');
  const swimChartInformation = getAllTimeSportChartData(data, 'swim');
  return {
    labels: annualChartLabels,
    datasets: [
      {
        label: 'Run',
        data: runChartInformation,
        backgroundColor: '#ff0011',
        borderColor: '#ff0011',
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Bike',
        data: bikeChartInformation,
        backgroundColor: '#ffee00',
        borderColor: '#ffee00',
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        label: 'Swim',
        data: swimChartInformation,
        backgroundColor: '#2200ff',
        borderColor: '#2200ff',
        borderWidth: 1,
        stack: 'Stack 0',
      },
    ],
  };
}
function setSportSpecificChartInformation(
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
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return '';
    }
  });
}

// $WHITE: #ffffff;
// $CYAN: #00ffee; //primary
// $CYAN_2: #00aa9f;
// $CYAN_3: #00554f;
// $ORANGE: #ff8800; //secondary
// $BLUE_CONTRAST_TO_ORANGE: #0077ff;
// $BLUE: #2200ff;
// $RED: #ff0011; //contrast to primary
//$YELLOW: #ffee00;

function getChartBarColor(tag: Tag): string {
  switch (tag) {
    case 'run':
      return '#ff0011';
    case 'bike':
      return '#ffee00';
    case 'swim':
      return '#2200ff';
    case 'other':
      return '#2200ff';
    default:
      return '#00ffee';
  }
}
function displayChartTitleByTagAndTime(tag: Tag, time: Time): string {
  switch (tag) {
    case 'run':
      return time === 'month'
        ? 'Run Distance This Month (miles)'
        : time === 'year'
          ? 'Run Distance Past Year (miles)'
          : 'Run Distance All Time (miles)';
    case 'bike':
      return time === 'month'
        ? 'Bike Distance This Month (miles)'
        : time === 'year'
          ? 'Bike Distance Past Year (miles)'
          : 'Bike Distance All Time (miles)';
    case 'swim':
      return time === 'month'
        ? 'Swim Distance This Month (yards)'
        : time === 'year'
          ? 'Swim Distance Past Year (yards)'
          : 'Swim Distance All Time (yards)';
    case 'other':
      return time === 'month'
        ? 'Strength Training This Month (hours)'
        : time === 'year'
          ? 'Strength Training Past Year (hours)'
          : 'Strength Training All Time (hours)';
    default:
      return 'Distance in Miles';
  }
}
function getMetricByTag(tag: Tag): string {
  switch (tag) {
    case 'run':
      return 'Miles';
    case 'bike':
      return 'Miles';
    case 'swim':
      return 'Yards';
    case 'other':
      return 'Hours';
    default:
      return 'Distance';
  }
}

export default function Stats() {
  const [tag, setTag] = useState<Tag>('all');
  const [time, setTime] = useState<Time>('all');
  const [data, setData] = useState<ExerTrackResponse | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
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
      setPageLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pageLoading) return;

    if (chart) chart.destroy();

    const ctx = document.getElementById(
      `${tag}-${time}`
    ) as HTMLCanvasElement | null;

    if (ctx) ctx.getContext('2d');

    if (tag === 'all' && time === 'all') {
      const allData = setAllSportChartInformation(data!);

      const newChart = new Chart(ctx!, {
        type: 'bar',
        data: allData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: displayChartTitleByTagAndTime(tag, time),
              color: '#000000',
              font: {
                size: 18,
              },
            },
          },
        },
      });
      setChart(newChart);
    } else {
      const chartStatistics = data
        ? setSportSpecificChartInformation(data, tag, time)
        : null;
      const labels =
        time === 'year' && chartStatistics?.labels
          ? convertMonthNumbersToNames(chartStatistics!.labels)
          : chartStatistics?.labels.map((label) => label.toString());
      const newChart = new Chart(ctx!, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: getMetricByTag(tag),
              data: chartStatistics?.data ?? [],
              backgroundColor: getChartBarColor(tag),
              borderColor: getChartBarColor(tag),
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
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: displayChartTitleByTagAndTime(tag, time),
              color: '#00ffee',
              font: {
                size: 18,
              },
            },
          },
        },
      });
      setChart(newChart);
    }
  }, [data, pageLoading, tag, time]);

  const sportStatistics = data
    ? setSportStatInformation(data, tag, time)
    : null;
  const recentActivities = data?.recentActivities ?? [];

  const titleText = classNames(styles.title, headings.heading2);
  return (
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
      {pageLoading ? (
        <LoadingIndicator
          isCentered={true}
          isFullScreen={true}
          size={'large'}
        />
      ) : (
        <>
          {pageLoading ? (
            <div>
              <LoadingIndicator
                isCentered={true}
                isFullScreen={false}
                size={'large'}
              />
            </div>
          ) : (
            <div>
              <canvas id={`${tag}-${time}`}></canvas>
            </div>
          )}

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
            <div>
              Total Distance: {sportStatistics?.totalDistance}{' '}
              {getMetricByTag(tag)}
            </div>
          )}
          {sportStatistics?.totalDuration && (
            <div>Total Duration: {sportStatistics?.totalDuration}</div>
          )}
          {sportStatistics?.maxDistance && tag !== 'other' && (
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
        </>
      )}
    </div>
  );
}
