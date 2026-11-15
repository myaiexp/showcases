// DragCanvas({ trigger }): pick which key held down turns a drag into a pan
import { DragCanvas, Infographic, Plugin, UpdateOptionsCommand } from '@antv/infographic';
import type { ICommandManager, IInteractionManager, KeyCode, PluginInitOptions } from '@antv/infographic';
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

const TRIGGERS: Record<string, KeyCode[]> = {
  "['Space'] (default)": ['Space'],
  "['KeyG']": ['KeyG'],
  "['AltLeft', 'AltRight']": ['AltLeft', 'AltRight'],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Hold the chosen key and drag. Other keys do nothing.' });
  const driver = new Driver();
  let infographic: Infographic | null = null;

  const build = (name: string) => {
    infographic?.destroy();
    infographic = stage.own(
      new Infographic({
        container: stage.box,
        width: '100%',
        height: '100%',
        padding: ctx.preview ? 8 : 24,
        editable: true,
        plugins: [driver],
        interactions: [new DragCanvas({ trigger: TRIGGERS[name] ?? ['Space'] })],
      }),
    );
    infographic.render(SYNTAX);
  };
  const names = Object.keys(TRIGGERS);
  build(names[0] as string);

  if (ctx.preview) {
    stage.cycle(
      names.map((name, i) => ({
        say: `DragCanvas({ trigger: ${name} })`,
        run: async () => {
          build(name);
          const api = driver.api;
          if (!api) return;
          await stage.wait(400);
          const [x, y, w, h] = viewBoxOf(api.svg);
          await setView(api, [x + w * (0.1 + i * 0.1), y, w, h]);
        },
        hold: 1500,
      })),
    );
  } else {
    stage.select('trigger', names, names[0] as string, build);
  }
  return () => stage.dispose();
};

export default mount;
