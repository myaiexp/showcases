// <a-videosphere>: an equirectangular video around the camera, paused and played
import { sway } from '../../shared/card.ts';
import { canvasVideo, type VideoPainter } from '../../shared/comp-video.ts';
import { button } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';

/** A 2:1 equirectangular frame: a sky whose sun circles the horizon, over a striped ground. */
const turningSky: VideoPainter = (g, w, h, t) => {
  const sky = g.createLinearGradient(0, 0, 0, h / 2);
  sky.addColorStop(0, '#0b2a4a');
  sky.addColorStop(1, '#f2a65a');
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h / 2);
  // The sun goes once round the panorama every 12 s: x wraps across the 360° width.
  const sx = (((t / 12) % 1) + 1) % 1;
  for (const dx of [-w, 0, w]) {
    g.fillStyle = '#fff4c2';
    g.beginPath();
    g.arc(sx * w + dx, h * 0.4, h * 0.025, 0, Math.PI * 2);
    g.fill();
  }
  for (let i = 0; i < 24; i++) {
    g.fillStyle = i % 2 ? '#2f4a2c' : '#3b5a35';
    g.fillRect((i / 24) * w, h / 2, w / 24, h / 2);
  }
  g.fillStyle = '#ffffff';
  g.font = `${Math.round(h / 18)}px system-ui, sans-serif`;
  g.fillText(`${t.toFixed(1)} s`, w * 0.48, h * 0.6);
};

export default aframeExample(import.meta.url, {
  setup() {
    canvasVideo({ id: 'antarctica', width: 512, height: 256, fps: 15, draw: turningSky });
  },

  scene: `
    <a-scene>
      <a-videosphere id="sphere" src="#antarctica" rotation="0 -90 0"></a-videosphere>
    </a-scene>`,

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 50, seconds: 16 });
    if (!stage.bar) return;
    // The docs' methods: reach the <video> through the material component.
    const sphere = stage.scene.querySelector('#sphere')!;
    const video = (): HTMLVideoElement => sphere.components.material!.material.map.image as HTMLVideoElement;
    button(stage.bar, 'Pause', () => video().pause());
    button(stage.bar, 'Play', () => void video().play());
    stage.caption('Drag to look around');
  },
});
