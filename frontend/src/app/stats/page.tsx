'use client';
import headings from '../../styles/typography/Heading.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import {baseEnv} from '../../utils/environment';
import http from '../../utils/http';
import {useSearchParams} from 'next/navigation';
import {
  ChartInformation,
  ExerTrackResponse,
  StatsInformation,
} from '../../models/ExerTrackResponse';
import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import type Sport from '../../models/Sport';
import type Time from '../../models/Time';
import {
  displayChartTitleByTagAndTime,
  setSportStatInformation,
  getAllTimeSportChartData,
  setAllSportChartInformation,
  setSportSpecificChartInformation,
  convertMonthNumbersToNames,
  getMetricBySport,
  getChartBarColor,
} from '../../utils/chartUtils';

export default function Stats() {
  const [sport, setSport] = useState<Sport>('all');
  const [time, setTime] = useState<Time>('all');
  const [data, setData] = useState<ExerTrackResponse | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [pieChart, setPieChart] = useState<Chart | null>(null);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSport((searchParams.get('sport') as Sport) ?? 'all');
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

    const mainChart = document.getElementById(
      `${sport}-${time}`
    ) as HTMLCanvasElement | null;
    const pieChart = document.getElementById(
      `pie-${sport}-${time}`
    ) as HTMLCanvasElement | null;

    if (mainChart) mainChart.getContext('2d');

    if (sport === 'all' && time === 'all') {
      const allData = setAllSportChartInformation(data!);

      const newChart = new Chart(mainChart!, {
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
              text: displayChartTitleByTagAndTime(sport, time),
              color: '#000000',
              font: {
                size: 18,
              },
            },
          },
        },
      });
      setChart(newChart);
      // const newPieChart = new Chart(pieChart!, {
      //   type: 'doughnut',
      //   data: {
      //     labels:
      //   }
      // });
    } else {
      const chartStatistics = data
        ? setSportSpecificChartInformation(data, sport, time)
        : null;
      const labels =
        time === 'year' && chartStatistics?.labels
          ? convertMonthNumbersToNames(chartStatistics!.labels)
          : chartStatistics?.labels.map((label) => label.toString());
      const newChart = new Chart(mainChart!, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: getMetricBySport(sport),
              data: chartStatistics?.data ?? [],
              backgroundColor: getChartBarColor(sport),
              borderColor: getChartBarColor(sport),
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
              text: displayChartTitleByTagAndTime(sport, time),
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
  }, [data, pageLoading, sport, time]);

  const sportStatistics = data
    ? setSportStatInformation(data, sport, time)
    : null;
  const recentActivities = data?.recentActivities ?? [];

  const titleText = classNames(styles.title, headings.heading2);
  return (
    <div className={styles.container}>
      <div className={styles.timeButtonContainer}>
        <Button
          label="Run"
          link={
            sport === 'run'
              ? `/stats?sport=all&time=${time}`
              : `/stats?sport=run&time=${time}`
          }
          variant={sport === 'run' ? 'active' : 'inactive'}
          arrowOptions="none"
          iconOptions="run"
        />
        <Button
          label="Bike"
          link={
            sport === 'bike'
              ? `/stats?sport=all&time=${time}`
              : `/stats?sport=bike&time=${time}`
          }
          variant={sport == 'bike' ? 'active' : 'inactive'}
          arrowOptions="none"
          iconOptions="bike"
        />
        <Button
          label="Swim"
          link={
            sport === 'swim'
              ? `/stats?sport=all&time=${time}`
              : `/stats?sport=swim&time=${time}`
          }
          variant={sport == 'swim' ? 'active' : 'inactive'}
          arrowOptions="none"
          iconOptions="swim"
        />
        <Button
          label="Other"
          link={
            sport === 'other'
              ? `/stats?sport=all&time=${time}`
              : `/stats?sport=other&time=${time}`
          }
          variant={sport == 'other' ? 'active' : 'inactive'}
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
              <canvas id={`${sport}-${time}`}></canvas>
            </div>
          )}

          <div className={styles.timeButtonContainer}>
            <Button
              label="This Month"
              link={`/stats?sport=${sport}&time=month`}
              variant="transparent"
              arrowOptions="right"
            />
            <Button
              label="This Year"
              link={`/stats?sport=${sport}&time=year`}
              variant="transparent"
              arrowOptions="right"
            />
            <Button
              label="All Time"
              link={`/stats?sport=${sport}&time=all`}
              variant="transparent"
              arrowOptions="right"
            />
          </div>
          {sportStatistics?.totalDistance && (
            <div>
              Total Distance: {sportStatistics?.totalDistance}{' '}
              {getMetricBySport(sport)}
            </div>
          )}
          {sportStatistics?.totalDuration && (
            <div>Total Duration: {sportStatistics?.totalDuration}</div>
          )}
          {sportStatistics?.maxDistance && sport !== 'other' && (
            <div>Max Distance: {sportStatistics?.maxDistance} Miles</div>
          )}
          {sportStatistics?.totalActivities && (
            <div>
              Total {sport}: {sportStatistics?.totalActivities}
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
