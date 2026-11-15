// galacean example: XR: the tracked input devices
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "XR: the tracked input devices",
  summary:
    "Every XRTrackedInputDevice the input manager knows (three cameras, three controllers) with its tracking state and pose position, read through getTrackedDevice. Without a headset they all report NotTracking at the origin. A listener for devices appearing is registered.",
  section: "XR",
  tags: ['XRInputManager.getTrackedDevice', 'XRTrackedInputDevice', 'XRTrackingState', 'XRInputManager.addTrackedDeviceChangedListener'],
  docs: [
    'repo/docs/en/xr/system/input.mdx',
    'repo/docs/en/xr/system/manager.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
