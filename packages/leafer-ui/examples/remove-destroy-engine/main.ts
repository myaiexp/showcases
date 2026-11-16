// Basics: destroying the engine
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The canvas is destroyed and rebuilt.', paper: 'transparent' });
  const u = sizer(stage);

  let leafer: Leafer | null = null;
  const build = (): void => {
    leafer = stage.own(new Leafer({ view: stage.view, fill: '#333' }));
    leafer.add(Rect.one({ fill: '#32cd79' }, u(100), u(60), u(100), u(100)));
  };
  build();

  stage.every(1600, () => {
    if (leafer) {
      stage.release(leafer); // the stage's synchronous leafer.destroy(true) and empties the pane
      leafer = null;
    } else build();
  });

  return stage.dispose;
};

export default mount;
