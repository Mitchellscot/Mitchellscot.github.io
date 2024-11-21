import AllSportsChartInformation from '../models/AllSportsChartInformation';
import {
  ChartInformation,
  ExerTrackResponse,
  StatsInformation,
} from '../models/ExerTrackResponse';
import Sport from '../models/Sport';
import Time from '../models/Time';
import { ActivityToReadableNameMap } from './sportMap'

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
        ? 'Strength Training This Month (minutes)'
        : time === 'year'
          ? 'Strength Training Past Year (hours)'
          : 'Strength Training All Time (hours)';
    default:
      return 'Distance in Miles (All Sports)';
  }
}
function setAllSportStatInformation(data: ExerTrackResponse, time: Time): StatsInformation {
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

function setAllSportChartInformation(
  data: ExerTrackResponse,
  time: Time
): AllSportsChartInformation {
  const chartLabels = time === 'month' ? data.all.charts.thisMonth.labels : time === 'year' ? data.all.charts.pastYear.labels : data.all.charts.allTime.labels;
  const runChartInformation = time === 'month' ? data.all.charts.thisMonth.runData : time === 'year' ? data.all.charts.pastYear.runData : data.all.charts.allTime.runData;
  const bikeChartInformation = time === 'month' ? data.all.charts.thisMonth.cycleData : time === 'year' ? data.all.charts.pastYear.cycleData : data.all.charts.allTime.cycleData;
  const swimChartInformation = time === 'month' ? data.all.charts.thisMonth.swimData : time === 'year' ? data.all.charts.pastYear.swimData : data.all.charts.allTime.swimData;
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
        backgroundColor: '#ff8800',
        borderColor: '#ff8800',
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
  const activityTypeCounts = time === 'month' ? data.all.stats.thisMonth.activityTypeCounts : time === 'year' ? data.all.stats.pastYear.activityTypeCounts : data.all.stats.allTime.activityTypeCounts;
  const labels = Object.keys(activityTypeCounts);
  const chartInformation = Object.values(activityTypeCounts).sort();
  return {
    labels: labels,
    datasets: [
      {
        label: 'Count of Activities by Sport',
        data: chartInformation,
        backgroundColor: '#ff0011',
        borderColor: '#ffffff',
        borderWidth: 1,
      }
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
      return '#ff8800';
    case 'swim':
      return '#2200ff';
    case 'other':
      return '#00554f';
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
      return 'Hours';
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
  setAllSportPieChartInformation
};

