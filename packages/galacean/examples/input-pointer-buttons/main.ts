// PointerButton values lit while held, read from pointer.pressedButtons
import { PointerButton } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, tick } from '../../shared/core-kit.ts';
import { overlayLayer, panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const BUTTONS = [
  ['Primary', PointerButton.Primary, 'left button or finger'],
  ['Secondary', PointerButton.Secondary, 'right button'],
  ['Auxiliary', PointerButton.Auxiliary, 'wheel button'],
  ['XButton1', PointerButton.XButton1, 'back'],
  ['XButton2', PointerButton.XButton2, 'forward'],
] as const;

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Hold any mouse button over the canvas. Right-click is allowed: the context menu is blocked for this canvas.' });
  const { engine, root, canvas } = stage;
  lit(stage);
  const chips = document.createElement('div');
  chips.style.cssText = 'position:absolute;inset:0;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;pointer-events:none';
  overlayLayer(stage).append(chips);
  stage.own(() => chips.remove());
  const nodes = BUTTONS.map(([name, , note]) => {
    const chip = document.createElement('div');
    chip.style.cssText = `padding:${stage.preview ? '8px 10px' : '14px 18px'};border-radius:8px;border:2px solid #4a5468;color:#cfd6e4;font:${stage.preview ? 11 : 13}px ui-monospace,monospace;text-align:center;background:rgba(8,10,16,.6);transition:background .1s`;
    chip.innerHTML = `${name}<br><small style="opacity:.7">${stage.preview ? '' : note}</small>`;
    chips.append(chip);
    return chip;
  });
  const info = panel(stage, 'bl');
  const block = (e: Event): void => e.preventDefault();
  if (!stage.preview) {
    canvas.addEventListener('contextmenu', block);
    stage.own(() => canvas.removeEventListener('contextmenu', block));
  }
  tick(root, (_dt, t) => {
    let mask = 0;
    if (stage.preview) mask = [PointerButton.None, PointerButton.Primary, PointerButton.Secondary, PointerButton.Primary | PointerButton.Auxiliary, PointerButton.XButton1][Math.floor(t / 1.2) % 5]!;
    else mask = engine.inputManager.pointers.reduce((m, p) => m | p.pressedButtons, 0);
    BUTTONS.forEach(([, bit], i) => {
      const on = (mask & bit) !== 0;
      nodes[i]!.style.background = on ? 'rgba(80,150,255,.85)' : 'rgba(8,10,16,.6)';
      nodes[i]!.style.borderColor = on ? '#9cc4ff' : '#4a5468';
    });
    info.text(`pressedButtons = ${mask}   (${BUTTONS.filter(([, bit]) => mask & bit).map(([n]) => n).join(' + ') || 'none'})`);
  });
  return stage.dispose;
};

export default mount;
