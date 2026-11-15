/** @jsxImportSource @antv/infographic */
// GradientCard: a card whose fill is a gradient made from the theme colours
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { Defs, getItemProps, Group, ItemDesc, ItemLabel, Rect } from '@antv/infographic';

export interface GradientCardProps extends BaseItemProps {
  width?: number;
  height?: number;
}

export const GradientCard: ComponentType<GradientCardProps> = (props) => {
  const [{ indexes, datum, themeColors, width = 140, height = 110 }, restProps] = getItemProps(props, [
    'width',
    'height',
  ]);
  // Ids are page-wide inside one SVG: make them unique per item.
  const id = 'showcase-grad-' + indexes.join('-');
  return (
    <Group {...restProps}>
      <Defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={themeColors.colorPrimary} />
          <stop offset="100%" stopColor={themeColors.colorPrimaryBg} />
        </linearGradient>
      </Defs>
      <Rect width={width} height={height} rx={14} fill={'url(#' + id + ')'} />
      <ItemLabel indexes={indexes} x={12} y={14} width={width - 24} fill={themeColors.colorPrimaryText}>
        {datum.label}
      </ItemLabel>
      <ItemDesc indexes={indexes} x={12} y={50} width={width - 24} height={50} fill={themeColors.colorPrimaryText}>
        {datum.desc}
      </ItemDesc>
    </Group>
  );
};
