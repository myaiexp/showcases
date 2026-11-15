// The docs' complete starting example: a design, a dark hand-drawn theme and data, editable
import { Infographic } from '@antv/infographic';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Double-click a label to edit it, drag to pan, scroll to zoom.' });

  // No `template` here: `design` picks the title, structure and item directly.
  const infographic = stage.own(
    new Infographic({
      container: stage.box,
      width: '100%',
      height: '100%',
      editable: !ctx.preview,
      padding: 30,
    }),
  );

  infographic.render(`
design
  title default
    width 300
  structure list-row
    gap 0
    zigzag true
  item horizontal-icon-arrow
theme dark
  palette
    - #61DDAA
    - #F6BD16
    - #F08BB4
  base
    text
      font-family 851tegakizatsu
  stylize rough
data
  title Project Progress
  items
    - label Step 1
      desc Start
      time Last Day
      icon mdi/rocket-launch
    - label Step 2
      desc In Progress
      time Today
      icon mdi/progress-clock
    - label Step 3
      desc Complete
      time Tomorrow
      icon mdi/trophy
`);

  return () => stage.dispose();
};

export default mount;
