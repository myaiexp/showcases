// Interaction: rect.once fires its listener only once
import { Leafer, Rect, PointerEvent } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { size } from '../../shared/shapes.ts';
import { GREEN } from '../../shared/basics.ts';
import { button } from '../../shared/controls.ts';
import { logLines, tour, visit } from '../../shared/interaction-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Hover in and out twice, then arm again." });
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.5;
  const p = { x: Math.round((stage.width - S * 1.4) / 2), y: Math.round(stage.height * 0.1) };
  const rect = new Rect({ ...p, width: S * 1.4, height: S, fill: GREEN, cornerRadius: 10 });
  leafer.add(rect);
  const log = logLines(stage, 5, true);
  const c = { x: p.x + S * 0.7, y: p.y + S / 2 };
  const arm = (): void => {
    rect.once('pointer.enter', () => ((rect.fill = '#42dd89'), log('enter (once)')));
    rect.once('pointer.leave', () => ((rect.fill = GREEN), log('leave (once)')));
    log('-- armed');
  };
  if (stage.bar) {
    arm();
    button(stage.bar, 'arm again', arm);
  } else {
    const ghost = stage.ghost(leafer);
    let round = 0;
    tour(stage, [0, 1], async () => {
      if (round++ % 2 === 0) arm();
      await visit(stage, ghost, c, 700);
    });
  }

  return stage.dispose;
};

export default mount;
