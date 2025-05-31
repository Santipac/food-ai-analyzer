# Project Changelog - Initial Stage

## Initial Version (Stage 1)

In this first stage of the project, the foundations of the application were laid, and the main functionalities related to nutritional analysis were implemented.

### Implemented Features:

1.  **Development Environment Setup:**

    - Project initialized with **Next.js** for full-stack development with React.
    - Integration of **Tailwind CSS** for rapid and stylized design using utility classes.
    - Implementation of **Shadcn/ui** for pre-designed, accessible, and customizable UI components.
    - Configuration of the **Vercel AI SDK** for interaction with AI language models.

2.  **Interactive Nutritional Analysis:**

    - An API endpoint (`/api/nutrition-analysis`) was developed that receives the user's food description.
    - This endpoint uses a language model (GPT-3.5 Turbo via OpenAI and Vercel AI SDK) to analyze the food.
    - The AI model was instructed (via a detailed system prompt) to return a nutritional analysis in a structured JSON format and in the same language as the user's query.
    - The JSON response contract includes: dish name, calories, macronutrient breakdown (proteins, carbohydrates, fats, fiber with grams and percentages), an array of micronutrients (name, amount, daily value), a list of nutritional tips, and an overall health score (`healthScore`).

3.  **Visualization of Nutritional Statistics:**

    - A component (`NutritionOverview`) was implemented to clearly and attractively display the nutritional statistics returned by the API.
    - This component visualizes: total calories, health score (with a progress bar and a descriptive label), and grams of proteins, carbohydrates, and fats.
    - Optional data handling was applied in the UI to display "N/A" or similar messages if any part of the nutritional information is unavailable, preventing errors and improving the user experience.

4.  **User Interface and Experience Improvements:**
    - Styles were adjusted for better presentation of user and AI messages, as well as loading and error indicators.

### Shortcuts

In this stage 1, where we already have a functional MVP, I decided to cut down on application design time by using v0. This allowed me to concentrate on building a good prompt and functionality.

### Total time invested in this stage

2h

## Stage 2 - Onboarding for expand user information

In this second stage I decide to add an onboarding user form to expand our knowledge of user and improve the LLM's output based on this new information.

### Implemented features:

1. **Onboarding Flow**
   - Onboarding form to have more information about the user such as age, gender, height, weight, etc.
   - Zustand State Management Library added to save in LocalStorage this user's information without boilerplate.

### Shortcuts

In this stage I didn't use shortcuts because wasn't needed.

### Total time invested on this stage && Tradeoffs

1h. For this reason I probably don't build the photo and audio functionality because I think, I will spend more than an hour. But, I will create a chat feature for the user experience.

## Stage 3 - Chat feature

In this third stage I decided to add an chat feature instead of photo / audio input functionality because I don't have much experience with that and I haven't much time left.

### Implemented features:

1. **Chat Feature**
   - I added an new endpoint to streaming data from LLM model and I generated the base prompt
   - I added a chat feature such as Morfeo from Pulso but a minimal version of that. For user's doubts, tips, etc.
   - I fixed some bugs in the home page when user ask again for nutrition information.

### Shortcuts

In this stage I didn't use shortcuts because wasn't needed. The implementation of chat feature was really easy because AI SDK Docs have an example of How to do a minimal chat with the library and streaming data

### Total time invested on this stage && Tradeoffs

1h 10min. I think I could improve design and UX, add animations but I don't have more time. My main objective was create a really good functionality instead of spend time on design.
