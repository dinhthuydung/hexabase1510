const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { pullbackPage } = require('../../page/purchasePage/pullbackPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { purchase_deletePage } = require('../../page/purchasePage/purchase_deletePage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：引き戻す / Purchase requirements details / actions: Pull back : purchase/pullback.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const pullback = new pullbackPage()
    const purchase_delete = new purchase_deletePage()
    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await purchase_search.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })     
    })
    //=============Check display Pullback for a purchase order request applied screen===========================
    it('TC97: Check display pullback screen', async () => {
        await pullback.detail_screen()
        let isDisplay = await pullback.enable_pullback_button()
        await assert.strictEqual(isDisplay, true, "Pullback button[引き戻す] is not enable : FAILED")
        if (isDisplay) {
            await console.log("Pullback button[引き戻す] is enable to click: PASSED")
        }

    })

    //=============Click execute pullback===============================================================
    it('TC98_1: Check click  [ 実行する ]  button', async () => {
        await pullback.detail_screen()
        await pullback.click_pullback_button()
        await pullback.click_execute_button()
        let displayPopup = await pullback.display_popup_pullback()
        if(displayPopup){
            await console.log("Click execute [ 実行する ] button success, diplay confirm popup : PASSED")
        }

    })

    //==========Check click close popup================================================================
    it.skip('TC98_2: Check click [ 実行する ] button', async () => {
        await pullback.detail_screen()
        await pullback.click_pullback_button()
        await pullback.click_execute_button()
        await pullback.click_close_popup_pullback()
        let status = await  pullback.check_status()
        await assert.strictEqual(status, constn.buying_requirements_creation, " Status is not '購買要件作成中' : FAILED")
        if (status == constn.buying_requirements_creation) {
            await console.log(" Status '購買要件作成中' : PASSED")
        }
    })
    afterEach(async () => {
         await page.close()
    })
})