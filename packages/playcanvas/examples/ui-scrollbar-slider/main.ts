// Scrollbar as a slider: small handle, value 0 to 1, set:value events
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addText, color, COL, createUi } from '../../shared/ui.ts';

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);

  // A scrollbar whose handle is smaller than the track is a slider.
  const track = addElement(ui.screen, 'track', { width: 420, height: 24, color: color(COL.panel) }, [0, 30]);
  const handle = addElement(track, 'handle', { anchor: [0, 0, 0, 1], pivot: [0, 1], margin: [0, 0, 0, 0], width: 40, color: color(COL.accent), useInput: true });
  track.addComponent('scrollbar', { orientation: pc.ORIENTATION_HORIZONTAL, handleEntity: handle, handleSize: 0.1, value: 0.3 });
  const slider = track.scrollbar!;

  // The value drives a fill bar and a readout.
  const fillTrack = addElement(ui.screen, 'fill track', { width: 420, height: 14, color: color(COL.panel) }, [0, -40]);
  const fill = addElement(fillTrack, 'fill', { anchor: [0, 0, 0.3, 1], pivot: [0.5, 0.5], margin: [0, 0, 0, 0], color: color(COL.green) });
  const readout = addText(ui, ui.screen, '0.30', { fontSize: 32 }, [0, -90]);
  slider.on('set:value', (value: number) => {
    fill.element!.anchor = new pc.Vec4(0, 0, value, 1);
    readout.element!.text = value.toFixed(2);
  });
  slider.value = 0.3;

  if (ctx.preview) {
    let t = 0;
    ui.app.on('update', (dt: number) => {
      t += dt;
      slider.value = 0.5 - 0.5 * Math.cos(t * 0.9);
    });
  } else {
    const panel = createPanel(el);
    panel.slider('handle size', 0.05, 0.6, 0.01, 0.1, (v) => (slider.handleSize = v));
    panel.slider('value', 0, 1, 0.01, 0.3, (v) => (slider.value = v));
    panel.readout('Drag the orange handle.');
  }

  return () => ui.dispose();
};

export default mount;
