import React, { FC, PropsWithChildren } from 'react'
import CustomLayout from '@/components/custom-layout'

const Layout: FC<PropsWithChildren<{}>> = (props) => {
  return <CustomLayout>{props.children}</CustomLayout>
}
export default Layout
