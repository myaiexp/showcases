// Typed view of Plotly.Fx (hover, unhover): it exists at runtime, not in the types
import Plotly from 'plotly.js';
import type { PlotlyHTMLElement } from 'plotly.js';

/** A point to hover: by trace and index, or by data coordinates (Hover Events docs). */
export type HoverPoint = { curveNumber: number; pointNumber: number } | { xval: unknown; yval?: unknown };

export interface FxApi {
  /** Shows the hover label for these points, as if the reader had moved onto them. */
  hover(gd: PlotlyHTMLElement | HTMLElement, points: HoverPoint[] | HoverPoint, subplots?: string | string[]): void;
  unhover(gd: PlotlyHTMLElement | HTMLElement): void;
}

export const Fx = (Plotly as unknown as { Fx: FxApi }).Fx;
