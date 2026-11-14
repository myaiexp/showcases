// PlayCanvas: Button sprite transitions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Button sprite transitions",
  summary:
    "In Sprite Change mode each button state shows a frame of a sprite. One canvas atlas holds default, hover, pressed and inactive frames of a button; the hover, pressed and inactive sprite assets and frames point at them. A second button has active set to false and shows its inactive frame.",
  section: "User Interface",
  tags: ["BUTTON_TRANSITION_MODE_SPRITE_CHANGE","hoverSpriteAsset","hoverSpriteFrame","pressedSpriteFrame","inactiveSpriteFrame","spriteAsset"],
  docs: ["repo/docs/user-manual/user-interface/buttons.md","repo/docs/user-manual/editor/scenes/components/button.md","repo/docs/user-manual/user-interface/image-elements.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
