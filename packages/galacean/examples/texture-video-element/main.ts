// A canvas-fed <video> uploaded each frame with setImageSource
import { MeshRenderer, Texture2D, TextureFormat, TextureUsage, UnlitMaterial } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { caption, demo, orbit, quadMesh, tick } from '../../shared/gfx-kit.ts';

const mount: Mount = async (el, ctx) => {
  const { stage, engine, root, camera } = await demo(el, ctx, { camera: [0, 0, 6], light: false });
  const say = caption(stage);
  const source = document.createElement('canvas');
  source.width = 320;
  source.height = 180;
  const g = source.getContext('2d')!;
  const stream = source.captureStream(30);
  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.srcObject = stream;
  void video.play().catch(() => undefined);
  const draw = (t: number): void => {
    g.fillStyle = `hsl(${(t * 30) % 360} 40% 18%)`;
    g.fillRect(0, 0, 320, 180);
    for (let i = 0; i < 5; i++) {
      g.fillStyle = `hsl(${(t * 60 + i * 70) % 360} 80% 60%)`;
      g.beginPath();
      g.arc(160 + Math.sin(t * 1.3 + i * 1.4) * 120, 90 + Math.cos(t * 1.7 + i) * 55, 18, 0, Math.PI * 2);
      g.fill();
    }
    g.fillStyle = '#fff';
    g.font = '16px sans-serif';
    g.fillText(`frame source ${t.toFixed(1)}s`, 10, 22);
  };
  draw(0);
  const texture = new Texture2D(engine, 320, 180, TextureFormat.R8G8B8A8, false, true, TextureUsage.Dynamic);
  const material = new UnlitMaterial(engine);
  material.baseTexture = texture;
  const screen = root.createChild('screen');
  const renderer = screen.addComponent(MeshRenderer);
  renderer.mesh = quadMesh(engine, 4.8, 2.7);
  renderer.setMaterial(material);
  orbit(camera.entity, [0, 0, 0], 6, 0.6, 0.25);
  let frames = 0;
  tick(screen, (_dt, t) => {
    draw(t);
    if (video.readyState >= 2) {
      texture.setImageSource(video);
      frames++;
    }
    say(`video.readyState ${video.readyState}, ${frames} frames uploaded`);
  });
  stage.own(() => {
    video.pause();
    video.srcObject = null;
    for (const track of stream.getTracks()) track.stop();
    renderer.mesh.destroy();
    texture.destroy();
  });
  return stage.dispose;
};

export default mount;
