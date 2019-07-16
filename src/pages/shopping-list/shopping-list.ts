import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../models/ingredient";

import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  ingredients: Ingredient[];
  key: number = 1;
//   switch(key) { 
//     case "A": { 
//        console.log("Excellent"); 
//        break;  
//     } 
//     case "B": { 
//        console.log("Good"); 
//        break; 
//     } 
//     case "C": {
//        console.log("Fair"); 
//        break;    
//     } 
//     case "D": { 
//        console.log("Poor"); 
//        break; 
//     }  
//     default: { 
//        console.log("Invalid choice"); 
//        break;              
//     } 
//  }
  constructor(private slService: ShoppingListService, private alertCtrl: AlertController, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.onLoad();
  }

  onAddIngredient(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.ingamount);
    // this.ingredients = this.slService.getIngredents();
    console.log('Name:  ' + form.value.ingredientName+ '  amount: ' + form.value.ingamount);
    this.onLoad();
    form.reset();
  }

  onLoad() {
    this.ingredients = this.slService.getIngredents();
  }


  onClose(id: number) {
    const alert = this.alertCtrl.create({
      title:'Remove this item',
      message:'This will remove the selected item from the list',
      cssClass:'alertbtn',
      buttons: [
        {
          text:'Remove',
          handler: () =>{
            this.slService.removeIngredient(id);
            this.onLoad();
          }
        },
        {
          role:'cancel',
          text:'Cancel',
          cssClass:'cancelbtn',
          handler:() =>{
            console.log('Popup Cancelled');
          }
        }
      ]
    });
    alert.present();
  }

 

  changebg1() {
    $('.main').css("opacity","0");
    setTimeout(() => {
      $('.main').css("opacity","1");  
    $('.main').css("background-image", "linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.1)),url(https://images.pexels.com/photos/255501/pexels-photo-255501.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)");
    },500);
    this.menuCtrl.close();
  }
  changebg2() {
    $('.main').css("opacity","0");
    setTimeout(() => {
      $('.main').css("background-image", "linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.1)),url(https://wallpaperspit.com/wp-content/uploads/2017/11/Natural-Beach-HD-Wallpapers-1080p.jpeg)");
        $('.main').css("opacity","1");
    },500);
    this.menuCtrl.close();
  }
  changebg3() {
    $('.main').css("opacity","0");
    setTimeout(() => {
    $('.main').css("background-image", "linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.1)),url(https://i.pinimg.com/originals/a0/eb/1d/a0eb1d0d3a2f7b646552542047b2bfdb.jpg)");
    $('.main').css("opacity","1");
    },500);
    this.menuCtrl.close();
  }
  changebg4() {
    $('.main').css("opacity","0");
    setTimeout( () => {
    $('.main').css("opacity","1");
    $('.main').css("background-image", "linear-gradient(rgba(255,255,255,.9), rgba(255,255,255,.1)),url(https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)");
    },500);
    this.menuCtrl.close();
  }

}
