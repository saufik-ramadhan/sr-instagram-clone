/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import buttonStyles from './components/Buttons'
import { CommonParams } from './theme'

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.white,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.silver,
        backgroundColor: Colors.whiteSmoke,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 5
      },
      textWhite: {
        color: Colors.white
      },
      textLink: {
        color: Colors.lightSkyBlue
      },
      textPrimary: {
        color: Colors.text
      },
      footer: {
        position: 'absolute', 
        bottom: 0, 
        alignSelf: 'center'
      },
      /** Border */
      borderA: {borderWidth: 1, borderColor: Colors.gray},
      borderT: {borderTopWidth: 1, borderColor: Colors.gray},
      borderB: {borderBottomWidth: 1, borderColor: Colors.gray},
      borderL: {borderLeftWidth: 1, borderColor: Colors.gray},
      borderR: {borderRightWidth: 1, borderColor: Colors.gray}
    }),
  }
}
