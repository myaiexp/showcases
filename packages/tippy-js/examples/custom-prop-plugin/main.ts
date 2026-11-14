// A plugin that defines a brand new prop, autoHideAfter, typed as in the docs
import tippyBase, { type Instance, type LifecycleHooks, type Plugin, type Props, type Tippy } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// The TypeScript section of the plugins page: describe the new prop, then hand
// tippy the extended props type.
interface CustomProps {
  autoHideAfter: number;
}
type FilteredProps = CustomProps & Omit<Props, keyof CustomProps | keyof LifecycleHooks>;
type ExtendedProps = FilteredProps & LifecycleHooks<FilteredProps>;
const tippy = tippyBase as unknown as Tippy<ExtendedProps>;

// `name` and `defaultValue` define the prop; `fn` runs once per instance.
const autoHideAfter: Plugin<ExtendedProps> = {
  name: 'autoHideAfter',
  defaultValue: 0,
  fn(instance) {
    let timer = 0;
    const stop = (): void => window.clearTimeout(timer);
    return {
      onShown() {
        stop();
        if (instance.props.autoHideAfter > 0) {
          timer = window.setTimeout(() => instance.hide(), instance.props.autoHideAfter);
        }
      },
      onHide: stop,
      onDestroy: stop,
    };
  },
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 240, hint: 'Click Save. Change the time with the slider; 0 means "stay until clicked".' });

  const row = document.createElement('div');
  row.className = 'row';
  const save = document.createElement('button');
  save.className = 'btn btn-primary';
  save.textContent = 'Save';
  const copy = document.createElement('button');
  copy.className = 'btn';
  copy.textContent = 'Copy link';
  row.append(save, copy);
  stage.root.append(row);

  // A thin bar inside the tip shows how long is left, so the timer can be seen.
  const content = (text: string): { box: HTMLElement; bar: HTMLElement } => {
    const box = document.createElement('div');
    const label = document.createElement('div');
    label.textContent = text;
    const bar = document.createElement('div');
    bar.className = 'bar';
    box.append(label, bar);
    return { box, bar };
  };
  const make = (button: HTMLElement, text: string, ms: number): Instance<ExtendedProps> => {
    const { box, bar } = content(text);
    const tip = tippy(button, {
      content: box,
      trigger: 'click',
      autoHideAfter: ms,
      placement: 'bottom',
      appendTo: stage.root,
      plugins: [autoHideAfter],
      onShown(instance) {
        const ms = instance.props.autoHideAfter;
        bar.style.display = ms > 0 ? 'block' : 'none';
        if (ms > 0) bar.animate([{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }], { duration: ms, fill: 'forwards' });
      },
    });
    return stage.own(tip);
  };
  const saved = make(save, 'Saved!', stage.preview ? 1500 : 3000);
  const copied = make(copy, 'Link copied', 0);

  if (stage.bar) {
    slider(stage.bar, 'Save tip hides after', 0, 6000, 500, 3000, (v) => saved.setProps({ autoHideAfter: v }), (v) =>
      v === 0 ? 'never' : `${v / 1000}s`,
    );
  }

  if (stage.preview) {
    stage.play(async (wait) => {
      await stage.ghost.click(save, 700);
      await wait(2600);
      await stage.ghost.click(copy, 600);
      await wait(1400);
      // Card: this tip has autoHideAfter 0, so it stays; a click elsewhere closes it, drawn by code.
      copied.hide();
      await wait(500);
    });
  }

  return stage.dispose;
};

export default mount;
