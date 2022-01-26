import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.sass']
})
export class KeyboardComponent implements OnInit {
   @Input() onKeyClick (k: String): void {};
   @Output() keyPressEvent = new EventEmitter<String>();

  keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['BACK','Z', 'X', 'C', 'V', 'B', 'N', 'M','ENTER'],
  ];


  
  handleKeyClick(k: String): void {
    //console.log(' KEYboard component onKeyClick ' + k);
    this.keyPressEvent.emit(k);
    // this.onKeyClick(k);
  }
  
  
  constructor() { }

  ngOnInit(): void {
  }

}
