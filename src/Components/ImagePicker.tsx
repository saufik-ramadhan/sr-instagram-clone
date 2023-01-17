import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from '@/Hooks';
import { CameraRoll, PhotoIdentifiersPage, useCameraRoll } from '@react-native-camera-roll/camera-roll';
import { navigate } from '@/Navigators/utils';

const { width } = Dimensions.get('screen');

interface ImagePicker {
  title: string,
  onPressClose: () => void,
  onPressNext: () => void,
  content: any
}
interface ImageParams {
  filename: string | null;
  extension: string | null;
  uri: string;
  height: number;
  width: number;
  fileSize: number | null;
  playableDuration: number;
}
interface PageInfo {
  has_next_page: boolean;
  start_cursor?: string | undefined;
  end_cursor?: string | undefined;
}
const ImagePicker = () => {
  const { Images } = useTheme();
  const [preview, setpreview] = useState<any>(0)
  const [isSelectMultiple, setIsSelectMultiple] = useState(false)
  const [photos, setPhotos] = useState<ImageParams[]>([]);
  const [selected, setSelected] = useState<number[]>([0]);
  const [pageInfo, setPageInfo] = useState<PageInfo>();
  // const data = [
  //   {username: 'Your story', profileUri: Images.user_undefined},
  //   {username: 'johnbardeen', profileUri:Images.johnbardeen},
  //   {username: 'w.shockley', profileUri:Images.w_shockley},
  //   {username: 'walter.b', profileUri:Images.walter_b},
  //   {username: 'jack.kilby.ic', profileUri:Images.jack_kilby_ic},
  //   {username: 'morethanmoore', profileUri:Images.morethanmoore},
  // ];
  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 40,
      after: pageInfo?.end_cursor,
      assetType: 'Photos'
    }).then((data) => {
      const assets = data.edges
      const images = assets.map(i => i.node.image);
      setPhotos([...photos, ...images])
      setPageInfo(data.page_info)
    }).catch(err => {
      //
    })
  }
  const handleNextPage = () => {
    if(selected.length < 1) return;
    const selectedData = selected.map(i => photos[i]);
    navigate('NewPostContainer', {
      photos: selectedData
    })
    console.log(selectedData);
    console.log('Total Photos', selected.length)
  }
  useEffect(() => {
    getPhotos();
  }, [])
  return (
    <SafeAreaView style={[styles.container]}>
      {/** Title */}
      <View style={[styles.titleBar]}>
        <Feather name='x' size={30} onPress={() => navigate('Home')} />
        <Text style={[styles.titleText]}>{'New Image Picker'}</Text>
        <Feather name='arrow-right' size={30} color={'lightblue'} onPress={handleNextPage} />
      </View>


      {/** Preview */}
      <View style={[styles.previewContainer]}>
        {preview === '' ? 
          <View style={[styles.previewContent]} /> :
          <Image source={{uri: photos[preview]?.uri}} style={[styles.imageContent]} resizeMode='contain' />
        }
      </View>


      {/** Control */}
      {/* <Text>{JSON.stringify(photos)}</Text> */}
      <View style={[styles.control]}>
        <Text>Gallery</Text>
        <View style={styles.controlButton}>
          <TouchableOpacity style={[styles.selectMultiple, isSelectMultiple && styles.selectMultipleActive]} onPress={() => {
            setIsSelectMultiple(!isSelectMultiple)
            setSelected([preview]);
          }}>
            <MaterialCommunityIcon name='image-multiple-outline' color={'#fff'}/>
            <Text style={{marginLeft: 10, color: '#fff', fontSize: 12}}>SELECT MULTIPLE</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/** Image Galery */}
      <FlatList
        onEndReached={() => pageInfo?.has_next_page && getPhotos()}
        style={{flex: 0.5}}
        data={photos}
        horizontal={false}
        keyExtractor={(i, k) => String(k)}
        numColumns={4}
        renderItem={({item, index}) => {
          const selectedIdx = selected.indexOf(index);
          return <TouchableOpacity onPress={() => {
            if(isSelectMultiple) { 
              if(selectedIdx === -1) setSelected([...selected, index])
              else setSelected(selected.filter((item) => item !== index))
            }
            else setSelected([index])
            setpreview(index)
          }} style={[styles.imageItem]}>
            {isSelectMultiple && <View style={[styles.sequence, selectedIdx !== -1 && {backgroundColor: 'blue'}]}>
              <Text style={{color: '#FFF'}}>{selectedIdx === -1 ? '' : selectedIdx + 1}</Text>
            </View>}
            <Image source={{uri: item.uri}} style={[styles.galeryImage, preview === index && {opacity: 0.2}]} resizeMode={'cover'} />
          </TouchableOpacity>
        }}
      />
    </SafeAreaView>
  )
}

export default ImagePicker

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontWeight: '400'
  },
  previewContainer: {
    flex: 0.5
  },
  previewContent: {
    flex: 1,
    backgroundColor: 'gray'
  },
  imageContent: {
    width: '100%',
    height: '100%'
  },
  control: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  controlButton: {
    flexDirection: 'row'
  },
  selectMultiple: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20
  },
  selectMultipleActive: {
    backgroundColor: 'skyblue',
  },
  imageItem: {width: width / 4 - 2, height: width / 4 - 2, backgroundColor: 'gray', margin: 1},
  galeryImage: {
    height: '100%',
    width: '100%'
  },
  sequence: {
    width: 20, 
    height: 20, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255,255,255,0.3)', 
    borderWidth: 1, 
    borderColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    right: 2,
    top: 2
  }
  
})