// SelectHighlight: outlines around the selection; the card selects different parts
import { ClickSelect, Infographic, Plugin, SelectHighlight } from '@antv/infographic';
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

const parts = (svg: SVGSVGElement, type: string) => [...svg.querySelectorAll<SVGElement>(`[data-element-type="${type}"]`)];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click a label, an icon or a shape; Shift+click adds to the selection.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new ClickSelect(), new SelectHighlight()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    const pick = (say: string, types: [string, number][]) => ({
      say,
      run: () => {
        const api = driver.api;
        if (!api) return;
        const found = types.flatMap(([t, i]) => parts(api.svg, t)[i] ?? []);
        api.interaction.select(found as never[], 'replace');
      },
      hold: 1300,
    });
    stage.cycle([
      pick('one label', [['item-label', 0]]),
      pick('a description', [['item-desc', 1]]),
      pick('two labels: one box around both', [['item-label', 0], ['item-label', 2]]),
      pick('a label and a description', [['item-label', 1], ['item-desc', 1]]),
    ]);
  }
  return () => stage.dispose();
};

export default mount;
