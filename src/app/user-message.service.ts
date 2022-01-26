import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserMessageService {

  constructor() { }

  // TODO: make something nice
  showMessage(msg: String): void {
    alert(msg);
  }
}
