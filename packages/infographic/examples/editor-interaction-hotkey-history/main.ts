// HotkeyHistory: Ctrl+Z and Ctrl+Y over editor commands, undone and redone
import { HotkeyHistory, Infographic, Plugin, UpdateElementCommand } from '@antv/infographic';
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

const COLOURS = ['#F6BD16', '#61DDAA', '#F08BB4'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Press the button a few times, click the drawing, then Ctrl+Z / Ctrl+Y (Cmd on a Mac).' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [new HotkeyHistory()],
    }),
  );
  infographic.render(SYNTAX);
  const history = stage.side('History');
  const show = () => {
    const c = driver.api?.commander;
    if (history && c) history.textContent = `commands run: ${c.getHistorySize()}\ncanUndo: ${c.canUndo()}\ncanRedo: ${c.canRedo()}`;
  };
  infographic.on('history:change', show);

  let n = 0;
  const recolour = async () => {
    const api = driver.api;
    const target = api && labelsOf(api.svg)[n % 3];
    if (!api || !target) return;
    await api.commander.execute(new UpdateElementCommand(target as Target, { attributes: { fill: COLOURS[n % 3] as string } }));
    n += 1;
  };
  stage.button('Recolour a label', () => void recolour());
  stage.button('Undo', () => void driver.api?.commander.undo());
  stage.button('Redo', () => void driver.api?.commander.redo());
  show();

  if (ctx.preview) {
    stage.cycle([
      {
        // Each loop starts from a fresh render (a fresh editor, empty history) so the recolours show again.
        say: 'execute: first label recoloured',
        run: async () => {
          infographic.render(SYNTAX);
          n = 0;
          await recolour();
        },
        hold: 1000,
      },
      { say: 'execute: second label recoloured', run: recolour, hold: 1000 },
      { say: 'Ctrl+Z: undo', run: () => driver.api?.commander.undo(), hold: 1000 },
      { say: 'Ctrl+Z: undo', run: () => driver.api?.commander.undo(), hold: 1000 },
      { say: 'Ctrl+Y: redo', run: () => driver.api?.commander.redo(), hold: 1000 },
      { say: 'Ctrl+Y: redo', run: () => driver.api?.commander.redo(), hold: 1000 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
