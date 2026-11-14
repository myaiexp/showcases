// onBeforeUpdate and onAfterUpdate log the partial props of setProps
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Placement } from 'tippy.js';
import type { Mount } from '@/types.ts';
import { button as barButton, checkbox, log, select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

const describe = (partial: object): string =>
  Object.entries(partial)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(' ');

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 340, hint: 'Change a setting below and watch the log.' });

  const target = document.createElement('button');
  target.className = 'btn btn-primary';
  target.textContent = 'Target';
  const panel = document.createElement('div');
  panel.className = 'logbox';
  stage.root.append(target, panel);
  const lines = log(panel, stage.preview ? 4 : 6);
  lines.el.style.fontSize = '11px';
  lines.el.style.overflow = 'hidden';

  const tip = stage.own(
    tippy(target, {
      content: 'Hello',
      trigger: 'manual',
      hideOnClick: false,
      showOnCreate: true,
      placement: 'top',
      appendTo: stage.root,
      // The hooks receive the instance and only the props that this setProps call passes in.
      onBeforeUpdate: (_, partial) => lines.add(`before ${describe(partial)}`),
      onAfterUpdate: (_, partial) => lines.add(`after  ${describe(partial)}`),
    }),
  );

  if (stage.bar) {
    select(stage.bar, 'Placement', ['top', 'right', 'bottom', 'left'] as const, (placement) => tip.setProps({ placement }));
    checkbox(stage.bar, 'Arrow', true, (arrow) => tip.setProps({ arrow }));
    barButton(stage.bar, 'Change text', () => {
      tip.setProps({ content: tip.props.content === 'Hello' ? 'Saved ✓' : 'Hello' });
    });
  }

  if (stage.preview) {
    const steps: Partial<{ placement: Placement; arrow: boolean; content: string }>[] = [
      { placement: 'bottom' },
      { arrow: false },
      { content: 'Saved ✓' },
      { placement: 'top', arrow: true, content: 'Hello' },
    ];
    stage.play(async (wait) => {
      lines.clear();
      for (const step of steps) {
        await wait(1300);
        tip.setProps(step);
      }
      await wait(1300);
    });
  }

  return stage.dispose;
};

export default mount;
