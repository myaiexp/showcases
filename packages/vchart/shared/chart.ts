// Shared VChart setup: sized container, dark theme, release, control inputs
import VChart from '@visactor/vchart';
import type { IInitOption, ISpec, IVChart } from '@visactor/vchart';
import type { MountContext } from '@/types.ts';

export { VChart };
export type { ISpec, IVChart };

/**
 * VChart's built-in 'dark' theme with a transparent background, so charts sit on the
 * page's surface. A registered theme whose `type` is 'dark' is merged onto the built-in
 * dark theme (theme.md § registerTheme). Examples about themes pass their own.
 */
export const THEME = 'showcase-dark';
VChart.ThemeManager.registerTheme(THEME, { name: THEME, type: 'dark', background: 'transparent' });

export interface ChartOptions {
  /** Container height in the full view, in CSS pixels. */
  height?: number;
  /** Container height in a preview card; 200 fills the card. Smaller when charts share it. */
  previewHeight?: number;
  /** Extra constructor options (animation, options3d, mode …); `theme` overrides THEME. */
  init?: Omit<IInitOption, 'dom'>;
  /** Where the container goes; defaults to the mount element. */
  parent?: HTMLElement;
}

export interface Chart {
  vchart: VChart;
  container: HTMLDivElement;
  release(): void;
}

/**
 * VChart 2.2 traps found while building this gallery, for whoever adds the next example:
 * - new VChart() reads the container's size: give it a width and height before the
 *   constructor runs. autoFit (default true) then follows container resizes itself.
 * - Calling a method on a released instance throws; timers must stop before release().
 * - updateSpec rebuilds component instances: look a component up on each tick, never cache it.
 * - updateSpec merges into the old spec, so a key you drop can linger; release and rebuild
 *   the chart when a control removes keys.
 * - The constructor clones the spec: mutating it before renderSync does nothing.
 * - A DataSet gets the 'dataview' parser only once a VChart is constructed on it.
 * - DataView.updateRawData with a CSV string breaks the chart; parseNewData(csv, { type: 'csv' }) works.
 * - axes.breaks must be an array; an object (the option docs allow one) is ignored.
 * - A time axis needs numeric timestamps, and timeFormat/tickStep work only inside `layers`.
 * - The filter/fold transforms read options.callback, not the guide's option.callBack.
 * - `common` chart series with data: { fromDataId } do not type-check against ISpec.
 * - rangeColumn label.minLabel/maxLabel exist only with label.position 'bothEnd', and their
 *   text takes the bar colour: give them a style.fill.
 * - Waterfall stackLabel text is dark even on the dark theme; set stackLabel.style.fill.
 * - The histogram `bin` transform works but is missing from the transform types (cast the spec).
 * - inverse on an untyped left axis does not reverse a horizontal bar chart; sort the data.
 * - The default import does not register the liquid chart: call registerLiquidChart() first.
 * - tickMask is hidden by the theme; it needs tickMask.visible: true.
 * - A gauge segment's value is its end position: draw the longest band first, no stack.
 * - A gaugePointer series needs radiusField, and a gauge's radius axis must stay a band
 *   axis (a linear one throws "step is not a function").
 * - A pie indicator with trigger 'select' does not follow setSelected.
 * - mosaic needs registerMosaicChart(); sequence needs registerSequenceChart({ VChart })
 *   from @visactor/vchart-extension.
 * - A sequence dot series without subTitle.style, or a dataZoom with start 0 and end 1,
 *   leaves the chart blank with no error. Dot rows have a fixed ~28px pitch.
 * - Sankey nodeSortBy/linkSortBy receive node and link objects, not data fields.
 * - Treemap nonLeafLabel text is dark by default; set style.fill.
 * - Series drillDown(path) and drillUp() work from code once drill and drillField are set.
 * - registerPictogramChart and VChart.registerSVG come from @visactor/vchart-extension in
 *   2.2, not the main package. Unnamed pictogram elements take color.specified's
 *   `undefined` key; a linear fill scale needs changeDomain: 'replace' and no domain.
 * - A map series without seriesField paints every region one colour; registerMap's
 *   `rewind` showed no visible effect.
 * - Once a 3D chart is registered (shared/chart3d.ts), the 3D plugin treats every chart
 *   on the page as 3D and sets a camera; 2D charts checked afterwards still drew normally.
 *   getStage().set3dOptions() replaces the whole option object: resend center each time.
 * - animationAppear plays once per chart; replaying it needs a release and a rebuild.
 * - A custom animation's onUpdate `out` argument is ignored in VRender 1.1.15 (custom_animation.md
 *   writes to it); set attributes on this.target, and animate a bar's height with y and y1.
 * - A custom layout function gets every layout item, axes and legends included: filter
 *   layoutType 'region'. updateLayoutAttribute (custom_layout.md) is missing from the types.
 * - Custom mark style callbacks draw in canvas pixels; series.valueToPosition is relative to
 *   the region and returns a band's start.
 * - Palette tokens ({ type: 'palette', key }) resolve only inside a theme, not in the spec.
 * - With a constructor `theme`, instance setCurrentTheme still merges it on top: build with
 *   init.theme undefined to switch themes on an instance.
 * - registerMediaQuery() is not in the full import; media actions add components with
 *   forceAppend: true.
 * - A formatMethod named after an unregistered function throws; instance-registered
 *   functions and 'initialized'/'rendered' listeners must exist before renderSync, so those
 *   examples construct the VChart themselves instead of calling createChart.
 * - An event query { id } matches the spec id, not the model id.
 * - Candlestick fill is boxFill and the default doji is black; the series does not feed
 *   the value axis its high/low, so give the axis min/max when adding a line.
 * - updateModelSpec on an axis throws without forceMerge (third argument true).
 * - Timeline icons are hidden by default and events are spaced by order, not by time.
 * - A storyline title is dark with a white stroke by default; restyle it for dark pages.
 * - A hand-made GeoJSON polygon must wind clockwise for registerMap; getMap returns a DataView.
 * - 'rendered' does not fire on updateData; 'layoutEnd' does (re-pin overlays there).
 * - Scrollbar.md's `roam: true` is not in IScrollBarSpec; use roamDrag, roamZoom or roamScroll.
 * - `stateDef` (Legend.md) is missing from the ISpec types, so that spec needs a cast.
 * - tooltip.renderMode 'canvas' draws nothing with the full import; the default HTML
 *   tooltip is appended to document.body.
 * - setDimensionIndex shows the tooltip but no polar crosshair (radar angle axis).
 * - Preview cards have no pointer input. Pointer events dispatched on the canvas draw
 *   brushes, but a synthetic pointermove does not hover; drive hover state through the API.
 * - A dataZoom or scrollBar window moves from code through
 *   getChart().getComponentsByKey('dataZoom')[0].setStartAndEnd(a, b) (package types only).
 *
 * What Getting_Started.md describes: a container with a size, `new VChart(spec, { dom })`,
 * then renderSync(). release() destroys the instance (api/vchart.md § Release).
 */
export function createChart(el: HTMLElement, { preview }: MountContext, spec: ISpec, options: ChartOptions = {}): Chart {
  const container = document.createElement('div');
  container.style.width = '100%';
  container.style.height = `${preview ? (options.previewHeight ?? 200) : (options.height ?? 420)}px`;
  (options.parent ?? el).append(container);

  const vchart = new VChart(spec, { theme: THEME, ...options.init, dom: container });
  vchart.renderSync();
  let released = false;
  return {
    vchart,
    container,
    release() {
      if (released) return;
      released = true;
      vchart.release();
      container.remove();
    },
  };
}

/** A row for an example's controls, placed above the chart. Not used in previews. */
export function controlBar(el: HTMLElement): HTMLDivElement {
  const bar = document.createElement('div');
  bar.style.display = 'flex';
  bar.style.flexWrap = 'wrap';
  bar.style.gap = '8px';
  bar.style.alignItems = 'center';
  bar.style.width = '100%';
  bar.style.padding = '8px 0';
  bar.style.fontSize = '13px';
  el.append(bar);
  return bar;
}

export function button(bar: HTMLElement, label: string, onClick: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.textContent = label;
  b.addEventListener('click', onClick);
  bar.append(b);
  return b;
}

export function select(bar: HTMLElement, label: string, values: readonly string[], onChange: (v: string) => void): HTMLSelectElement {
  const wrap = document.createElement('label');
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  const sel = document.createElement('select');
  for (const v of values) sel.add(new Option(v, v));
  sel.addEventListener('change', () => onChange(sel.value));
  wrap.append(label, sel);
  bar.append(wrap);
  return sel;
}

export function slider(
  bar: HTMLElement,
  label: string,
  [min, max, step]: readonly [number, number, number],
  value: number,
  onInput: (v: number) => void,
): HTMLInputElement {
  const wrap = document.createElement('label');
  wrap.style.display = 'flex';
  wrap.style.gap = '6px';
  wrap.style.alignItems = 'center';
  const text = document.createElement('span');
  const input = document.createElement('input');
  input.type = 'range';
  input.min = String(min);
  input.max = String(max);
  input.step = String(step);
  input.value = String(value);
  const show = (): void => {
    text.textContent = `${label} ${input.value}`;
  };
  input.addEventListener('input', () => {
    show();
    onInput(Number(input.value));
  });
  show();
  wrap.append(text, input);
  bar.append(wrap);
  return input;
}

/** A small text readout under the chart, for event logs and getter results. */
export function readout(el: HTMLElement): HTMLPreElement {
  const pre = document.createElement('pre');
  pre.style.cssText = 'margin:8px 0 0;font-size:12px;white-space:pre-wrap;width:100%';
  el.append(pre);
  return pre;
}

/** Runs `tick` every `ms` until the returned stop function is called. */
export function every(ms: number, tick: () => void): () => void {
  const id = window.setInterval(tick, ms);
  return () => window.clearInterval(id);
}
