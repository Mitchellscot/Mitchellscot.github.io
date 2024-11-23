export interface ExerTrackResponse {
  running: {
    charts: {
      allTime: ChartInformation;
      pastYear: ChartInformation;
      thisMonth: ChartInformation;
    };
    stats: {
      allTime: StatsInformation;
      pastYear: StatsInformation;
      thisMonth: StatsInformation;
    };
  };
  cycling: {
    charts: {
      allTime: ChartInformation;
      pastYear: ChartInformation;
      thisMonth: ChartInformation;
    };
    stats: {
      allTime: StatsInformation;
      pastYear: StatsInformation;
      thisMonth: StatsInformation;
    };
  };
  swimming: {
    charts: {
      allTime: ChartInformation;
      pastYear: ChartInformation;
      thisMonth: ChartInformation;
    };
    stats: {
      allTime: StatsInformation;
      pastYear: StatsInformation;
      thisMonth: StatsInformation;
    };
  };
  other: {
    charts: {
      allTime: ChartInformation;
      pastYear: ChartInformation;
      thisMonth: ChartInformation;
    };
    stats: {
      allTime: StatsInformation;
      pastYear: StatsInformation;
      thisMonth: StatsInformation;
    };
  };
  all: {
    charts: {
      allTime: AllSportChartInformation;
      pastYear: AllSportChartInformation;
      thisMonth: AllSportChartInformation;
    };
    stats: {
      allTime: StatsInformation;
      pastYear: StatsInformation;
      thisMonth: StatsInformation;
    };
  };
  recentActivities: Activities[];
}
export interface ChartInformation {
  labels: string[];
  data: number[];
}
export interface AllSportChartInformation {
  labels: string[];
  runData: number[];
  cycleData: number[];
  swimData: number[];
}
export interface StatsInformation {
  totalDistance: number;
  totalDuration: string;
  maxDistance: number;
  totalActivities: number;
  activityTypeCounts: ActivityCounts;
}
export interface ActivityCounts {
  [key: string]: number;
}
export interface Activities {
  name: string;
  readableDate: string;
  date: string;
  duration: string;
  distance: number;
  readableDistance: string;
  pace: string;
  activityType: string;
  sportType: string;
  effort: string;
}
