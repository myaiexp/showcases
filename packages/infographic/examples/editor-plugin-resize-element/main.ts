// ResizeElement: handles around the selected text, moved from label to label
import { ClickSelect, Infographic, Plugin, ResizeElement } from '@antv/infographic';
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
  const stage = await createStage(el, ctx, { hint: 'Click a label, then drag a handle to change the width of its text box.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [new ResizeElement(), driver],
      interactions: [new ClickSelect()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    stage.cycle(
      ['Plan', 'Build', 'Ship'].map((name, i) => ({
        say: `ResizeElement: handles on the "${name}" label`,
        run: () => {
          const target = driver.api && labelsOf(driver.api.svg)[i];
          if (target) driver.api?.interaction.select([target as never], 'replace');
        },
        hold: 1300,
      })),
    );
  }
  return () => stage.dispose();
};

export default mount;
