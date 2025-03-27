# RETROTHON-020
# Project Name : part 1: DevSync Platform

## 1. Team Name
**[Your Team Name Here]**

## 2. Team Members
| Name | Contact Number | Email |
|------|---------------|-------|
| [Vrashab Timmannavar] | [9422642149] | [vrashab.dev@gmail.com] |
| [Vardhaman Ganpule] | [91684 36525] | [vardhaman.ganpule@gmail.com] |
| [Ishan Parab] | [] | [74990 14563] | [ishanparab@yahoo.com] |

## 3. Individual Contributions
- **[Member 1]**: Backend development, API integration
- **[Member 2]**: Frontend development, UI/UX design
- **[Member 3]**: Database management, DevOps

## 4. Folder Structure (Summarized)
```
backend/
 ├── node_modules/
 ├── src/
 ├── .env
 ├── docker-compose.yml
 ├── Dockerfile
 ├── package.json
 ├── README.md

public/

src/

root directory/
 ├── .gitignore
 ├── package.json
 ├── README.md
 ├── tailwind.config.ts
 ├── tsconfig.json
 ├── vite.config.ts
```

## 5. Approach to Solve the Problem
- We identified the core challenges and designed a modular architecture.
- Implemented an API-driven backend to facilitate seamless communication.
- Utilized modern frontend frameworks for an intuitive user interface.
- Incorporated Web3 features for secure interactions.
- Ensured scalability with Docker and CI/CD pipelines.

## 6. Tech Stack
- **Frontend**: React.js, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, OpenAI API
- **Database**: MongoDB
- **DevOps**: Docker, CI/CD
- **Web3**: Solidity, Smart Contracts

## 7. Build and Run Commands
### Backend
```sh
cd backend
npm install
npm run dev
```

### Frontend
```sh
cd frontend
npm install
npm run dev
```
# PS8 Part 2: DevSync Platform

## Overview

PS8 is a Visual Studio Code extension designed to automate project understanding by mapping Software Requirement Specifications (SRS) to code, providing interactive documentation, and assisting developers with guided onboarding. This extension aims to enhance the development experience by offering intelligent project navigation, AI-powered search, and real-time documentation updates.

## Key Features

- *SRS-to-Code Mapping*: Automatically analyze SRS documents and link them to relevant sections in the code.
- *Intelligent Project Navigation*: Auto-generate a Project Explorer that visually maps dependencies and relationships between files.
- *Auto-Generated Documentation*: Real-time documentation updates based on code changes, with the ability to manually refresh documentation.
- *Guided Onboarding*: Interactive step-by-step onboarding for new developers to quickly understand the codebase.
- *AI-Powered Search & Contextual Assistance*: Use AI to provide context-aware suggestions and explanations of the project structure.
- *GitHub Integration*: Fetch project repositories and show dependencies, with auto-synchronization of documentation.
- *Dependency & Visualization Tools*: Provide real-time dependency graphs to show how different modules interact.

## File Structure

ps8-extension/
├── .vscode/                     # VS Code specific settings
├── src/                         # Source files
│   ├── autoDocUpdater.ts        # AutoDocUpdater class for documentation management
│   ├── codeTourManager.ts       # Code tour management functionality
│   ├── contextualSearch.ts      # Contextual search functionality
│   ├── customExplorer.ts        # Custom explorer panel
│   ├── dependencyVisualizer.ts   # Dependency visualization logic
│   ├── extension.ts             # Main entry point for the extension
│   ├── githubService.ts         # GitHub integration service
│   ├── treeViewProvider.ts      # File explorer tree view provider
│   └── webviewPanel.ts          # Webview panel for displaying documentation
├── package.json                 # Extension metadata and dependencies
├── tsconfig.json                # TypeScript configuration
├── README.md                    # Project documentation
└── LICENSE                      # License information


## File Descriptions

- **.vscode/**: Contains settings specific to Visual Studio Code, such as workspace configurations and debugging settings.

- **src/**: The main directory containing all source files for the extension.

  - **autoDocUpdater.ts**: This file contains the AutoDocUpdater class, which manages automatic updates to documentation based on changes in the codebase. It watches for file changes and generates a markdown file that reflects the current state of the project.

  - **codeTourManager.ts**: This file includes the CodeTourManager class, which facilitates interactive tours of the codebase. It helps new developers understand the structure and functionality of the project through guided walkthroughs.

  - **contextualSearch.ts**: This file implements functionality for performing contextual searches across the codebase, allowing developers to find relevant code snippets and documentation quickly.

  - **customExplorer.ts**: This file defines the CustomExplorerPanel class, which creates a custom file explorer panel within Visual Studio Code. It enhances navigation through the project's files and folders.

  - **dependencyVisualizer.ts**: This file contains the DependencyVisualizer class, which provides tools for visualizing dependencies between different modules in the project. It helps identify relationships and potential bottlenecks.

  - **extension.ts**: The main entry point for the extension. This file registers commands, initializes services, and sets up the extension's functionality.

  - **githubService.ts**: This file includes the GitHubService class, which handles integration with GitHub. It allows fetching repositories, managing dependencies, and synchronizing documentation with the repository.

  - **treeViewProvider.ts**: This file defines the FileExplorerProvider class, which provides a tree view of files and folders in the project. It enhances the user experience by allowing easy navigation through the project's structure.

  - **webviewPanel.ts**: This file manages a webview panel for displaying documentation interactively. It allows users to view and interact with documentation directly within Visual Studio Code.

- **package.json**: Contains metadata about the extension, including its name, version, description, activation events, and dependencies.

- **tsconfig.json**: TypeScript configuration file that specifies the compiler options and the files to be included in the compilation.

- **README.md**: This file provides documentation for the project, including an overview, features, and file structure.

- **LICENSE**: Contains the license information for the project, specifying the terms under which the code can be used and distributed.

