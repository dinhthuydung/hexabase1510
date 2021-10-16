const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { purchase_applyPage } = require('../../page/purchasePage/purchase_applyPage')
const { delete_quotePage } = require('../../page/purchasePage/delete_quotePage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL:購買要件詳細/アクション：削除する / Purchasing Requirements Details / Actions: Delete : puarchase/delete_quote.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const delete_quote = new delete_quotePage()
    const purchase_apply = new purchase_applyPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 250
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await delete_quote.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    });
    //=============Check display Delete a quote  screen============================================
    it('TC79: Check display Delete a quote screen', async () => {
        await delete_quote.detail_screen()
        let enable_delete = await delete_quote.display_delete_quote_button()
        await assert.strictEqual(enable_delete, true, "Delete a quote button [削除する] is not enable : FAILED")
        if (enable_delete) {
            await console.log("Delete a quote screen display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC80_1: Check click [ 実行する ] button', async () => {
        await delete_quote.detail_screen()
        await delete_quote.click_delete_quote_button()
        let enable_delete = await delete_quote.enable_execute_delete()
        await assert.strictEqual(enable_delete,true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable_delete) {
            await delete_quote.click_execute_delete()
            let isDisplay = await delete_quote.display_popup_execute_success()
            if (isDisplay) {
                await console.log("Click execute request a quote : PASSED")
            }
        }
    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC80_2: Check click [ 閉じる ] button', async () => {
        await delete_quote.detail_screen()
        await delete_quote.click_delete_quote_button()
        await purchase_apply.click_execute()      
    })
    afterEach(async () => {  
        await page.close()
    })
})