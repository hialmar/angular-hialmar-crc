import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  a = '100110000';
  b = '101';
  error = '';


  constructor() {
    this.divide(this.toArray(this.a), this.toArray(this.b));
  }

  changeA(item:any){
    let value=item.value;
    let pos=item.selectionStart;
    if (!(new RegExp('^[0-1]+$').test(value)))
    {
      item.value=this.a=value.replace(/[^0-1]+/g, '');
      item.selectionStart = item.selectionEnd = pos-1;
    }
  }
  
  changeB(item:any){
    let value=item.value;
    let pos=item.selectionStart;
    if (!(new RegExp('^[0-1]+$').test(value)))
    {
      item.value=this.b=value.replace(/[^0-1]+/g, '');
      item.selectionStart = item.selectionEnd = pos-1;
    }
  }
  // All algos are from https://asecuritysite.com/comms/crc_div

  toArray(p: string) : number[] {
    let tab = [];
    let tabStr = p.split('');
    for(let i = 0; i < tabStr.length; i++) {
      if(tabStr[i] !== '0' && tabStr[i] !== '1') {
        this.error = 'You should input binary strings';
        return tab;
      }
      tab.push(parseInt(tabStr[i]));
    }
    return tab;
  }

  toSimpleString(p: number[]) : string {
    let s = '';
    for(let i = 0; i < p.length; i++) {
      s += p[i];
    }
    return s;
  }

  toPolyString(p: number[]) : string {
    let s = '';
    const nobits = p.length;
    for(let i = 0; i < nobits-2; i++) {
      if(p[i]===1) {
        if(s.length === 0) {
          s += 'x^'+(nobits-i-1);
        } else {
          s += '+x^'+(nobits-i-1);
        }
      }
    }
    if(nobits >= 2 && p[nobits-2] === 1) {
      if(s.length === 0) {
          s += 'x';
        } else {
          s += '+x';
        }
    }
    if(nobits >= 1 && p[nobits-1] === 1) {
      if(s.length === 0) {
          s += '1';
        } else {
          s += '+1';
        }
    }
    return s;
  }

  quotient = [];
  remainder = [];

  generateDashes(nb: number): string {
    let s = '';
    for(let i=0; i<nb; i++)
      s += '-'
    return s;
  }
  generateZeroes(nb: number): string {
    let s = '';
    for(let i=0; i<nb; i++)
      s += '0'
    return s;
  }

  working = '';
  divide(a: number[], b: number[]) {
    if(b.length == 0) {
      this.error = 'b should not be empty';
      return;
    }
    this.working=this.toSimpleString(a)+'\n';
    let addspace='';
    this.quotient = [];
    this.remainder = [];

    while (b.length <= a.length) {
      if(a[0] === 1) {
        a.shift();
        for(let j=0; j<b.length-1; j++) {
          a[j] ^= b[j+1];
        }
        if(a.length>0) {
          this.working += addspace+this.toSimpleString(b)+'\n';
          this.working += addspace+this.generateDashes(b.length)+'\n';
          addspace+= ' ';
          this.working += addspace+this.toSimpleString(a)+'\n';
          this.quotient.push(1);
        }
      } else {
        a.shift();
        this.working += addspace+this.generateZeroes(b.length)+"\n"
			  this.working += addspace+this.generateDashes(b.length)+'\n';
			  addspace+=' ';
			  this.working += addspace+this.toSimpleString(a)+'\n';
        this.quotient.push(0);
      }
    }
    this.remainder = a;
    this.error = '';
  }

}

