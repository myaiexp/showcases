/** @jsxImportSource @antv/infographic */
// A custom item: an icon and a label in a FlexLayout with a Gap between them
import { FlexLayout, Gap, ItemIcon, ItemLabel, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-gap';

interface GapItemProps extends BaseItemProps {
  gapWidth?: number;
}

const GapItem = (props: GapItemProps) => {
  const [{ indexes, datum, gapWidth = 8, themeColors }, rest] = getItemProps(props, ['gapWidth']);
  return (
    <FlexLayout {...rest} flexDirection="row" alignItems="center">
      <ItemIcon indexes={indexes} size={28} fill={themeColors.colorPrimary} />
      <Gap width={gapWidth} />
      <ItemLabel indexes={indexes} width={70} alignHorizontal="left" fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
    </FlexLayout>
  );
};

registerItem(ITEM, { component: GapItem as never, composites: ['icon', 'label'] });
