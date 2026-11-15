// ZoomWheel({ minViewBoxSize, maxViewBoxSize }): zooming stops at the limits
import { Infographic, Plugin, UpdateOptionsCommand, ZoomWheel } from '@antv/infographic';
import type { ICommandManager, IInteractionManager, PluginInitOptions } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

/** Hands the editor's managers to the example: a plugin receives them in init(). */
class Driver extends Plugin {
  name = 'showcase-driver';
  api?: Api;
  override init(options: PluginInitOptions) {
    super.init(options);
    this.api = { commander: this.commander, interaction: this.editor.interaction, svg: this.editor.getDocument() };
  }
  destroy() {}
}

interface Api {
  commander: ICommandManager;
  interaction: IInteractionManager;
  svg: SVGSVGElement;
}

const SYNTAX = `
infographic list-row-simple-horizontal-arrow
theme dark
data
  lists
    - label Plan
      desc Scope the work
      icon list-check
    - label Build
      desc Write the code
      icon hammer
    - label Ship
      desc Release it
      icon rocket`;

type Box = [number, number, number, number];
const viewBoxOf = (svg: SVGSVGElement): Box => (svg.getAttribute('viewBox') ?? '0 0 1 1').split(/[\s,]+/).map(Number) as Box;

/** The command the editor itself issues when the canvas pans or zooms. */
const setView = (api: Api, [x, y, w, h]: Box) =>
  api.commander.execute(
    new UpdateOptionsCommand({ viewBox: `${x} ${y} ${w} ${h}` }, { viewBox: api.svg.getAttribute('viewBox') ?? '' }),
  );

const RANGES: Record<string, { minViewBoxSize: number; maxViewBoxSize: number }> = {
  'default (20 to 20000)': { minViewBoxSize: 20, maxViewBoxSize: 20000 },
  'tight (200 to 700)': { minViewBoxSize: 200, maxViewBoxSize: 700 },
  'wide in only (100 to 1200)': { minViewBoxSize: 100, maxViewBoxSize: 1200 },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click the drawing and Ctrl+wheel: the zoom stops at the limits.' });
  const readout = stage.side('viewBox');
  let driver = new Driver();
  let infographic: Infographic | null = null;
  let limits = RANGES['default (20 to 20000)'] as { minViewBoxSize: number; maxViewBoxSize: number };

  const show = () => {
    const svg = driver.api?.svg;
    if (readout && svg) readout.textContent = `viewBox: ${svg.getAttribute('viewBox')}\nwidth: ${Math.round(viewBoxOf(svg)[2])}\n\nZoomWheel(${JSON.stringify(limits, null, 1)})`;
  };
  const build = (name: string) => {
    infographic?.destroy();
    limits = RANGES[name] ?? limits;
    driver = new Driver();
    infographic = stage.own(
      new Infographic({
        container: stage.box,
        width: '100%',
        height: '100%',
        padding: ctx.preview ? 8 : 24,
        editable: true,
        plugins: [driver],
        interactions: [new ZoomWheel(limits)],
      }),
    );
    infographic.on('rendered', () => stage.after(0, show));
    infographic.on('history:change', show);
    infographic.render(SYNTAX);
  };
  build('tight (200 to 700)');

  if (ctx.preview) {
    let home: Box | null = null;
    // The same range test ZoomWheel applies to each wheel step (a step scales by 1.1).
    const step = (factor: number) => async () => {
      const api = driver.api;
      if (!api) return;
      home ??= viewBoxOf(api.svg);
      const [x, y, w, h] = viewBoxOf(api.svg);
      const [nw, nh] = [w * factor, h * factor];
      const ok = nw > limits.minViewBoxSize && nw < limits.maxViewBoxSize && nh > limits.minViewBoxSize && nh < limits.maxViewBoxSize;
      if (ok) await setView(api, [x + (w - nw) / 2, y + (h - nh) / 2, nw, nh]);
      stage.say(ok ? `viewBox width ${Math.round(nw)}` : `limit reached at width ${Math.round(w)}: no zoom`, ok ? 'info' : 'warn');
    };
    const steps = [0.7, 0.7, 0.7, 1.4, 1.4, 1.4, 1.4].map((f) => ({ run: step(f), hold: 900 }));
    stage.cycle([...steps, { run: async () => { if (home && driver.api) await setView(driver.api, home); }, hold: 600 }]);
  } else {
    stage.select('Limits', Object.keys(RANGES), 'tight (200 to 700)', build);
  }
  return () => stage.dispose();
};

export default mount;
