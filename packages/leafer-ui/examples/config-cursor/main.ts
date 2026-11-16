// App & engine config: enabling or disabling cursor support
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, cycle, hoverLoop, label, sizer } from '../../shared/basics.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle cursor and hover the rect.', paper: 'transparent' });
  const u = sizer(stage);
  const leafer = stage.own(
    new Leafer({
      view: stage.view,
      cursor: true, // the default
      fill: '#333',
    }),
  );
  const rect = new Rect({ x: u(70), y: u(60), width: u(130), height: u(90), fill: GREEN, cursor: 'pointer' }); // the cursor over this element
  leafer.add(rect);
  const say = label(stage, '', true);
  stage.loop(() => say(`config.cursor: ${leafer.config.cursor}   canvas cursor: ${(leafer.canvas.view as HTMLCanvasElement).style.cursor || '(none)'}`));
  const setCursor = (on: boolean): void => void (leafer.config.cursor = on);

  if (stage.preview) {
    cycle(stage, [true, false], setCursor, 4200);
    hoverLoop(stage, leafer, { x: u(130), y: u(105) }, 1000);
  } else checkbox(stage.bar!, 'cursor', true, setCursor);

  return stage.dispose;
};

export default mount;
