// ScrollBar: config.padding
import { App } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor
import '@leafer-in/viewport'; // the viewport plugin: wheel and drag move the view
import { ScrollBar } from '@leafer-in/scroll'; // the scrollbar plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { tallRects } from '../../shared/plugin-kit.ts';
import { wheelTour } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: "Wheel over the canvas to scroll: the bars show at the edges. " });
  const app = stage.own(new App({ view: stage.view, editor: {} }));

  const scroll = new ScrollBar(app, { padding: stage.preview ? 40 : 100 }); // = app.sky.add(new ScrollBar(app.tree))
  const [wide, tall] = tallRects(stage);
  app.tree.add(wide);
  app.tree.add(tall);
  stage.every(stage.preview ? 3000 : 1000, () => {
    scroll.config.padding = scroll.config.padding ? 0 : stage.preview ? 40 : 100;
    scroll.update();
  });
  if (stage.preview) wheelTour(stage, app, { zoom: false, panSteps: 10, panDelta: 40 });
  void scroll;

  return stage.dispose;
};

export default mount;
