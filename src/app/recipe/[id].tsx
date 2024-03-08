import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Redirect, router, useLocalSearchParams } from 'expo-router'

import { Ingredients } from '@/components/Ingredients'
import { Loading } from '@/components/Loading'
import { Step } from '@/components/Step'
import { services } from '@/services'

import { styles } from './styles'

export default function Recipes() {
  const [isLoading, setIsLoading] = useState(true)
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null)
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [preparations, setPreparations] = useState<PreparationsResponse[]>([])

  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    services.recipes
      .show(id)
      .then((response) => setRecipe(response))
      .finally(() => setIsLoading(false))
  }, [setIsLoading, setRecipe, id])

  useEffect(() => {
    services.ingredients
      .findByRecipeId(id)
      .then((response) => setIngredients(response))
  }, [setIngredients, id])

  useEffect(() => {
    services.preparations
      .findByRecipeId(id)
      .then((response) => setPreparations(response))
  }, [setPreparations, id])

  if (isLoading) {
    return <Loading />
  }

  if (!id || !recipe) {
    return <Redirect href="/" />
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons
            size={32}
            name="arrow-back"
            onPress={() => router.back()}
          />

          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>
        </View>

        <Ingredients ingredients={ingredients} />

        <View>
          <Text style={styles.preparation}>Modo de preparado</Text>

          <FlatList
            data={preparations}
            renderItem={({ item }) => (
              <Step step={item.step} description={item.description} />
            )}
            contentContainerStyle={{ gap: 30 }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}
