import * as ingredients from './ingredientsService'
import * as preparations from './preparationsService'
import * as recipes from './recipesService'

export const services = {
  recipes,
  ingredients,
  preparations,

  storage: {
    imagePath:
      'https://qbpggrbuovxfpilacupj.supabase.co/storage/v1/object/public/ingredients',
  },
}
