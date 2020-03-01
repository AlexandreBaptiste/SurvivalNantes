import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
// Do not import @types/file-saver
import * as saver from 'file-saver';
// Known bug
import * as profileFile from '../Saves/ProfileSave.json';
import { IProfile } from '../Interfaces/IProfile';
import { TestBed } from '@angular/core/testing';

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
  headSelectedA : boolean = false;
  leftShoulderSelectedA : boolean = false;
  rightShoulderSelectedA : boolean = false;
  leftArmSelectedA : boolean = false;
  rightArmSelectedA : boolean = false;
  chestSelectedA : boolean = false;
  stomachSelectedA : boolean = false;
  leftLegSelectedA : boolean = false;
  rightLegSelectedA : boolean = false;
  leftHandSelectedA : boolean = false;
  rightHandSelectedA : boolean = false;
  leftFootSelectedA : boolean = false;
  rightFootSelectedA : boolean = false;

  // Stress & HP
  hp : number = 100;
  stress : number = 25;
  hpAymeric : number = 100;
  stressAymeric : number = 25;

  // Cards
  mehdiCardOpacity   : number = 0;
  aymericCardOpacity : number = 0;

  // Tools
  toolsDisplay : boolean = false;
  loadedData : any;
  hasBeenSaved : boolean = false;
  alert : boolean = false;
  action : string;
  state : string;

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

  // Change color of the selected body part
  selectBodyPartA(id: string): void {
    switch(id){
      case('head'):
        this.headSelectedA = (this.headSelectedA) ? false : true;
        break;
      case('left-shoulder'):
        this.leftShoulderSelectedA = (this.leftShoulderSelectedA) ? false : true;
        break;
      case('right-shoulder'):
        this.rightShoulderSelectedA = (this.rightShoulderSelectedA) ? false : true;
        break;
      case('left-arm'):
        this.leftArmSelectedA = (this.leftArmSelectedA) ? false : true;
        break;
      case('right-arm'):
        this.rightArmSelectedA = (this.rightArmSelectedA) ? false : true;
        break;
      case('chest'):
        this.chestSelectedA = (this.chestSelectedA) ? false : true;
        break;
      case('stomach'):
        this.stomachSelectedA = (this.stomachSelectedA) ? false : true;
        break;
      case('right-leg'):
        this.rightLegSelectedA = (this.rightLegSelectedA) ? false : true;
        break;
      case('left-leg'):
        this.leftLegSelectedA = (this.leftLegSelectedA) ? false : true;
        break;
      case('right-hand'):
        this.rightHandSelectedA = (this.rightHandSelectedA) ? false : true;
        break;
      case('left-hand'):
        this.leftHandSelectedA = (this.leftHandSelectedA) ? false : true;
        break;
      case('right-foot'):
        this.rightFootSelectedA = (this.rightFootSelectedA) ? false : true;
        break;
      case('left-foot'):
        this.leftFootSelectedA = (this.leftFootSelectedA) ? false : true;
        break;
      default:
        break;
    }    
  }
  
  // Update "HP/STRESS" height for Mehdi
  updateHpStress(form: NgForm): void {
    if(form.value.hpInput <= 100 && form.value.stressInput <= 100){
      this.hp = form.value.hpInput;
      this.stress = form.value.stressInput;
    } else {
      this.hp = 100;
      this.stress = 100;
    }    
  }

  // Update "HP/STRESS" height for Aymeric
  updateHpStressAymeric(form: NgForm): void {
    if(form.value.hpInputAymeric <= 100 && form.value.stressInputAymeric <= 100) {
      this.hpAymeric = form.value.hpInputAymeric;
      this.stressAymeric = form.value.stressInputAymeric;
    } else {
      this.hpAymeric = 100;
      this.stressAymeric = 100;
    }    
  }

  // Id Card Click
  manageIdCard(player: string): void {
    if(player == "mehdi"){
      this.mehdiCardOpacity = (this.mehdiCardOpacity == 1) ? 0 : 1;
    } else {
      this.aymericCardOpacity = (this.aymericCardOpacity == 1) ? 0 : 1;
    }
  }

  // Tools 
  manageTools(): void {
    this.toolsDisplay = (this.toolsDisplay) ? false : true;
  }

  // Save current game state
  save(): void {
    let saveString = JSON.stringify({mHP: this.hp, mSS: this.stress, aHP: this.hpAymeric, aSS: this.stressAymeric});
    let saveFile   = new Blob([saveString],   {type: 'application/json;charset=utf-8'});
    saver(saveFile, 'ProfileSave.json');
    this.action = "Sauvegarde";
    this.state = "réussie";
    this.alert = true;
  }

  // Load at the previous game state
  load(): void {
    this.action = "Chargement";
    this.alert = true;

    if(profileFile != null){
      this.loadedData = (profileFile as any).default;
      this.hp = this.loadedData.mHP;
      this.stress = this.loadedData.mSS;
      this.hpAymeric = this.loadedData.aHP;
      this.stressAymeric = this.loadedData.aSS;      
      this.state = "réussi";    
    } else {
      this.state = "échoué, merci de vérifier si le fichier existe"
    }
  }

  // Reset everything
  reset(): void {
    this.state = "En cours de développement..."
  }

  closeAlert(): void {
    this.alert = false;
  }
}
