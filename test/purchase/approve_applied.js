const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { approve_appliedPage } = require('../../page/purchasePage/approve_appliedPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL:購買要件詳細/アクション：購買発注依頼承認する / Purchasing Requirements Details / Actions: Approve Purchase Order Request : purchase/approve_applied.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const approve_applied = new approve_appliedPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 250
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await approve_applied.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    });
    //=============Check display Approve quote request screen==========================================
    it('TC108: Check display screen', async () => {
        await approve_applied.detail_screen()
        let isDisplay = await approve_applied.display_approve_button()
        await assert.strictEqual(isDisplay, true, "Approve quote button [ 購買発注依頼承認する ] is not display : FAILED")
        if (isDisplay) {
            await console.log(" Approve a quote button [購買発注依頼承認する] display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC111_1: Check click [ 実行する ] button', async () => {
        await approve_applied.detail_screen()
        await approve_applied.click_approve()
        await approve_applied.click_execute_button()
        let isDisable = await approve_applied.display_confirm_popup()
        if (isDisable) {
            await console.log("Click execute apply request success : PASSED")
        }

    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC111_2: Check click [ 閉じる ] button', async () => {
        await approve_applied.detail_screen()
        await approve_applied.click_approve()
        await approve_applied.click_execute_button()
        await approve_applied.click_close_button()
        let status = await approve_applied.check_status()
        await assert.strictEqual(status, constn.purchase_order_request_approved, " Status is not '購買見積依頼承認済' : FAILED")
        if (status == constn.purchase_order_request_approved) {
            await console.log(" Status '購買見積依頼承認済' : PASSED")
        }
    })
    afterEach(async () => {
        await page.close()
    })
})