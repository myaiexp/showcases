// zephyr3d example: Create a device and run the frame loop
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Create a device and run the frame loop',
  summary:
    'Skips the Application: backend.createDevice(canvas) makes the device, getDeviceCaps lists what the backend supports, and frames are driven either by device.runLoop or by beginFrame and endFrame around each requestAnimationFrame.',
  section: 'Device API',
  tags: ['createDevice', 'getDeviceCaps', 'runLoop', 'beginFrame', 'endFrame', 'exitLoop', 'drawText', 'backendWebGL2'],
  docs: ['repo/apps/doc/web/en/device.md', 'repo/apps/doc/web/en/device-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
