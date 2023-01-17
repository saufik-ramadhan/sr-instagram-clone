import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useSelector } from 'react-redux'
import { AuthState } from '@/Store/Auth'

const StartupContainer = () => {
  const { Layout, Common, Fonts } = useTheme()

  const { t } = useTranslation()
  const currentAuth = useSelector((state: { auth: AuthState }) => state.auth)

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )
    await setDefaultTheme({ theme: 'default', darkMode: null })

    navigateAndSimpleReset( currentAuth.token === '' ? 'Login' : 'Main')
  }

  useEffect(() => {
    init()
  })

  return (
    <View style={[Layout.fill, Layout.colCenter, Common.backgroundPrimary]}>
      <Brand icon height={50} width={50}/>
      {/* <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} /> */}
      {/* <Text style={Fonts.textCenter}>{t('welcome')}</Text> */}
    </View>
  )
}

export default StartupContainer
