// plugins and interactions as instance arrays, all built-ins spelled out
import {
  BrushSelect,
  ClickSelect,
  DblClickEditText,
  DragCanvas,
  DragElement,
  EditBar,
  HotkeyHistory,
  Infographic,
  Plugin,
  ResizeElement,
  SelectHighlight,
  UpdateElementCommand,
  ZoomWheel,
} from '@antv/infographic';
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

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Every built-in at once, as the defaults would install them.' });
  const driver = new Driver();
  const plugins = [new EditBar({ getContainer: () => stage.box }), new ResizeElement(), driver];
  const interactions = [
    new DragCanvas({ trigger: ['Space'] }),
    new DblClickEditText(),
    new BrushSelect(),
    new ClickSelect(),
    new DragElement(),
    new HotkeyHistory(),
    new ZoomWheel(),
    new SelectHighlight(),
  ];
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins,
      interactions,
    }),
  );
  infographic.render(SYNTAX);
  const side = stage.side('Installed');
  if (side) side.textContent = `plugins:\n  ${plugins.map((p) => p.name).join('\n  ')}\n\ninteractions:\n  ${interactions.map((i) => i.name).join('\n  ')}`;

  if (ctx.preview) {
    const act = (say: string, i: number, fill: string) => ({
      say,
      run: async () => {
        const api = driver.api;
        const target = api && labelsOf(api.svg)[i];
        if (!api || !target) return;
        api.interaction.select([target as never], 'replace');
        await api.commander.execute(new UpdateElementCommand(target as Target, { attributes: { fill } }));
        api.commander.clear();
      },
      hold: 1500,
    });
    stage.cycle([act('ClickSelect + EditBar: first label', 0, '#F6BD16'), act('second label', 1, '#61DDAA'), act('third label', 2, '#F08BB4')]);
  }
  return () => stage.dispose();
};

export default mount;
