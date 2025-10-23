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
    /* if the input is empty then dont write the sqrt */
    if(this.display.length == 0){
      return;
    }
      let char: string = this.display.charAt(this.display.length - 1);
      let x: number = this.display.length - 2;
      /* read the number until an operation*/
      while (x > 0 && !this.exp.includes(this.display.charAt(x))) {
        char = this.display.charAt(x) + char;
        x--;
      }
      /* add the sqrt sign behind the number*/
      if (char.length > 0 && x>0) {
        this.display = this.display.slice(0, x + 1);
        this.display += "√" + char;
        this.inner = this.display.slice(0,x + 1);
        this.inner += "√" + char;
      }
      /*add * sign */
     /* if(x > 0 &&x<this.display.length-1 && !this.exp.includes(this.display.charAt(x))) {
        this.display = this.display.slice(0, x+1) + "*" + this.display.slice(x+1,this.display.length);
        return;
      }*/
      /*there is no negative sqrt so everytime there is a negative number then we type the sqrt we get the negative of that number sqrt*/
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
      /*if the we want to make the next number negative not an operation */
        if(value == "-"){
          this.display+=value;
        }
          return;
    }
    if(this.display.length == 1 && this.display.charAt(0) == '-'){
      return;
    }
    /*not puttin 2 negative together*/
    if((this.display.charAt(this.display.length-1) =="-") && value=="-"){
      return;
    }
    if(value != "-" || this.display.length ==1){
      /*if 2 operation next of each other we remove the old one */
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
    /*to get the whole number*/
    while (x > 0 && this.display.charAt(x) != "+" && this.display.charAt(x) != "-") {
      char = this.display.charAt(x)+ char;
      x--;
    }
    /*if it is just one number */
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
    // switch the signs
    if(this.display.charAt(x) == "+") {
      this.display = this.display.slice(0, x) + "-" + char;
        this.inner = this.inner.slice(0, x) + "-" + char;
    }
    else{
      this.display = this.display.slice(0, x) + "+" + char;
      this.inner = this.inner.slice(0, x) + "+" + char;
    }
  }
  oneoverx(){
    let char: string = this.display.charAt(this.display.length - 1);
    let x: number = this.display.length - 2;
    // get the whole number
    while (x > 0 && !this.exp.includes(this.display.charAt(x))) {
      char = this.display.charAt(x) + char;
      x--;
    }
    // if there is only one number
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
    // send the expression to the server and get the result to show it
    this.calservice.calculate(this.display).subscribe({
      next:(res:string) => {this.display = res;
      this.inner=res;
      },
    error:() => this.display = "E"
    });
  }

  }

