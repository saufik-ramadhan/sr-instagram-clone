import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

const { width } = Dimensions.get('screen');

interface Pagination {
  data: any[],
  scrollX?: any,
  index: number
}
const Pagination: FC<Pagination> = (props) => {
  return (
    <View style={styles.pagination}>
      {props.data.map((_,idx) => {
        
        /** This can be used whenever pagination needs to be animated */
        // const inputRange = [(idx-1)*width, idx * width, (idx + 1)*width]
        // const dotWidth = props.scrollX.interpolate({
        //   inputRange,
        //   outputRange: [10, 20, 10],
        //   extrapolate: 'clamp'
        // })

        return <View key={idx.toString()} style={[styles.dot, {
          backgroundColor: props.index === idx ? 'skyblue' : '#a7a7a7'
        }]} />
      })}
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  pagination: {flexDirection: 'row', justifyContent: 'center', marginTop: 10},
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#a7a7a7',
    marginHorizontal: 2
  }
})