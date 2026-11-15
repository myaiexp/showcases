// DblClickEditText: double-click to edit; the card sends the same command
import { DblClickEditText, Infographic, Plugin, UpdateTextCommand } from '@antv/infographic';
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
type TextTarget = ConstructorParameters<typeof UpdateTextCommand>[0];

const WORDS = ['Plan', 'Plan it', 'Plan it well', 'Plan'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Double-click a label, type, then click elsewhere (or press Enter) to commit.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new DblClickEditText()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    stage.cycle(
      WORDS.map((word) => ({
        say: `UpdateTextCommand: "${word}"`,
        run: async () => {
          const api = driver.api;
          const target = api && labelsOf(api.svg)[0];
          if (!api || !target) return;
          await api.commander.execute(new UpdateTextCommand(target as TextTarget, word));
          api.commander.clear();
        },
        hold: 900,
      })),
    );
  }
  return () => stage.dispose();
};

export default mount;
