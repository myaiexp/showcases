// Shared Chart.js stage: a sized canvas box, a release, card timers, trap list
import type { Chart as ChartType } from 'chart.js';
import type { MountContext } from '@/types.ts';
import { Chart } from './setup.ts';

export { Chart };
export { INK, GRID } from './setup.ts';

/**
 * Chart.js 4.6 traps found while building this gallery, for whoever adds the next example:
 * - Registration and Chart.defaults are page-wide and setup.ts sets them once: every
 *   component registered, light text and grid colours. An example that changes
 *   Chart.defaults, Chart.overrides or registers/unregisters a plugin restores it on
 *   cleanup, or the next card inherits it. Prefer an inline plugin (config.plugins) to
 *   Chart.register for a plugin only one example uses.
 * - responsive.md: the canvas needs a parent that is relatively positioned and holds only
 *   the canvas. createStage builds that box with a fixed height, so examples pass
 *   maintainAspectRatio: false or the chart keeps its own aspect ratio and leaves a gap.
 * - A card has no pointer: hover and tooltip examples drive chart.setActiveElements and
 *   chart.tooltip.setActiveElements on a timer (shared/hover.ts) instead.
 * - The time and timeseries scales use shared/date-adapter.ts: UTC timestamps, its own
 *   format tokens (listed in that file), no locale.
 * - chart.destroy() leaves the canvas in the DOM; stage.release(chart) destroys and
 *   removes the box. Destroy before release when a mount built several charts.
 * - Bubble `r` is in pixels and is added to the layout padding: a radius near the card's
 *   height collapses the axes to one tick without an error. `radius` applies only to a
 *   point with no `r`.
 * - A doughnut's first dataset is its outer ring. animateRotate/animateScale play only
 *   when a chart is created: a replay destroys and rebuilds it.
 * - startAngle, grid.circular, beginAtZero and ticks.stepSize are missing from the union
 *   type of options.scales.r: cast it to RadialLinearScaleOptions.
 * - A mixed chart with no chart-level type rejects line-only keys (tension) on a dataset
 *   and types scatter `data.push` as never: cast to ChartDataset<'line'> or the point type.
 * - A card's monospace caption holds about 34 characters; use previewHeight 160 for two lines.
 * - spanGaps as a number never bridges nulls: it only breaks the line where neighbouring
 *   points sit further apart than that. On null data it acts like false.
 * - skipNull is typed on the chart options, not the bar dataset; hoverBorderRadius works
 *   but is missing from the dataset type (narrow cast).
 * - Changing indexAxis on a live chart is unsafe: destroy and rebuild.
 * - update() re-merges options.scales into new objects (initOptions → mergeScaleConfig), so
 *   a `chart.options.scales.x` reference cached before it writes to a stale copy after it.
 *   Re-read scale options in every handler. Plugin options are not re-merged.
 * - To reset a scale option to its default, assign undefined through Partial<…Options>.
 *   To change a scale's type, replace the whole scale object and update().
 * - tick.major reaches scriptable tick options only with ticks.major.enabled. On a time
 *   axis, month starts become major ticks with unit 'day' (week is not a "common" unit).
 * - ticks.callback may return null to drop a tick and its grid line.
 * - Replacing chart.options.interaction leaves options.hover on the old object: assign
 *   its keys in place. options.events can change live; update() rebinds the listeners.
 * - A scriptable animation.delay also runs for non-data contexts: guard c.type === 'data'.
 *   chart.reset() then update() replays the entry animation without a rebuild.
 * - Tooltip.positioners, Interaction.modes, custom controllers and scales need module
 *   augmentation (TooltipPositionerMap, InteractionModeMap, ChartTypeRegistry) to type-check.
 * - Cards fake a pointer with config-data.ts ghostCursor(): non-bubbling events on the
 *   canvas. A bubbling click would reach the card's <a> and open the example.
 * - A card legend with 3+ entries wraps at 260px: boxWidth ~20 and font size 10 there.
 * - The Colors plugin stands aside when Chart.defaults colours differ from stock, which
 *   setup.ts does: use plugins.colors.forceOverride. It writes colours into the datasets.
 * - Decimation reads only the chart-level options.parsing (false) and needs a linear or
 *   time x scale; a dataset-level parsing: false leaves it silently off.
 * - Fonts resolve from Chart.defaults.font on every update and there is no per-chart
 *   options.font: set fonts on the chart's own elements in cards.
 * - devicePixelRatio applies after resize(); resizeDelay only at construction.
 * - Typed custom plugin options: cast options.plugins to
 *   NonNullable<ChartOptions['plugins']> & {…}.
 * - Scriptable and segment functions that read a closure variable need chart.update()
 *   after it changes.
 */
export interface Stage {
  /** The relatively positioned box that holds only the canvas (responsive.md). */
  box: HTMLDivElement;
  canvas: HTMLCanvasElement;
  /** Destroys the chart(s) and removes the box. */
  release(...charts: (ChartType | null | undefined)[]): void;
}

export interface StageOptions {
  /** Box height in the full view, CSS pixels. */
  height?: number;
  /** Box height in a card; 200 fills it. Smaller when something else shares the card. */
  previewHeight?: number;
  /** Where the box goes; defaults to the mount element. */
  parent?: HTMLElement;
}

export function createStage(el: HTMLElement, { preview }: MountContext, options: StageOptions = {}): Stage {
  const box = document.createElement('div');
  box.style.position = 'relative';
  box.style.width = '100%';
  box.style.minWidth = '0';
  box.style.height = `${preview ? (options.previewHeight ?? 200) : (options.height ?? 380)}px`;
  const canvas = document.createElement('canvas');
  box.append(canvas);
  (options.parent ?? el).append(box);
  return {
    box,
    canvas,
    release(...charts) {
      for (const c of charts) c?.destroy();
      box.remove();
    },
  };
}

/** Runs `tick` every `ms` until the returned stop function is called. */
export function every(ms: number, tick: () => void): () => void {
  const id = window.setInterval(tick, ms);
  return () => window.clearInterval(id);
}

/**
 * Card helper: steps through `states` every `ms`, calling `apply` with each in turn
 * (starting with the second; the chart is built with the first). Returns a stop function.
 */
export function cycle<T>(states: readonly T[], ms: number, apply: (state: T, index: number) => void): () => void {
  let i = 0;
  return every(ms, () => {
    i = (i + 1) % states.length;
    apply(states[i] as T, i);
  });
}

/** A caption line under the chart (both views), e.g. the state a card is showing. */
export function caption(el: HTMLElement, text = ''): HTMLDivElement {
  const div = document.createElement('div');
  div.style.font = '12px ui-monospace, monospace';
  div.style.color = 'var(--fg-2)';
  div.style.padding = '4px 0 0';
  div.style.textAlign = 'center';
  div.style.width = '100%';
  div.textContent = text;
  el.append(div);
  return div;
}
