// Giving plugins or interactions replaces the defaults: four setups compared
import { ClickSelect, Infographic, Plugin, SelectHighlight } from '@antv/infographic';
import type { IInteraction, IPlugin, PluginInitOptions } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

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

/** Gives the example the editor's selection manager (a plugin receives it in init). */
class Picker extends Plugin {
  name = 'showcase-picker';
  svg?: SVGSVGElement;
  pick?: (el: SVGElement) => void;
  override init(options: PluginInitOptions) {
    super.init(options);
    this.svg = this.editor.getDocument();
    this.pick = (el) => this.editor.interaction.select([el as never], 'replace');
  }
  destroy() {}
}

interface Setup {
  name: string;
  interactions?: () => IInteraction[];
  plugins?: () => IPlugin[];
}

const SETUPS: Setup[] = [
  { name: 'defaults (no plugins or interactions given)' },
  { name: 'interactions: [ClickSelect]', interactions: () => [new ClickSelect()] },
  { name: 'interactions: [ClickSelect, SelectHighlight]', interactions: () => [new ClickSelect(), new SelectHighlight()] },
  { name: 'interactions: []', interactions: () => [] },
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click a label under each setup: only installed interactions respond.' });
  const side = stage.side('Installed');
  let current: Infographic | null = null;
  let picker: Picker | null = null;

  const build = (setup: Setup) => {
    current?.destroy();
    picker = new Picker();
    const interactions = setup.interactions?.();
    current = new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      // A card draws no EditBar: its toolbar is a page overlay, so cards only use these.
      plugins: [picker, ...(setup.plugins?.() ?? [])],
      ...(interactions ? { interactions } : {}),
    });
    stage.own(current);
    current.render(SYNTAX);
    if (side) {
      const names = interactions ? interactions.map((i) => i.name) : ['(the eight defaults)'];
      side.textContent = `${setup.name}\n\ninteractions:\n  ${names.join('\n  ') || '(none)'}`;
    }
  };

  const [first] = SETUPS;
  build(first as Setup);
  stage.select('Setup', SETUPS.map((s) => s.name), (first as Setup).name, (v) => {
    build(SETUPS.find((s) => s.name === v) as Setup);
  });

  if (ctx.preview) {
    stage.cycle(
      SETUPS.map((setup) => ({
        say: setup.name,
        run: async () => {
          build(setup);
          await stage.wait(500);
          const label = picker?.svg?.querySelector<SVGElement>('[data-element-type="item-label"]');
          if (label) picker?.pick?.(label);
        },
        hold: 1500,
      })),
    );
  }
  return () => stage.dispose();
};

export default mount;
