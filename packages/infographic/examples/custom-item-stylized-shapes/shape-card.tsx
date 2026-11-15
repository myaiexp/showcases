/** @jsxImportSource @antv/infographic */
// ShapeCard: a rectangle and a badge circle in a ShapesGroup, plus plain text
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { Ellipse, getItemProps, Group, ItemLabel, Rect, ShapesGroup } from '@antv/infographic';

export interface ShapeCardProps extends BaseItemProps {
  width?: number;
}

export const ShapeCard: ComponentType<ShapeCardProps> = (props) => {
  const [{ indexes, datum, themeColors, width = 120 }, restProps] = getItemProps(props, ['width']);
  const height = 90;
  return (
    <Group {...restProps}>
      {/* Only shapes in a ShapesGroup are restyled; text and groups are not. */}
      <ShapesGroup>
        <Rect width={width} height={height} rx={10} fill={themeColors.colorPrimary} />
        <Ellipse x={width - 26} y={-10} width={36} height={36} fill={themeColors.colorBgElevated} stroke={themeColors.colorPrimary} strokeWidth={3} />
      </ShapesGroup>
      <ItemLabel indexes={indexes} width={width} height={height} alignHorizontal="center" alignVertical="middle" fill={themeColors.colorPrimaryText}>
        {datum.label}
      </ItemLabel>
    </Group>
  );
};
