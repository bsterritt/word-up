import { Component, OnInit } from '@angular/core';
import { WordCheckerService } from './word-checker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'word-up';

  constructor(
    private wordChecker : WordCheckerService, 
  ) {

  }



  ngOnInit(): void {
    // save the secret answer word
    this.wordChecker.saveRandomWord();
  }
}
