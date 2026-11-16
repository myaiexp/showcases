// ScrollBar: move.scroll "limit"
import { App } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // the viewport plugin: wheel and drag move the view
import { ScrollBar } from '@leafer-in/scroll'; // the scrollbar plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tallRects } from '../../shared/plugin-kit.ts';
import { wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Wheel over the canvas to scroll: the bars show at the edges. Try to drag the content out of reach." });
  const app = stage.own(new App({ view: stage.view, move: { scroll: 'limit' }, editor: {} }));

  const scroll = new ScrollBar(app); // = app.sky.add(new ScrollBar(app.tree))
  const [wide, tall] = tallRects(stage);
  app.tree.add(wide);
  app.tree.add(tall);

  if (stage.preview) wheelTour(stage, app, { zoom: false, panSteps: 10, panDelta: 40 });
  void scroll;

  return stage.dispose;
};

export default mount;
