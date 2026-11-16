// aframe example: xr-mode-ui: custom enter buttons, XRMode and enabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "xr-mode-ui: custom enter buttons, XRMode and enabled",
  summary: "The xr-mode-ui component builds the enter VR and AR buttons, or adopts elements you provide through enterVRButton and enterARButton, choosing which with XRMode (vr, ar or xr). Buttons only display when the browser supports the mode, so the read-out reports which of the adopted buttons the component shows or hides here. Controls change XRMode and enabled.",
  section: 'Components',
  tags: ["xr-mode-ui", "enterVRButton", "enterARButton", "XRMode", "enabled", "enterVREnabled", "enterAREnabled"],
  docs: ["repo/docs/components/xr-mode-ui.md"],
  provenance: 'pure',
  added: '2026-11-15',
});
