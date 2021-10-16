const { Constant } = require('../../constant/constant')
const { Locator } = require('../../locator/login/locator')
const { BasePage } = require('../../page/basepage')
const { LoginPage } = require('../../page/loginPage/pageLogin')
const fs = require("fs")
const parser = require("papaparse")
const constn = new Constant()
const locate = new Locator()
const base = new BasePage()
const { chromium } = require('playwright')
const assert = require('assert')
var data_driven = require('data-driven')
const csvFile = fs.readFileSync("inputData/user.csv", { encoding: "utf8" })
const userData = parser.parse(csvFile, { header: true })


const newpage = new LoginPage()
data_driven(userData.data, function () {
    describe('Loop login: test/login/loginData.js', function () {
        before(async () => {
            const browser = await chromium.launch({
                headless: false,
                channel: 'chrome',
                slowMo: 100
            })
            page = await browser.newPage({ ignoreHTTPSErrors: true })
            await page.setViewportSize({ width: 1920, height: 1080 })
        });

        it('Login_test', async (dta) => {
            await newpage.navigate()
            await console.log(`Login with email: "${dta.email}" and password: "${dta.password}"`)
            await page.fill(locate.email, dta.email)
            await page.fill(locate.password, dta.password)
            await page.click(locate.loginButton)
            let message = await newpage.get_text_error_mess()

            if (dta.email == " ") {
                let err_email_message = await newpage.get_text_error_mess_email()
                await assert.strictEqual(message, constn.MS, " Message display incorrect")
                await assert.strictEqual(err_email_message, constn.MS_email, "Message email is incorrect")
            }
            else if (dta.password === "  ") {
                let err_email_password = await newpage.get_text_error_mess_password()
                await assert.strictEqual(message, constn.MS, " Message display incorrect")
                await assert.strictEqual(err_email_password, constn.MS_password, "Message password is incorrect")
            }
            else {
                let valid_email = await base.validateEmail(dta.email)
                if (valid_email) {
                    if (dta.email != constn.inputEmail || dta.password != constn.inputPassword) {
                        await assert.strictEqual(message, constn.MS, " Message display incorrect")
                    }
                }
                else {
                    let err_email_message = await newpage.get_text_error_mess_email()
                    await assert.strictEqual(err_email_message, constn.MS_invalidEmail, "Message email is incorrect format")
                }

            }

        })
        after(async () => {
            await page.close()
        });

    })
})

