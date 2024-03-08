import { useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'

import { Ingredients } from '@/components/Ingredients'
import { Loading } from '@/components/Loading'
import { Recipe } from '@/components/Recipe'
import { services } from '@/services'

import { styles } from './styles'

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true)
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [recipes, setRecipes] = useState<RecipeResponse[]>([])

  const params = useLocalSearchParams<{ ingredientsIds: string }>()

  const ingredientsIds = params.ingredientsIds.split(',')

  useEffect(() => {
    services.ingredients
      .findByIds(ingredientsIds)
      .then(setIngredients)
      .finally(() => setIsLoading(false))
  }, [setIngredients, ingredientsIds])

  useEffect(() => {
    services.recipes.findByIngredientsIds(ingredientsIds).then(setRecipes)
  }, [setRecipes, ingredientsIds])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={24} onPress={router.back} />
      </View>

      <Text style={styles.title}>Receitas</Text>

      <Ingredients ingredients={ingredients} />

      <FlatList
        data={recipes}
        keyExtractor={(recipe) => recipe.id}
        renderItem={({ item: recipe }) => (
          <Recipe
            recipe={recipe}
            onPress={() => router.navigate('/recipe/' + recipe.id)}
          />
        )}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 16 }}
        numColumns={2}
      />
    </View>
  )
}
