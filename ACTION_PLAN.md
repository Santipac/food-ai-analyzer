# Action Plan - Pulso Challenge

Given the flexible criteria for the challenge itself, I opted to create a web app that serves as an MVP of what Pulso might have been in its early stages. This web app will be AI-Based. Before I start writing code on a new project I like to put together an action plan with the non-technical (business logic) and technical criteria.

## Objectives and Focus

The idea is to develop the application with the 3 suggested output types. We will try to cover the 3 types of user inputs (text, audio, and photo).

## Technical Choices

Since this is a project that requires no more than approximately 4 hours of work, we will use the following technologies:

- **Next.js:** Allows creating both frontend and backend in the same application, speeding up development.
- **Vercel AI SDK:** Easy-to-configure library with Next.js for interacting with LLM models.
- **Zustand:** Global state manager to avoid boilerplate (instead of `useReducer`, `useContext`).
- **localStorage:** As a database for certain user information.
- **Tailwind CSS and Shadcn/ui:** To have components and styles that are quick to implement, with a good user experience (UX) and a modern appearance.

## Detailed Action Plan

1.  **Text Form:**
    - Develop a form with a text input where the user will send information about what they are eating.
    - Provide information on macronutrients, personalized tips, etc., based on user input.
2.  **User Onboarding:**

    - Create an onboarding process prior to interaction with meals.
    - Collect relevant user information such as gender, height, weight, goal (weight loss, muscle gain, maintenance), activity level, etc.

3.  **Image Upload:**
    - Add the ability to upload an image of the food.
    - Pass the image to the AI for interpretation, using an additional description provided in the text field if necessary.
4.  **Audio Input (If we have time):**
    - Analyze the remaining time.
    - If feasible, add audio/voice input functionality.
    - Implement speech-to-text for the LLM call.
5.  **Chat with message streaming (If we have time and as an extra):**
    - If there is enough time, and although it is not a requirement of the challenge, adding chat functionality for users to ask questions would be a nice to have.

## Additional Considerations

- This plan is designed to be a robust MVP (Minimum Viable Product).
- Central functionality will be prioritized over secondary features.
- Shortcuts taken due to time constraints will be documented.
