// Edit a Geometry's positions before uploading it: a displaced plane as terrain
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { addCamera, addSun, colorMaterial } from '../../shared/graphics-basics.ts';
import { createOrbit } from '../../shared/orbit.ts';
import { createPanel } from '../../shared/panel.ts';
import { createStage } from '../../shared/stage.ts';
import { checkerTexture } from '../../shared/textures.ts';

interface Terrain {
  segments: number;
  frequency: number;
  height: number;
}

function buildTerrain(device: pc.GraphicsDevice, { segments, frequency, height }: Terrain): pc.Mesh {
  const geometry = new pc.PlaneGeometry({ halfExtents: new pc.Vec2(10, 10), widthSegments: segments, lengthSegments: segments });
  // A Geometry is a container of plain arrays, so displace it before it reaches the GPU.
  const positions = geometry.positions!;
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] = Math.sin(positions[i]! * frequency) * Math.cos(positions[i + 2]! * frequency) * height;
  }
  geometry.calculateNormals();
  return pc.Mesh.fromGeometry(device, geometry);
}

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const { app, device } = stage;
  app.scene.ambientLight = new pc.Color(0.3, 0.32, 0.38);
  addSun(app, 45, 40);

  const params: Terrain = { segments: 64, frequency: 0.5, height: 1.2 };
  const checker = checkerTexture(device, '#cfd5e1', '#6b8f71', 16);
  const material = colorMaterial('#ffffff', { diffuseMap: checker, cull: pc.CULLFACE_NONE });
  const instance = new pc.MeshInstance(buildTerrain(device, params), material);
  const terrain = new pc.Entity('terrain');
  terrain.addComponent('render', { meshInstances: [instance] });
  app.root.addChild(terrain);

  const rebuild = (): void => {
    const old = instance.mesh;
    instance.mesh = buildTerrain(device, params);
    old?.destroy();
  };

  const camera = addCamera(app, { clearColor: new pc.Color(0.5, 0.62, 0.78) });
  const orbit = createOrbit(app, camera, { target: new pc.Vec3(0, 0, 0), distance: 20, pitch: -32, autoRotate: 10, interactive: !ctx.preview });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('widthSegments / lengthSegments', 2, 128, 1, params.segments, (v) => ((params.segments = v), rebuild()));
    panel.slider('frequency', 0.1, 1.5, 0.05, params.frequency, (v) => ((params.frequency = v), rebuild()));
    panel.slider('height', 0, 3, 0.1, params.height, (v) => ((params.height = v), rebuild()));
    panel.check('wireframe', false, (on) => (instance.renderStyle = on ? pc.RENDERSTYLE_WIREFRAME : pc.RENDERSTYLE_SOLID));
  }

  return () => {
    orbit.dispose();
    checker.destroy();
    stage.dispose();
  };
};

export default mount;
