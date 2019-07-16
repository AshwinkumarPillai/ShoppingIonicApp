import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipesService } from '../../services/recipes';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode = 'New';
  difficulty = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navCtrl: NavController, private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private toastCtrl: ToastController, private recipeService: RecipesService) {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0) {
      ingredients = value.ingredients.map( name => {
        return {name: name, amount: 1};
      });
    }

    if( this.mode == 'Edit') {
      this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty , ingredients);
    }
    else{
      this.recipeService.addRecipe(value.title, value.description, value.difficulty , ingredients);
    }

    
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngerdients(){
    const actionSheet = this.actionSheetCtrl.create({
      title:'How may I help you?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all ingredients',
          role: 'destructive',
          handler: () => {
            const FArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = FArray.length;
            if(len > 0) {
              for(let i = len-1; i >= 0; i--) {
                FArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were removed',
                duration: 1500
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if(data.Name.trim() == '' || data.Name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please Enter a valid name',
                duration: 1500
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.Name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'Ingredients Added Successfully',
              duration: 1500
            });
            toast.present();
          }
        }
      ]
    });
  }


  private initializeForm() {

    let title = null;
    let description = null;
    let difficulty = null;
    let ingredients = [];

    if( this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
}
