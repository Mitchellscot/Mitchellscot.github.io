import Chart from 'chart.js/auto';
import AllSportsChartInformation from '../models/AllSportsChartInformation';
import {
  ChartInformation,
  ExerTrackResponse,
  StatsInformation,
  ActivityCounts,
} from '../models/ExerTrackResponse';
import Sport from '../models/Sport';
import Time from '../models/Time';
import {
  ActivityToReadableNameMap,
  ActivityPieChartOrder,
  ActivityColorMap,
} from './sportMap';

function displayChartTitleByTagAndTime(tag: Sport, time: Time): string {
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
          : 'Strength Training All Time (miles)';
    default:
      return 'Distance in Miles (All Sports)';
  }
}
function setAllSportStatInformation(
  data: ExerTrackResponse,
  time: Time
): StatsInformation {
  return time === 'month'
    ? data.all.stats.thisMonth
    : time === 'year'
      ? data.all.stats.pastYear
      : data.all.stats.allTime;
}
function setSportStatInformation(
  data: ExerTrackResponse,
  sport: Sport,
  time: Time
): StatsInformation {
  switch (sport) {
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

function orderPieChartLabels(stats: ActivityCounts) {
  const orderedLabels = ActivityPieChartOrder.filter((activity) => {
    return activity in stats;
  });
  return orderedLabels;
}
function orderPieChartValues(stats: ActivityCounts) {
  const orderedLabels = orderPieChartLabels(stats);
  return orderedLabels.map((activity) => stats[activity]);
}
function orderPiChartColors(stats: ActivityCounts) {
  const orderedLabels = orderPieChartLabels(stats);
  return orderedLabels.map((activity) => ActivityColorMap[activity]);
}

function setAllSportChartInformation(
  data: ExerTrackResponse,
  time: Time
): AllSportsChartInformation {
  const chartLabels =
    time === 'month'
      ? data.all.charts.thisMonth.labels
      : time === 'year'
        ? data.all.charts.pastYear.labels
        : data.all.charts.allTime.labels;
  const runChartInformation =
    time === 'month'
      ? data.all.charts.thisMonth.runData
      : time === 'year'
        ? data.all.charts.pastYear.runData
        : data.all.charts.allTime.runData;
  const bikeChartInformation =
    time === 'month'
      ? data.all.charts.thisMonth.cycleData
      : time === 'year'
        ? data.all.charts.pastYear.cycleData
        : data.all.charts.allTime.cycleData;
  const swimChartInformation =
    time === 'month'
      ? data.all.charts.thisMonth.swimData
      : time === 'year'
        ? data.all.charts.pastYear.swimData
        : data.all.charts.allTime.swimData;
  return {
    labels: chartLabels,
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
function setAllSportPieChartInformation(
  data: ExerTrackResponse,
  time: Time
): AllSportsChartInformation {
  const activityTypeCounts =
    time === 'month'
      ? data.all.stats.thisMonth.activityTypeCounts
      : time === 'year'
        ? data.all.stats.pastYear.activityTypeCounts
        : data.all.stats.allTime.activityTypeCounts;
  const orderedLabels = orderPieChartLabels(activityTypeCounts);

  const chartInformation = orderPieChartValues(activityTypeCounts);
  return {
    labels: orderedLabels.map((label) => ActivityToReadableNameMap[label]),
    datasets: [
      {
        label: 'Count',
        data: chartInformation,
        backgroundColor: orderPiChartColors(activityTypeCounts),
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };
}
function setSportSpecificPieChartInformation(
  data: ExerTrackResponse,
  sport: Sport,
  time: Time
): AllSportsChartInformation {
  let activityTypeCounts;
  console.log('sport, time', sport, time);
  switch (sport) {
    case 'run':
      activityTypeCounts =
        time === 'month'
          ? data.running.stats.thisMonth.activityTypeCounts
          : time === 'year'
            ? data.running.stats.pastYear.activityTypeCounts
            : data.running.stats.allTime.activityTypeCounts;
      break;
    case 'bike':
      activityTypeCounts =
        time === 'month'
          ? data.cycling.stats.thisMonth.activityTypeCounts
          : time === 'year'
            ? data.cycling.stats.pastYear.activityTypeCounts
            : data.cycling.stats.allTime.activityTypeCounts;
      break;
    case 'swim':
      activityTypeCounts =
        time === 'month'
          ? data.swimming.stats.thisMonth.activityTypeCounts
          : time === 'year'
            ? data.swimming.stats.pastYear.activityTypeCounts
            : data.swimming.stats.allTime.activityTypeCounts;
      break;
    case 'other':
      activityTypeCounts =
        time === 'month'
          ? data.other.stats.thisMonth.activityTypeCounts
          : time === 'year'
            ? data.other.stats.pastYear.activityTypeCounts
            : data.other.stats.allTime.activityTypeCounts;
      break;
    default:
      activityTypeCounts =
        time === 'month'
          ? data.all.stats.thisMonth.activityTypeCounts
          : time === 'year'
            ? data.all.stats.pastYear.activityTypeCounts
            : data.all.stats.allTime.activityTypeCounts;
      break;
  }
  console.log('Mitchell, activity type counts', activityTypeCounts);
  const orderedLabels = orderPieChartLabels(activityTypeCounts);
  const chartInformation = orderPieChartValues(activityTypeCounts);
  return {
    labels: orderedLabels.map((label) => ActivityToReadableNameMap[label]),
    datasets: [
      {
        label: 'Count',
        data: chartInformation,
        backgroundColor: orderPiChartColors(activityTypeCounts),
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };
}

function setSportSpecificChartInformation(
  data: ExerTrackResponse,
  sport: Sport,
  time: Time
): ChartInformation {
  switch (sport) {
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

function getChartBarColor(sport: Sport): string {
  switch (sport) {
    case 'run':
      return '#ff0011';
    case 'bike':
      return '#ffee00';
    case 'swim':
      return '#2200ff';
    case 'other':
      return '#6e00ff';
    default:
      return '#00ffee';
  }
}

function getMetricBySport(sport: Sport): string {
  switch (sport) {
    case 'run':
      return 'Miles';
    case 'bike':
      return 'Miles';
    case 'swim':
      return 'Yards';
    case 'other':
      return 'Miles (walking)';
    default:
      return 'Miles';
  }
}

function getReadableActivityTitle(activity: string): string {
  const activityName = activity as keyof typeof ActivityToReadableNameMap;
  if (activityName === undefined) {
    return activity;
  }
  return ActivityToReadableNameMap[activityName];
}

function getBarChart(
  sport: Sport,
  time: Time,
  data: ExerTrackResponse | null,
  chartContext: HTMLCanvasElement
) {
  if (data === null) {
    return;
  }
  if (sport === 'all') {
    const allData = setAllSportChartInformation(data!, time);
    return new Chart(chartContext, {
      type: 'bar',
      data: allData,
      options: {
        aspectRatio: 1.75,
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
  } else {
    const chartInformation = setSportSpecificChartInformation(
      data,
      sport,
      time
    );
    const labels = chartInformation.labels;
    return new Chart(chartContext, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: getMetricBySport(sport),
            data: chartInformation?.data ?? [],
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
            color: '#ffffff',
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }
}
function getPieChart(
  sport: Sport,
  time: Time,
  data: ExerTrackResponse | null,
  chartContext: HTMLCanvasElement
) {
  if (data === null) {
    return;
  }

  if (sport === 'all') {
    const pieChartData = setAllSportPieChartInformation(data!, time);
    return new Chart(chartContext!, {
      type: 'pie',
      data: pieChartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Activity Breakdown',
            color: '#ffffff',
            position: 'bottom',
            font: {
              size: 18,
            },
          },
        },
      },
    });
  } else {
    const chartInformation = setSportSpecificPieChartInformation(
      data,
      sport,
      time
    );
    console.log('Mitchell, sport', sport, 'time', time);
    console.log('Mitchell, chart information', chartInformation);
    return new Chart(chartContext!, {
      type: 'pie',
      data: chartInformation,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Activity Breakdown',
            color: '#00ffee',
            font: {
              size: 18,
            },
          },
        },
      },
    });
  }
}

export {
  displayChartTitleByTagAndTime,
  setSportStatInformation,
  setAllSportChartInformation,
  setSportSpecificChartInformation,
  convertMonthNumbersToNames,
  getChartBarColor,
  getMetricBySport,
  getReadableActivityTitle,
  setAllSportStatInformation,
  setAllSportPieChartInformation,
  getBarChart,
  getPieChart,
};
