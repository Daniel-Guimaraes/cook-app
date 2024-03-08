import { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'

import { router } from 'expo-router'

import { Ingredient } from '@/components/Ingredient'
import { Loading } from '@/components/Loading'
import { Selected } from '@/components/Selected'
import { services } from '@/services'

import { styles } from './styles'

export default function Index() {
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState<string[]>([])
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected(selected.filter((item) => item !== value))
    }

    setSelected((prevState) => [...prevState, value])
  }

  function handleClearSelected() {
    Alert.alert(
      'Limpar',
      ' Deseja realmente limpar todos os itens selecionados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Limpar', onPress: () => setSelected([]) },
      ],
    )
  }

  function handleSearch() {
    router.navigate('/recipes/' + selected)
  }

  useEffect(() => {
    services.ingredients
      .findAll()
      .then(setIngredients)
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha {'\n'}
        <Text style={styles.subtitle}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
      </Text>

      <ScrollView
        contentContainerStyle={styles.ingredients}
        showsVerticalScrollIndicator={false}
      >
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.id}
            name={ingredient.name}
            image={ingredient.image}
            selected={selected.includes(ingredient.id)}
            onPress={() => handleToggleSelected(ingredient.id)}
          />
        ))}
      </ScrollView>

      {selected.length > 0 && (
        <Selected
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={handleSearch}
        />
      )}
    </View>
  )
}
