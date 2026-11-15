// A custom Plugin: init() listens for selection:change, destroy() removes it
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

/** The docs' DebugSelectionPlugin, reporting to a callback instead of the console. */
class DebugSelectionPlugin extends Plugin {
  name = 'debug-selection';
  private report: (text: string) => void;
  constructor(report: (text: string) => void) {
    super();
    this.report = report;
  }
  override init(options: PluginInitOptions) {
    super.init(options);
    this.emitter.on('selection:change', this.onSelectionChange);
  }
  destroy() {
    this.emitter.off('selection:change', this.onSelectionChange);
  }
  private onSelectionChange = (payload: { next: Element[] }) => {
    this.report(`selection: ${payload.next.map((n) => n.textContent?.trim() || n.tagName).join(', ') || '(empty)'}`);
  };
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click labels (Shift+click to add, Esc to clear): the plugin reports every change.' });
  const driver = new Driver();
  const log = stage.side('selection:change');
  const lines: string[] = [];
  const report = (text: string) => {
    lines.push(text);
    stage.say(text);
    if (log) log.textContent = lines.slice(-12).join('\n');
  };
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [new DebugSelectionPlugin(report), driver],
      interactions: [new ClickSelect(), new SelectHighlight()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    const pick = (indexes: number[]) => () => {
      const api = driver.api;
      if (!api) return;
      const all = labelsOf(api.svg);
      api.interaction.select(indexes.flatMap((i) => all[i] ?? []) as never[], 'replace');
    };
    stage.cycle([{ run: pick([0]), hold: 1200 }, { run: pick([1, 2]), hold: 1200 }, { run: pick([]), hold: 1000 }]);
  }
  return () => stage.dispose();
};

export default mount;
