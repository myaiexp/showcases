// Each line of a transit map gets a tip that opens where the pointer touched the line
import tippy, { followCursor } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LINES, drawMap, midpoint } from './map.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { height: 320, hint: 'Touch a line anywhere: the tip opens right there.' });
  const { svg, lines } = drawMap(stage.root);

  const tips = lines.map((line, i) =>
    stage.own(
      tippy(line, {
        content: LINES[i]!.name,
        // 'initial': the tip follows the pointer until it opens, then stays where it opened.
        followCursor: stage.preview ? false : 'initial',
        plugins: [followCursor],
        delay: [100, 0],
        placement: 'top',
        appendTo: stage.root,
      }),
    ),
  );

  if (stage.preview) {
    // Card: the drawn pointer touches each line at a different spot, and the tip is put
    // there once, which is what 'initial' does with the real pointer.
    stage.play(async (wait) => {
      for (const [i, line] of lines.entries()) {
        const p = midpoint(svg, line);
        const box = stage.root.getBoundingClientRect();
        await stage.ghost.moveTo({ x: p.x - box.left, y: p.y - box.top }, 700);
        const at = stage.ghost.clientRect();
        tips[i]!.setProps({ getReferenceClientRect: () => at });
        tips[i]!.show();
        await wait(1300);
        tips[i]!.hide();
        await wait(300);
      }
    });
  }

  return stage.dispose;
};

export default mount;
