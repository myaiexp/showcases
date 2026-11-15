// DragElement: drag to move; the card moves a label with the command a drag makes
import { ClickSelect, DragElement, Infographic, Plugin, SelectHighlight, UpdateElementCommand } from '@antv/infographic';
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
  const stage = await createStage(el, ctx, { hint: 'Drag a label. Hold Alt to turn snapping off.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new ClickSelect(), new DragElement(), new SelectHighlight()],
    }),
  );
  infographic.render(SYNTAX);

  if (ctx.preview) {
    let origin: { x: number; y: number } | null = null;
    const move = (dx: number, dy: number, say: string) => ({
      say,
      run: async () => {
        const api = driver.api;
        const target = api && labelsOf(api.svg)[0];
        if (!api || !target) return;
        origin ??= { x: Number(target.getAttribute('x')), y: Number(target.getAttribute('y')) };
        api.interaction.select([target as never], 'replace');
        await api.commander.execute(new UpdateElementCommand(target as Target, { attributes: { x: origin.x + dx, y: origin.y + dy } }));
        api.commander.clear();
      },
      hold: 1100,
    });
    stage.cycle([move(60, 0, 'drag right'), move(60, 40, 'drag down'), move(0, 0, 'dropped back')]);
  }
  return () => stage.dispose();
};

export default mount;
