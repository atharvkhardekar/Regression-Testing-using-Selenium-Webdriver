const { Builder, By } = require("selenium-webdriver");
const fs = require("fs");
const path = require("path");

const gridUrl = "http://localhost:4444/wd/hub"; // Selenium Grid hub URL
const logFilePath = path.join(__dirname, "test_log.txt"); // Log file path

// Helper function to write to the log file
function writeLog(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  console.log(message); // Keep console output as well
}

// Function to handle and log alerts
async function handleAlert(driver, expectedMessage = `Please include an '@' in the email address. '${invalidEmail}' is missing an '@'.`) {
  try {
    // Switch to the alert
    const alert = await driver.switchTo().alert();
    const alertText = await alert.getText();
    writeLog(`⚠️ Alert detected: "${alertText}"`);

    // Verify the alert message if expectedMessage is provided
    if (expectedMessage && alertText.includes(expectedMessage)) {
      writeLog(`✅ Alert message matches expected: "${expectedMessage}"`);
    } else if (expectedMessage) {
      writeLog(`❌ Alert message does not match expected. Found: "${alertText}", Expected: "${expectedMessage}"`);
    }

    // Accept or dismiss the alert as per your need
    await alert.accept(); // Click "OK" on the alert
    writeLog("✔️ Alert accepted successfully.");
  } catch (error) {
    // Log if no alert is detected
    if (error.name === "NoSuchAlertError") {
      writeLog("⚠️ No alert detected.");
    } else {
      writeLog(`❌ Error while handling alert: ${error.message}`);
    }
  }
}

(async function testAuthAppWithErrors() {
  writeLog("============== Starting Regression Test on Auth App with Errors ==============\n");

  let driver = await new Builder()
    .usingServer(gridUrl)
    .forBrowser("chrome")
    .build();

  // Helper function to add delay for demonstration
  const delay = async (ms) => await driver.sleep(ms);

  try {
    writeLog("=== Test Initialization ===");
    writeLog("1. Initializing WebDriver...");
    await delay(1000);

    // Navigate to the Login/Register app
    await driver.get("http://localhost:5173");
    writeLog("✔️ WebDriver initialized and navigated to Auth app homepage.");
    await delay(2000);

    // === Test Case 1: Register New User with Error ===
    try {
      writeLog("=== Test Case 1: Register New User with Error ===");

      writeLog("1. Navigating to incorrect Register page...");
      await driver.get("http://localhost:5173/incorrect-register"); // Incorrect route
      await delay(2000);

      // Check if the page is empty or has an error
      const bodyText = await driver.findElement(By.tagName("body")).getText();
      if (!bodyText) {
        writeLog("❌ Error: Empty page or incorrect route detected.");
      } else {
        writeLog("✔️ Page loaded but may have incorrect content.");
      }

      writeLog("🔄 Reopening Register page...");
      await driver.get("http://localhost:5173/register"); // Correct route
      await delay(2000);

      writeLog("2. Filling out the registration form...");
      const nameInput = await driver.findElement(By.id("exampleInputname"));
      const emailInput = await driver.findElement(By.id("exampleInputEmail1"));
      const passwordInput = await driver.findElement(By.id("exampleInputPassword1"));

      await nameInput.sendKeys("Test User");
      await emailInput.sendKeys("testuserexample.com"); // Invalid email format
      await passwordInput.sendKeys("Test@1234");
      writeLog("❌ Error: '@' missing in Email field.");

      writeLog("3. Submitting the registration form...");
      const registerButton = await driver.findElement(By.css(".btn-primary"));
      await registerButton.click();
      writeLog("✔️ Registration form testing is over.");

      // Check for alert related to invalid email
      await handleAlert(driver, "Please include an '@' in the email address.");
      await delay(3000);
    } catch (error) {
      writeLog(`❌ Error in Test Case 1: ${error.message}`);
    }

    // === Test Case 2: Login User with Error ===
    try {
      writeLog("=== Test Case 2: Login User with Error ===");

      writeLog("1. Navigating to incorrect Login page...");
      await driver.get("http://localhost:5173/incorrect-login"); // Incorrect route
      await delay(2000);

      // Check if the page is empty or has an error
      const loginBodyText = await driver.findElement(By.tagName("body")).getText();
      if (!loginBodyText) {
        writeLog("❌ Error: Empty page or incorrect route detected.");
      } else {
        writeLog("✔️ Page loaded but may have incorrect content.");
      }

      writeLog("🔄 Reopening Login page...");
      await driver.get("http://localhost:5173/login"); // Correct route
      await delay(2000);

      writeLog("2. Filling out the login form...");
      const loginEmailInput = await driver.findElement(By.id("exampleInputEmail1"));
      const loginPasswordInput = await driver.findElement(By.id("exampleInputPassword1"));

      await loginEmailInput.sendKeys("wronguser@example.com");
      await loginPasswordInput.sendKeys("Wrong1234");
      writeLog("❌ Incorrect Email or Password.");

      writeLog("3. Submitting the login form...");
      const loginButton = await driver.findElement(By.css(".btn-primary"));
      await loginButton.click();
      writeLog("✔️ Login form testing is over.");

      // Check for alert related to incorrect login
      await handleAlert(driver, "Invalid credentials");
      await delay(3000);
    } catch (error) {
      writeLog(`❌ Error in Test Case 2: ${error.message}`);
    }

  } catch (error) {
    writeLog(`❌ Critical error during the regression test: ${error.message}`);
  } finally {
    await driver.quit();
    writeLog("Browser closed. End of regression test with errors.");
  }
})();
