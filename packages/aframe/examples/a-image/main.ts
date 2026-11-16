// <a-image>: a flat picture whose width and height keep its aspect ratio
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';
import { label, paint } from '../../shared/images.ts';

/** A 2:1 poster painted in code, standing in for the docs' logo. */
function poster(): string {
  return paint('poster', 512, 256, (g, w, h) => {
    const sky = g.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#ff7e5f');
    sky.addColorStop(1, '#2a1a4a');
    g.fillStyle = sky;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#ffe9a8';
    g.beginPath();
    g.arc(w * 0.7, h * 0.55, h * 0.22, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#ffffff';
    g.font = 'bold 64px system-ui, sans-serif';
    g.fillText('2 : 1', 40, h * 0.6);
  });
}

export default aframeExample(import.meta.url, {
  scene: () => `
    <a-scene background="color: #141b24">
      <a-assets>
        <img id="logo" src="${poster()}">
        <img id="square" src="${label('1:1', '#3a6ea5')}">
      </a-assets>
      <!-- A 2:1 image at 3 x 1.5 keeps its proportions. -->
      <a-image src="#logo" width="3" height="1.5" position="-1 1.7 -4"></a-image>
      <!-- The default is 1 x 1, right for a square image. -->
      <a-image src="#square" position="1.6 1.7 -4"></a-image>
      <!-- The same 2:1 image squeezed into 1 x 1 is distorted. -->
      <a-image src="#logo" position="1.6 0.5 -4" opacity="0.8"></a-image>
      <a-text value="3 x 1.5" align="center" position="-1 0.75 -4" width="3"></a-text>
      <a-text value="1 x 1" align="center" position="2.4 1.7 -4" width="2.5" anchor="left"></a-text>
    </a-scene>`,

  run(stage) {
    if (stage.preview) sway(stage, { yaw: 10 });
  },
});
