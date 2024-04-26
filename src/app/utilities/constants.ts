export interface PromptParams {
    age: number | null,
    destination: string,
    fullName: string,
    about: string
}

export interface ResponseModel  {
    id:string;
    object: string;
    created:number;
    model:string;
    choices:choices[];
    usage:usage;
    system_fingerprint: string
}

export interface choices {
    message:string;
    index:number;
    logprobs:any;
    finish_reason:string;
}

export interface usage {
    prompt_tokens:number;
    completion_tokens: number;
    total_tokens:number;
}

export interface StoryModel {
    fullName: string;
    response: string;
}