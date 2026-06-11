import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PriceChart({ stock }) {
  const history = stock.history?.length
    ? stock.history.slice(-8)
    : [
        { price: stock.price - 3 },
        { price: stock.price - 1 },
        { price: stock.price + 2 },
        { price: stock.price },
        { price: stock.price + 1 }
      ];

  const data = {
    labels: history.map((_, index) => `T${index + 1}`),
    datasets: [
      {
        label: `${stock.symbol} Price`,
        data: history.map((point) => point.price),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.18)",
        tension: 0.35
      }
    ]
  };

  return <Line data={data} options={{ responsive: true, plugins: { legend: { labels: { color: "#f8fafc" } } }, scales: { x: { ticks: { color: "#cbd5e1" } }, y: { ticks: { color: "#cbd5e1" } } } }} />;
}
