// ScrollBar: update()
import { App } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // the viewport plugin: wheel and drag move the view
import { ScrollBar } from '@leafer-in/scroll'; // the scrollbar plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tallRects } from '../../shared/plugin-kit.ts';
import { wheelTour } from '../../shared/basics.ts';
import { Rect } from 'leafer-ui';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Wheel over the canvas to scroll: the bars show at the edges. Add rect grows the content." });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const scroll = new ScrollBar(app); // = app.sky.add(new ScrollBar(app.tree))
  const [wide, tall] = tallRects(stage);
  app.tree.add(wide);
  app.tree.add(tall);
  let n = 0;
  const grow = (): void => {
    app.tree.add(Rect.one({ fill: '#32cd79' }, 20, 300 + ++n * (stage.preview ? 300 : 700), 60, 60));
    scroll.update(); // the bars re-measure the content
  };
  if (stage.bar) button(stage.bar, 'Add rect', grow);
  else stage.every(2500, grow);
  if (stage.preview) wheelTour(stage, app, { zoom: false, panSteps: 10, panDelta: 40 });
  void scroll;

  return stage.dispose;
};

export default mount;
