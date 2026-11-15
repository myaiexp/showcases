// ZoomWheel: Ctrl+wheel zooms at the pointer; the card zooms the viewBox in code
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

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click the drawing, then Ctrl+wheel (zoom at pointer) or Shift+wheel (zoom at centre).' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new ZoomWheel()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    let home: Box | null = null;
    // Zoom by `factor` around the centre, the way a Shift+wheel step does.
    const zoom = (scale: number, say: string) => ({
      say,
      run: async () => {
        const api = driver.api;
        if (!api) return;
        home ??= viewBoxOf(api.svg);
        const [x, y, w, h] = home;
        await setView(api, [x + (w - w * scale) / 2, y + (h - h * scale) / 2, w * scale, h * scale]);
      },
      hold: 1100,
    });
    stage.cycle([zoom(0.7, 'wheel up: zoom in'), zoom(0.4, 'wheel up: zoom in further'), zoom(1.4, 'wheel down: zoom out'), zoom(1, 'back to 1x')]);
  }
  return () => stage.dispose();
};

export default mount;
