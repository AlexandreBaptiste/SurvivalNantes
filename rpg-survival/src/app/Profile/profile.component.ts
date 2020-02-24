import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // Body parts selected
  headSelected : boolean = false;
  leftShoulderSelected : boolean = false;
  rightShoulderSelected : boolean = false;
  leftArmSelected : boolean = false;
  rightArmSelected : boolean = false;
  chestSelected : boolean = false;
  stomachSelected : boolean = false;
  leftLegSelected : boolean = false;
  rightLegSelected : boolean = false;
  leftHandSelected : boolean = false;
  rightHandSelected : boolean = false;
  leftFootSelected : boolean = false;
  rightFootSelected : boolean = false;

  // Stress & HP
  hp : number = 100;
  stress : number = 10;
  hpAymeric : number = 100;
  stressAymeric : number = 0;

  // Cards
  mehdiCardOpacity   : number = 0;
  aymericCardOpacity : number = 0;

  constructor() {}

  ngOnInit(): void {
  }

  // Change color of the selected body part
  selectBodyPart(id: string): void {
    switch(id){
      case('head'):
        this.headSelected = (this.headSelected) ? false : true;
        break;
      case('left-shoulder'):
        this.leftShoulderSelected = (this.leftShoulderSelected) ? false : true;
        break;
      case('right-shoulder'):
        this.rightShoulderSelected = (this.rightShoulderSelected) ? false : true;
        break;
      case('left-arm'):
        this.leftArmSelected = (this.leftArmSelected) ? false : true;
        break;
      case('right-arm'):
        this.rightArmSelected = (this.rightArmSelected) ? false : true;
        break;
      case('chest'):
        this.chestSelected = (this.chestSelected) ? false : true;
        break;
      case('stomach'):
        this.stomachSelected = (this.stomachSelected) ? false : true;
        break;
      case('right-leg'):
        this.rightLegSelected = (this.rightLegSelected) ? false : true;
        break;
      case('left-leg'):
        this.leftLegSelected = (this.leftLegSelected) ? false : true;
        break;
      case('right-hand'):
        this.rightHandSelected = (this.rightHandSelected) ? false : true;
        break;
      case('left-hand'):
        this.leftHandSelected = (this.leftHandSelected) ? false : true;
        break;
      case('right-foot'):
        this.rightFootSelected = (this.rightFootSelected) ? false : true;
        break;
      case('left-foot'):
        this.leftFootSelected = (this.leftFootSelected) ? false : true;
        break;
      default:
        break;
    }    
  }

  // Update "HP/STRESS" height for Mehdi
  updateHpStress(form: NgForm): void {
    this.hp = form.value.hpInput;
    this.stress = form.value.stressInput;
  }

  // Update "HP/STRESS" height for Aymeric
  updateHpStressAymeric(form: NgForm): void {
    this.hpAymeric = form.value.hpInputAymeric;
    this.stressAymeric = form.value.stressInputAymeric;
  }

  // Id Card Click
  manageIdCard(player: string): void {
    if(player == "mehdi"){
      this.mehdiCardOpacity = (this.mehdiCardOpacity == 1) ? 0 : 1;
    } else {
      this.aymericCardOpacity = (this.aymericCardOpacity == 1) ? 0 : 1;
    }
  }
}
