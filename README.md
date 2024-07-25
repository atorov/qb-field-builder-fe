# [WORK IN PROGRESS] Project Name: Field Builder

## Project Description

Field Builder is a React-based application that provides a form interface for creating and managing customizable fields. The application supports various features such as adding, editing, and removing choices, setting default choices, configuring display orders, and toggling multiselect and required options. The app uses React Query for data fetching and state management, and Zod for data validation. This project demonstrates the use of advanced React concepts and best practices in building a robust and scalable form builder application.

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone <TODO:>
    cd <TODO:>
    ```

2. **Install dependencies**:

    ```sh
    npm install
    ```

    Alternatively, you can use the following command if you encounter dependency conflicts:

    ```sh
    npm install --legacy-peer-deps
    ```

3. **Run the development server**:

    ```sh
    npm run dev
    ```

## Scripts

-   **dev**: Starts the Vite development server.
-   **build**: Compiles the TypeScript code and builds the Vite production bundle.
-   **preview**: Serves the built application using Vite's preview feature.
-   **test**: Runs all tests using Vitest.
-   **test:coverage**: Runs tests and generates a code coverage report.
-   **test:watch**: Runs tests in watch mode for development.

## Project Structure

### `src` Directory

-   **App**: Sets up the main application component, wrapping it with necessary providers for React Query and builder context.
-   **Builder**: Defines the `Builder` component, handling form interactions, state management, and API integration.
-   **BuilderContext**: Contains context, provider, reducer, and state management logic for the builder.
-   **components**: Re-exports various UI components used in the application, such as `Banner`, `Button`, `Checkbox`, etc.
-   **models**: Contains constants, types, and validation schemas used throughout the application.
-   **shared**: Contains shared utility functions and hooks, such as `useSubmitData`, `beToFeDataAdapter`, `useDebounce`, `splitString`, and `feToBeDataAdapter`.

## How the App Works

1. **State Management**:

    - The application uses React Context to manage state, with a reducer to handle state updates based on dispatched actions.
    - The state is saved to and loaded from localStorage to maintain persistence across sessions.

2. **Form Handling**:

    - The `Builder` component provides a form interface for managing field configurations.
    - It includes features like adding, removing, and editing choices, setting defaults, and configuring display order.

3. **Data Validation**:

    - Zod schemas are used to validate data transferred between the backend and the frontend, ensuring type safety at runtime. Additionally, custom validation functions are used to validate user-entered field data before submission to the backend.

4. **API Integration**:

    - The `useSubmitData` hook manages form submission, adapting the state to the backend format and handling API responses. It also validates the incoming and outgoing data as explained above.

5. **Debouncing**:

    - The `useDebounce` hook is used to reduce the number of saves to local storage, improving performance and user experience.

6. **Error Handling**:
    - The application provides comprehensive validation and error messages to guide users in providing valid inputs.

## Live Demo

The live demo of this API is deployed on Railway.app and is publicly accessible at <TODO:>.

The application is also live and available for testing at <TODO:>.
