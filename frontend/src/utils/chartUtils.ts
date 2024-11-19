import AllSportsChartInformation from '../models/AllSportsChartInformation';
import {
  ChartInformation,
  ExerTrackResponse,
  StatsInformation,
} from '../models/ExerTrackResponse';
import Sport from '../models/Sport';
import Time from '../models/Time';

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
      return 'Distance in Miles';
  }
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

function getAllTimeSportChartData(
  data: ExerTrackResponse,
  sport: Sport
): number[] {
  const longestContinuousYearlyData = data.running.charts.allTime.labels;
  const runningData = data.running.charts.allTime.data;

  const matchedData = longestContinuousYearlyData.map((year, index) => {
    const dataIndex = runningData.findIndex((dataYear) => dataYear === year);
    return dataIndex !== -1 ? runningData[dataIndex] : 0;
  });

  switch (sport) {
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
      return 'Distance';
  }
}

export {
  displayChartTitleByTagAndTime,
  setSportStatInformation,
  getAllTimeSportChartData,
  setAllSportChartInformation,
  setSportSpecificChartInformation,
  convertMonthNumbersToNames,
  getChartBarColor,
  getMetricBySport,
};
