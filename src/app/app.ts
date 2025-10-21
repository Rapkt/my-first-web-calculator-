import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalculatorService, CalcResponse } from './calculatorservice';


  @Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
    exp: string[] = ["+", "-", "/", "*","%"];
  display: string='';
  inner:string='';
  constructor(private calservice: CalculatorService) { }
    sqrt() {
    if(this.display.length == 0){
      return;
    }
      let char: string = this.display.charAt(this.display.length - 1);
      let x: number = this.display.length - 2;
      while (x > 0 && !this.exp.includes(this.display.charAt(x))) {
        char = this.display.charAt(x) + char;
        x--;
      }
      if (char.length > 0 && x>0) {
        this.display = this.display.slice(0, x + 1);
        this.display += "√" + char;
        this.inner = this.display.slice(0,x + 1);
        this.inner += "√" + char;
      }
      if(x > 0 &&x<this.display.length-1 && !this.exp.includes(this.display.charAt(x))) {
        this.display = this.display.slice(0, x+1) + "*" + this.display.slice(x+1,this.display.length);
        return;
      }
      if(this.display.length == 0){
        return;
      }
      if(x <= 0){
        if(this.display.charAt(0) == '-'){
          this.display = this.display.slice(0,1) + '√' + this.display.slice(1,this.display.length);
          return;
        }
        this.display = "√" + this.display;
      }
    }
  press(value:string) {
    this.display += value;
    this.inner += value;
  }
  signs(value:string) {
    if(this.display.length == 0 ){
      if(this.exp.includes(value) || value =="^2") {
        if(value == "-"){
          this.display+=value;
        }
          return;
      }
    }
    if((this.display.charAt(0) == '-'|| this.display.charAt(this.display.length-1) =="-") && value=="-"){
      return;
    }
    if(value != "-"){
      if(this.exp.includes(this.display.charAt(this.display.length-1))) {
        this.display = this.display.slice(0,-1);
      }
    }
    this.display += value;
    this.inner += value;
  }
  switchsign() {
    let char: string = this.display.charAt(this.display.length - 1);
    let x: number = this.display.length - 2;
    while (x > 0 && this.display.charAt(x) != "+" && this.display.charAt(x) != "-") {
      char = this.display.charAt(x)+ char;
      x--;
    }
    if(x <= 0){
      if(this.display.charAt(0) == '-') {
        this.display = this.display.slice(1);
        this.inner = this.inner.slice(1);
      }
      else{
        this.display = "-" + this.display;
        this.inner = "-" + this.inner;
      }
      return;
    }
    if(this.display.charAt(x) == "+") {
      this.display = this.display.slice(0, x) + "-" + char;
      if (this.inner.charAt(x + 1) == "s") {
        this.inner = this.inner.slice(0, x ) + "-sqrt" + char;
      } else {
        this.inner = this.inner.slice(0, x) + "-" + char;
      }
    }
    else{
      this.display = this.display.slice(0, x) + "+" + char;
      this.inner = this.inner.slice(0, x) + "+" + char;
    }
  }
  oneoverx(){
    let char: string = this.display.charAt(this.display.length - 1);
    let x: number = this.display.length - 2;
    while (x > 0 && !this.exp.includes(this.display.charAt(x))) {
      char = this.display.charAt(x) + char;
      x--;
    }
    if(x <= 0){
      this.display = '1/' + this.display;
      this.inner = '1/' + this.display;
    }
    else{
      this.display = this.display.slice(0, x+1) + "1/" + char;
      this.inner = this.inner.slice(0, x+1) + "1/" + char;
    }
  }
  clear(){
    this.display = '';
    this.inner = '';
  }
  backspace(){
    this.display = this.display.slice(0, -1);
    this.inner = this.inner.slice(0, -1);
  }
  calculate(){
    this.calservice.calculate(this.display).subscribe({
      next:(res:string) => {this.display = res;
      this.inner=res;
      },
    error:() => this.display = "E"
    });
  }

  }

