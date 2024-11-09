# Magnifi Video Editor Automation Project

This project automates critical flows for the **Magnifi** online video editor using **Playwright**. It includes test cases for login, trimming clips, and verifying the Auto-Flip feature.


### Prerequisites

- **Node.js**: Ensure Node.js (v20 or higher) is installed.
- **Git**: Make sure Git is installed on your system to clone the project.
  
#### Install Node.js

- **Windows / Mac / Linux**:
  - Download and install Node.js from [nodejs.org](https://nodejs.org/).
  - Verify the installation:
    ```bash
    node -v
    npm -v
    ```

#### Install Git

- **Windows / Mac / Linux**:
  - Download and install Git from [git-scm.com](https://git-scm.com/).
  - Verify the installation:
    ```bash
    git --version
    ```

---

### Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install Dependencies**
   Run the following command in the project directory to install required dependencies:
   ```bash
   npm install
   ```

3. **Install Playwright Browsers**
   Playwright requires browser binaries to run the tests.
   ```bash
   npx playwright install
   ```

---

### Folder Structure

The folder structure of this project is as follows:

```
project-root/
├── tests/                       # Test files
│   ├── login.spec.js            # Login test case
│   ├── trimClip.spec.js         # Trim clip test case
│   └── autoFlip.spec.js         # Auto-Flip feature test case
├── pages/                       # Page Object Models (POMs)
│   ├── loginPage.js             # Login page methods
│   ├── videoEditorPage.js       # Video editor-related actions
│   └── autoFlipPage.js          # Auto-Flip feature methods
├── fixtures/
│   └── testData.json            # Test data and configurations
├── playwright.config.js         # Playwright configuration
└── README.md                    # Documentation file
```

### Configuration

- **`fixtures/testData.json`**: Update this file with any required login credentials and test data.
  
  Example:
  ```json
  {
    "url": "https://uat.magnifi.ai/login",
    "username": "TestUser1@mailinator.com",
    "password": "Test@123",
    "trimmedClipTitle": "Trimmed Clip Example"
  }
  ```

- **`playwright.config.js`**: Contains configurations for running the tests such as timeout, retries, and test environment settings.

### Running the Tests

To run tests, use the following commands based on your operating system.

#### Windows, Mac, and Linux

1. **Run All Tests**:
   ```bash
   npx playwright test
   ```

2. **Run a Specific Test File**:
   Example for running `login.spec.js`:
   ```bash
   npx playwright test tests/login.spec.js
   ```

3. **Run Tests in Headed Mode** (with UI):
   ```bash
   npx playwright test --headed
   ```

### Additional Playwright Commands

- **View Test Report**:
  Generate and open the Playwright test report to view detailed results.
  ```bash
  npx playwright show-report
  ```

- **Run Tests in Parallel**:
  Playwright runs tests in parallel by default. You can adjust the number of workers using the `--workers` flag:
  ```bash
  npx playwright test --workers=4
  ```

- **Configure Browser Options**:
  To specify the browser type (e.g., Chromium, Firefox, WebKit):
  ```bash
  npx playwright test --project=chromium
  npx playwright test --project=firefox
  npx playwright test --project=webkit
  ```

- **Run Tests in Headless Mode**:
  Playwright runs tests headless by default, but you can specify headless mode explicitly:
  ```bash
  npx playwright test --headless
  ```

### Troubleshooting

- **Clearing Cache**: If you experience issues, try clearing the npm cache:
  ```bash
  npm cache clean --force
  ```

- **Reinstalling Dependencies**:
  ```bash
  rm -rf node_modules
  npm install
  ```

- **Playwright Troubleshooting**: Visit [Playwright documentation](https://playwright.dev/docs/troubleshooting) for detailed troubleshooting steps.