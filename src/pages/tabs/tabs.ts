import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RecipesPage} from "../recipes/recipes";
import {ShoppingListPage} from "../shopping-list/shopping-list";
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  rcPage = RecipesPage;
  slPage = ShoppingListPage;
  profilePage = ProfilePage;
  selectedIndex = 0;
    
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


}
