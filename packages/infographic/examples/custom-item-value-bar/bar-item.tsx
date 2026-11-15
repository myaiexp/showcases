/** @jsxImportSource @antv/infographic */
// BarItem: a label, a track and a bar scaled to datum.value
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { getItemProps, Group, ItemLabel, ItemValue, Rect } from '@antv/infographic';

export interface BarItemProps extends BaseItemProps {
  width?: number;
}

export const BarItem: ComponentType<BarItemProps> = (props) => {
  const [{ indexes, datum, themeColors, width = 280 }, restProps] = getItemProps(props, ['width']);
  const value = typeof datum.value === 'number' ? datum.value : 0;
  const ratio = Math.min(Math.max(value / 100, 0), 1);
  const barWidth = width - 56;
  return (
    <Group {...restProps}>
      <ItemLabel indexes={indexes} width={width} fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
      <Rect y={30} width={barWidth} height={12} rx={6} fill={themeColors.colorPrimaryBg} opacity={0.3} />
      <Rect y={30} width={Math.max(barWidth * ratio, 12)} height={12} rx={6} fill={themeColors.colorPrimary} />
      <ItemValue indexes={indexes} value={value} x={barWidth + 10} y={24} width={46} height={24} fontSize={16} fill={themeColors.colorPrimary} />
    </Group>
  );
};
