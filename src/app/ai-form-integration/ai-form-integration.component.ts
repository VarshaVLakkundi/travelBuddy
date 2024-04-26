import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PromptParams, ResponseModel, StoryModel } from '../utilities/constants';
import { OpenAI } from 'openai';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-ai-form-integration',
  templateUrl: './ai-form-integration.component.html',
  styleUrls: ['./ai-form-integration.component.css'],
})
export class AiFormIntegrationComponent implements OnInit{
  @Output() displayLandingPage = new EventEmitter<any>()

  inpParams: PromptParams = {
    fullName: '',
    age: null,
    destination: '',
    about: ''
  }
  generatedStory: StoryModel []=[];
  error: any;
  aiResponse: any;
  userName: string;
  displayTheStory: boolean = false;
  displayLoader: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.inpParams)
  }

  onSubmit() {
    this.invokeGPT();
    
  }

  getText(data:string) {
    return data.split('\n').filter(f=>f.length>0);
  }

  reformInp() {
    let arr = Object.values(this.inpParams);
    this.userName = arr[0];
    let contentStr = `I am ${arr[0]}, I am ${arr[1]}years old and I am travelling to ${arr[2]} and during my travel I want to read a story about ${arr[3]} `;
    return contentStr;
  }

  pushStoryContent(content:string) {
    const storyToDisplay: StoryModel = {fullName: this.userName, response: content};
    this.generatedStory.push(storyToDisplay);
  }

  async invokeGPT() {
    this.displayLoader = true;
    this.generatedStory = [];
    let openai = new OpenAI({
      apiKey: environment.apiKey,
      dangerouslyAllowBrowser: true
    });
    const prompt = "If it is age inappropriate, respond with another story, without asking questions.";

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt + this.reformInp() }],
        model: "gpt-3.5-turbo",
        temperature: 0.95,
        // max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        
      }).then(res => {
        this.handleResponse(res)
      });

      
    } catch (error) {
      console.error("Error while invoking GPT:", error);
    }

    
  }

  handleResponse(completion: any) {
    console.log(completion);
    this.displayLoader = false;
    if (completion && completion.choices && completion.choices.length > 0) {
      const content = completion.choices[0].message.content.trim();

      this.aiResponse = completion as ResponseModel;
      this.displayTheStory = true;
      this.pushStoryContent(content);
    } else {
      console.error("Error: No choices found in completion response.");
    }
  }

  goBackToMain() {
    this.displayLandingPage.emit('hideAIFrm');
  }

}