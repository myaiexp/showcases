// Link styling: linkDirectionalParticleThreeObject makes the particles boxes, cones or diamonds
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import { BoxGeometry, ConeGeometry, Mesh, MeshLambertMaterial, OctahedronGeometry, type Object3D } from 'three';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { team, type TData, type TLink, type TNode } from '../../shared/data.ts';
import { createStage } from '../../shared/stage.ts';
import { fitOnce, spin } from '../../shared/camera.ts';

const SHAPES = ['box', 'cone', 'diamond'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Cones are turned to face the way the link points.' });

  const box = new BoxGeometry(2.5, 2.5, 2.5);
  // ConeGeometry points up (+y); the library aims particles with lookAt (+z), so turn it first.
  const cone = new ConeGeometry(1.6, 5, 8);
  cone.rotateX(Math.PI / 2);
  const diamond = new OctahedronGeometry(2.2);
  const material = new MeshLambertMaterial({ color: '#ffb454', emissive: '#553300' });
  stage.onDispose(() => {
    box.dispose();
    cone.dispose();
    diamond.dispose();
    material.dispose();
  });

  const build = (shape: (typeof SHAPES)[number]): (() => Object3D) => {
    if (shape === 'box') return () => new Mesh(box, material);
    if (shape === 'cone') return () => new Mesh(cone, material);
    return () => new Mesh(diamond, material);
  };

  const graph = stage
    .own(new ForceGraph3D(stage.container) as ForceGraph3DInstance<TNode, TLink>)
    .graphData(team() as TData)
    .nodeLabel('name')
    .nodeVal(2)
    .linkColor(() => '#6a7090')
    .linkDirectionalParticles(2)
    .linkDirectionalParticleSpeed(0.006)
    .linkDirectionalParticleThreeObject(build('cone'));
  const use = (shape: (typeof SHAPES)[number]): void => {
    graph.linkDirectionalParticleThreeObject(build(shape));
  };

  if (stage.preview) {
    const cam = spin(stage, () => graph);
    graph.cooldownTime(2500).onEngineStop(() => cam.fit(10));
    let i = 0;
    stage.every(2200, () => use(SHAPES[++i % SHAPES.length]!));
  } else {
    fitOnce(graph);
  }

  if (stage.bar) select(stage.bar, 'particle object', SHAPES, use, 'cone');

  return stage.dispose;
};

export default mount;
