// A canvas texture: draw in tick(), then flag the texture so three uploads it again
import { sway } from '../../shared/card.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    AFRAME.registerComponent<{ canvas: string }>('draw-canvas', {
      schema: { canvas: { default: '' } },
      init() {
        this.canvas = document.getElementById(this.data.canvas) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d')!;
      },
      tick(time) {
        const { ctx, canvas } = this as unknown as { ctx: CanvasRenderingContext2D; canvas: HTMLCanvasElement };
        const { width: w, height: h } = canvas;
        ctx.fillStyle = '#07210f';
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = '#3dff7a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 4) {
          const t = time / 600 + x / 40;
          const y = h / 2 + Math.sin(t) * h * 0.25 + Math.sin(t * 2.7) * h * 0.12;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        // The docs: a modified canvas must be refreshed. The material's map is the texture three uploads.
        const material = (this.el.getObject3D('mesh') as unknown as { material?: { map?: { needsUpdate: boolean } } } | undefined)?.material;
        if (material?.map) material.map.needsUpdate = true;
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-assets><canvas id="scope" width="256" height="160" crossorigin="anonymous"></canvas></a-assets>
      <a-plane position="0 1.7 -3.2" width="3.2" height="2" material="shader: flat; src: #scope" draw-canvas="canvas: scope"></a-plane>
    </a-scene>`,
  run(stage) {
    stage.caption('draw on the canvas, then map.needsUpdate = true');
    if (stage.preview) sway(stage, { yaw: 6 });
  },
});
