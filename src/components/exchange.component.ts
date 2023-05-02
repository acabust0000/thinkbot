import ccxt from "ccxt";
import config from "../../config.json";
import OHLCVFetcher from "./fetch.component";

export class Exchange {
  private _timeframes: any = [];
  public exchange!: any;

  constructor(protected identifier: string) {
    this.exchange = new (ccxt.pro as any)[identifier]({
      enableRateLimit: true,
    });
    this.exchange.setSandboxMode(true);
    Object.keys(this.exchange.timeframes).forEach((tf: string) =>
      config.timeframe.includes(tf)
        ? (this._timeframes[tf] = this.exchange.parseTimeframe(tf) * 1000)
        : null
    );
    this.exchange.loadMarkets().then((markets: any) => {
      for (const symbol in markets)
        if (config.market.includes(symbol))
          for (const timeframe in this._timeframes)
            (this as any)[symbol] = new OHLCVFetcher(
              this.identifier,
              symbol,
              timeframe,
              this._timeframes[timeframe]
            );
    });
  }
}

export default Exchange;
