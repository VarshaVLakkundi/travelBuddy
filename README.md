# travelBuddy
**Travel Buddy**: AI-Powered Story Adventures (Prototype)

**Introduction**
Welcome to Travel Buddy, an interactive story app for children! This prototype uses the power of Artificial Intelligence (AI) to generate engaging, personalized stories based on your child's travel aspirations.

**Features**
* **Interactive Storytelling**: Kids take charge of their adventure! They'll choose their name, age, travel destination, and story theme, shaping exciting tales with each decision.
* **AI-Powered Creativity**: OpenAI's advanced AI models craft stories tailored to your child's interests, fostering a love for language and exploration.
* **Kid-Friendly Safety**: Inappropriate prompts are automatically rephrased, ensuring a safe and enjoyable experience for all young adventurers.
* **Responsive Design**: Travel Buddies adapts seamlessly to any device, whether kids are exploring on their desktops, tablets, or smartphones.

**Technology Stack**
* **Frontend** : Angular 16
* **CSS** : Tailwind CSS
* **Bootstrap**
* **AI**: OpenAI API
* **OpenAI Model**: gpt-3.5-turbo
  

**Getting Started**
* Clone the repository
* **Install Dependencies**
  ```
  $ cd journeybud
  $ npm install
  $ ng serve
 
  ```
**Configure OpenAI API Key:**
* Create an OpenAI account and obtain an API key.
* Create a file named .env in the project root directory.
* Add the following line to .env, replacing YOUR_OPENAI_API_KEY with your actual key
```
apiKey = YOUR_OPENAI_API_KEY
```
**Usage**
* Visit http://localhost:4200 in your browser.
* Enter the child's name, age, travel destination, and story theme.
* Click the "Generate Story" button.
* Enjoy the AI-powered adventure tailored to the child's choices!
  
