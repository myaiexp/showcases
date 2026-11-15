// AFRAME.registerGeometry: a star and the docs' vertices triangle become primitives
import { sway } from '../../shared/card.ts';
import { slider } from '../../shared/controls.ts';
import { q } from '../../shared/comp-dom.ts';
import { aframeExample } from '../../shared/frame.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerGeometry('star', {
      schema: {
        points: { default: 5, min: 3, max: 12, type: 'int' },
        outer: { default: 1, min: 0 },
        inner: { default: 0.45, min: 0 },
      },
      init(data: { points: number; outer: number; inner: number }) {
        const shape = new THREE.Shape();
        for (let i = 0; i < data.points * 2; i++) {
          const r = i % 2 ? data.inner : data.outer;
          const a = (i / (data.points * 2)) * Math.PI * 2 + Math.PI / 2;
          if (i === 0) shape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
          else shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        this.geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.2, bevelEnabled: false });
        this.geometry.center();
      },
    });

    // The docs' second example: vertices given as strings.
    AFRAME.registerGeometry('example', {
      schema: { vertices: { default: ['-10 10 0', '-10 -10 0', '10 -10 0'] } },
      init(data: { vertices: string[] }) {
        const geometry = new THREE.BufferGeometry();
        const pointsArray = data.vertices.map((vertex) => {
          const p = vertex.split(' ').map((x) => parseInt(x));
          return new THREE.Vector3(p[0], p[1], p[2]);
        });
        geometry.setFromPoints(pointsArray);
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        this.geometry = geometry;
      },
    });
  },
  scene: `
    <a-scene background="color: #10151c">
      <a-entity id="star" geometry="primitive: star; points: 5" material="color: #FFC65D; metalness: 0.3; roughness: 0.4" position="-1.6 1.7 -4"
                animation="property: rotation; to: 0 360 0; dur: 6000; easing: linear; loop: true"></a-entity>
      <a-entity geometry="primitive: example; vertices: 1 1 -3, 3 1 -3, 2 2 -3" material="color: #EF2D5E; side: double" position="0 0.5 -1"></a-entity>
    </a-scene>`,
  run(stage) {
    stage.caption('primitive: star  and  primitive: example; vertices: 1 1 -3, 3 1 -3, 2 2 -3');
    if (stage.preview) return sway(stage, { yaw: 6 });
    const star = q(stage, '#star');
    slider(stage.bar!, 'points', [3, 12, 1], 5, (v) => star.setAttribute('geometry', 'points', v));
    slider(stage.bar!, 'inner', [0.1, 0.95, 0.05], 0.45, (v) => star.setAttribute('geometry', 'inner', v));
  },
});
