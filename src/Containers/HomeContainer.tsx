import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ImageSourcePropType, SafeAreaView } from 'react-native'
import React, { FC, useState } from 'react'
import { Topbar, Dropdown, Slider, Pagination, PostActionButton } from '@/Components'
import { useTheme } from '@/Hooks'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { navigate } from '@/Navigators/utils'
import { useSelector } from 'react-redux'
import { PostState } from '@/Store/Post'

interface Post {
  author?: string,
  profileUri?: any,
  images: {uri: string}[],
  likes?: number,
  detail: string,
  comments?: number,
  statusRead?: boolean
}
const Post = (props: Post) => {
  const { Gutters, Layout, Images } = useTheme();
  const [isExpanded, setisExpanded] = useState(false);
  // return <Text>{JSON.stringify(props)}</Text>
  return (
    <View>
      {/** Author */}
      <View style={[Layout.row, Layout.alignItemsCenter, Gutters.smallHMargin, Layout.justifyContentBetween, Gutters.tinyVPadding]}>
        {/** Author detail */}
        <View style={[Layout.row, Layout.alignItemsCenter]}>
          <TouchableOpacity style={[styles.smallCircleContainer]}>
            <Image source={Images.user_undefined} style={styles.smallProfileImage} resizeMode={'cover'} />
          </TouchableOpacity>
          <TouchableOpacity style={[Gutters.tinyLMargin, props.statusRead && {borderColor: 'transparent'}]}>
            <Text>{props.author}</Text>
          </TouchableOpacity>
        </View>
        {/** More icon */}
        <Feather name='more-vertical' size={15} onPress={() => null}/>
      </View>

      {/** Image */}
      <Slider data={props.images} />

      {/** Like, Comment, Share, (Navigation for multiple photos), Bookmark */}
      <PostActionButton 
        style={[styles.postActionButton]} 
        onPressBookmark={() => console.warn('bookmark')}
        onPressComment={() => console.warn('comment')}
        onPressLike={() => console.warn('like')}
        onPressSend={() => console.warn('send')}
      />

      {/** Likes count */}
      {props.likes !== undefined && <Text style={styles.likesCount}>{props.likes} likes</Text> }

      {/** Detail */}
      <Text style={[styles.description]} numberOfLines={isExpanded ? 0 : 2} onPress={() => {
        if(!isExpanded) setisExpanded(true)
      }}>
        <Text style={[styles.author]}>{props.author}{' '}</Text>
        {props.detail}
      </Text>

      {/** Count Comment (> 0 comment, show comment when clicked) */}

      {/** Add a comment... */}

    </View>
  )
}



const ProfileStatus = () => {
  const { Gutters, Layout, Images, Colors } = useTheme()
  return (
    <FlatList 
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[Gutters.tinyBPadding, Gutters.smallLPadding]}
      keyExtractor={(item, key) => key.toString()}
      data={[
        {username: 'Your story', profileUri: Images.user_undefined},
        {username: 'johnbardeen', profileUri:Images.johnbardeen},
        {username: 'w.shockley', profileUri:Images.w_shockley},
        {username: 'walter.b', profileUri:Images.walter_b},
        {username: 'jack.kilby.ic', profileUri:Images.jack_kilby_ic},
        {username: 'morethanmoore', profileUri:Images.morethanmoore},
      ]}
      renderItem={({item, index}) => (
        <TouchableOpacity style={[{width: 60}, Gutters.smallRMargin]}>
          <View style={[styles.circleContainer, index === 0 && {borderColor: 'transparent'}]}>
            <Image source={item.profileUri} style={styles.profileImage} resizeMode={'cover'} />
            {index === 0 && <AntDesign name='pluscircle' color={Colors.lightSkyBlue} style={styles.plusIcon} size={15}/>}
          </View>
          <Text style={[{fontSize: 10, textAlign: 'center'}]} numberOfLines={1}>{item.username}</Text>
        </TouchableOpacity>
      )}
    /> 
  )
  // <View style={styles.horizontalLine} />
}



const HomeContainer = () => {
  const { Gutters, Layout, Common, Images, Colors } = useTheme()
  const [selected, setSelected] = useState({});
  const currentPosts = useSelector((state: { post: PostState }) => state.post.posts)
  const data = [
    { label: 'One', value: '1' },
    { label: 'Two', value: '2' },
    { label: 'Three', value: '3' },
    { label: 'Four', value: '4' },
    { label: 'Five', value: '5' },
  ];
  const postsData = [
    {author:'johnbardeen', profileUri:Images.johnbardeen, images: [{uri: Images.first_ic}, {uri: Images.intel_4004}], likes: 1, comments: 0, statusRead: false, detail: 'John Bardeen, (born May 23, 1908, Madison, Wis., U.S.—died Jan. 30, 1991, Boston, Mass.), American physicist who was cowinner of the Nobel Prize for Physics in both 1956 and 1972. He shared the 1956 prize with William B. Shockley and Walter H. Brattain for their joint invention of the transistor. With Leon N. Cooper and John R. Schrieffer he was awarded the 1972 prize for development of the theory of superconductivity.'},
    {author:'w.shockley', profileUri:Images.w_shockley, images: [{uri: Images.first_transitor}], likes: 1, comments: 0, statusRead: false, detail: 'William B. Shockley, in full William Bradford Shockley, (born Feb. 13, 1910, London, Eng.—died Aug. 12, 1989, Palo Alto, Calif., U.S.), American engineer and teacher, cowinner (with John Bardeen and Walter H. Brattain) of the Nobel Prize for Physics in 1956 for their development of the transistor, a device that largely replaced the bulkier and less-efficient vacuum tube and ushered in the age of microminiature electronics.'},
    {author:'walter.b', profileUri:Images.walter_b, images: [{uri: Images.john_bardeen_teaching}], likes: 1, comments: 0, statusRead: false, detail: 'Walter H. Brattain, in full Walter Houser Brattain, (born Feb. 10, 1902, Amoy, China—died Oct. 13, 1987, Seattle, Wash., U.S.), American scientist who, along with John Bardeen and William B. Shockley, won the Nobel Prize for Physics in 1956 for his investigation of the properties of semiconductors—materials of which transistors are made—and for the development of the transistor. The transistor replaced the bulkier vacuum tube for many uses and was the forerunner of microminiature electronic parts.'},
    {author:'jack.kilby.ic', profileUri:Images.jack_kilby_ic, images: [{uri: Images.intel_4004}], likes: 1, comments: 0, statusRead: false, detail: 'Jack Kilby, in full Jack St. Clair Kilby, (born Nov. 8, 1923, Jefferson City, Mo., U.S.—died June 20, 2005, Dallas, Texas), American engineer and one of the inventors of the integrated circuit, a system of interconnected transistors on a single microchip. In 2000 Kilby was a corecipient, with Herbert Kroemer and Zhores Alferov, of the Nobel Prize for Physics.'},
    {author:'morethanmoore', profileUri:Images.morethanmoore, images: [{uri: Images.transistor_inventors}], likes: 1, comments: 0, statusRead: false, detail: 'Gordon Moore, in full Gordon E. Moore, (born January 3, 1929, San Francisco, California, U.S.), American engineer and cofounder, with Robert Noyce, of Intel Corporation. Moore studied chemistry at the University of California, Berkeley (B.S., 1950), and in 1954 he received a Ph.D. in chemistry and physics from the California Institute of Technology (Caltech), Pasadena. After graduation, Moore joined the Applied Physics Laboratory at Johns Hopkins University in Laurel, Maryland, where he examined the physical chemistry of solid rocket propellants used by the U.S. Navy in antiaircraft missiles.'},
  ]

  return (
    <SafeAreaView style={[Common.backgroundPrimary, Layout.fill]}>
      {/*<Topbar />*/}
      <View style={[Layout.row, Layout.justifyContentBetween, Layout.alignItemsCenter, Gutters.regularHPadding, Gutters.regularVPadding]}>
        <Dropdown 
          style={[Layout.row]}
          label="Select Item" 
          data={data} 
          onSelect={setSelected}
          component={<Image source={Images.ig_logo} style={{height: 30, width: 100}} resizeMode='contain' />}
        />
        <View style={[Layout.row, Layout.justifyContentAround]}>
          {[
            {name: 'plus-square', onPress: () => navigate('ImagePicker', {})},
            {name: 'heart', onPress: () => null},
            {name: 'message-circle', onPress: () => null}
          ].map((i,k) => (
            <TouchableOpacity key={k} style={[Gutters.regularLMargin]}><Feather name={i.name} onPress={i.onPress} size={25}/></TouchableOpacity>
          ))}
        </View>
      </View>

      {/* <Profile and Friend Status> */}

      {/** <Instagram Posts> */}
      <FlatList
        ListHeaderComponent={
          <>
            <ProfileStatus />
            <View style={styles.horizontalLine} />
            {/* <Text>{JSON.stringify(currentPosts)}</Text> */}
          </>
        }
        showsVerticalScrollIndicator={false}
        data={currentPosts}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Post {...item}/>
        )}
      />

    </SafeAreaView>
  )
}

export default HomeContainer

const styles = StyleSheet.create({
  circleContainer: {
    borderRadius: 50,
    borderWidth: 2, 
    height: 60, 
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  smallCircleContainer: {
    borderRadius: 50,
    borderWidth: 1, 
    marginRight: 10,
    padding: 2
  },
  profileImage: {height: 50, width: 50, borderRadius: 50},
  smallProfileImage: {height: 25, width: 25, borderRadius: 50},
  horizontalLine: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#a7a7a7'
  },
  plusIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  postActionButton: {
    marginTop: -35,
    marginBottom: 10,
    marginHorizontal: 10
  },
  likesCount: {
    marginHorizontal: 10,
    fontWeight: '600',
    fontSize: 13
  },
  description: { marginHorizontal: 10, fontSize: 13 },
  author: {
    fontWeight: '600',
    fontSize: 13
  },
})