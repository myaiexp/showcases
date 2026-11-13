// babylon-js example: DeviceSourceManager readouts
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'DeviceSourceManager readouts',
  summary:
    'A DeviceSourceManager on the engine is polled each frame with getDeviceSource(...).getInput(...): WASD or arrows move a cube, the mouse position tints it and the left button scales it. Connect events and onInputChangedObservable feed the readout. Cards feed it synthetic events.',
  section: 'Input',
  tags: ['DeviceSourceManager', 'DeviceType', 'PointerInput', 'getDeviceSource', 'onDeviceConnectedObservable', 'onInputChangedObservable'],
  docs: ['repo/content/features/featuresDeepDive/input/deviceSourceManager.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
