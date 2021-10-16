const { LoginPage } = require('../../page/loginPage/pageLogin')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { chromium } = require('playwright')
//var assert = require('assert')
const { assert } = require('chai')
const constn = new Constant()
const base = new BasePage()

describe('CREO_APL_Flow: test/login/login.js', async () => {
    const loginPage = new LoginPage()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
    
        page = await browser.newPage({ ignoreHTTPSErrors: true })        
        await page.setViewportSize({ width: 1920, height: 1080 })
        await loginPage.navigate()
       
    });
    //==================Check display message when not input========================
    it.only('Not input value, should show error message', async () => {
        await loginPage.clickLogin()
        let get_message = await loginPage.get_text_error_alert_mess()
        await assert.strictEqual(get_message,constn.MS,"Message display incorrect when not input value : FAILED")
        if(get_message){
            await console.log("Message display correct when not input value : PASSED")
        }

    });
    //==================Pass login screen===========================================
    it('Check pass login screen Successfully', async () =>{  
        await loginPage.input_email() 
        await loginPage.input_password()
        await loginPage.clickLogin()
        let lg = await loginPage.check_login_success()
            await assert.strictEqual(lg,true,"Login fail: FAILED")
            if(lg){
                 console.log("Passed login screen successfully: PASSED")
            }
    })
    //===================Check show/hide password===================================
    it("Check show/hide password", async () => {
        //Compare 2 images when hide/show eyes is clicked and save the result in '/procure-c-e2e/report'
        await loginPage.input_password()
        let image_1 = await loginPage.screenshot_password_hide()
        await loginPage.click_icon()
        let image_2 = await loginPage.screenshot_password_show()
        let result = await loginPage.compare_2_pic(image_1, image_2)
        await assert.strictEqual(result,false, "Click hide/show password is wrong: FAILED")
        if(result==false){
            await console.log("Click hide/show password is correct: PASSED")
        }
    
    })
    afterEach(async () => {
        await page.close()
    })
})



