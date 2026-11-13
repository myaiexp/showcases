// imageSplats: a canvas drawing becomes splats; dim pixels are dropped and bright ones lifted in z
import { SplatMesh, imageSplats } from '@sparkjsdev/spark';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { controlBar, slider, readout } from '../../shared/controls.ts';

const W = 192;
const H = 128;

/** Draws a small picture and returns it as a data: URL, so imageSplats never touches the network. */
function drawPicture(): string {
  const c = document.createElement('canvas');
  c.width = W;
  c.height = H;
  const g = c.getContext('2d')!;
  const sky = g.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#102a6b');
  sky.addColorStop(0.7, '#e0603a');
  sky.addColorStop(1, '#f5c15a');
  g.fillStyle = sky;
  g.fillRect(0, 0, W, H);
  g.fillStyle = '#fff4c2';
  g.beginPath();
  g.arc(W * 0.68, H * 0.5, 22, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#05060a';
  g.beginPath();
  g.moveTo(0, H);
  for (let x = 0; x <= W; x += 8) g.lineTo(x, H * 0.72 + Math.sin(x * 0.07) * 10 + Math.sin(x * 0.19) * 4);
  g.lineTo(W, H);
  g.fill();
  g.fillStyle = '#ffffff';
  g.font = 'bold 22px sans-serif';
  g.fillText('SPARK', 12, 30);
  return c.toDataURL('image/png');
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { position: [0, 0, 3.4], orbit: 0 });
  const status = ctx.preview ? null : readout(el);
  const url = drawPicture();
  const p = { sub: 2, minLight: 0.12, lift: 40, dot: 0.8 };

  let mesh: SplatMesh | null = null;
  const rebuild = (): void => {
    if (mesh) {
      stage.scene.remove(mesh);
      mesh.dispose();
    }
    let kept = 0;
    mesh = imageSplats({
      url,
      dotRadius: p.dot,
      subXY: p.sub,
      forEachSplat: (_w, _h, _i, center, _scales, _q, opacity, color) => {
        const light = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
        // Returning null skips the splat entirely.
        if (light < p.minLight) return null;
        // Bright pixels are pushed toward the camera.
        center.z = (light * p.lift) / p.sub;
        kept++;
        return opacity;
      },
    });
    // One unit per (subsampled) pixel: scale so the picture is about 3.4 wide.
    mesh.scale.setScalar((3.4 * p.sub) / W);
    stage.scene.add(mesh);
    // The callback runs while the mesh initialises, which is async.
    if (status) void mesh.initialized.then(() => void (status.textContent = `${W / p.sub}x${H / p.sub} pixels, ${kept} splats kept`));
  };
  rebuild();

  if (!ctx.preview) {
    const bar = controlBar(el);
    slider(bar, 'subXY', 1, 6, 1, p.sub, (v) => ((p.sub = v), rebuild()));
    slider(bar, 'drop below brightness', 0, 0.6, 0.02, p.minLight, (v) => ((p.minLight = v), rebuild()));
    slider(bar, 'z lift', 0, 80, 5, p.lift, (v) => ((p.lift = v), rebuild()));
    slider(bar, 'dotRadius', 0.4, 1.4, 0.1, p.dot, (v) => ((p.dot = v), rebuild()));
  }

  stage.run((time) => {
    if (mesh) mesh.rotation.set(Math.sin(time * 0.4) * 0.15, Math.sin(time * 0.6) * 0.6, 0);
  });
  return () => stage.dispose();
};

export default mount;
