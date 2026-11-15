// BrushSelect: drag a box on empty canvas to select; the card adds labels in turn
import { BrushSelect, Infographic, Plugin, SelectHighlight } from '@antv/infographic';
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

const labelsOf = (svg: SVGSVGElement) => [...svg.querySelectorAll<SVGElement>('[data-element-type="item-label"]')];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Drag a rectangle over the labels from an empty spot. Hold Shift to add to the selection.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new BrushSelect(), new SelectHighlight()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    const pick = (count: number) => () => {
      const api = driver.api;
      if (!api) return;
      if (count === 0) api.interaction.clearSelection();
      else api.interaction.select(labelsOf(api.svg).slice(0, count) as never[], 'replace');
    };
    stage.cycle([
      { say: 'brush over one label', run: pick(1), hold: 1100 },
      { say: 'a wider box: two labels', run: pick(2), hold: 1100 },
      { say: 'all three labels', run: pick(3), hold: 1100 },
      { say: 'click empty canvas: cleared', run: pick(0), hold: 900 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
