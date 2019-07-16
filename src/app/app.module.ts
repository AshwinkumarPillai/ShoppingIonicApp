import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import {TabsPage} from "../pages/tabs/tabs";
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {RecipePage} from "../pages/recipe/recipe";
import {RecipesPage} from "../pages/recipes/recipes";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {ShoppingListService} from "../services/shopping-list";
import { RecipesService } from '../services/recipes';
import { ProfilePage } from '../pages/profile/profile';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    EditRecipePage,
    RecipePage,
    RecipesPage,
    ShoppingListPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipesService,
    GooglePlus,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
