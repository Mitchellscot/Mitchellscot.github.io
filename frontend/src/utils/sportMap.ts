//these are the filtering options shown on the page
export enum Sport {
  ALL = 'all',
  RUN = 'run',
  BIKE = 'cycling',
  SWIM = 'swimming',
  OTHER = 'other',
}
//these are the Garmin parent sport types. Comes in as sportType
export enum SportTypes {
  RUNNING = 'RUNNING',
  CYCLING = 'CYCLING',
  WALKING = 'WALKING',
  SWIMMING = 'SWIMMING',
  STRENGTH_TRAINING = 'STRENGTH_TRAINING',
}
//these are the garmin child sport types. Comes in as activityType
export enum ActivityTypes {
  //running
  running = 'running',
  treadmill_running = 'treadmill_running',
  trail_running = 'trail_running',
  ultra_run = 'ultra_run',
  track_running = 'track_running',
  //cycling
  indoor_cycling = 'indoor_cycling',
  mountain_biking = 'mountain_biking',
  gravel_cycling = 'gravel_cycling',
  cycling = 'cycling',
  //swimming
  lap_swimming = 'lap_swimming',
  open_water_swimming = 'open_water_swimming',
  //strength training, shows up under other
  walking = 'walking',
  yoga = 'yoga',
  strength_training = 'strength_training',
  snow_shoe_ws = 'snow_shoe_ws',
  none = 'none',
  other = 'other',
}

export const ActivityToReadableNameMap = {
  [ActivityTypes.running]: 'Running',
  [ActivityTypes.treadmill_running]: 'Treadmill Running',
  [ActivityTypes.trail_running]: 'Trail Running',
  [ActivityTypes.ultra_run]: 'Ultra Running',
  [ActivityTypes.track_running]: 'Track Running',
  [ActivityTypes.indoor_cycling]: 'Indoor Cycling',
  [ActivityTypes.mountain_biking]: 'Mountain Biking',
  [ActivityTypes.gravel_cycling]: 'Gravel Cycling',
  [ActivityTypes.cycling]: 'Road Cycling',
  [ActivityTypes.lap_swimming]: 'Pool Swimming',
  [ActivityTypes.open_water_swimming]: 'Open Water Swimming',
  [ActivityTypes.walking]: 'Walking',
  [ActivityTypes.yoga]: 'Yoga',
  [ActivityTypes.strength_training]: 'Strength Training',
  [ActivityTypes.other]: 'Strength Training',
  [ActivityTypes.snow_shoe_ws]: 'Snow Shoeing',
  [ActivityTypes.none]: 'No Activities',
};
export const ActivityPieChartOrder = [
  ActivityTypes.track_running,
  ActivityTypes.treadmill_running,
  ActivityTypes.running,
  ActivityTypes.trail_running,
  ActivityTypes.ultra_run,
  ActivityTypes.indoor_cycling,
  ActivityTypes.cycling,
  ActivityTypes.mountain_biking,
  ActivityTypes.gravel_cycling,
  ActivityTypes.lap_swimming,
  ActivityTypes.open_water_swimming,
  ActivityTypes.strength_training,
  ActivityTypes.yoga,
  ActivityTypes.walking,
  ActivityTypes.snow_shoe_ws,
  ActivityTypes.other,
];
export const ActivityColorMap = {
  [ActivityTypes.track_running]: '#ffcccf',
  [ActivityTypes.running]: '#ff0011',
  [ActivityTypes.treadmill_running]: '#ff6670',
  [ActivityTypes.trail_running]: '#99000a',
  [ActivityTypes.ultra_run]: '#330003',
  [ActivityTypes.indoor_cycling]: '#fff566',
  [ActivityTypes.mountain_biking]: '#998f00',
  [ActivityTypes.gravel_cycling]: '#333000',
  [ActivityTypes.cycling]: '#ffee00',
  [ActivityTypes.lap_swimming]: '#2200ff',
  [ActivityTypes.open_water_swimming]: '#0b0055',
  [ActivityTypes.walking]: '#ee00ff',
  [ActivityTypes.yoga]: '#af00ff',
  [ActivityTypes.strength_training]: '#6e00ff',
  [ActivityTypes.snow_shoe_ws]: '#ffffff',
  [ActivityTypes.other]: '#ffffff',
  [ActivityTypes.none]: '#1e2022',
};

export const ActivityToSportMap = {
  [ActivityTypes.running]: Sport.RUN,
  [ActivityTypes.treadmill_running]: Sport.RUN,
  [ActivityTypes.trail_running]: Sport.RUN,
  [ActivityTypes.ultra_run]: Sport.RUN,
  [ActivityTypes.track_running]: Sport.RUN,
  [ActivityTypes.indoor_cycling]: Sport.BIKE,
  [ActivityTypes.mountain_biking]: Sport.BIKE,
  [ActivityTypes.gravel_cycling]: Sport.BIKE,
  [ActivityTypes.cycling]: Sport.BIKE,
  [ActivityTypes.lap_swimming]: Sport.SWIM,
  [ActivityTypes.open_water_swimming]: Sport.SWIM,
  [ActivityTypes.walking]: Sport.OTHER,
  [ActivityTypes.yoga]: Sport.OTHER,
  [ActivityTypes.strength_training]: Sport.OTHER,
  [ActivityTypes.snow_shoe_ws]: Sport.OTHER,
  [ActivityTypes.other]: Sport.OTHER,
};
