// Dark Vega config: transparent background, page-coloured text, quiet guides
import type { Config } from 'vega';

/** A base.css token as a concrete colour: Vega draws on canvas, so var() strings fail. */
function token(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export interface Palette {
  fg1: string;
  fg2: string;
  fg3: string;
  surface: string;
  accent: string;
  grid: string;
  line: string;
}

export function palette(): Palette {
  return {
    fg1: token('--fg-1', '#e6e8ee'),
    fg2: token('--fg-2', '#a6acb8'),
    fg3: token('--fg-3', '#6b7280'),
    surface: token('--bg-surface', '#171a21'),
    accent: token('--accent', '#f59e0b'),
    grid: 'rgba(160,170,190,0.16)',
    line: 'rgba(160,170,190,0.45)',
  };
}

const FONT = 'Inter Variable, Inter, system-ui, sans-serif';

/**
 * The config every example's spec is parsed with: `vega.parse(spec, stage.config)`.
 * Vega merges it under the spec's own `config` (Config docs), so an example that sets
 * a colour itself always wins. It only replaces Vega's black-on-white defaults.
 */
export function darkConfig(): Config {
  const p = palette();
  return {
    background: null as unknown as string,
    text: { fill: p.fg1, font: FONT },
    rule: { stroke: p.fg2 },
    style: {
      'guide-label': { fill: p.fg2, font: FONT },
      'guide-title': { fill: p.fg1, font: FONT },
      'group-title': { fill: p.fg1, font: FONT },
      'group-subtitle': { fill: p.fg2, font: FONT },
      cell: { stroke: p.line },
    },
    axis: { domainColor: p.line, tickColor: p.line, gridColor: p.grid },
    legend: { symbolBaseStrokeColor: p.fg3, gradientStrokeColor: p.line },
    title: { color: p.fg1, subtitleColor: p.fg2, font: FONT, subtitleFont: FONT },
  };
}
