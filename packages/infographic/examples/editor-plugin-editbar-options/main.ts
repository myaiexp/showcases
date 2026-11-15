// EditBar's style, className and getContainer options restyle and re-home the bar
import { ClickSelect, EditBar, Infographic, Plugin, SelectHighlight } from '@antv/infographic';
import type { EditBarOptions, ICommandManager, IInteractionManager, PluginInitOptions } from '@antv/infographic';
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

const LOOKS: Record<string, Pick<EditBarOptions, 'style' | 'className'>> = {
  default: {},
  'amber pill': { style: { background: '#2a1d05', border: '1px solid #F6BD16', borderRadius: '999px', padding: '4px 12px' } },
  'square mint': { style: { background: '#06251b', border: '2px solid #61DDAA', borderRadius: '0' }, className: 'showcase-editbar' },
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click a label, then look at the bar. getContainer points at the box, so it never leaves it.' });
  let infographic: Infographic | null = null;
  let driver = new Driver();

  const build = (look: string) => {
    infographic?.destroy();
    driver = new Driver();
    infographic = stage.own(
      new Infographic({
        container: stage.box,
        width: '100%',
        height: '100%',
        padding: ctx.preview ? 8 : 24,
        editable: true,
        // getContainer: where the bar is appended (default: the page body).
        plugins: [new EditBar({ ...LOOKS[look], getContainer: () => stage.box }), driver],
        interactions: [new ClickSelect(), new SelectHighlight()],
      }),
    );
    infographic.render(SYNTAX);
    stage.say(`EditBar({ style, className, getContainer }): ${look}`);
  };

  const names = Object.keys(LOOKS);
  build('default');
  if (ctx.preview) {
    stage.cycle(
      names.map((look) => ({
        run: async () => {
          build(look);
          await stage.wait(300);
          const target = driver.api && labelsOf(driver.api.svg)[1];
          if (target) driver.api?.interaction.select([target as never], 'replace');
        },
      })),
    );
  } else {
    stage.select('Look', names, 'default', build);
  }
  return () => stage.dispose();
};

export default mount;
