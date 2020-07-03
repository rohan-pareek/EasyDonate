import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  @HostListener('keydown', ['$event']) onKeyDown(e) {
    if (
      (e.key === 'a' && e.ctrlKey === true) ||
      (e.key === 'c' && e.ctrlKey === true) ||
      (e.key === 'v' && e.ctrlKey === true) ||
      (e.key === 'x' && e.ctrlKey === true) ||
      (e.key === 'a' && e.metaKey === true) ||
      (e.key === 'c' && e.metaKey === true) ||
      (e.key === 'v' && e.metaKey === true) ||
      (e.key === 'x' && e.metaKey === true)
    ) {
      return;  
    }
    
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
  }

  constructor() { }

}
