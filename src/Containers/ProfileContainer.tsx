import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { AuthState, logout } from '@/Store/Auth';
import { navigateAndSimpleReset } from '@/Navigators/utils';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const doLogout = () => {
    dispatch(logout())
    navigateAndSimpleReset('Login', 0)
  }
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity onPress={doLogout} style={{backgroundColor: 'red', padding: 20, borderRadius: 10}}>
        <Text style={{color: '#FFF', fontSize: 50}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProfileContainer

const styles = StyleSheet.create({})