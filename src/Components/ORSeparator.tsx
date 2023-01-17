import React from 'react'
import { View, Image, Text, ViewProps } from 'react-native'
import { useTheme } from '@/Hooks'

const ORSeparator = (props: ViewProps) => {
  const { Layout, Images, Fonts, Gutters, Common, Colors } = useTheme()

  return (
    <View style={[Layout.colCenter, Layout.fullWidth, Gutters.regularVMargin,props.style]}>
      <View style={[{backgroundColor: Colors.silver, height: 1}, Layout.fullWidth]} />
      <View style={[{position:'absolute', backgroundColor: Colors.white}, Gutters.regularHPadding, Gutters.tinyVPadding]}>
        <Text style={[Fonts.textCenter, Common.textPrimary]}>OR</Text>
      </View>
    </View>
  )
}

export default ORSeparator
