// PlayCanvas: Layout children in a toolbar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layout children in a toolbar",
  summary:
    "Layout child components change how a layout group sizes one child: maxWidth stops a button growing, fitWidthProportion gives one a larger share, minWidth keeps one wide, excludeFromLayout leaves one where it is. A toolbar of stretching buttons resizes around them.",
  section: "User Interface",
  tags: ["LayoutChildComponent","maxWidth","minWidth","fitWidthProportion","excludeFromLayout","LayoutGroupComponent"],
  docs: ["repo/docs/user-manual/user-interface/layout-groups.md","repo/docs/user-manual/editor/scenes/components/layoutchild.md","repo/docs/user-manual/editor/scenes/components/layoutgroup.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
