/** @jsxImportSource @antv/infographic */
// Fork: a root above a row of children, joined by elbow connectors
import type { BaseStructureProps, ComponentType, ItemDatum, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, getThemeColors, Group, ItemsGroup, Path } from '@antv/infographic';

export interface ForkProps extends BaseStructureProps {
  levelGap?: number;
  nodeGap?: number;
}

export const Fork: ComponentType<ForkProps> = (props) => {
  // Items holds one component per level, root level first.
  const { Title, Items, data, options, levelGap = 50, nodeGap = 16 } = props;
  const RootItem = Items[0] as (typeof Items)[number];
  const ChildItem = Items[1] ?? RootItem;
  const { title, desc, items = [] } = data;
  const root = items[0];
  const children: ItemDatum[] = root?.children ?? [];
  const color = getThemeColors({}, options).colorPrimary;

  const rootBounds = getElementBounds(<RootItem indexes={[0]} data={data} datum={root} />);
  const childBounds = getElementBounds(<ChildItem indexes={[0, 0]} data={data} datum={children[0] ?? {}} />);
  const rowWidth = Math.max(children.length * childBounds.width + (children.length - 1) * nodeGap, rootBounds.width);
  const childY = rootBounds.height + levelGap;
  const rootCx = rowWidth / 2;

  const decor: JSXElement[] = [];
  const itemElements: JSXElement[] = [
    <RootItem indexes={[0]} data={data} datum={root} x={rootCx - rootBounds.width / 2} />,
  ];
  children.forEach((child: ItemDatum, i: number) => {
    const cx = (rowWidth - (children.length * childBounds.width + (children.length - 1) * nodeGap)) / 2 +
      i * (childBounds.width + nodeGap) + childBounds.width / 2;
    const mid = rootBounds.height + levelGap / 2;
    itemElements.push(
      <ChildItem indexes={[0, i]} data={data} datum={child} x={cx - childBounds.width / 2} y={childY} />,
    );
    decor.push(
      <Path
        d={'M ' + rootCx + ' ' + rootBounds.height + ' L ' + rootCx + ' ' + mid + ' L ' + cx + ' ' + mid + ' L ' + cx + ' ' + childY}
        width={rowWidth}
        height={levelGap}
        fill="none"
        stroke={color}
        strokeWidth={2}
      />,
    );
  });

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <Group>{decor}</Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
