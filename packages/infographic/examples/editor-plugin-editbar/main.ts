// EditBar: the floating toolbar; the card applies the changes its controls make
import { ClickSelect, EditBar, Infographic, Plugin, SelectHighlight, UpdateElementCommand } from '@antv/infographic';
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
type Target = ConstructorParameters<typeof UpdateElementCommand>[0];

const STYLES = [
  { fill: '#F6BD16', 'font-size': 26 },
  { fill: '#61DDAA', 'font-size': 20 },
  { fill: '#F08BB4', 'font-size': 30 },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click a label or an icon: the bar offers colour, size, alignment and font.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      // getContainer keeps the bar inside the box (by default it goes on the page), so a card can show it too.
      plugins: [new EditBar({ getContainer: () => stage.box }), driver],
      interactions: [new ClickSelect(), new SelectHighlight()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    stage.cycle(
      STYLES.map((attributes, i) => ({
        say: `EditBar: font colour ${attributes.fill}, size ${attributes['font-size']}`,
        run: async () => {
          const api = driver.api;
          const target = api && labelsOf(api.svg)[i % 3];
          if (!api || !target) return;
          api.interaction.select([target as never], 'replace');
          await api.commander.execute(new UpdateElementCommand(target as Target, { attributes }));
        },
      })),
    );
  }
  return () => stage.dispose();
};

export default mount;
