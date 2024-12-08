const { Builder, By, Key, until } = require("selenium-webdriver");
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

(async function testAuthApp() {
  writeLog("============== Starting Regression Test on Auth App ==============\n");

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
    writeLog("✔️  WebDriver initialized and navigated to Auth app homepage.");
    await delay(2000);

   // === Test Case: Register New User ===
writeLog("=== Test Case 1: Register New User ===");

// Directly navigate to the Register page
writeLog("1. Navigating to Register page...");
await driver.get("http://localhost:5173/register"); // Change here: directly go to /register
writeLog("✔️  Navigated to Register page.");
await delay(2000);

    writeLog("2. Filling out the registration form...");
    const uniqueId = Date.now();
    const nameInput = await driver.findElement(By.id("exampleInputname"));
    const emailInput = await driver.findElement(By.id("exampleInputEmail1"));
    const passwordInput = await driver.findElement(By.id("exampleInputPassword1"));

    await nameInput.sendKeys(`Test User ${uniqueId}`);
    await emailInput.sendKeys(`testuser${uniqueId}@example.com`);
    await passwordInput.sendKeys("Test@1234");
    writeLog("✔️  Registration form filled out.");

    writeLog("3. Submitting the registration form...");
    const registerButton = await driver.findElement(By.css(".btn-primary"));
    await registerButton.click();
    writeLog("✔️  Registration form submitted.");
    await delay(3000);

    // Check for alert or successful registration message
    let registrationSuccess = false;
    try {
      const alertText = await driver.switchTo().alert().getText();
      if (alertText.includes("Registered successfully")) {
        writeLog("✅ Registration successful. Alert verified.");
        registrationSuccess = true;
        await driver.switchTo().alert().accept();
      } else {
        writeLog("❌ Registration failed. Alert not as expected.");
      }
    } catch {
      writeLog("⚠️ No alert appeared. Checking page content instead.");
    }

    // Check redirection or visible success message
    if (!registrationSuccess) {
      const pageText = await driver.findElement(By.tagName("body")).getText();
      if (pageText.includes("Registered successfully")) {
        writeLog("✅ Registration successful. Verified through page content.");
      } else {
        writeLog("❌ Registration failed. Page content not as expected.");
      }
    }
    await delay(2000);

 // === Test Case: Login User ===
writeLog("=== Test Case 2: Login User ===");

// Directly navigate to the Login page
writeLog("1. Navigating to Login page...");
await driver.get("http://localhost:5173/login"); // Change here: directly go to /login
writeLog("✔️  Navigated to Login page.");
await delay(2000);


    writeLog("2. Filling out the login form...");
    const loginEmailInput = await driver.findElement(By.id("exampleInputEmail1"));
    const loginPasswordInput = await driver.findElement(By.id("exampleInputPassword1"));

    await loginEmailInput.sendKeys(`testuser${uniqueId}@example.com`);
    await loginPasswordInput.sendKeys("Test@1234");
    writeLog("✔️  Login form filled out.");

    writeLog("3. Submitting the login form...");
    const loginButton = await driver.findElement(By.css(".btn-primary"));
    await loginButton.click();
    writeLog("✔️  Login form submitted.");
    await delay(3000);

    // Verify the alert or success message
    let loginSuccess = false;
    try {
      const loginAlertText = await driver.switchTo().alert().getText();
      if (loginAlertText.includes("Login successful")) {
        writeLog("✅ Login successful. Alert verified.");
        loginSuccess = true;
        await driver.switchTo().alert().accept();
      } else {
        writeLog("❌ Login failed. Alert not as expected.");
      }
    } catch {
      writeLog("⚠️ No alert appeared. Checking page content instead.");
    }

    // Check redirection or visible success message
    if (!loginSuccess) {
      const currentUrl = await driver.getCurrentUrl();
      if (currentUrl.includes("/home")) {
        writeLog("✅ User redirected to the homepage.");
      } else {
        writeLog("❌ User not redirected to the homepage.");
      }
    }
    await delay(2000);

  } catch (error) {
    writeLog(`❌ An error occurred during the regression test: ${error}`);
  } finally {
    await driver.quit();
    writeLog("Browser closed. End of regression test.");
  }
})();
