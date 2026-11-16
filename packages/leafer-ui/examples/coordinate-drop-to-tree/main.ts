// Advanced: dropping HTML elements onto the tree layer
import { App, Rect, Ellipse } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor plugin
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag a green shape from the palette onto the canvas (zoom first if you like).', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
      fill: '#333',
      editor: {},
    }),
  );
    app.tree.add({ tag: 'Text', x: u(20), y: u(20), text: 'Drop shapes here', fill: '#999', fontSize: stage.preview ? 12 : 16 });

  const drop = (type: string, clientX: number, clientY: number): void => {
    const point = app.getPagePointByClient({ clientX, clientY }); // browser client coordinates -> page
    if (type === 'rect') app.tree.add(Rect.one({ fill: GREEN, editable: true }, point.x, point.y, u(40), u(40)));
    else if (type === 'circle') app.tree.add(Ellipse.one({ fill: GREEN, editable: true }, point.x, point.y, u(40), u(40)));
  };

  if (stage.preview) {
    // No native drag and drop in a card: call the same drop() with client coordinates over the pane.
    const bounds = stage.view.getBoundingClientRect();
    let n = 0;
    stage.every(1000, () => {
      if (app.tree.children.length > 6) app.tree.clear();
      n++;
      drop(n % 2 ? 'rect' : 'circle', bounds.left + u(40) + ((n * 53) % 160), bounds.top + u(30) + ((n * 37) % 100));
    });
  } else {
    // The palette: two DOM shapes that can be dragged onto the canvas.
    const palette = (type: string, radius: string): void => {
      const item = document.createElement('div');
      item.draggable = true;
      item.style.cssText = `width:40px;height:40px;border-radius:${radius};background:#32cd79;cursor:move`;
      item.addEventListener('dragstart', (e) => e.dataTransfer?.setData('type', type));
      stage.bar!.append(item);
    };
    palette('circle', '20px');
    palette('rect', '0');
    const over = (e: DragEvent): void => e.preventDefault(); // let the canvas accept the drop
    const onDrop = (e: DragEvent): void => drop(e.dataTransfer?.getData('type') ?? '', e.clientX, e.clientY);
    stage.view.addEventListener('dragover', over);
    stage.view.addEventListener('drop', onDrop);
    stage.onDispose(() => {
      stage.view.removeEventListener('dragover', over);
      stage.view.removeEventListener('drop', onDrop);
    });
  }

  return stage.dispose;
};

export default mount;
