// ResetViewBox: pan and zoom the view, then restore it to where it started
import { DragCanvas, Infographic, Plugin, ResetViewBox, UpdateOptionsCommand, ZoomWheel } from '@antv/infographic';
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

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Ctrl+wheel to zoom, hold Space and drag to pan, then use the reset button that appears.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [new ResetViewBox(), driver],
      interactions: [new DragCanvas(), new ZoomWheel()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    let home: Box | null = null;
    stage.cycle([
      {
        say: 'zoom in: the view moves off its origin',
        run: async () => {
          const api = driver.api;
          if (!api) return;
          home ??= viewBoxOf(api.svg);
          const [x, y, w, h] = home;
          await setView(api, [x + w * 0.1, y + h * 0.15, w * 0.5, h * 0.5]);
        },
      },
      {
        say: 'pan to the right',
        run: async () => {
          const api = driver.api;
          if (!api || !home) return;
          const [x, y, w, h] = viewBoxOf(api.svg);
          await setView(api, [x + w * 0.4, y, w, h]);
        },
      },
      {
        say: 'ResetViewBox: back to the original view',
        run: async () => {
          const api = driver.api;
          if (api && home) await setView(api, home);
        },
      },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
