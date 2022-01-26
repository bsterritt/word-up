import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LetterStateService } from '../letter-state.service';

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
    this.keyPressEvent.emit(k);
  }

  getLetterColour(k: string) {
    if (k.length == 1) {
      return this.letterStates.getColourForLetter(k);
    }
    return this.letterStates.getDefaultColour();
    
  }
  
  
  constructor( private letterStates: LetterStateService ) { }

  ngOnInit(): void {
  }

}
