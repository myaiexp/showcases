/** @jsxImportSource @antv/infographic */
// A custom item made of an ItemIcon and an ItemLabel
import { Group, ItemIcon, ItemLabel, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-item-icon';

interface IconItemProps extends BaseItemProps {
  size?: number;
  fill?: string;
}

const IconItem = (props: IconItemProps) => {
  const [{ indexes, datum, size = 32, fill, themeColors }, rest] = getItemProps(props, ['size', 'fill']);
  return (
    <Group {...rest}>
      <ItemIcon indexes={indexes} x={(120 - size) / 2} size={size} fill={fill ?? themeColors.colorPrimary} />
      <ItemLabel indexes={indexes} width={120} y={size + 8} alignHorizontal="center" fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
    </Group>
  );
};

registerItem(ITEM, { component: IconItem as never, composites: ['icon', 'label'] });
