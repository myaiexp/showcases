// The docs' follow component: a tick() handler moves one box toward another at a set speed
import { aframeExample } from '../../shared/frame.ts';
import type { Entity } from '../../shared/types.ts';

export default aframeExample(import.meta.url, {
  setup(AFRAME) {
    const { THREE } = AFRAME;
    AFRAME.registerComponent<{ target: Entity; speed: number }>('follow', {
      schema: {
        target: { type: 'selector' },
        speed: { type: 'number' },
      },

      init() {
        // Allocated once and reused: tick() runs every frame.
        this.directionVec3 = new THREE.Vector3();
      },

      tick(_time, timeDelta) {
        const directionVec3 = this.directionVec3;
        const targetPosition = this.data.target.object3D.position;
        const currentPosition = this.el.object3D.position;

        directionVec3.copy(targetPosition).sub(currentPosition);
        const distance = directionVec3.length();
        // Don't go any closer once within a metre.
        if (distance < 1) return;

        const factor = this.data.speed / distance;
        (['x', 'y', 'z'] as const).forEach((axis) => {
          directionVec3[axis] *= factor * (timeDelta / 1000);
        });

        this.el.setAttribute('position', {
          x: currentPosition.x + directionVec3.x,
          y: currentPosition.y + directionVec3.y,
          z: currentPosition.z + directionVec3.z,
        });
      },
    });
  },

  // The target swings back and forth on an animation, so the follower always has somewhere to go.
  scene: `
    <a-scene background="color: #1b2430">
      <a-box id="target-box" color="#5E82C5" position="-2.5 1 -4"
             animation="property: position; to: 2.5 1.6 -5; dur: 4000; dir: alternate; loop: true; easing: easeInOutSine"></a-box>
      <a-box follow="target: #target-box; speed: 1" color="#FF6B6B" position="2.5 0.5 -3.5" scale="0.6 0.6 0.6"></a-box>
      <a-plane rotation="-90 0 0" width="12" height="12" position="0 0 -4" color="#2b3a4a"></a-plane>
    </a-scene>`,
});
