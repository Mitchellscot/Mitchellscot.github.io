'use client';
import headings from '../../styles/typography/Heading.module.scss';
import text from '../../styles/typography/Text.module.scss';
import styles from './page.module.scss';
import classNames from 'classnames';
import Button from '../../components/Button/Button';
import { baseEnv } from '../../utils/environment';
import http from '../../utils/http';
import { useSearchParams } from 'next/navigation';
import {
  ChartInformation,
  ExerTrackResponse,
  StatsInformation,
} from '../../models/ExerTrackResponse';
import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';
import type Sport from '../../models/Sport';
import type Time from '../../models/Time';
import {
  displayChartTitleByTagAndTime,
  setSportStatInformation,
  setAllSportChartInformation,
  setSportSpecificChartInformation,
  getMetricBySport,
  getChartBarColor,
  setAllSportStatInformation,
  setAllSportPieChartInformation
} from '../../utils/chartUtils';
import Activities from '../../components/Activities/Activities';

export default function Stats() {
  const activitiesTitle = classNames(styles.activitiesTitle, headings.heading2);
  const totalsTitleClasses = classNames(styles.totalsTitle, text.textMd);
  const statClasses = classNames(styles.stat, text.textMd);
  const [sport, setSport] = useState<Sport>('all');
  const [time, setTime] = useState<Time>('all');
  const [data, setData] = useState<ExerTrackResponse | null>(null);
  const [chart, setChart] = useState<Chart | null>(null);
  const [pieChart, setPieChart] = useState<Chart | null>(null);
  const [quickStatistics, setquickStatistics] = useState<StatsInformation | null>(null);
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
      setData(response.data ?? null);
      setPageLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pageLoading)
      return;

    if (chart)
      chart.destroy();
    if (pieChart)
      pieChart.destroy();

    const mainChart = document.getElementById(
      `${sport}-${time}`
    ) as HTMLCanvasElement | null;
    const mainPieChart = document.getElementById(
      `pie-${sport}-${time}`
    ) as HTMLCanvasElement | null;

    if (mainChart)
      mainChart.getContext('2d');

    if (sport === 'all') {
      const allData = setAllSportChartInformation(data!, time);
      const statistics = data ? setAllSportStatInformation(data, time) : null;
      setquickStatistics(statistics);
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
              color: '#ffffff',
              font: {
                size: 18,
              },
            },
          },
        },
      });
      setChart(newChart);
      const pieChartData = setAllSportPieChartInformation(data!, time);
      const newPieChart = new Chart(mainPieChart!, {
        type: 'pie',
        data: pieChartData,
        options: {
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Activity Breakdown',
              color: '#00ffee',
              font: {
                size: 18,
              },
            }
          }
        }
      });
      setPieChart(newPieChart);
    } else {
      const statistics = data ? setSportStatInformation(data, sport, time) : null;
      setquickStatistics(statistics);
      const chartStatistics = data
        ? setSportSpecificChartInformation(data, sport, time)
        : null;
      const labels = chartStatistics?.labels ?? [];
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


  const recentActivities = data?.recentActivities ?? [];

  return (
    <div className={styles.container}>

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
          <div className={styles.totalsAndPieChartContainer}>
            <div className={styles.totalsContainer}>
              {quickStatistics?.totalDistance && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>Total Distance: </span>
                  <br />
                  <span className={statClasses}>{quickStatistics?.totalDistance}{' '}
                    {getMetricBySport(sport)}</span>
                </div>
              )}
              {quickStatistics?.totalDuration && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>Total Duration: <br /></span>
                  <span className={statClasses}>{quickStatistics?.totalDuration}</span>
                </div>
              )}
              {quickStatistics?.maxDistance && sport !== 'other' && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>Max Distance: <br /></span>
                  <span className={statClasses}>{quickStatistics?.maxDistance} Miles</span>
                </div>
              )}
              {quickStatistics?.totalActivities && (
                <div className={totalsTitleClasses}>
                  <span className={styles.totalsLabel}>Total {sport === 'all' ? 'Activities' : `${sport}`}: <br /></span>
                  <span className={statClasses}>{quickStatistics?.totalActivities}</span>
                </div>
              )}
            </div>
            <div className={styles.pieChartContainer}>
              <canvas id={`pie-${sport}-${time}`}></canvas>
            </div>
          </div>

          <div className={activitiesTitle}>Recent Activities</div>
          <hr />
          <div className={styles.activityColumns}>
            <Activities activitiesList={recentActivities} />
          </div>
        </>
      )}
    </div>
  );
}
