import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-journey-buddy',
  templateUrl: './journey-buddy.component.html',
  styleUrls: ['./journey-buddy.component.css']
})
export class JourneyBuddyComponent implements OnInit{

  displayAIFrm: boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }

  showPromptFrm() {
    this.displayAIFrm = true;
  }

  showMainPage(event) {
    if (event == 'hideAIFrm') {
      this.displayAIFrm = false;
    }
  }
}
