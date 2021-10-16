const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/modify_registed')
const { modify_registedPage } = require('../../page/purchasePage/modify_registedPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { delete_registedPage } = require('../../page/purchasePage/delete_registedPage')
const { chromium } = require('playwright')
const constn = new Constant()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：削除する / Purchase requirements details / actions: delete : purchase/delete_registed.js', async () => {
    const modify_registed = new modify_registedPage()
    const purchase_search = new purchase_search_modifyPage()
    const delete_registed = new delete_registedPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 250
        });
        page = await browser.newPage({ ignoreHTTPSErrors: true })  
        await delete_registed.login_pass()      
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    })
    //=============Check display Delete a quote  screen============================================
    it('TC95: Check display Delete a quote screen', async () => {
        await delete_registed.detail_screen()
        let enable_delete = await delete_registed.display_delete_button()
        await assert.strictEqual(enable_delete, true, "Delete a quote registed button [削除する] is not enable : FAILED")
        if (enable_delete) {
            await console.log("Delete a quote registed screen display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC96_1: Check click [ 実行する ] button', async () => {
        await delete_registed.detail_screen()
        await delete_registed.click_delete_quote_button()
        let enable_delete = await delete_registed.enable_execute_delete()
        await assert.strictEqual(enable_delete, true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable_delete) {
            await delete_registed.click_execute_delete()
            let isDisplay = await delete_registed.display_popup_execute_success()
            if (isDisplay) {
                await console.log("Click execute request a quote : PASSED")
            }
        }
    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC96_2: Check click [ 閉じる ] button', async () => {
        await delete_registed.detail_screen()
        await delete_registed.click_delete_quote_button()
        await purchase_apply.click_execute()
    })
    afterEach(async () => {
        await page.close()
    })
})