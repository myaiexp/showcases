// SolidParticleSystem: boxes and polyhedra merged into one mesh, each particle moved by updateParticle
import { ArcRotateCamera, Color4, HemisphericLight, MeshBuilder, Scalar, SolidParticleSystem, Vector3 } from '@babylonjs/core';
import type { SolidParticle } from '@babylonjs/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const { scene, canvas } = stage;

  const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.4, 30, Vector3.Zero(), scene);
  if (!ctx.preview) camera.attachControl(canvas, true);
  new HemisphericLight('light', new Vector3(0.2, 1, -0.4), scene);

  // Step 1: create the SPS and add particles from model meshes.
  const sps = new SolidParticleSystem('sps', scene);
  const box = MeshBuilder.CreateBox('model-box', { size: 1 }, scene);
  const poly = MeshBuilder.CreatePolyhedron('model-poly', { type: 2, size: 0.8 }, scene);
  const count = ctx.preview ? 120 : 400;
  sps.addShape(box, count);
  sps.addShape(poly, count);
  // The models are only templates: free them once their geometry is copied.
  box.dispose();
  poly.dispose();
  // Step 2: build the single mesh.
  sps.buildMesh();

  // Step 3: initial position, colour and a spin speed per particle (kept in particle.props).
  sps.initParticles = () => {
    for (const particle of sps.particles) {
      const radius = Scalar.RandomRange(5, 14);
      const angle = Scalar.RandomRange(0, Math.PI * 2);
      particle.position.set(Math.cos(angle) * radius, Scalar.RandomRange(-6, 6), Math.sin(angle) * radius);
      particle.color = new Color4(Math.random(), Math.random(), Math.random(), 1);
      particle.props = { spin: Scalar.RandomRange(-0.05, 0.05), orbit: Scalar.RandomRange(0.002, 0.008) };
    }
  };
  // Step 4: behaviour. setParticles() calls this for every particle.
  sps.updateParticle = (particle: SolidParticle) => {
    const { spin, orbit } = particle.props as { spin: number; orbit: number };
    particle.rotation.x += spin;
    particle.rotation.y += spin * 1.3;
    const x = particle.position.x;
    const z = particle.position.z;
    particle.position.x = x * Math.cos(orbit) - z * Math.sin(orbit);
    particle.position.z = x * Math.sin(orbit) + z * Math.cos(orbit);
    return particle;
  };
  sps.initParticles();
  sps.setParticles();

  stage.run(() => {
    sps.setParticles();
    if (ctx.preview) camera.alpha += 0.003;
  });

  return () => {
    sps.dispose();
    stage.dispose();
  };
};

export default mount;
