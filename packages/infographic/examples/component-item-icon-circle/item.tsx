/** @jsxImportSource @antv/infographic */
// A custom item made of an ItemIconCircle and an ItemLabel
import { Group, ItemIconCircle, ItemLabel, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-item-icon-circle';

interface CircleItemProps extends BaseItemProps {
  size?: number;
  fill?: string;
  colorBg?: string;
}

const CircleItem = (props: CircleItemProps) => {
  const [{ indexes, datum, size = 50, fill, colorBg, themeColors }, rest] = getItemProps(props, ['size', 'fill', 'colorBg']);
  return (
    <Group {...rest}>
      <ItemIconCircle indexes={indexes} x={(120 - size) / 2} size={size} fill={fill ?? themeColors.colorPrimary} colorBg={colorBg} />
      <ItemLabel indexes={indexes} width={120} y={size + 8} alignHorizontal="center" fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
    </Group>
  );
};

registerItem(ITEM, { component: CircleItem as never, composites: ['icon', 'label'] });
