import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
  providedIn: 'root'
})
export class InMemoryWordServiceService extends InMemoryDbService {


  createDb(): 
  
  { 
   // checkAnswer: {"status":string,"answer":string,"message":string,"matchInfo":string[]}, 
   checkAnswer : ["dummy"], 
   saveAnswer : { status: string } 
  } 
  
  
  {
      return {   
        checkAnswer: ["dummy"],
        //checkAnswer : {"status":"SUCCESS","answer":"loyal","message":"Successful Answer Test","matchInfo":["missing","missing","missing","present","missing"]},
        saveAnswer: { status: 'SUCCESS' }
      }
  }
}
