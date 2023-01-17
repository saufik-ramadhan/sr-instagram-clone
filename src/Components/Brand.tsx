import React from 'react'
import { View, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import FastImage from 'react-native-fast-image'

type Props = {
  height?: number | string
  width?: number | string
  mode?: 'contain' | 'cover' | 'stretch' | 'repeat' | 'center',
  icon?: boolean
}

const Brand = ({ height, width, mode, icon }: Props) => {
  const { Layout, Images } = useTheme()

  return (
    <View style={{ height, width }}>
      <FastImage style={Layout.fullSize} source={icon ? Images.ig_icon_white : Images.ig_logo} resizeMode={'contain'} />
    </View>
  )
}

Brand.defaultProps = {
  height: 200,
  width: 200,
  mode: 'center',
}

export default Brand
