import { OHLCV, OHLCVS, DATA, EXCHANGES } from "../shared/defines";
import OHLCVWatcher from "./watch.component";

// updating values at timeframe interval
// purpose is to init history, fetch at interval, assign last value and tick watcher
// fetch history (initial limit of 500) and create watcher => assign fetch (limit of 1) at interval which sends parsed data to watcher
export class OHLCVFetcher {
  private LIMIT: 500 | 1 = 500;
  private OHLCVWATCHER!: OHLCVWatcher;

  constructor(
    private exchange: string,
    private symbol: string,
    private timeframe: string,
    private interval: number
  ) {
    this.init();
    this._fetch()
      .then(this.handleFirstFetch)
      .then(
        setInterval(() => this._fetch().then(this.handleFetch), this.interval)
      );
  }

  private _fetch = () =>
    EXCHANGES[this.exchange]["exchange"].fetchOHLCV(
      this.symbol,
      this.timeframe,
      undefined,
      this.LIMIT
    );
  private parseOHLCV = (ohlcv: OHLCV) => ({
    time: ohlcv[0] / 1000,
    open: ohlcv[1],
    high: ohlcv[2],
    low: ohlcv[3],
    close: ohlcv[4],
  });
  private handleFetch = (ohlcv: OHLCV) =>
    this.OHLCVWATCHER.next(this.parseOHLCV(ohlcv[0]));
  private init = () => {
    if (!OHLCVS[this.symbol]) OHLCVS[this.symbol] = [];
    if (!OHLCVS[this.symbol][this.timeframe])
      OHLCVS[this.symbol][this.timeframe] = [];
    if (!DATA[this.symbol]) DATA[this.symbol] = [];
    if (!DATA[this.symbol][this.timeframe])
      DATA[this.symbol][this.timeframe] = [];
  };
  private handleFirstFetch = (ohlcvs: OHLCV[]) => {
    for (let i = 0; i < ohlcvs.length; i++)
      ohlcvs[i] = this.parseOHLCV(ohlcvs[i]);
    this.OHLCVWATCHER = new OHLCVWatcher(this.symbol, this.timeframe, ohlcvs);
    this.LIMIT = 1;
  };
}

export default OHLCVFetcher;
