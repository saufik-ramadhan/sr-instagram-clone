import React, { ReactNode } from 'react'
import { View, ViewProps, Image } from 'react-native'
import { useTheme } from '@/Hooks'

interface Props {
	children: ReactNode
}

const Topbar = (props: Props) => {
	const {Common, Layout, Gutters, Images} = useTheme()
	return (
		<View style={[Layout.row]}>
			<Image source={Images.ig_logo} style={{height: 50, width: 100}} resizeMode='contain' />
			{props.children}
		</View>
	)
}

export default Topbar