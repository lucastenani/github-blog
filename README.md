# GitHub Issues Blog Documentation

## Project Description

The GitHub Issues Blog is a web application that leverages the GitHub API to fetch and display issues from a repository, as well as showcase user profile information in a blog format. The project is based on a popular open-source front-end job repository, allowing users to explore and filter issues and view detailed posts about each issue.

## GitHub Actions
GitHub Actions have been implemented to run tests automatically. This ensures that the application remains robust and reliable by validating code changes in a continuous integration workflow.

<!-- ## Project URL

- -->
## Libraries Used

- **react-hook-form**: For creating uncontrolled forms.
- **zod**: For schema and type validation.
- **phosphor-icons**: For customizable icons.
- **react-query**: For server state management and data caching.
- **axios**: For making HTTP requests.
- **date-fns**: For date manipulation and formatting.
- **react-helmet-async**: For managing document metadata.
- **react-markdown**: For rendering markdown content.
- **react-router-dom**: For routing and page navigation.
- **sonner**: For notifications.
- **tailwind**: For utility-first styling.
- **eslint**: For linting and code quality.
- **testing-library**: For component testing.
- **happy-dom**: For DOM simulation in tests.
- **msw**: For mocking and intercepting network requests.
- **tailwindcss**: For utility-first styling.

## Features

- Displays the user profile with image, number of followers, name, and other information available from the GitHub API.
- Lists and filters all issues from the repository, providing a brief summary of each.
- Dedicated page to view the complete content of an issue (post).

## Folder Structure

- **src/**:
  - **api/**: Contains API calls and mocks.
  - **assets/**: Images and other static resources.
  - **components/**: Reusable components of the application.
  - **lib/**: Utilities including axios, react-query, and others.
  - **pages/**: Application pages.
  - **app.tsx**: Main application component.
  - **env.ts**: Contains type definitions for environment variables.
  - **globals.css**: Global styles.
  - **main.tsx**: Entry point of the application.
  - **routes.tsx**: Application routing configuration.
- **test/**: End-to-end tests.

## Prerequisites

Ensure you have the following installed before running the application locally:

:warning: [Node.js](https://nodejs.org/en/download/)

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

```bash
  git clone https://github.com/lucastenani/github-blog.git
```
2. Navigate to the project directory:

```bash
cd github-blog/
```

3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

