/** @jsxImportSource @antv/infographic */
// A custom item with the same two shapes inside a ShapesGroup and a plain Group
import { Ellipse, Group, ItemLabel, Rect, ShapesGroup, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-shapes-group';

const ShapesItem = (props: BaseItemProps) => {
  const [{ indexes, datum, themeColors }, rest] = getItemProps(props);
  return (
    <Group {...rest}>
      <ShapesGroup>
        <Rect width={110} height={50} rx={8} fill="#8a8a92" />
        <Ellipse x={30} y={60} width={50} height={26} fill="#8a8a92" />
      </ShapesGroup>
      <Group x={130}>
        <Rect width={110} height={50} rx={8} fill="#8a8a92" />
        <Ellipse x={30} y={60} width={50} height={26} fill="#8a8a92" />
      </Group>
      <ItemLabel indexes={indexes} y={100} width={240} alignHorizontal="center" fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
    </Group>
  );
};

registerItem(ITEM, { component: ShapesItem as never, composites: ['label'] });
