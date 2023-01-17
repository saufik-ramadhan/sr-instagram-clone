import React from 'react'
import { View, Image, Text, ViewProps, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'

const GithubSigninButton = (props: TouchableOpacityProps) => {
  const { Layout, Images, Fonts, Gutters, Common, Colors } = useTheme()

  return (
    <TouchableOpacity style={[
    	Layout.rowCenter, 
    	Gutters.smallHPadding, 
    	Gutters.smallVPadding,
    	Common.borderA,
    	{borderRadius: 5},
    	props.style
    ]} onPress={props.onPress}>
      <Image source={Images.github_icon} style={{height: 20, width: 20}} resizeMode='contain' />
      <Text style={[Gutters.smallLMargin ,Fonts.textCenter, Common.textPrimary]}>Signin with Github</Text>
    </TouchableOpacity>
  )
}

export default GithubSigninButton
