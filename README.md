# Regression Testing Using Selenium WebDriver

- This project demonstrates automated regression testing of a MERN-based Login and Signup application using Selenium WebDriver. It includes positive and negative test cases, validating application functionality and error handling.

## Prerequisites

- System Requirements
- Node.js (LTS version recommended)
- Java Runtime Environment (JRE)
- MongoDB
- Google Chrome
- Selenium WebDriver
- ChromeDriver (compatible with your Chrome version)
- **Installation of ChromeDriver**
1. Find your Chrome version:
- Open Chrome and go to chrome://settings/help
2. Download ChromeDriver for your version:
- ChromeDriver Downloads
- Add ChromeDriver to your system PATH or specify its path in the project configuration.

## Steps to Set Up and Run

1. **Clone the Repository**

```bash

git clone https://github.com/atharvkhardekar/Regression-Testing-using-Selenium-Webdriver.git
cd Regression-Testing-using-Selenium-Webdriver
```

2. **Setup MERN Login and Signup App**

- **Backend**

- Navigate to the backend folder:
```bash

cd Login-and-Signup-MERN/backend
```

- Install dependencies:
```bash

npm install
```

- Start the backend server:
```bash

npm start
```

- **Frontend**

- Navigate to the frontend folder:
```bash

cd ../frontend
```

- Install dependencies:
```bash

npm install
```

- Start the frontend server:
```bash

npm run dev
```
- Ensure the app runs at http://localhost:5173.

3. **Start Selenium Grid**

- Open a terminal and start the Selenium Hub:
```bash

java -jar selenium-server-4.11.0.jar hub
```

- Open another terminal and connect a Node to the Hub:
```bash

java -jar selenium-server-4.11.0.jar node --hub http://localhost:4444/grid/register
```

4. **Run the Test Cases**

- Navigate to the Selenium Testing folder:
```bash

cd ../../Selenium-Testing
```

- Install dependencies:
```bash

npm install
```

- Run Positive Test Cases:
```bash

node test.js
```

- Run Negative Test Cases:
```bash

node test1.js
```

5. **Output**

- Test logs are generated dynamically during the execution of tests.
- The logs are written to a file named test_log.txt in the Selenium Testing folder.
- Logs contain detailed timestamps and descriptions of each step, including detected errors and successful actions.

## Future Scope

- Support for Additional Applications: Extend testing scripts to support more features and workflows in other applications.
- Cross-Browser Testing: Enable testing for Firefox, Safari, and Edge.
- AI-Driven Test Generation: Use AI tools for generating test scenarios and improving test coverage.

## Conclusion

- This project showcases how Selenium WebDriver can be effectively utilized for automated regression testing. With this setup, you can validate the functionality of any Login and Signup app or extend it to other applications also.

## Contact

- For any questions or support, reach out:
- Email: khardekaratharv@gmail.com
- GitHub: atharvkhardekar