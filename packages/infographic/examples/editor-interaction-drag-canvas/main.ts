// DragCanvas: hold Space and drag to pan; the card shifts the viewBox in code
import { DragCanvas, Infographic, Plugin, UpdateOptionsCommand } from '@antv/infographic';
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
  const stage = await createStage(el, ctx, { hint: 'Hold Space, then drag the drawing.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new DragCanvas()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    let home: Box | null = null;
    const pan = (fx: number, fy: number, say: string) => ({
      say,
      run: async () => {
        const api = driver.api;
        if (!api) return;
        home ??= viewBoxOf(api.svg);
        const [x, y, w, h] = home;
        await setView(api, [x + w * fx, y + h * fy, w, h]);
      },
      hold: 1100,
    });
    stage.cycle([
      pan(0.25, 0, 'drag left: viewBox x grows'),
      pan(0.25, 0.3, 'drag up: viewBox y grows'),
      pan(-0.2, 0, 'drag right'),
      pan(0, 0, 'back to the origin'),
    ]);
  }
  return () => stage.dispose();
};

export default mount;
