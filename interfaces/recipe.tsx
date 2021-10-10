export interface IngredientMetadata {
  sys: any;
  fields: Ingredient;
}
export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  vegan: boolean;
}

export interface Recipe {
  name: string;
  shortDescription: string;
  description: string;
  slug: string;
  image: string;
  publishedAt: Date;
  cookingTime: number;
  servings: number;
  ingredients: IngredientMetadata[];
}

export interface RecipeWithId extends Recipe {
  id: string;
}