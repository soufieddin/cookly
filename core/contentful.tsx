import { createClient, Sys } from 'contentful';
import { Recipe, RecipeWithId } from '../interfaces/recipe';
export const CONTENT_TYPE_RECIPE = 'recipe';

export interface FieldMetadata { 
  sys: Sys; 
  fields: Recipe;
}

export interface SystemFields {
  id: string;
  createdAt: Date;
}

const SpaceId = "y4oca49q1gv6";
const Token = "dqb6AR4cxGfYxijlMz8v-mJXOBxOEQYYeJnRUaQ_48U";

export class ContentfulService {
  private client = createClient({
    space: SpaceId,
    accessToken: Token
  });

  async fetchRecipeBySlug(slug: string){
    return await this.client.getEntries<Recipe>({
      content_type: CONTENT_TYPE_RECIPE,
      'fields.slug': slug
    });
  }

  public async getRecipeEntries(){
    try {
      const contents = await this.client.getEntries<Recipe>({
        include: 1,
        limit: 100, 
        skip: 0,
        content_type: CONTENT_TYPE_RECIPE,
        order: 'fields.publishDate',
      });

      const entries = contents.items
        .map((metadata: FieldMetadata) : RecipeWithId => {
          const { sys, fields } = metadata;
          return {
            id: sys.id,
            name: fields.name,
            description: fields.description,
            shortDescription: fields.shortDescription,
            image: fields.image.fields.file.url,
            slug: fields.slug,
            cookingTime: fields.cookingTime,
            servings: fields.servings,
            ingredients: fields.ingredients,
            publishDate: fields.publishDate
              ? new Date(fields.publishDate)
              : new Date(sys.createdAt)
          };
        });
      
      const total = contents.total;

      return { entries, total };
    } catch (error) {
      console.log(error);
    }
  }

  public async getRecipeBySlug(slug: string){
    try {
      const content = await this.fetchRecipeBySlug(slug);

      const entry : FieldMetadata = content.items[0];

      return {
        id: entry.sys.id,
        name: entry.fields.name,
        description: entry.fields.description,
        shortDescription: entry.fields.shortDescription,
        image: entry.fields.image.fields.file.url,
        slug: entry.fields.slug,
        cookingTime: entry.fields.cookingTime,
        servings: entry.fields.servings,
        ingredients: entry.fields.ingredients,
        publishedAt: entry.fields.publishDate
          ? new Date(entry.fields.publishDate)
          : new Date(entry.sys.createdAt)
      }
    } catch (error) {
      console.log(error);
    }
  }
}