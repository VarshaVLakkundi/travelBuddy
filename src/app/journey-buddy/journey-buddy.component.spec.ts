import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JourneyBuddyComponent } from './journey-buddy.component';

describe('JourneyBuddyComponent', () => {
  let component: JourneyBuddyComponent;
  let fixture: ComponentFixture<JourneyBuddyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JourneyBuddyComponent],
      imports: [
        FormsModule,

      ]
    });
    fixture = TestBed.createComponent(JourneyBuddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initially hide the AI form', () => {
    expect(component.displayAIFrm).toBeFalsy();
  });

  it('should show the AI form on showPromptFrm call', () => {
    component.showPromptFrm();
    expect(component.displayAIFrm).toBeTruthy();
  });

  it('should hide the AI form on showMainPage with correct event', () => {
    component.displayAIFrm = true; // Set it to true first
    component.showMainPage('hideAIFrm');
    expect(component.displayAIFrm).toBeFalsy();
  });

  it('should not hide the AI form on showMainPage with incorrect event', () => {
    component.displayAIFrm = true; // Set it to true first
    component.showMainPage('wrongEvent');
    expect(component.displayAIFrm).toBeTruthy();
  });
});
