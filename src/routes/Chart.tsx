import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
  }

function Chart({ coinId }:ChartProps) {
    const isDark = useRecoilValue(isDarkAtom);

    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId],() => fetchCoinHistory(coinId), {refetchInterval: 5000});
    return (
        <div>
          {isLoading ? (
            "Loading chart..."
          ) : (
            <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                })) ?? [], //number 배열로 강제함
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },

            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
            },

            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
          )}
        </div>
      );
}

export default Chart;