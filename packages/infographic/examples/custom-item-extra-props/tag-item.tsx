/** @jsxImportSource @antv/infographic */
// TagItem: a label pill whose colour, corner and casing are item props
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { getItemProps, Group, ItemLabel, Rect } from '@antv/infographic';

export interface TagItemProps extends BaseItemProps {
  width?: number;
  accent?: string;
  radius?: number;
  uppercase?: boolean;
}

export const TagItem: ComponentType<TagItemProps> = (props) => {
  // Custom keys listed here are pulled out; x, y, width and height stay in restProps for the Group.
  const [{ indexes, datum, themeColors, width = 120, accent, radius = 10, uppercase = false }, restProps] =
    getItemProps(props, ['width', 'accent', 'radius', 'uppercase']);
  const color = accent ?? themeColors.colorPrimary;
  const text = String(datum.label ?? '');
  return (
    <Group {...restProps}>
      <Rect width={width} height={40} rx={radius} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={2} />
      <ItemLabel indexes={indexes} width={width} height={40} alignHorizontal="center" alignVertical="middle" fill={color}>
        {uppercase ? text.toUpperCase() : text}
      </ItemLabel>
    </Group>
  );
};
