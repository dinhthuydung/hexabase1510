const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { sendback_appliedPage } = require('../../page/purchasePage/sendback_appliedPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション： 差し戻す / Purchase requirements details / actions:  Send back : purchase/sendback_applied.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const sendback_applied = new sendback_appliedPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await sendback_applied.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
        
      
    })
    //=============Check display Approve quote request screen==========================================
    it('TC112: Check display screen', async () => {
        await sendback_applied.detail_screen()
        let isDisplay = await sendback_applied.display_sendback_button()
        await assert.strictEqual(isDisplay, true, "Sendback button [ 差し戻す ] is not display : FAILED")
        if (isDisplay) {
            await console.log(" Sendback a quote button [差し戻す] display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC113_1: Check click [ 実行する ] button', async () => {
        await sendback_applied.detail_screen()
        await sendback_applied.click_sendback()
        await sendback_applied.click_execute_button()
        let isDisable = await sendback_applied.display_confirm_popup()
        if (isDisable) {
            await console.log("Click execute sendback request success : PASSED")
        }

    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it.skip('TC113_2: Check click [ 閉じる ] button', async () => {
        await sendback_applied.detail_screen()
        await sendback_applied.click_sendback()
        await sendback_applied.click_execute_button()
        await sendback_applied.click_close_button()
        let status = await sendback_applied.check_status()
        await assert.strictEqual(status, constn.buying_requirements_creation, " Status is not '購買要件作成中' : FAILED")
        if (status == constn.buying_requirements_creation) {
            await console.log(" Status '購買要件作成中' : PASSED")
        }
    })
    afterEach(async () => {
        await page.close()
    })
})