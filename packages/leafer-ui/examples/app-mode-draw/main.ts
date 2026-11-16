// App & Engine: a drawing mode for creating rects by dragging
import { App, Rect, DragEvent, Text } from 'leafer-ui';
import '@leafer-in/editor'; // the graphic editor plugin
import '@leafer-in/viewport'; // the viewport plugin
import type { Mount } from '@/types.ts';
import { createStage, script } from '../../shared/stage.ts';
import { GREEN, sizer } from '../../shared/basics.ts';
import { select } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick "draw", then drag on empty space to create rects. "normal" edits again.', paper: 'transparent' });
  const u = sizer(stage);
  const app = stage.own(
    new App({
      view: stage.view,
      fill: '#333',
      editor: {}, // the editor, plus the tree and sky layers
    }),
  );
  app.tree.add({ tag: 'Text', x: u(20), y: u(20), text: 'mode: normal', fill: '#999', fontSize: 14 });
  app.tree.add(Rect.one({ editable: true, fill: '#FEB027', cornerRadius: [20, 0, 0, 20] }, u(30), u(110), u(70), u(70)));
  app.tree.add(Rect.one({ editable: true, fill: '#FFE04B', rotation: 10, cornerRadius: [0, 20, 20, 0] }, u(150), u(110), u(70), u(70)));
  const title = app.tree.children[0] as Text;
  app.editor.select(app.tree.children[2]!);

  let events: ReturnType<typeof app.on_>[] = [];
  const created: Rect[] = [];
  function setMode(mode: 'normal' | 'draw' | 'preview'): void {
    app.mode = mode;
    title.text = `mode: ${mode}`;
    app.off_(events);
    events = [];
    if (mode !== 'draw') return;
    // Create a rect by dragging
    let rect: Rect;
    events = [
      app.on_(DragEvent.START, () => {
        rect = new Rect({ editable: true, fill: GREEN });
        created.push(rect);
        app.tree.add(rect);
      }),
      app.on_(DragEvent.DRAG, (e: DragEvent) => {
        if (rect) rect.set(e.getPageBounds()); // the box the drag spans, in page coordinates
      }),
    ];
  }

  if (stage.preview) {
    const ghost = stage.ghost(app);
    script(stage, async () => {
      setMode('normal');
      await stage.wait(900);
      setMode('draw'); // the App stops editing and listens for drags
      await ghost.drag({ x: u(40), y: u(40) }, { x: u(120), y: u(90) }, 700);
      await stage.wait(500);
      await ghost.drag({ x: u(150), y: u(30) }, { x: u(230), y: u(95) }, 700);
      await stage.wait(900);
      setMode('normal');
      created.splice(0).forEach((r) => r.destroy());
      await stage.wait(700);
    });
  } else {
    select(stage.bar!, 'app.mode', ['normal', 'draw', 'preview'], setMode, 'normal');
    setMode('normal');
  }

  return stage.dispose;
};

export default mount;
