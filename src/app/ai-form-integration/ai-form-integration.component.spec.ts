import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiFormIntegrationComponent } from './ai-form-integration.component';
import * as OpenAI from 'openai';

describe('AiFormIntegrationComponent', () => {
  let component: AiFormIntegrationComponent;
  let fixture: ComponentFixture<AiFormIntegrationComponent>;
  let openaiMock: any;
  beforeEach(() => {
    openaiMock = jasmine.createSpyObj('OpenAI', ['chat']);
    TestBed.configureTestingModule({
      declarations: [AiFormIntegrationComponent],
      providers: [{ provide: OpenAI, useValue: openaiMock }]
    });
    fixture = TestBed.createComponent(AiFormIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial properties correctly', () => {
    expect(component.inpParams.fullName).toBe('');
    expect(component.inpParams.age).toBeNull();
    expect(component.generatedStory.length).toBe(0);
    expect(component.displayTheStory).toBeFalsy();
    expect(component.displayLoader).toBeFalsy();
  });

  it('should reformInp correctly', () => {
    component.inpParams = {
      fullName: 'John Doe',
      age: 30,
      destination: 'Paris',
      about: 'history'
    };
    const expectedString = `I am John Doe, I am 30years old and I am travelling to Paris and during my travel I want to read a story about history `;
    expect(component.reformInp()).toBe(expectedString);
  });

  it('should handle successful GPT response', async () => {
    const mockResponse = {
      choices: [
        { message: { content: 'This is a generated story content.' } }
      ]
    };
    openaiMock.chat.completions.create.and.returnValue(Promise.resolve(mockResponse));

    await component.invokeGPT();

    expect(component.displayLoader).toBeFalsy();
    expect(component.displayTheStory).toBeTruthy();
    expect(component.generatedStory.length).toBe(1);
    expect(component.generatedStory[0].fullName).toBe('John Doe'); // Assuming initial name is set
    expect(component.generatedStory[0].response).toBe('This is a generated story content.');
  });

  it('should handle error during GPT invocation', async () => {
    const error = new Error('Mocked error');
    openaiMock.chat.completions.create.and.returnValue(Promise.reject(error));

    await component.invokeGPT();

    expect(component.displayLoader).toBeFalsy();
    expect(component.displayTheStory).toBeFalsy();
    expect(component.generatedStory.length).toBe(0);
  });

  it('should handle empty choices in GPT response', async () => {
    const mockResponse = { choices: [] };
    openaiMock.chat.completions.create.and.returnValue(Promise.resolve(mockResponse));

    await component.invokeGPT();

    expect(component.displayLoader).toBeFalsy();
    expect(component.displayTheStory).toBeFalsy();
    expect(component.generatedStory.length).toBe(0);
  });

  it('should emit displayLandingPage event on goBackToMain', () => {
    const spy = spyOn(component.displayLandingPage, 'emit');

    component.goBackToMain();

    expect(spy).toHaveBeenCalledWith('hideAIFrm');
  });
});

