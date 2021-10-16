const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { send_requestPage } = require('../../page/purchasePage/send_requestPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：見積依頼発信をする / Purchase requirements details / actions: Send a quote request : purchase_request.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const send_request = new send_requestPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await send_request.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    })
    //=============Check display send request screen====================================================
    it('TC63: Check display screen', async () => {
        await send_request.detail_screen()
        let isDisplay = await send_request.display_send_request_button()
        await assert.strictEqual(isDisplay, true, "Send request button [ 見積依頼発信をする] is not display : FAILED")
        if (isDisplay) {
            await console.log(" Send request button display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC66_1: Check click [ 実行する ] button', async () => {
        await send_request.detail_screen()
        await send_request.click_send_request()
        await send_request.click_execute_button()
        let isDisable = await send_request.display_confirm_popup()
        if (isDisable) {
            await console.log("Click execute apply request success : PASSED")
        }

    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC66_2: Check click [ 閉じる ] button', async () => {
        await send_request.detail_screen()
        await send_request.click_send_request()
        await send_request.click_execute_button()
        await send_request.click_close_button()
        let status = await send_request.check_status()
        let result = await assert.strictEqual(status, constn.quotation_request, " Status is not ' 見積依頼中 ' : FAILED")
        if (status == constn.quotation_request) {
            await console.log(" Status is ' 見積依頼中 ' : PASSED")
        }
    })
    afterEach(async () => {
        await page.close()
    })
})