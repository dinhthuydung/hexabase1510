const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { apply_quotePage } = require('../../page/purchasePage/apply_quotePage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：購買見積依頼申請する / Apply for a purchase quote request : purchase/apply_quote.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const apply_quote = new apply_quotePage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 250
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await apply_quote.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    });
    //=============Check display Apply for a purchase quote request screen===========================
    it('TC90: Check display screen', async () => {
        await apply_quote.detail_screen()
        let isDisplay = await apply_quote.display_apply_button()
        await assert.strictEqual(isDisplay, true, "Apply button [購買発注依頼申請をする] is not enable : FAILED")
        if (isDisplay) {
            await console.log(" Apply quote screen display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC94_1: Check click [ 実行する ] button', async () => {
        await apply_quote.detail_screen()
        await apply_quote.click_apply()
        await apply_quote.click_execute_button()
        let isDisable = await apply_quote.display_confirm_popup()
        if (isDisable) {
            await console.log("Click execute apply request success, display popup confirm: PASSED")
        }
    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC94_2: Check click [ 閉じる ] button', async () => {
        await apply_quote.detail_screen()
        await apply_quote.click_apply()
        await apply_quote.click_execute_button()
        await apply_quote.click_close_button()
        let status = await apply_quote.check_status()
        await assert.strictEqual(status, constn.purchase_order_request_applied, " Status is not '購買発注依頼申請済' : FAILED")
        if (status == constn.purchase_order_request_applied) {
            await console.log(" Status '購買発注依頼申請済' : PASSED")
        }
    })
    afterEach(async () => {
         await page.close()
    })
})