import { Dimensions, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native'
import React, { useRef, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import { addPost } from '@/Store/Post'
import { navigateAndSimpleReset } from '@/Navigators/utils'

const { width } = Dimensions.get('screen')

const PreviewModal = ({visible, onDismiss, photos}) => {
  const [index, setindex] = useState<number>(0);
  const handleOnViewableItemsChanged = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    setindex(viewableItems[0].index || 0)
  }).current
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current
  return (
  <Modal visible={visible} onDismiss={onDismiss} style={{flex: 1}}>
    <SafeAreaView style={{flex: 1}}>
      <View style={[styles.titleBar, {justifyContent: 'flex-start'}]}>
        <Feather name='x' size={30} onPress={onDismiss} />
        <Text style={[styles.titleText]}>{'Preview'}</Text>
      </View>
      <FlatList
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        // onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        data={photos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Image source={{uri: item.uri}} style={{width: width, height: '50%'}} resizeMode='cover' />
        )}
      />
      </SafeAreaView>
  </Modal>
)}
const NewPostContainer = ({navigation, route}) => {
  const {photos} = route.params
  const [caption, setCaption] = useState('')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch();

  const onCreatePost = () => {
    let datas = photos.map(i => ({uri: i.uri}))
    dispatch(addPost({
      detail: caption,
      id: new Date().getUTCMilliseconds(),
      images: datas
    }))
    navigateAndSimpleReset('BottomTabNavigator', 0);
  }

  return (
    <SafeAreaView style={[styles.container]}>
      {/** Image Preview */}
      <PreviewModal visible={visible} onDismiss={() => setVisible(false)} photos={photos} />

      {/** Title */}
      <View style={[styles.titleBar]}>
        <Feather name='arrow-left' size={30} onPress={() => navigation.goBack()} />
        <Text style={[styles.titleText]}>{'New Post'}</Text>
        <Feather name='check' size={30} color={'lightblue'} onPress={onCreatePost} />
      </View>

      <View style={{height: 10}} />

      {/** Details */}
      <View style={[styles.detailContainer]}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image source={{uri: photos[0].uri}} style={[styles.detailImage]}/>
        </TouchableOpacity>
        <TextInput 
          multiline
          numberOfLines={10}
          placeholder={'Write a caption'}
          style={[styles.detailText]}
          onChangeText={(text) => setCaption(text)}
          value={caption}
        />
      </View>
    </SafeAreaView>
  )
}

export default NewPostContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  titleBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#FFF'
  },
  titleText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 20,
  },
  detailContainer: {flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center'},
  detailImage: {
    width: 80,
    height: 80,
  },
  detailText: {
    flex: 1,
    padding: 10
  }
})