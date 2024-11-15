interface ExerTrackResponse {
  running: {
    charts: {
      allTime: {
        labels: number[];
        data: number[];
      };
      pastYear: {
        labels: number[];
        data: number[];
      };
      thisMonth: {
        labels: number[];
        data: number[];
      };
    };
    stats: {
      allTime: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      pastYear: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      thisMonth: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
    };
  };
  cycling: {
    charts: {
      allTime: {
        labels: number[];
        data: number[];
      };
      pastYear: {
        labels: number[];
        data: number[];
      };
      thisMonth: {
        labels: number[];
        data: number[];
      };
    };
    stats: {
      allTime: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      pastYear: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      thisMonth: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
    };
  };
  swimming: {
    charts: {
      allTime: {
        labels: number[];
        data: number[];
      };
      pastYear: {
        labels: number[];
        data: number[];
      };
      thisMonth: {
        labels: number[];
        data: number[];
      };
    };
    stats: {
      allTime: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      pastYear: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      thisMonth: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
    };
  };
  other: {
    charts: {
      allTime: {
        labels: number[];
        data: number[];
      };
      pastYear: {
        labels: number[];
        data: number[];
      };
      thisMonth: {
        labels: number[];
        data: number[];
      };
    };
    stats: {
      allTime: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      pastYear: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
      thisMonth: {
        totalDistance: number;
        totalDuration: string;
        maxDistance: number;
        totalActivities: number;
        activityTypeCounts: {
          [key: string]: number;
        };
      };
    };
  };
  recentActivities: {
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
  }[];
}
