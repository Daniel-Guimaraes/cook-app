import { Image, Pressable, PressableProps, Text } from 'react-native'

import { style } from './style'

export type IngredientProps = {
  name: string
  image: string
  selected?: boolean
}

export function Ingredient({
  image,
  name,
  selected = false,
  ...rest
}: IngredientProps & PressableProps) {
  return (
    <Pressable style={[style.container, selected && style.selected]} {...rest}>
      <Image source={require('@/images/apple.png')} style={style.image} />
      <Text style={style.title}>Maçã</Text>
    </Pressable>
  )
}
