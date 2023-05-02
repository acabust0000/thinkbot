// import { OHLCV } from "ccxt";
// import config from "../../config.json";

// export const ema = (data: any) => {
//   // if (!!data['ema']) return data;
//   // let ema = [avg(data[0])], m = 2 / (data.length + 1);
//   // for (let i = 1; i < data.length; i++) {
//   //     let current = avg(data[i]);
//   //     let prevEma = avg(ema[i - 1]);
//   //     let currentEma = (current - prevEma) * m + prevEma;
//   //     ema.push(currentEma);
//   // }
//   // data['ema'] = ema;
//   return data;
// };

// const avg = (ohlcv: any) => ohlcv[4];
// // private avg = (ohlcv: any) => (ohlcv[1] + ohlcv[2] + ohlcv[3] + ohlcv[4]) / 4;

// export const sma = (history: any) => {
//   // for (let i = 0; i < history.length; i++) for (let p of config.indicator.sma) {
//   //     let sum = 0;
//   //     for (let x = 1; x < p; x++) sum += history[i + x][4];
//   //     sma = sum / p;
//   // }
//   // return sma;
// };

// export const atr = (history: OHLCV[]) => {
//   const data: { [period: number]: number } = [];
//   for (const period of config.indicator.atr) {
//     let trSum = 0,
//       prevClose = 0,
//       atr = 0;
//     for (let i = 0; i < period; i++) {
//       trSum += history[i][2] - history[i][3];
//       prevClose = history[i][4];
//     }
//     atr = trSum / period;
//     for (let i = period; i < history.length; i++) {
//       const tr = Math.max(
//         history[i][2] - history[i][3],
//         Math.abs(history[i][2] - prevClose),
//         Math.abs(history[i][3] - prevClose)
//       );

//       atr = (atr * (period - 1) + tr) / period;
//       prevClose = history[i][4];
//     }
//     data[period] = atr;
//   }
//   return data;
// };
// // private avg = (data: any) => data.forEach((ohlcv: any, index: number) => this.data['avg'][index] = (ohlcv[1] + ohlcv[2] + ohlcv[3] + ohlcv[4]) / 4);

// export const rsi = (cls: any) => {
//   const data: { [limit: number]: number } = [];
//   cls.forEach((cls: number[], limit: number) => {
//     let u = 0,
//       d = 0;
//     for (let i = 1; i < cls.length; i++) {
//       u += Math.max(0, cls[i] - cls[i - 1]);
//       d += Math.max(0, cls[i - 1] - cls[i]);
//     }
//     u /= cls.length;
//     d /= cls.length;
//     data[limit] = 100 - 100 / (1 + u / d);
//   });
//   return data;
// };

// export const cls = (history: OHLCV[], cls: { [limit: number]: number[] }) => {
//   for (let i = 0; i < config.indicator.cls.length; i++) {
//     const limit = config.indicator.cls[i];
//     if (cls[limit]) {
//       cls[limit].pop();
//       cls[limit].unshift(history[history.length - 1][4]);
//     } else {
//       if (i == 0) {
//         cls[limit] = [];
//         for (let i = history.length; i > history.length - limit; i--)
//           cls[limit].push(cls[i - 1][4]);
//       } else cls[limit] = cls[config.indicator.cls[i - 1]].slice(0, limit);
//     }
//   }
//   return cls;
// };
