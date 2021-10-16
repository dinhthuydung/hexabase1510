const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { sendbackPage } = require('../../page/purchasePage/sendbackPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：差し戻す / Purchasing requirements details / action:  Send back : purchase/sendback.js ', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const send_back = new sendbackPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await send_back.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    })
    //=============Check display sendback screen==========================================
    it('TC61: Check display screen', async () => {
        await send_back.detail_screen()
        let isDisplay = await send_back.display_sendback_button()
        await assert.strictEqual(isDisplay, true, "Sendback button [ 差し戻す] is not display : FAILED")
        if (isDisplay) {
            await console.log(" Sendback button display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC62_1: Check click [ 実行する ] button', async () => {
        await send_back.detail_screen()
        await send_back.click_sendback()
        await send_back.click_execute_button()
        let isDisable = await send_back.display_confirm_popup()
        if (isDisable) {
            await console.log("Click execute apply request success : PASSED")
        }

    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC62_2: Check click [ 閉じる ] button', async () => {
        await send_back.detail_screen()
        await send_back.click_sendback()
        await send_back.click_execute_button()
        await send_back.click_close_button()
        let status = await send_back.check_status()
        await assert.strictEqual(status, constn.buying_requirements_creation, " Status is not '購買要件作成中' : FAILED")
        if (status == constn.buying_requirements_creation) {
            await console.log(" Status '購買要件作成中' : PASSED")
        }
    })
    afterEach(async () => {
        await page.close()
    })
})