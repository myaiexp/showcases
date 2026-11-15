// commander.execute(UpdateTextCommand) and a BatchCommand of three, with undo
import { BatchCommand, Infographic, Plugin, UpdateTextCommand } from '@antv/infographic';
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

const NEXT = ['Discover', 'Prototype', 'Launch'];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Run a command, then undo and redo it. The commander keeps the history.' });
  const driver = new Driver();
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      padding: ctx.preview ? 8 : 24,
      editable: true,
      plugins: [driver],
      interactions: [],
    }),
  );
  infographic.render(SYNTAX);
  const history = stage.side('commander');
  const show = () => {
    const c = driver.api?.commander;
    if (history && c) history.textContent = `getHistorySize(): ${c.getHistorySize()}\ncanUndo(): ${c.canUndo()}\ncanRedo(): ${c.canRedo()}\n\nserialize():\n${JSON.stringify(c.serialize().map((s: { type: string }) => s.type))}`;
  };
  infographic.on('history:change', show);

  const text = (i: number) => labelsOf(driver.api?.svg as SVGSVGElement)[i] as unknown as TextTarget;
  const one = () => driver.api?.commander.execute(new UpdateTextCommand(text(0), NEXT[0] as string));
  const batch = () => driver.api?.commander.execute(new BatchCommand(NEXT.map((t, i) => new UpdateTextCommand(text(i), t))));
  const undo = () => driver.api?.commander.undo();
  const redo = () => driver.api?.commander.redo();
  stage.button('UpdateTextCommand (first label)', () => void one());
  stage.button('BatchCommand (all three)', () => void batch());
  stage.button('Undo', () => void undo());
  stage.button('Redo', () => void redo());
  show();

  if (ctx.preview) {
    stage.cycle([
      { say: 'BatchCommand: three labels in one step', run: batch, hold: 1300 },
      { say: 'commander.undo()', run: undo, hold: 1300 },
      { say: 'commander.redo()', run: redo, hold: 1300 },
      { say: 'commander.undo(): back to the start', run: async () => { await undo(); driver.api?.commander.clear(); }, hold: 1000 },
    ]);
  }
  return () => stage.dispose();
};

export default mount;
