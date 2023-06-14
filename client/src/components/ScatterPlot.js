import { Scatter } from "react-chartjs-2";
import {
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Filler);

const ScatterPlot = ({ plotData, points }) => {
  const data = {
    datasets: [
      {
        label: "Points",
        showLine: false,
        data: points,
        fill: true,
        borderColor: "green",
        backgroundColor: "green",
        pointRadius: 5,
      },
      {
        label: "Chart 1",
        data: plotData,
        showLine: true,
        fill: false,
        borderColor: "rgba(0, 200, 0, 1)",
        pointRadius: 2,
        cubicInterpolationMode: "monotone",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        type: "linear",
        position: "left",
        beginAtZero: true,
      },
    },
  };

  const chartStyle = {
    width: "600px",
    height: "auto",
  };

  return <Scatter data={data} options={options} style={chartStyle} />;
};

export default ScatterPlot;
