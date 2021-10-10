const recipeFields = [
  {
    id: 'name',
    name: 'Name',
    type: 'Symbol',
    required: true
  },
  {
    name: 'Short description',
    id: 'shortDescription',
    type: 'Symbol',
    required: true,
    validations: []
  },
  {
    id: 'description',
    name: 'Description',
    type: 'Text',
    required: true
  },
  {
    id: 'slug',
    name: 'Slug',
    type: 'Symbol',
    required: true
  },
  {
    id: 'image',
    name: 'Image',
    type: 'Link',
    linkType: 'Asset',
    required: true
  },
  {
    id: 'publishDate',
    name: 'Publish Date',
    type: 'Date',
    required: true
  },
  {
    id: 'servings',
    name: 'Servings',    
    type: 'Integer',
    required: true,
    validations: [
      {
        range: {
          min: 1,
          max: 10
        },
        message: 'Value doesn`t apply to rules: must be in the range 1-10.'
      }
    ]
  },
  {
    id: 'ingredients',
    name: 'Ingredients',
    type: 'Array',
    required: true,
    validations: [],
    items: {
      type: 'Link',
      validations: [],
      linkType: 'Entry'
    }
  },
  {
    name: 'Cooking Time',
    id: 'cookingTime',
    type: 'Integer',
    required: true,
    validations: [
      {
        range: {
          min: 5,
          max: 240
        },
        message: 'Invalid cooking time. Must be in the range 5-240'
      }
    ]
  }
];

const ingredientsFields = [
  {
    id: 'name',
    name: 'Name',
    type: 'Symbol',    
    required: false,
    validations: []
  },
  {
    id: 'quantity',
    name: 'Quantity',
    type: 'Number',
    required: true,
    validations: []
  },
  {
    id: 'unit',
    name: 'Unit',
    type: 'Symbol',
    required: true,
    validations: []
  },
  {
    id: 'vegan',
    name: 'Vegan',
    type: 'Boolean',
    required: true,
    validations: []
  }
];

module.exports = function(migration){

  const ingredient = migration.createContentType('ingredient', {
    name: 'Ingredient',
    description: 'Ingredients for recipe',
    displayField: 'name'
  })

  ingredientsFields.forEach(i => {
    const options = {
      name: i.name,
      type: i.type,
      required: i.required
    };   

    ingredient.createField(i.id, options);
  })

  const recipe = migration.createContentType('recipe', {
    name: 'Recipe',
    description: 'Recipes for food',
    displayField: 'name'
  })

  recipeFields.forEach(r => {
    const options = {
      name: r.name,
      type: r.type,
      required: r.required
    };

    if(r.linkType){
      options.linkType = r.linkType;
    }

    if(r.items){
      options.items = r.items;
    }

    recipe.createField(r.id, options);
  })
}