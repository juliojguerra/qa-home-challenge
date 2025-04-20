# Booking.com Test Automation with Playwright & TypeScript

This repository contains an AI-enhanced automated testing solution for Booking.com using Playwright and TypeScript.
The project demonstrates how AI can improve test case generation, implementation, and maintenance for critical user workflows.

## 🎯 Project Overview

This project automates testing for key user workflows on Booking.com:
- Hotel Search & Filtering
- Flight Booking Process
- Hotel Details & Amenities Verification

## 🧠 AI Integration

AI is integrated throughout the testing lifecycle:

- **Test Case Generation**: Used AI to generate comprehensive test cases including edge cases and boundary conditions
- **Self-Healing Locators**: Implemented AI-powered locator strategies to handle dynamic UI changes only in specific cases.

## 🛠️ Technology Stack

- **Framework**: Playwright
- **Language**: TypeScript
- **Reporting**: Playwright HTML Reporter
- **CI/CD**: GitHub Actions
- **AI Tools**:
  - ZeroStep library (free up to 500 requests). [Learn More](https://github.com/zerostep-ai/zerostep)
  - Claude 3.7 Sonnet, for test cases generation and healing flaky tests.

## 📋 Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v16 or later)
- npm (v7 or later)
- Git

## 🚀 Getting Started

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/booking-com-automation.git
   cd booking-com-automation
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### Running Tests

Run all tests:
```bash
npm test
```

Run a specific test suite:
```bash
npx playwright test searchAndFiltering.spec.ts
```

Run tests in UI mode:
```bash
npx playwright test --ui
```

### Generating Reports

Generate and open HTML report:
```bash
npx playwright show-report
```

## 🧪 Test Cases

For detailed test cases, please refer to [TEST_CASES.md](./TEST_CASES.md).

## 🤖 AI-Driven Features

### Self-Healing Locators

This project uses a custom AI-powered locator strategy that can adapt to UI changes:

```typescript
await ai("Scroll into the Review score section", {
      page: this.page,
      test,
    });
```

### Test Case Generation

AI was used to generate test cases with the following approach:
1. Input user stories into Claude's model
2. Generate primary test flows
3. Ask AI to suggest edge cases and boundary conditions
4. Refine test cases based on AI feedback

### Test Result Analysis

After test execution, AI analyzes the results to:
- Identify patterns in failures
- Suggest optimizations for flaky tests
- Recommend additional test scenarios

## 📊 CI/CD Integration

Tests run automatically on GitHub Actions:
- On pull requests to main branch
- On merge to main branch

## 📝 Test Reporting

Test results are visualized through Playwright HTML Reporter (default)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎥 Video Demonstration

Watch the [Loom video demonstration](https://www.loom.com/share/your-video-id) to see the tests in action and learn about the AI-driven features.
