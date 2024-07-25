# Field Builder

## Introduction

This repository showcases my work for the Quick Base Front End Craft Demo assignment.

**Field Builder** is a React-based application that provides a form interface for creating and managing customizable fields. The application supports various features such as adding, editing, and removing choices, setting default choices, configuring display orders, and toggling multiselect and required options.

This project demonstrates the use of advanced React concepts and best practices in building a robust and scalable form builder application.

## Live Demo

The live demo of this application is deployed and available for testing at [Field Builder](https://field-builder.surge.sh/)

### Custom API Service Implementation

Instead of using the suggested Mocky service, I implemented a custom backend service that accepts, validates, and processes the data submitted by the frontend application. The backend service ensures the submitted data meets all specified criteria. It adds the default choice to the list of choices and truncates the text of each choice to the maximum allowed length of 40 characters. In case of errors or data validation problems, it returns appropriate status codes and human-readable messages for any validation errors.

For more details, refer to the [API repository](https://github.com/atorov/qb-field-builder-api).

The API is deployed on Railway.app and is publicly accessible at: <https://qb-field-builder-api-production.up.railway.app/api/>

-   GET <https://qb-field-builder-api-production.up.railway.app/api/health>
-   POST <https://qb-field-builder-api-production.up.railway.app/api/builder>

## How the App Works

-   **UI Components**: This project does not use a pre-built component library for building the user interface. Instead, it implements a small and relatively simple custom design system and a set of reusable components. Most of the components in this library are very close to standard HTML elements and do not contain any business logic. In theory, this makes it relatively easy to replace them with others without affecting the core functionality of the application.
-   **Frontend Data Validation**: The application implements frontend data validation to assist the user during their interaction with the application, ensuring that data is correctly entered before submission.
-   **API Integration**: The `useSubmitData` hook manages form submission, adapting the state to the backend format and handling API responses. The data sent to and received from the API service is validated, ensuring better runtime protection against invalid or corrupted data.
-   **Advanced State Management**: The app utilizes **React Context**, **React Query**, and **Zod** for efficient state management, data fetching, and data validation.
-   **Persistent State**: Saves and loads the application state to and from local storage, ensuring that user data is retained across sessions.
-   **User-Friendly Interface**: Provides a responsive and intuitive user interface with real-time feedback.
-   **Error Handling**: The application provides comprehensive validation and error messages to guide users in providing valid inputs.

### Additional Features and Enhancements

The project meets the mandatory requirements outlined in the task description and includes additional features, such as:

-   **Responsive UI**: The user interface is responsive, providing a comfortable user experience on both desktop and mobile devices.
-   **Highlighting Long Entries**: Items in the choices list that exceed 40 characters are highlighted, indicating the portion that will not be saved to the database. Users are also informed during input if this limit is exceeded.
-   **Item Limit for Demo**: For demonstration purposes, the choices list is limited to 5 items (instead of the suggested 50), making it easier to showcase edge cases and how the application handles them.
-   **Persistent State**: The current working state and user-entered data are saved to the browser's local storage, ensuring that data is not lost when the browser is closed or the page is refreshed.
-   **Testing Environment**: A testing environment is set up using the Vitest library, and a number of unit tests have been written.

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/atorov/qb-field-builder-fe.git
    cd qb-field-builder-fe
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

-   **App**: Sets up the main application component, wrapping it with necessary providers for React Query and Builder Context.
-   **Builder**: Defines the main `Builder` component.
-   **BuilderContext**: Contains context, provider, reducer, and state management logic for the builder.
-   **components**: Re-exports various UI components used in the application, such as `Banner`, `Button`, `Checkbox`, etc.
-   **models**: Contains constants, types, and validation schemas used throughout the application.
-   **shared**: Contains shared utility functions and hooks, such as `useSubmitData`, `beToFeDataAdapter`, `useDebounce`, `splitString`, and `feToBeDataAdapter`.
