import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer, ExploreContainer, HomeContainer, NewPostContainer, ProfileContainer, ReelsContainer, ShopContainer } from '@/Containers'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from '@/Hooks'
import { createStackNavigator } from '@react-navigation/stack'
import { View } from 'react-native'
import { ImagePicker } from '@/Components'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='BottomTabNavigator' component={BottomTabNavigator} />
      <Stack.Screen name='ImagePicker' component={ImagePicker} />
      <Stack.Screen name='NewPostContainer' component={NewPostContainer} />
    </Stack.Navigator>
    
  )
}

const BottomTabNavigator = () => {
  return <View style={{flex: 1}}>
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="Home"
      component={HomeContainer}
      options={{
        tabBarIcon: (props) => <TabBarIcon name={'home'} {...props} />,
        tabBarShowLabel: false
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreContainer}
      options={{
        tabBarIcon: (props) => <TabBarIcon name={'search'} {...props} />,
        tabBarShowLabel: false
      }}
    />
    <Tab.Screen
      name="Reels"
      component={ReelsContainer}
      options={{
        tabBarIcon: (props) => <TabBarIcon name={'play-circle'} {...props} />,
        tabBarShowLabel: false
      }}
    />
    <Tab.Screen
      name="Shop"
      component={ShopContainer}
      options={{
        tabBarIcon: (props) => <TabBarIcon name={'shopping-bag'} {...props} />,
        tabBarShowLabel: false
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileContainer}
      options={{
        tabBarIcon: (props) => <TabBarIcon name={'user'} {...props} />,
        tabBarShowLabel: false
      }}
    />
  </Tab.Navigator>
  </View>
}
const TabBarIcon = ({name, color, focused}: {name: string, color: string, focused: boolean}) => (
  <Icon name={name} size={20} color={focused ? '#308DD9' : '#000000'} />
)

export default MainNavigator
