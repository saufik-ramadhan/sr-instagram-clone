import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand, ORSeparator, GithubSigninButton } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { changeTheme, ThemeState } from '@/Store/Theme'
import { authorize } from 'react-native-app-auth';
import { setAuth } from '@/Store/Auth'
import { navigateAndReset, navigateAndSimpleReset } from '@/Navigators/utils'

// base config
const config = {
  issuer: 'https://github.com/login/oauth/authorize',
  clientId: '7ab0008f74a09701fa07',
  redirectUrl: Platform.OS === 'android'
      ? 'msauth://com.instagramapp'
      : 'com.instagramapp://msauth'
};

const config2 = {
  issuer: 'https://github.com',
  clientId: '7ab0008f74a09701fa07',
  clientSecret: '7ad7dd5d6e9d727537a0108325f570607ccd867e',
  redirectUrl: Platform.OS === 'android'
      ? 'ghauth://com.instagramapp'
      : 'ghauth://com.instagramapp',
  scopes: ['user'],
  additionalHeaders: { 'Accept': 'application/json' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:'https://github.com/settings/connections/applications/7ab0008f74a09701fa07'
  }
} 

const LoginContainer = () => {
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout, Colors } = useTheme()
  const dispatch = useDispatch()

  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()

  const onGithubSignin = async () => {
    try {
      const api = await authorize(config2)
      const user = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `Bearer ${api.accessToken}`
        }
      })
      const info = await user.json();

      dispatch(
        setAuth({
          token: api.accessToken,
          user: {
            userName: info.name,
            id: info.id,
          },
        }),
      )

      navigateAndSimpleReset('Main', 0);

    } catch (error) {
      console.warn(error)
    }
  }

  useEffect(() => {
    fetchOne(userId)
  }, [fetchOne, userId])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }
  return (
    <KeyboardAvoidingView style={[Layout.fill, Common.backgroundPrimary]} behavior='padding'>
      <SafeAreaView style={[Layout.fill]}>
      <ScrollView
        style={Layout.fill}
        contentContainerStyle={[
          Layout.fill,
          Layout.colCenter,
          Gutters.smallHPadding,
          Common.backgroundPrimary
        ]}
      >
        <View style={[[Layout.colCenter, Gutters.smallHPadding, Layout.fullWidth]]}>
          <Brand height={100}/>
          {[
            {placeholder: 'Phone number, username or email'}, 
            {placeholder: 'Password'}
          ].map((i,k) => (
            <TextInput 
              key={k}
              style={[
                Common.textInput,
                Layout.fullWidth, 
                Fonts.textLeft,
                Gutters.smallHPadding
              ]}
              placeholder={i.placeholder}
            />
          ))}
          <TouchableOpacity style={[Gutters.smallTMargin, Common.button.rounded, Layout.fullWidth]}>
            <Text style={[Fonts.textCenter, Common.textWhite]}>
              Log In
            </Text>
          </TouchableOpacity>
          <View style={[Layout.rowCenter, Gutters.regularTMargin]}>
            <Text style={[Layout.colCenter]}>
              Forgot your login details?
            </Text>
            <TouchableOpacity>
              <Text style={[Common.textLink]}> Get help logging in.</Text>
            </TouchableOpacity>
          </View>

          <ORSeparator style={[Gutters.largeTMargin]} />
          {/** OR (OAUTH 2.0) */}


          <GithubSigninButton style={[Gutters.regularTMargin]} onPress={onGithubSignin}/>




        </View>
        
      </ScrollView>
      <View style={[Layout.rowCenter, Gutters.regularVPadding, Common.borderT]}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity><Text style={[Common.textLink]}>Sign up</Text></TouchableOpacity>
      </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default LoginContainer