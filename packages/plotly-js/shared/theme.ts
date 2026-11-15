// Dark layout template: transparent paper, page-coloured text, quiet grids
import type { Template } from 'plotly.js';

/** A base.css token as a concrete colour: Plotly parses colours itself, so var() fails. */
function token(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export interface Palette {
  bg: string;
  surface: string;
  fg1: string;
  fg2: string;
  fg3: string;
  grid: string;
  line: string;
  accent: string;
  /** The template's colorway: trace colours in order. */
  colorway: string[];
}

export function palette(): Palette {
  return {
    bg: token('--bg', '#0f1115'),
    surface: token('--bg-surface', '#171a21'),
    fg1: token('--fg-1', '#e6e8ee'),
    fg2: token('--fg-2', '#a6acb8'),
    fg3: token('--fg-3', '#6b7280'),
    grid: 'rgba(160,170,190,0.14)',
    line: 'rgba(160,170,190,0.35)',
    accent: token('--accent', '#f59e0b'),
    colorway: ['#60a5fa', '#f59e0b', '#34d399', '#f472b6', '#a78bfa', '#fb7185', '#22d3ee', '#facc15', '#a3e635', '#fb923c'],
  };
}

/**
 * The layout template every example passes as `layout.template`. A template only fills
 * attributes the figure leaves unset (Layout Template Examples), so an example's own
 * colours, margins and fonts always win. Cards get tight margins and a smaller font.
 */
export function darkTemplate(preview: boolean): Template {
  const p = palette();
  const axis = {
    gridcolor: p.grid,
    linecolor: p.line,
    zerolinecolor: p.line,
    tickcolor: p.line,
    title: { standoff: 6 },
  };
  const sceneAxis = { ...axis, backgroundcolor: 'rgba(0,0,0,0)', showbackground: false, gridcolor: 'rgba(160,170,190,0.22)' };
  return {
    layout: {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: { color: p.fg1, family: 'Inter Variable, Inter, system-ui, sans-serif', size: preview ? 10 : 12 },
      colorway: p.colorway,
      margin: preview ? { l: 34, r: 12, t: 14, b: 26, pad: 0 } : { l: 64, r: 28, t: 56, b: 56 },
      title: { font: { size: preview ? 11 : 16 } },
      xaxis: axis,
      yaxis: axis,
      polar: { bgcolor: 'rgba(0,0,0,0)', radialaxis: axis, angularaxis: axis },
      ternary: { bgcolor: 'rgba(0,0,0,0)', aaxis: axis, baxis: axis, caxis: axis },
      smith: { bgcolor: 'rgba(0,0,0,0)', realaxis: axis, imaginaryaxis: axis },
      scene: { xaxis: sceneAxis, yaxis: sceneAxis, zaxis: sceneAxis },
      geo: {
        bgcolor: 'rgba(0,0,0,0)',
        landcolor: '#2a2f3a',
        lakecolor: '#0f1115',
        oceancolor: '#12161e',
        subunitcolor: '#4b5263',
        countrycolor: '#4b5263',
        coastlinecolor: '#4b5263',
        framecolor: '#4b5263',
      },
      legend: { bgcolor: 'rgba(0,0,0,0)', font: { color: p.fg2 } },
      hoverlabel: { bgcolor: p.surface, bordercolor: p.line, font: { color: p.fg1 } },
      coloraxis: { colorbar: { outlinewidth: 0, tickcolor: p.line } },
      annotationdefaults: { arrowcolor: p.fg2, font: { color: p.fg1 } },
      shapedefaults: { line: { color: p.accent } },
      updatemenudefaults: { bgcolor: p.surface, bordercolor: p.line, font: { color: p.fg1 } },
      sliderdefaults: { bgcolor: p.surface, bordercolor: p.line, activebgcolor: p.accent, font: { color: p.fg2 } },
    },
    data: {
      table: [
        {
          header: { fill: { color: '#232835' }, line: { color: p.line }, font: { color: p.fg1 } },
          cells: { fill: { color: p.surface }, line: { color: p.line }, font: { color: p.fg1 } },
        },
      ],
      parcoords: [{ labelfont: { color: p.fg1 }, tickfont: { color: p.fg2 }, rangefont: { color: p.fg3 } }],
    },
  } as Template;
}
