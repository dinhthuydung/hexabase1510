const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { approve_quotePage } = require('../../page/purchasePage/approve_quotePage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：購買見積依頼承認する / Purchasing requirements details / actions: Approve purchase quote request : purchase/approve_quote.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const approve_quote = new approve_quotePage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 250
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await approve_quote.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    });
    //=============Check display Approve quote request screen==========================================
    it('TC57: Check display screen', async () => {
        await approve_quote.detail_screen()
        let isDisplay = await approve_quote.display_approve_button()
        await assert.strictEqual(isDisplay, true, "Approve quote button [ 購買見積依頼承認する ] is not display : FAILED")
        if (isDisplay) {
            await console.log(" Approve a quote button display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC60_1: Check click [ 実行する ] button', async () => {
        await approve_quote.detail_screen()
        await approve_quote.click_approve()
        await approve_quote.click_execute_button()
        let isDisable = await approve_quote.display_confirm_popup()
        if (isDisable) {
            await console.log("Click execute apply request success : PASSED")
        }

    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC60_2: Check click [ 閉じる ] button', async () => {
        await approve_quote.detail_screen()
        await approve_quote.click_approve()
        await approve_quote.click_execute_button()
        await approve_quote.click_close_button()
        let status = await approve_quote.check_status()
        await assert.strictEqual(status, constn.purchase_quotation_request_approved, " Status is not '購買見積依頼承認済' : FAILED")
        if (status == constn.purchase_quotation_request_approved) {
            await console.log(" Status '購買見積依頼承認済' : PASSED")
        }
    })
    afterEach(async () => {
        await page.close()
    })
})