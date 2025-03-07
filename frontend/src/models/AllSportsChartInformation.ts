export default interface AllSportsChartInformation {
  labels: string[] | undefined;
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string | string[];
    borderColor: string;
    borderWidth: number;
    stack?: string;
  }[];
}
