const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_delete')
const { purchase_deletePage } = require('../../page/purchasePage/purchase_deletePage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')

describe('V2_CREO_APL: 購買要件詳細/アクション：削除する / Purchasing requirements details / actions: delete : purchase/purchase_delete.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
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
    //=============Check display delete for a purchase quote request screen===========================
    it('TC43: Check display screen', async () => {
        await purchase_delete.detail_screen()
        let enable_delete = await purchase_delete.enable_delete_button()
        await assert.strictEqual(enable_delete,true,"[ 削除する ] button is not enable to click : FAILED")
        if (enable_delete) {
            await purchase_delete.click_delete_quotation_button()
            let display_execute = await purchase_delete.display_execute_button()
            if (display_execute) {
                await console.log("Delete request quotaiton screen display correct : PASSED")
            }
        }
    })
    //============Check click [ 実行する ] button=====================================================
    it('TC44_1: Check click [ 実行する ] button', async () => {
        await purchase_delete.detail_screen()
        await purchase_delete.click_delete_quotation_button()
        let enable_delete = await purchase_delete.enable_execute_delete()
        if (enable_delete) {
            await purchase_delete.click_execute_delete()
            let isDisable = await purchase_delete.display_popup_execute_delete_success()
            if (isDisable) {
                await console.log("Click execute delete request success : PASSED")
            }
        }
    })
    it.skip('TC44_2: Check click [ 実行する ] button', async () => {
        await purchase_delete.detail_screen()
        await purchase_delete.click_delete_quotation_button()
        let enable_delete = await purchase_delete.enable_execute_delete()
        if (enable_delete) {
                await purchase_delete.click_execute_delete()
                let isDisable = await purchase_delete.display_popup_execute_delete_success()
                if (isDisable) {
                    await purchase_delete.click_close_popup_delete()
                    let status_quotation = await purchase_delete.check_status()
                    await assert.strictEqual(status_quotation, constn.purchasing_requirements_deleted, "Status is not [購買要件削除済]: FAILED")
                    if (status_quotation) {
                        await console.log("Status is [購買要件削除済]: PASSED")
                    }
                }
            }       
    })
    afterEach(async () => {
        await page.close()
    })
})