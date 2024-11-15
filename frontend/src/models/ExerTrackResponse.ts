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
  recentActivities: Activities[];
}
export interface ChartInformation {
  labels: number[];
  data: number[];
}
export interface StatsInformation {
  totalDistance: number;
  totalDuration: string;
  maxDistance: number;
  totalActivities: number;
  activityTypeCounts: {[key: string]: number};
}
export interface Activities {
  name: string;
  readableDate: string;
  date: string;
  duration: string;
  distance: number;
  readableDistance: string;
  pace: string;
  actityType: string;
  sportType: string;
  effort: string;
}
