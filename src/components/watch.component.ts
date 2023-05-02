import { BehaviorSubject, share, tap } from "rxjs";
import { DATA, OHLCV, OHLCVS } from "../shared/defines";
import config from "../../config.json";
// import { _init } from "../../data";

// evaluates data
export class OHLCVWatcher {
  private _$!: BehaviorSubject<OHLCV[]>;

  constructor(
    private symbol: string,
    private timeframe: string,
    private ohlcvs: OHLCV[]
  ) {
    console.log("watcher passed", symbol, timeframe);
    Object.keys(config.indicator).forEach(
      (indicator: string) => (DATA[this.symbol][this.timeframe][indicator] = [])
    );
    this._$ = new BehaviorSubject<any>(this.ohlcvs);

    // OHLCVS[this.symbol][this.timeframe] = this.ohlcvs;
    DATA[this.symbol][this.timeframe].$ = this._$.pipe(
      // scan((ohlcvs: OHLCV[], ohlcv: OHLCV) => { console.log(ohlcv, ohlcvs) }),
      // scan((ohlcvs: OHLCV[], ohlcv: OHLCV) => { return [...ohlcvs, ohlcv]}),
      // tap((ohlcv: OHLCV[]) => !!OHLCVS[this.symbol][this.timeframe].length ? OHLCVS[this.symbol][this.timeframe] = ohlcv : OHLCVS[this.symbol][this.timeframe][OHLCVS[this.symbol][this.timeframe].length] = ohlcv),
      // tap(console.log),
      tap((ohlcv: OHLCV[]) =>
        !ohlcv.length
          ? (OHLCVS[this.symbol][this.timeframe][
              OHLCVS[this.symbol][this.timeframe].length
            ] = ohlcv)
          : (OHLCVS[this.symbol][this.timeframe] = ohlcv)
      ),
      // tap((ohlcv: OHLCV[]) => typeof ohlcv == 'object' ? OHLCVS[this.symbol][this.timeframe][OHLCVS[this.symbol][this.timeframe].length] = ohlcv : OHLCVS[this.symbol][this.timeframe] = ohlcv),
      // tap(() => console.log(this.timeframe, OHLCVS[this.symbol][this.timeframe])),
      tap(this._handleOHLCVS),
      share()
    );

    // _init();
  }

  public next = (ohlcv: OHLCV) => this._$.next(ohlcv);

  private _handleOHLCVS = (ohlcvs: OHLCV[]) => {
    // DATA[this.symbol][this.timeframe]['cls'] = cls(ohlcvs, DATA[this.symbol][this.timeframe]['cls']);
    // DATA[this.symbol][this.timeframe]['rsi'] = rsi(DATA[this.symbol][this.timeframe]['cls']);
    // DATA[this.symbol][this.timeframe]['atr'] = atr(ohlcvs);
    // DATA[this.symbol][this.timeframe]['ema'] = ema(DATA[this.symbol][this.timeframe]);
    // DATA[this.symbol][this.timeframe]['sma'] = sma(DATA[this.symbol][this.timeframe]);
    console.log("ohlcvs:", ohlcvs);
  };
}

// type OHLCVData = {
//     cls: { [limit: number]: number[] };
//     rsi: { [limit: number]: number[] };
//     atr: { [period: number]: number };
// };

export default OHLCVWatcher;
