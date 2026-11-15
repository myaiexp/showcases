// The exported version string, split into MAJOR.MINOR.PATCH and painted on a cube
import { PrimitiveMesh, UnlitMaterial, version } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, solid, tick } from '../../shared/core-kit.ts';
import { panel } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';
import { canvasTexture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Type a toolkit version: its MAJOR.MINOR has to match the core engine, only PATCH may differ.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6.5]);
  const [major = '0', minor = '0', patch = '0'] = version.split(/[.-]/);
  const material = new UnlitMaterial(engine);
  material.baseTexture = canvasTexture(engine, (g, size) => {
    g.fillStyle = '#1b2a41';
    g.fillRect(0, 0, size, size);
    g.fillStyle = '#7fe3f0';
    g.font = `bold ${size * 0.16}px sans-serif`;
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.fillText('@galacean/engine', size / 2, size * 0.28);
    g.fillStyle = '#ffd36b';
    g.font = `bold ${size * 0.26}px ui-monospace, monospace`;
    g.fillText(`v${version}`, size / 2, size * 0.55);
    g.fillStyle = '#cfd6e4';
    g.font = `${size * 0.1}px sans-serif`;
    g.fillText(`MAJOR ${major}   MINOR ${minor}   PATCH ${patch}`, size / 2, size * 0.8);
  }, { size: 512 });
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 2.2, 2.2, 2.2), material);
  const info = panel(stage, 'bl');
  let toolkit = '1.6.0';
  const check = (value: string): string => {
    const [a, b] = value.split('.');
    return a === major && b === minor ? `toolkit ${value} matches core ${version}` : `toolkit ${value} does NOT match core ${major}.${minor}.x`;
  };
  if (!stage.preview) {
    const input = document.createElement('input');
    input.value = toolkit;
    input.placeholder = 'toolkit version';
    input.addEventListener('input', () => (toolkit = input.value));
    stage.bar.append(input);
  }
  tick(root, (_dt, t) => {
    cube.transform.setRotation(Math.sin(t * 0.6) * 25, t * 28, 0);
    const shown = stage.preview ? ['1.6.2', '1.5.9', '1.6.0', '2.0.0'][Math.floor(t / 2) % 4]! : toolkit;
    info.text(`version = "${version}"\n${check(shown)}`);
  });
  stage.own(() => material.baseTexture?.destroy(true));
  return stage.dispose;
};

export default mount;
