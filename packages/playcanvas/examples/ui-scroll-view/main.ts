// Scroll view: masked viewport, layout content, scrollbar, scroll modes
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, COL, createUi } from '../../shared/ui.ts';

const MODES = { Clamp: pc.SCROLL_MODE_CLAMP, Bounce: pc.SCROLL_MODE_BOUNCE, Infinite: pc.SCROLL_MODE_INFINITE };
const TINTS = [COL.panelLight, COL.panel];

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  const scrollView = addGroup(ui.screen, 'scroll view', { width: 320, height: 320 });
  // The viewport is a mask 20 units short of the right edge, which is left for the scrollbar.
  const viewport = addElement(scrollView, 'viewport', { anchor: [0, 0, 1, 1], margin: [0, 0, 20, 0], mask: true });
  addElement(viewport, 'backdrop', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color('#1e222c') });
  // The content hangs from the top-left of the viewport and takes input, so empty areas drag too.
  const content = addGroup(viewport, 'content', { anchor: [0, 1, 0, 1], pivot: [0, 1], width: 300, height: 600, useInput: true });
  content.addComponent('layoutgroup', { orientation: pc.ORIENTATION_VERTICAL, spacing: [0, 6], padding: [6, 6, 6, 6], widthFitting: pc.FITTING_STRETCH });
  // A scroll view never sizes its content: the layout group reports the bounds of its rows after
  // each layout, and the content takes its height from them.
  content.layoutgroup!.on('reflow', ({ bounds }: { bounds: pc.Vec4 }) => {
    content.element!.height = bounds.w + 12;
  });

  let rows = 0;
  const addRow = (): void => {
    const row = addElement(content, `row ${rows}`, { height: 44, color: color(TINTS[rows % 2]!) });
    addText(ui, row, `Item ${++rows}`, { fontSize: 24, anchor: [0, 0.5, 0, 0.5], pivot: [0, 0.5] }, [14, 0]);
  };
  for (let i = 0; i < 24; i++) addRow();

  const scrollbar = addElement(scrollView, 'scrollbar', { anchor: [1, 0, 1, 1], pivot: [1, 1], margin: [0, 0, 0, 0], width: 20, color: color(COL.panel) });
  const handle = addElement(scrollbar, 'handle', { anchor: [0, 1, 1, 1], pivot: [1, 1], margin: [0, 0, 0, 0], color: color(COL.dim), useInput: true });
  scrollbar.addComponent('scrollbar', { orientation: pc.ORIENTATION_VERTICAL, handleEntity: handle });

  // A scroll view made in code starts with nothing set: pass its scroll settings explicitly.
  scrollView.addComponent('scrollview', {
    viewportEntity: viewport,
    contentEntity: content,
    verticalScrollbarEntity: scrollbar,
    horizontal: false,
    vertical: true,
    scrollMode: pc.SCROLL_MODE_BOUNCE,
    bounceAmount: 0.1,
    friction: 0.05,
  });
  const view = scrollView.scrollview!;

  // Cards have no pointer; they drive the same scroll property the scrollbar and drag set.
  let t = 0;
  if (ctx.preview) {
    ui.app.on('update', (dt: number) => {
      t += dt;
      view.scroll = new pc.Vec2(0, 0.5 - 0.5 * Math.cos(t * 0.6));
    });
  } else {
    const panel = createPanel(el);
    panel.select('scroll mode', Object.keys(MODES) as (keyof typeof MODES)[], 'Bounce', (v) => (view.scrollMode = MODES[v]));
    panel.slider('bounce amount', 0, 1, 0.01, 0.1, (v) => (view.bounceAmount = v));
    panel.slider('friction', 0, 1, 0.01, 0.05, (v) => (view.friction = v));
    panel.row();
    panel.slider('scroll', 0, 1, 0.01, 0, (v) => (view.scroll = new pc.Vec2(0, v)));
    panel.button('Add row', addRow);
    panel.readout('Drag the content, use the wheel, or drag the handle.');
  }

  return () => ui.dispose();
};

export default mount;
