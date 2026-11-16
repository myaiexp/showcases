// aframe example: utils.device: headset, mobile, tablet and standalone-VR checks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.device: headset, mobile, tablet and standalone-VR checks',
  summary:
    'Calls checkHeadsetConnected, isMobile, isTablet and isMobileVR and prints the answers for the browser this runs in, which is a desktop without a headset.',
  section: 'Core API',
  tags: ['AFRAME.utils.device', 'checkHeadsetConnected', 'isMobile', 'isTablet', 'isMobileVR'],
  docs: ['repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
