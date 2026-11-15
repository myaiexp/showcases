// Types for the vega 6.4 runtime functions its .d.ts leaves out
import * as vega from 'vega';

export interface Dist {
  sample(): number;
  pdf(v: number): number;
  cdf(v: number): number;
  icdf(p: number): number;
}
export interface KDE extends Dist {
  bandwidth(v?: number): number;
}
export interface Fit {
  coef: number[];
  predict(x: number): number;
  rSquared: number;
}
export interface Locale {
  format(spec: string): (v: number) => string;
  timeFormat(spec?: string | Record<string, string>): (d: Date | number) => string;
  utcFormat(spec?: string | Record<string, string>): (d: Date | number) => string;
}
export interface Interval {
  floor(d: Date): Date;
  ceil(d: Date): Date;
  offset(d: Date, step?: number): Date;
}
type Rows<T> = readonly T[];
type When = Date | number;

export interface VegaApi {
  bandwidthNRD(values: Rows<number>): number;
  bin(o: { extent: [number, number]; maxbins?: number; base?: number; step?: number; steps?: number[]; minstep?: number; divide?: number[]; nice?: boolean; span?: number }): { start: number; stop: number; step: number };
  bootstrapCI(values: Rows<number>, samples: number, alpha: number): [number, number];
  cumulativeNormal(v: number, mean?: number, sd?: number): number;
  densityNormal(v: number, mean?: number, sd?: number): number;
  quantileNormal(p: number, mean?: number, sd?: number): number;
  sampleNormal(mean?: number, sd?: number): number;
  dotbin(sorted: Rows<number>, step: number, smooth?: boolean): ArrayLike<number>;
  quantiles(values: Rows<number>, p: number[]): number[];
  quartiles(values: Rows<number>): number[];
  randomKDE(values: Rows<number>, bandwidth?: number): KDE;
  randomLogNormal(mean?: number, sd?: number): Dist;
  randomMixture(dists: Dist[], weights?: number[]): Dist;
  randomNormal(mean?: number, sd?: number): Dist;
  randomUniform(min?: number, max?: number): Dist;
  regressionLinear<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number): Fit;
  regressionLog<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number): Fit;
  regressionExp<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number): Fit;
  regressionPow<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number): Fit;
  regressionQuad<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number): Fit;
  regressionPoly<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number, order: number): Fit;
  regressionLoess<T>(data: Rows<T>, x: (d: T) => number, y: (d: T) => number, bandwidth: number): [number, number][];
  sampleCurve(f: (x: number) => number, extent: [number, number], minSteps?: number, maxSteps?: number): [number, number][];
  dayofyear(d: When): number;
  week(d: When): number;
  isoweek(d: When): number;
  utcweek(d: When): number;
  utcisoweek(d: When): number;
  timeBin(o: { extent: [When, When]; maxbins?: number }): { units: string[]; step: number };
  timeFloor(units: string[], step?: number): (d: When) => Date;
  utcFloor(units: string[], step?: number): (d: When) => Date;
  timeInterval(unit: string): Interval;
  timeOffset(unit: string, d: When, step?: number): Date;
  timeSequence(unit: string, start: When, stop: When, step?: number): Date[];
  utcSequence(unit: string, start: When, stop: When, step?: number): Date[];
  timeUnits(units: string[]): string[];
  timeUnitSpecifier(units: string[], specifiers?: Record<string, string | null>): string;
  defaultLocale(): Locale;
  resetDefaultLocale(): Locale;
  locale(numberDef: object | null, timeDef: object | null): Locale;
  formatLocale(def: object): unknown;
  timeFormatLocale(def: object): unknown;
  formats(name: string, parser?: (data: unknown, options: { sep?: string; scale?: number }) => unknown[]): unknown;
  projection(name: string, ctor?: () => unknown): () => { rotate(a: number[]): { clipAngle(a: number): unknown } };
  scale(type: string, ctor?: () => unknown, metadata?: string | string[]): () => { exponent(e: number): unknown };
}

/** The vega module with the runtime functions its type definitions omit. */
export const api = vega as unknown as VegaApi;
