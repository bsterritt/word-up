import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LetterStateService {

  // states
  UNCHECKED: String = "unchecked";
  PRESENT: String = "present";
  MATCHED: String = "matched";
  MISSING: String = "missing";
  ERROR: String = "error";

  // colors

  defaultColour: String = "light-grey";
  missingColour: String = "dark-grey";
  presentColour: String = "yellow";
  matchedColour: String = "green";

  colourMap: Map<String,String> = new  Map<String,String>([
    [this.UNCHECKED,this.defaultColour],
    [this.MISSING,this.missingColour],
    [this.PRESENT,this.presentColour],
    [this.MATCHED,this.matchedColour],
  ]);

  // string constants
  BACK: string = "BACK";
  ENTER: string = "ENTER";

  checkedLetters:  Map<String, String>  = new Map<String, String>();

  clearLetterStates() {
    this.checkedLetters.clear();
  }

  setLetterState(letter: String, state: String) {
    this.checkedLetters.set( letter, state);
  }

  getLetterState( letter: String  ) {
    return this.checkedLetters.get(letter);
  }

  getColourForLetter(letter: String) {
    let state: String = this.getLetterState(letter) || this.getDefaultState();
    return this.colourMap.get(state);
  }

  getColourForState(state: String): String | undefined {
   return this.colourMap.get(state);
  }

  getDefaultState(): String {
    return this.UNCHECKED;
  }

  getDefaultColour(): String {
    return this.defaultColour;
  }

  constructor() { }
}
