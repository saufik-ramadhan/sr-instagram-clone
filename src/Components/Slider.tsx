import { Dimensions, FlatList, Image, ImageSourcePropType, StyleSheet, Text, View, Animated, ViewToken, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { FC, useRef, useState } from 'react'
// import Animated from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SliderItem {
  uri: string
}
const SliderItem = (props: SliderItem) => {
  return (
    <View style={{width}}>
      <Image style={styles.image} source={{uri: props.uri}} resizeMethod='resize' resizeMode='cover'/>
    </View>
  )
}



interface Pagination {
  data: SliderItem[],
  scrollX?: any,
  index: number
}
const Pagination = (props: Pagination) => {
  return (
    <View style={styles.pagination}>
      {props.data.map((_,idx) => {
        // const inputRange = [(idx-1)*width, idx * width, (idx + 1)*width]
        // const dotWidth = props.scrollX.interpolate({
        //   inputRange,
        //   outputRange: [10, 20, 10],
        //   extrapolate: 'clamp'
        // })
        return <View key={idx.toString()} style={[styles.dot, {
          backgroundColor: props.index === idx ? '#308DD9' : '#a7a7a7'
        }]} />
      })}
    </View>
  )
}



interface Slider {
  data: SliderItem[]
}
const Slider = (props: Slider) => {
  const [index, setindex] = useState<number>(0);
  
  // const scrollX = useRef(new Animated.Value(0)).current;
  // const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   // Animated event
  //   Animated.event(
  //     [
  //       {
  //         nativeEvent: {
  //           contentOffset: {
  //             x: scrollX
  //           }
  //         }
  //       }
  //     ], 
  //     {
  //       useNativeDriver: false
  //     }
  //   )(event)
  // }
  
  const handleOnViewableItemsChanged = useRef(({viewableItems}: {viewableItems: ViewToken[]}) => {
    setindex(viewableItems[0].index || 0)
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current

  return (
    <View style={styles.container}>
      <FlatList 
        horizontal
        pagingEnabled
        snapToAlignment='center'
        showsHorizontalScrollIndicator={false}
        data={props.data}
        keyExtractor={(_,idx) => idx.toString()}
        renderItem={({item, index}) => (
          <SliderItem {...item} />
        )}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {/** Snap Position */}
      {props.data.length > 1 ? 
        <View style={styles.snapPosition}>
          <Text style={styles.snapPositionText}>{index + 1}/{props.data.length}</Text>
        </View> :
        <View style={{height: 50}} />
      }

      {/** Snap Dots (indicator) */}
      {props.data.length > 1 && <Pagination data={props.data} index={index} />}
    </View>
  )
}

export default Slider

const styles = StyleSheet.create({
  container: {
  },
  listContainer: {
  },
  snapPosition: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    width: 40,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    right: 10,
    top: 10
  },
  snapPositionText: {
    color: '#FFFFFF'
  },
  image: {
    height: 300,
    width: '100%'
  },
  pagination: {flexDirection: 'row', justifyContent: 'center', marginVertical: 20},
  dot: {
    height: 6,
    width: 6,
    borderRadius: 5,
    backgroundColor: '#a7a7a7',
    marginHorizontal: 2
  }
})