# Rule-Based Logic System

This project implements a rule-based logic system that allows for the management and execution of logical rules and facts. The system is designed to facilitate reasoning and decision-making processes through a structured approach to rule evaluation.

## Project Structure

- **src/**: Contains the source code for the application.
  - **core/**: Core components of the logic system.
    - `engine.ts`: Manages the execution of rules and facts.
    - `rule.ts`: Represents a logical rule.
    - `fact.ts`: Represents a piece of information.
    - `inference.ts`: Handles the reasoning process.
  - **parser/**: Responsible for parsing rule definitions.
    - `ruleParser.ts`: Converts string input into Rule objects.
    - `syntax.ts`: Contains constants and types for rule syntax.
  - **storage/**: Manages storage and retrieval of rules and facts.
    - `ruleRepository.ts`: Manages Rule objects.
    - `factRepository.ts`: Manages Fact objects.
  - **api/**: Contains the API controllers and routes.
    - `ruleController.ts`: Handles API requests related to rules.
    - `systemController.ts`: Manages system-level operations.
    - `routes.ts`: Sets up API routes.
  - **ui/**: User interface components.
    - `ruleEditor.ts`: Interface for creating and editing rules.
    - `systemViewer.ts`: Displays the current state of the system.
    - `components.ts`: Reusable UI components.
  - **utils/**: Utility functions and helpers.
    - `validator.ts`: Functions for validating rules and facts.
    - `logger.ts`: Logger utility for messages and errors.
  - `app.ts`: Entry point of the application.

- **tests/**: Contains test files for unit and integration testing.
  - **unit/**: Unit tests for individual components.
    - `engine.test.ts`: Unit tests for the Engine class.
  - **integration/**: Integration tests for overall system functionality.
    - `system.test.ts`: Integration tests for the system.

- **config/**: Configuration settings for the application.
  - `default.json`: Default configuration settings.

- **package.json**: npm configuration file listing dependencies and scripts.

- **tsconfig.json**: TypeScript configuration file specifying compiler options.

## Getting Started

To get started with the rule-based logic system, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd rule-based-logic-system
npm install
```

## Usage

After installing the dependencies, you can run the application using:

```bash
npm start
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.