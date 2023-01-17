import { StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/Feather'
 
interface Props {
  style: StyleProp<ViewStyle>,
  onPressBookmark: () => void,
  onPressLike: () => void,
  onPressComment: () => void,
  onPressSend: () => void,
}
const PostActionButton = (props: Props) => {
  const buttons = [
    {name: 'heart', onPress: props.onPressLike},
    {name: 'message-square', onPress: props.onPressComment},
    {name: 'send', onPress: props.onPressSend},
  ]
  return (
    <View style={[styles.container, props.style]}>
      <View style={[styles.likeCommentShare]}>
        {buttons.map((i, k) => (
          <Icon name={i.name} key={k} size={25} style={styles.icon} onPress={i.onPress}/>
        ))}
      </View>
      <Icon name={'bookmark'} size={25} onPress={props.onPressBookmark}/>
    </View>
  )
}

export default PostActionButton

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  icon: {
    marginRight: 15
  },
  likeCommentShare: {
    flexDirection: 'row'
  }
})