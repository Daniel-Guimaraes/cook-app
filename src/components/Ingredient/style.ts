import { StyleSheet } from 'react-native'

import { theme } from '@/theme'

export const style = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: theme.colors.gray_200,
    borderRadius: theme.borderRadius.full,
    paddingHorizontal: 16,
    height: 42,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },

  title: {
    fontSize: theme.fonts.size.body.sm,
    fontFamily: theme.fonts.family.medium,
  },

  image: {
    width: 16,
    height: 16,
  },

  selected: {
    borderColor: theme.colors.green_600,
    borderWidth: 2,
    backgroundColor: theme.colors.green_100,
  },
})
