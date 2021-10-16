const { WorkSpace } = require('../../page/loginPage/workspacePage')
const { Constant } = require('../../constant/constant')
const { Locator } = require('../../locator/login/locator')
const { BasePage } = require('../../page/basepage')
const { chromium } = require('playwright')
const { assert } = require('chai')
const constn = new Constant()
const base = new BasePage()

describe('CREO_APL_Flow', async () => {
    const workspace = new WorkSpace()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        });
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await workspace.navigate()
        await workspace.login()

    });
    //====================Check Unselect workspace ===============================================
    it.skip('Check if unselect workspace should display correct error message', async () => {
        await workspace.click_workspace_button()
        let message = await workspace.get_error_message()
        let result = assert.strictEqual(message, constn.err_message_workspace, "Error message of workspace screen is display wrong: FAILED")
        if (message) {
            await console.log("Error message display correct when unselect workspace: PASSED")
        }
    })
    //====================Select workspace successfully============================================
    it.skip("Check if select workspace successfully", async () => {
        await workspace.click_select_dropdown()
        await workspace.click_selecion()
        await workspace.click_workspace_button()
        let result = await workspace.check_display_icon_home()
        let rs = assert.strictEqual(result, true, "Navigate from workspace screen unsuccess: FAILED")
        if (result) {
            await console.log("Navigate success from workspace screen : PASSED")
        }
    })
    after(async () => {
        await page.close()
    });

})
