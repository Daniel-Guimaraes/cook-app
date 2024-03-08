import { ScrollView } from 'react-native'

import { Ingredient, IngredientProps } from '@/components/Ingredient'

import { styles } from './styles'

type Props = {
  ingredients: IngredientProps[]
}

export function Ingredients({ ingredients }: Props) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.ingredientsContent}
      showsHorizontalScrollIndicator={false}
    >
      {ingredients.map((ingredient) => (
        <Ingredient
          key={ingredient.name}
          name={ingredient.name}
          image={ingredient.image}
        />
      ))}
    </ScrollView>
  )
}
