// screenshot.getCanvas('perspective'): a frame of the live scene as an image
import { button, slider } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { sway } from '../../shared/card.ts';

type Screenshot = { getCanvas(projection: 'perspective' | 'equirectangular'): HTMLCanvasElement };

export default aframeExample(import.meta.url, {
  scene: `
    <a-scene background="color: #10151c" screenshot="width: 480; height: 270">
      <a-torus-knot position="0 1.6 -3" geometry="radius: 0.6; radiusTubular: 0.16" color="#FFC65D"
                    animation="property: rotation; to: 0 360 0; dur: 7000; easing: linear; loop: true"></a-torus-knot>
      <a-sphere position="-1.8 1 -3.5" radius="0.5" color="#EF2D5E"></a-sphere>
      <a-box position="1.8 1 -3.5" color="#4CC3D9"></a-box>
    </a-scene>`,
  run(stage) {
    stage.caption("screenshot.getCanvas('perspective')");
    if (stage.preview) return sway(stage, { yaw: 12 });
    const out = stage.readout()!;
    const doc = out.ownerDocument;
    const img = doc.createElement('img');
    img.style.cssText = 'display:block;margin-top:6px;max-width:100%;border:1px solid #445';
    const label = doc.createElement('div');
    label.textContent = 'Press capture: the scene as the camera sees it right now.';
    out.replaceChildren(label, img);
    const capture = (): void => {
      const shot = stage.scene.components.screenshot as unknown as Screenshot;
      const canvas = shot.getCanvas('perspective');
      img.src = canvas.toDataURL('image/png');
      label.textContent = `captured ${canvas.width} x ${canvas.height} px`;
    };
    button(stage.bar!, 'capture', capture);
    const size = (k: 'width' | 'height') => (v: number) => stage.scene.setAttribute('screenshot', k, v);
    slider(stage.bar!, 'width', [160, 960, 80], 480, size('width'));
    slider(stage.bar!, 'height', [90, 540, 45], 270, size('height'));
  },
});
