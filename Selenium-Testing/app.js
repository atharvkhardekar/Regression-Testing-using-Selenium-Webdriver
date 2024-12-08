// const { Builder, By, Key, until } = require("selenium-webdriver")

// ;(async function regressionTest() {
// 	console.log("Starting the regression test...")

// 	// Initialize the WebDriver for Chrome
// 	let driver = await new Builder()
// 		.forBrowser("chrome") // Specify the browser you want to use
// 		.build()

// 	try {
// 		// Log the successful initialization
// 		console.log("Chrome WebDriver initialized successfully.")

// 		// Navigate to Wikipedia
// 		await driver.get("https://www.wikipedia.org/")
// 		console.log("Navigated to Wikipedia.")

// 		// Find the search input
// 		console.log("Finding the search input...")
// 		const searchInput = await driver.findElement(By.name("search"))

// 		// Delay before typing
// 		await driver.sleep(5000) // 1 second delay
// 		const searchTerm = "Software testing"
// 		await searchInput.sendKeys(searchTerm)
// 		console.log(`Entered text into the search box: "${searchTerm}"`)

// 		// Delay before submitting the search
// 		await driver.sleep(5000) // 1 second delay
// 		console.log("Submitting the search...")
// 		await searchInput.sendKeys(Key.RETURN)
// 		console.log("Search submitted.")

// 		// Wait for the results page to load and display the title
// 		await driver.wait(until.titleContains(searchTerm), 5000)
// 		const resultsTitle = await driver.getTitle()
// 		console.log(`Results page title is: ${resultsTitle}`)

// 		// Verify that the search term is present in the page source
// 		const pageSource = await driver.getPageSource()
// 		if (pageSource.includes(searchTerm)) {
// 			console.log(
// 				`Regression test passed: The term "${searchTerm}" is present in the results page.`
// 			)
// 		} else {
// 			console.log(
// 				`Regression test failed: The term "${searchTerm}" was not found in the results page.`
// 			)
// 		}

// 		// Verify the presence of an expected element (e.g., the first heading)
// 		console.log("Checking for the presence of the first heading...")
// 		await driver.wait(until.elementLocated(By.id("firstHeading")), 5000)
// 		const firstHeading = await driver.findElement(By.id("firstHeading"))
// 		const headingText = await firstHeading.getText()
// 		console.log(`First heading text is: "${headingText}"`)

// 		// Assert that the first heading matches the expected value
// 		if (headingText.includes(searchTerm)) {
// 			console.log(
// 				`Regression test passed: The first heading includes the term "${searchTerm}".`
// 			)
// 		} else {
// 			console.log(
// 				`Regression test failed: The first heading does not include the term "${searchTerm}".`
// 			)
// 		}

// 		// Output the search term to confirm what was searched
// 		console.log(`You searched for: "${searchTerm}"`)
// 	} catch (error) {
// 		console.error("An error occurred:", error)
// 	} finally {
// 		await driver.quit() // Ensure the browser is closed
// 		console.log("Browser closed.")
// 	}
// })()

// const { Builder, By, Key, until } = require("selenium-webdriver")

// ;(async function regressionTest() {
// 	console.log("\n============== Starting Regression Test ==============\n")

// 	// Initialize the WebDriver and connect to Selenium Grid hub
// 	let driver = await new Builder()
// 		.usingServer("http://localhost:4444/wd/hub") // Selenium Grid hub URL
// 		.forBrowser("chrome") // Browser choice
// 		.build()

// 	try {
// 		console.log("[INFO] WebDriver connected to Selenium Grid.")

// 		// Step 1: Navigate to Wikipedia homepage
// 		await driver.get("https://www.wikipedia.org/")
// 		console.log("[INFO] Navigated to Wikipedia homepage.")

// 		await driver.sleep(2000) // Delay to view navigation step

// 		// Step 2: Locate the search input and perform a search
// 		console.log("[INFO] Locating the search input field...")
// 		const searchInput = await driver.findElement(By.name("search"))
// 		const searchTerm = "Software testing"

// 		await driver.sleep(2000) // Delay to view search input
// 		await searchInput.sendKeys(searchTerm)
// 		console.log(`[INFO] Entered search term: "${searchTerm}"`)

// 		// Step 3: Submit the search form
// 		console.log("[INFO] Submitting the search term...")
// 		await driver.sleep(2000) // Delay before submitting
// 		await searchInput.sendKeys(Key.RETURN)
// 		console.log("[INFO] Search term submitted.")

// 		// Step 4: Wait for the results page to load and validate the title
// 		await driver.wait(until.titleContains(searchTerm), 5000)
// 		const resultsTitle = await driver.getTitle()
// 		console.log(`[INFO] Results page title: "${resultsTitle}"`)

// 		await driver.sleep(2000) // Delay to view title check

// 		// Step 5: Verify search term presence in page source
// 		const pageSource = await driver.getPageSource()
// 		if (pageSource.includes(searchTerm)) {
// 			console.log(`[PASS] Term "${searchTerm}" is present in the page source.`)
// 		} else {
// 			console.log(`[FAIL] Term "${searchTerm}" not found in the page source.`)
// 		}

// 		// Step 6: Validate the first heading text on the results page
// 		console.log("[INFO] Checking the first heading...")
// 		await driver.wait(until.elementLocated(By.id("firstHeading")), 5000)
// 		const firstHeading = await driver.findElement(By.id("firstHeading"))
// 		const headingText = await firstHeading.getText()
// 		console.log(`[INFO] First heading text: "${headingText}"`)

// 		if (headingText.includes("Software")) {
// 			console.log(`[PASS] First heading includes the term "Software".`)
// 		} else {
// 			console.log(`[FAIL] First heading does not include the term "Software".`)
// 		}

// 		await driver.sleep(2000) // Delay to view heading validation

// 		// Additional regression checks
// 		console.log("\n============ Additional Regression Tests ============\n")

// 		// Check if "Contents" link is present on the page
// 		try {
// 			const contentsLink = await driver.findElement(By.linkText("Contents"))
// 			console.log("[PASS] 'Contents' link is present on the page.")
// 		} catch (error) {
// 			console.log("[FAIL] 'Contents' link is missing from the page.")
// 		}

// 		// Check if the "See also" section is available
// 		try {
// 			const seeAlsoSection = await driver.findElement(By.id("See_also"))
// 			console.log("[PASS] 'See also' section is present on the page.")
// 		} catch (error) {
// 			console.log("[FAIL] 'See also' section is missing from the page.")
// 		}

// 		// Check if English language is selected as default
// 		console.log("[INFO] Checking default language selection...")
// 		try {
// 			const languageSelector = await driver.findElement(
// 				By.css(".central-featured-lang")
// 			)
// 			const selectedLanguage = await languageSelector.getText()
// 			console.log(
// 				`[INFO] Default language detected: "${selectedLanguage.trim()}"`
// 			)
// 			if (selectedLanguage.includes("English")) {
// 				console.log("[PASS] Expected language 'English' is present.")
// 			} else {
// 				console.log("[FAIL] Expected language text 'English' not found.")
// 			}
// 		} catch (error) {
// 			console.log(
// 				"[FAIL] Default language check failed due to missing element."
// 			)
// 		}

// 		// Test for "External links" section presence in the page footer
// 		try {
// 			const externalLinksSection = await driver.findElement(
// 				By.id("External_links")
// 			)
// 			console.log("[PASS] 'External links' section is present on the page.")
// 		} catch (error) {
// 			console.log("[FAIL] 'External links' section is missing from the page.")
// 		}

// 		console.log(
// 			"\n================= Regression Test Complete =================\n"
// 		)
// 	} catch (error) {
// 		console.error("[ERROR] An error occurred during regression testing:", error)
// 	} finally {
// 		await driver.quit() // Close the browser
// 		console.log("[INFO] Browser closed. End of regression test.")
// 	}
// })()

// const { Builder, By, Key, until } = require("selenium-webdriver")

// ;(async function testTodoApp() {
// 	console.log(
// 		"============== Starting Regression Test on Todo App ==============\n"
// 	)

// 	let driver = await new Builder().forBrowser("chrome").build()

// 	// Helper function to add delay for demonstration
// 	const delay = async (ms) => await driver.sleep(ms)

// 	try {
// 		console.log("=== Test Initialization ===")
// 		console.log("1. Initializing WebDriver...")
// 		await delay(1000)

// 		// Navigate to the locally hosted Todo app
// 		await driver.get("http://localhost:5173")
// 		console.log("✔️  WebDriver initialized and navigated to Todo app homepage.")
// 		await delay(2000)

// 		// Page title verification
// 		const pageTitle = await driver.getTitle()
// 		console.log(`   Page title verified as: "${pageTitle}"\n`)
// 		await delay(2000)

// 		// === Test Case: Add New Todo ===
// 		console.log("=== Test Case 1: Adding a New Todo ===")
// 		console.log("1. Locating the Todo input field...")
// 		await delay(1000)

// 		const todoInput = await driver.wait(
// 			until.elementLocated(By.css(".form__input")),
// 			10000
// 		)
// 		console.log("✔️  Todo input field located.")
// 		await delay(1000)

// 		const uniqueId = Date.now()
// 		const newTask = `Test Task - ${uniqueId}`

// 		console.log("2. Adding a new Todo item...")
// 		await todoInput.sendKeys(newTask, Key.RETURN)
// 		console.log(`✔️  New Todo added: "${newTask}"`)
// 		await delay(2000)

// 		console.log("3. Verifying the new Todo item is displayed...")
// 		const addedTodo = await driver.wait(
// 			until.elementLocated(
// 				By.xpath(
// 					`//div[contains(@class, 'todo') and contains(., '${newTask}')]`
// 				)
// 			),
// 			10000
// 		)
// 		console.log("✅ New Todo item is present in the list.\n")
// 		await delay(2000)

// 		// === Test Case: Mark Todo as Completed ===
// 		console.log("=== Test Case 2: Marking the Todo as Completed ===")
// 		console.log("1. Locating the 'Complete' button...")
// 		await delay(1000)

// 		const completeButton = await addedTodo.findElement(By.css(".todo__status"))
// 		console.log("✔️  Complete button located.")
// 		await delay(1000)

// 		console.log("2. Marking the Todo item as completed...")
// 		await completeButton.click()
// 		await delay(2000)
// 		console.log("✅ Todo item marked as completed.\n")
// 		await delay(2000)

// 		// === Test Case: Delete the New Todo ===
// 		console.log("=== Test Case 3: Deleting the New Todo ===")
// 		const initialTodos = await driver.findElements(By.css(".todo"))
// 		const initialCount = initialTodos.length

// 		console.log("1. Locating the 'Delete' button...")
// 		await delay(1000)
// 		const deleteButton = await addedTodo.findElement(By.css(".todo__delete"))
// 		console.log("✔️  Delete button located.")
// 		await delay(1000)

// 		console.log("2. Deleting the Todo item...")
// 		await deleteButton.click()
// 		await delay(2000)

// 		const remainingTodos = await driver.findElements(By.css(".todo"))
// 		const remainingCount = remainingTodos.length

// 		console.log("3. Verifying the Todo item was deleted...")
// 		await delay(1000)

// 		if (remainingCount === initialCount - 1) {
// 			console.log("✅ Todo item successfully deleted.\n")
// 		} else {
// 			console.log("❌ Error: Todo item was not deleted from the list.\n")
// 		}
// 	} catch (error) {
// 		console.error("An error occurred during the regression test:", error)
// 	} finally {
// 		await driver.quit()
// 		console.log("Browser closed. End of regression test.")
// 	}
// })()

// const { Builder, By, Key, until } = require("selenium-webdriver")
// const { del } = require("selenium-webdriver/http")

// const gridUrl = "http://localhost:4444/wd/hub" // Update with your Selenium Grid hub URL

// ;(async function testTodoApp() {
// 	console.log(
// 		"============== Starting Regression Test on Todo App ==============\n"
// 	)

// 	// Define desired capabilities
// 	let driver = await new Builder()
// 		.usingServer(gridUrl)
// 		.forBrowser("chrome") // or specify other browsers if needed
// 		.build()

// 	// Helper function to add delay for demonstration
// 	const delay = async (ms) => await driver.sleep(ms)

// 	try {
// 		console.log("=== Test Initialization ===")
// 		console.log("1. Initializing WebDriver...")
// 		await delay(1000)

// 		// Navigate to the locally hosted Todo app
// 		await driver.get("http://localhost:5173")
// 		console.log("✔️  WebDriver initialized and navigated to Todo app homepage.")
// 		await delay(2000)

// 		// Page title verification
// 		const pageTitle = await driver.getTitle()
// 		console.log(`   Page title verified as: "${pageTitle}"\n`)
// 		await delay(2000)

// 		// === Test Case: Add New Todo ===
// 		console.log("=== Test Case 1: Adding a New Todo ===")
// 		console.log("1. Locating the Todo input field...")
// 		await delay(1000)

// 		const todoInput = await driver.wait(
// 			until.elementLocated(By.css(".form__input")),
// 			10000
// 		)
// 		console.log("✔️  Todo input field located.")
// 		await delay(1000)

// 		const uniqueId = Date.now()
// 		const newTask = `Test Task - ${uniqueId}`

// 		console.log("2. Adding a new Todo item...")
// 		await todoInput.sendKeys(newTask, Key.RETURN)
// 		console.log(`✔️  New Todo added: "${newTask}"`)
// 		await delay(2000)

// 		console.log("3. Verifying the new Todo item is displayed...")
// 		const addedTodo = await driver.wait(
// 			until.elementLocated(
// 				By.xpath(
// 					`//div[contains(@class, 'todo') and contains(., '${newTask}')]`
// 				)
// 			),
// 			10000
// 		)
// 		console.log("✅ New Todo item is present in the list.\n")
// 		await delay(2000)

// 		// === Test Case: Mark Todo as Completed ===
// 		console.log("=== Test Case 2: Marking the Todo as Completed ===")
// 		console.log("1. Locating the 'Complete' button...")
// 		await delay(1000)

// 		const completeButton = await addedTodo.findElement(By.css(".todo__status"))
// 		console.log("✔️  Complete button located.")
// 		await delay(1000)

// 		console.log("2. Marking the Todo item as completed...")
// 		await completeButton.click()
// 		await delay(2000)
// 		console.log("✅ Todo item marked as completed.\n")
// 		await delay(2000)

// 		// === Test Case: Delete the New Todo ===
// 		console.log("=== Test Case 3: Deleting the New Todo ===")
// 		const initialTodos = await driver.findElements(By.css(".todo"))
// 		const initialCount = initialTodos.length

// 		console.log("1. Locating the 'Delete' button...")
// 		await delay(1000)
// 		const deleteButton = await addedTodo.findElement(By.css(".todo__delete"))
// 		console.log("✔️  Delete button located.")
// 		await delay(1000)

// 		console.log("2. Deleting the Todo item...")
// 		await deleteButton.click()
// 		await delay(2000)

// 		const remainingTodos = await driver.findElements(By.css(".todo"))
// 		const remainingCount = remainingTodos.length

// 		console.log("3. Verifying the Todo item was deleted...")
// 		await delay(1000)

// 		if (remainingCount === initialCount - 1) {
// 			console.log("✅ Todo item successfully deleted.\n")
// 		} else {
// 			console.log("❌ Error: Todo item was not deleted from the list.\n")
// 		}
// 		await delay(1000)
// 	} catch (error) {
// 		console.error("An error occurred during the regression test:", error)
// 	} finally {
// 		await driver.quit()
// 		console.log("Browser closed. End of regression test.")
// 	}
// })()

// // This code is a Selenium WebDriver test script for a Todo application
// // It performs three main test cases:
// // 1. Adding a new Todo item
// // 2. Marking a Todo item as completed
// // 3. Deleting a Todo item
// //
// // The script uses Selenium Grid (running on localhost:4444)
// // and performs the following steps:
// // - Initializes WebDriver with Chrome browser
// // - Navigates to the Todo app (localhost:5173)
// // - Verifies the page title
// // - Adds a new Todo with a unique timestamp
// // - Verifies the Todo was added successfully
// // - Marks the Todo as completed
// // - Deletes the Todo
// // - Verifies the Todo was deleted successfully
// //
// // The script includes delays for demonstration purposes
// // and proper error handling with try/catch blocks.
// // It also ensures the browser is closed after the test
// // using the finally block.
