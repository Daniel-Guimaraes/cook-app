import { StyleSheet } from 'react-native'

import { theme } from '@/theme'

export const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 32 },

  header: {
    paddingTop: 62,
    marginBottom: 12,
  },

  title: {
    fontSize: theme.fonts.size.heading.md,
    fontFamily: theme.fonts.family.bold,
    marginTop: 22,
  },

  recipes: {},

  recipesContainer: {},
})
