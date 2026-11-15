// addClicked and removeClicked; the transition add and remove calls
import { Color, type PointerEventData } from '@galacean/engine';
import { ScaleTransition, ColorTransition } from '@galacean/engine-ui';
import type { Mount } from '@/types.ts';
import { caption } from '../../shared/gfx-kit.ts';
import { button as uiButton } from '../../shared/controls.ts';
import { button, ghost, label, timeline, uiScene } from '../../shared/ui-kit.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await uiScene(el, ctx);
  const { stage, canvasEntity } = ui;
  const say = caption(stage, '');
  const b = button(canvasEntity, stage.engine, 0, -20, 260, 90, 'Tap', '#ffffff');
  const log = label(canvasEntity, 0, 100, '', 24).text;
  let a = 0;
  let c = 0;
  const first = (_e: PointerEventData): void => void (log.text = `listener A ${++a} | listener B ${c}`);
  const second = (_e: PointerEventData): void => void (log.text = `listener A ${a} | listener B ${++c}`);
  const color = new ColorTransition();
  color.target = b.image;
  color.normal = new Color(0.1, 0.3, 0.7, 1);
  color.hover = new Color(0.2, 0.55, 0.95, 1);
  color.pressed = new Color(0.9, 0.5, 0.1, 1);
  const scale = new ScaleTransition();
  scale.target = b.image;
  scale.hover = 1.1;
  scale.pressed = 0.9;
  b.button.addClicked(first);
  b.image.color = new Color(1, 1, 1, 1);
  b.button.addTransition(color);
  const steps: [string, () => void][] = [
    ['addClicked(B)', () => b.button.addClicked(second)],
    ['removeClicked(A)', () => b.button.removeClicked(first)],
    ['addTransition(scale)', () => b.button.addTransition(scale)],
    ['removeTransition(color)', () => b.button.removeTransition(color)],
    ['clearTransitions()', () => b.button.clearTransitions()],
  ];
  const run = (i: number): void => {
    steps[i]![1]();
    say(steps[i]![0]);
  };
  if (stage.preview) {
    const g = ghost(stage);
    const ev: [number, () => void][] = [];
    steps.forEach((_s, i) => ev.push([i * 2 + 0.2, () => run(i)], [i * 2 + 0.6, () => g.move(0, -20)], [i * 2 + 0.9, () => g.down()], [i * 2 + 1.2, () => g.up()]));
    ev.push([10.6, () => {
      // Back to the starting state for the next loop.
      b.button.removeClicked(first);
      b.button.removeClicked(second);
      b.button.clearTransitions();
      b.button.addClicked(first);
      b.button.addTransition(color);
      a = c = 0;
      log.text = '';
      say('');
    }]);
    timeline(canvasEntity, 11, ev);
  } else {
    say('Tap the button, then change what is attached to it.');
    steps.forEach(([name], i) => uiButton(stage.bar, name, () => run(i)));
  }
  return stage.dispose;
};

export default mount;
