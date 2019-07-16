import {Ingredient} from "../models/ingredient";

export class ShoppingListService{
  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    // console.log(this.ingredients);
  }

  addMultipleItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getIngredents() {
    return this.ingredients.slice();
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index,1);
  }
}
