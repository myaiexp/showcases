// The InputManager's pointers: id, phase, button, position and queries
import { PointerButton, PointerPhase } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { ghost, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

interface View {
  id: number;
  phase: PointerPhase;
  button: PointerButton;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Move, press and release over the canvas (or touch with two fingers). In a card the list is a scripted replay of one pointer.' });
  const { engine, root, canvas } = stage;
  lit(stage);
  const { inputManager } = engine;
  const info = panel(stage);
  const cursor = ghost(stage);
  if (!stage.preview) {
    checkbox(stage.bar, 'multiPointerEnabled', inputManager.multiPointerEnabled, (v) => (inputManager.multiPointerEnabled = v));
    const block = (e: Event): void => e.preventDefault();
    canvas.addEventListener('contextmenu', block);
    stage.own(() => canvas.removeEventListener('contextmenu', block));
  }
  tick(root, (_dt, t) => {
    let views: View[];
    let flags: [boolean, boolean, boolean];
    if (stage.preview) {
      // A scripted replay: move in, press, hold, release, leave, one phase per beat.
      const beat = Math.floor((t * 2) % 10);
      const phase = [PointerPhase.Move, PointerPhase.Down, PointerPhase.Stationary, PointerPhase.Move, PointerPhase.Up, PointerPhase.Stationary, PointerPhase.Leave, PointerPhase.Leave, PointerPhase.Leave, PointerPhase.Leave][beat]!;
      const x = 120 + beat * 40;
      views = beat < 7 ? [{ id: 0, phase, button: beat >= 1 && beat <= 3 ? PointerButton.Primary : PointerButton.None, x, y: 90, dx: phase === PointerPhase.Move ? 40 : 0, dy: 0 }] : [];
      flags = [beat === 1, beat >= 1 && beat <= 3, beat === 4];
      cursor.move(x / canvas.clientWidth, 0.5);
      cursor.press(beat >= 1 && beat <= 3);
    } else {
      const ratio = canvas.width / Math.max(1, canvas.clientWidth);
      views = inputManager.pointers.map((p) => ({ id: p.id, phase: p.phase, button: p.button, x: p.position.x / ratio, y: p.position.y / ratio, dx: p.deltaPosition.x / ratio, dy: p.deltaPosition.y / ratio }));
      flags = [inputManager.isPointerDown(PointerButton.Primary), inputManager.isPointerHeldDown(PointerButton.Primary), inputManager.isPointerUp(PointerButton.Primary)];
      const first = views[0];
      if (first) cursor.move(first.x / canvas.clientWidth, first.y / canvas.clientHeight);
    }
    const rows = views.length
      ? views.map((v) => `pointer ${v.id}  ${PointerPhase[v.phase]!.padEnd(10)} button ${PointerButton[v.button]}\n  position ${v.x.toFixed(0)}, ${v.y.toFixed(0)}   delta ${v.dx.toFixed(0)}, ${v.dy.toFixed(0)}`).join('\n')
      : 'no active pointer';
    info.text(`${rows}\n\nisPointerDown ${flags[0]}   isPointerHeldDown ${flags[1]}   isPointerUp ${flags[2]}`);
  });
  return stage.dispose;
};

export default mount;
