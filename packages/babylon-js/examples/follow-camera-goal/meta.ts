// babylon-js example: FollowCamera goal position
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FollowCamera goal position',
  summary:
    'A FollowCamera locked onto a car that laps a circular track. Sliders change the goal position (radius, heightOffset, rotationOffset) and how the camera catches up (cameraAcceleration, maxCameraSpeed).',
  section: 'Cameras',
  tags: ['FollowCamera', 'lockedTarget', 'radius', 'heightOffset', 'rotationOffset', 'cameraAcceleration'],
  docs: [
    'repo/content/features/introductionToFeatures/chap8/follow.md',
    'repo/content/features/featuresDeepDive/cameras/camera_introduction.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});
