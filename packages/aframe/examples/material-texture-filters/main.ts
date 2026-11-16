// magFilter nearest vs linear on a magnified texture; minFilter on the minified far edge
import { sway } from '../../shared/card.ts';
import { q } from '../../shared/comp-dom.ts';
import { select } from '../../shared/controls.ts';
import { aframeExample } from '../../shared/frame.ts';
import { paint, seeded } from '../../shared/images.ts';

export default aframeExample(import.meta.url, {
  scene: () => {
    const tiny = paint('tiny-4', 4, 4, (g) => {
      const rnd = seeded(11);
      for (let y = 0; y < 4; y++)
        for (let x = 0; x < 4; x++) {
          g.fillStyle = `hsl(${Math.floor(rnd() * 360)}, 70%, 55%)`;
          g.fillRect(x, y, 1, 1);
        }
    });
    return `
    <a-scene background="color: #10151c">
      <a-assets><img id="tiny" src="${tiny}"></a-assets>
      <a-plane id="p" position="-1.8 1.6 -3.5" width="3" height="3" material="shader: flat; src: #tiny; magFilter: nearest"></a-plane>
      <a-plane id="q" position="1.8 1.6 -3.5" width="3" height="3" material="shader: flat; src: #tiny; magFilter: linear"></a-plane>
      <a-text value="magFilter: nearest" position="-1.8 0 -3.5" width="3.5" align="center" color="#cfd8e3"></a-text>
      <a-text value="magFilter: linear" position="1.8 0 -3.5" width="3.5" align="center" color="#cfd8e3"></a-text>
    </a-scene>`;
  },
  run(stage) {
    if (stage.preview) return sway(stage, { yaw: 6 });
    const mag = ['nearest', 'linear'] as const;
    select(stage.bar!, 'left magFilter', mag, 'nearest', (v) => q(stage, '#p').setAttribute('material', 'magFilter', v));
    select(stage.bar!, 'right magFilter', mag, 'linear', (v) => q(stage, '#q').setAttribute('material', 'magFilter', v));
  },
});
