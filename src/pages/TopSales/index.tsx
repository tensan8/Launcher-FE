import * as Chart from "chart.js/auto";
import { useRef, useEffect, useState } from "react";

const DataVis = (): JSX.Element => {
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7]);

  // helper function to format chart data since you do this twice
  const formatData = (data: number[]): Chart.ChartData => ({
    labels: ["a", "b", "c", "d", "e", "f", "g", "h"],
    datasets: [{ data }]
  });

  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<Chart.Chart | null>(null);

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart.Chart(ctx, {
        type: "radar",
        data: formatData(data),
        options: { responsive: true }
      });
    }
  };

  // effect to update the chart when props are updated
  useEffect(() => {
    // must verify that the chart exists
    if (chartRef.current) {
      chartRef.current.data = formatData(data);
      chartRef.current.update();
    }
  }, [data]);

  return (
      <div className="self-center w-1/2">
        <div className="overflow-hidden">
          <canvas ref={canvasCallback}></canvas>
        </div>
      </div>
  );
};

export default DataVis
