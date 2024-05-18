import React, { FC, PropsWithChildren } from 'react'
import CustomLayout from '@/components/CustomLayout'

const LayoutChild: FC<PropsWithChildren<{}>> = (props) => {
  return <CustomLayout>{props.children}</CustomLayout>
}
export default LayoutChild
