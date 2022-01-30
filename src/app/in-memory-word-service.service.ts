import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryWordServiceService extends InMemoryDbService {


  createDb(): 
  
  { 
   checkAnswer : ["dummy"], 
   saveAnswer : { status: string } 
  } 
  
  
  {
      return {   
        checkAnswer: ["dummy"],
        saveAnswer: { status: 'SUCCESS' }
      }
  }
}
