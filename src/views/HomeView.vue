<script lang="ts">
import { defineComponent } from "vue";
import {
  CrosshairMode,
  createChart,
  DeepPartial,
  ChartOptions,
} from "lightweight-charts";
import { interval, first, tap, switchMap } from "rxjs";
import { DATA } from "../shared/defines";

const chartOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  layout: { backgroundColor: "#253248" },
  grid: {
    vertLines: {
      color: "#334158",
    },
    horzLines: {
      color: "#334158",
    },
  },
  crosshair: { mode: CrosshairMode.Normal },
  priceScale: { borderColor: "#485c7b" },
  timeScale: { borderColor: "#485158" },
};
const chart = createChart("body", chartOptions as DeepPartial<ChartOptions>);
const candlestickSeries = chart.addCandlestickSeries({
  upColor: "#4bffb5",
  downColor: "#ff4976",
  borderDownColor: "#ff4976",
  borderUpColor: "#4bffb5",
  wickDownColor: "#838ca1",
  wickUpColor: "#838ca1",
  priceFormat: { precision: 6, minMove: 0.000001 },
});
chart.timeScale().fitContent();

export const _init = () => {
  interval()
    .pipe(
      first(() =>
        DATA["ETH/BTC"]
          ? DATA["ETH/BTC"]["1s"]
            ? DATA["ETH/BTC"]["1s"].$
              ? DATA["ETH/BTC"]["1s"].$
              : false
            : false
          : false
      ),
      tap(console.log),
      switchMap(() => DATA["ETH/BTC"]["1s"].$)
    )
    .subscribe((ohlcv: any) =>
      ohlcv.length
        ? candlestickSeries.setData(ohlcv)
        : candlestickSeries.update(ohlcv)
    );
};

export default defineComponent({
  name: "HomeView",
});
</script>

<template>
  <div id="body"></div>
</template>
