// ClickSelect: click, Shift-click and Esc, replayed through the selection manager
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

const labelsOf = (svg: SVGSVGElement) => [...svg.querySelectorAll<SVGElement>('[data-element-type="item-label"]')];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click an element. Shift+click adds or removes. Esc clears.' });
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
    const at = (i: number) => labelsOf(driver.api?.svg as SVGSVGElement)[i] as never;
    stage.cycle([
      { say: 'click: select(["Plan"], "replace")', run: () => driver.api?.interaction.select([at(0)], 'replace'), hold: 1100 },
      { say: 'Shift+click: select(["Ship"], "add")', run: () => driver.api?.interaction.select([at(2)], 'add'), hold: 1100 },
      { say: 'Shift+click again: "remove"', run: () => driver.api?.interaction.select([at(0)], 'remove'), hold: 1100 },
      { say: 'Esc: clearSelection()', run: () => driver.api?.interaction.clearSelection(), hold: 900 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
