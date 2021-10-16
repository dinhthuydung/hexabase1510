const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_pullbackPage } = require('../../page/purchasePage/purchase_pullbackPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { purchase_deletePage } = require('../../page/purchasePage/purchase_deletePage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：引き戻す /  Purchasing requirements details / actions: Pull back : purchase/purchase_pullback.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const purchase_pullback = new purchase_pullbackPage()
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
    //=============Check display Pullback for a purchase quote request screen===========================
    it('TC45: Check display pullback screen', async () => {
        await purchase_pullback.pullback_screen()
        let isDisplay = await purchase_pullback.display_pullback_button()
        await assert.strictEqual(isDisplay, true, "Pullback button[引き戻す] is not enable : FAILED")
        if (isDisplay) {
            await console.log("Pullback button[引き戻す] is enable to click: PASSED")
        }

    })

    //=============Click execute pullback===============================================================
    it('TC46_1: Check click [ 引き戻す ] button', async () => {
        await purchase_pullback.pullback_screen()
        let enable_pullback = await purchase_pullback.display_pullback_button()
        if (enable_pullback) {
            await purchase_pullback.click_pullback_button()
            await purchase_pullback.click_execute_button()
            let isDisplay = await purchase_pullback.display_popup_pullback()
            await assert.strictEqual(isDisplay, true, "Popup confirm is not display : FAILED")
            if (isDisplay) {
                await console.log("Click execute pullback request success : PASSED")
            }
        }
    })

    //==========Check click close popup================================================================
    it('TC46_2: Check click [ 実行する ] button', async () => {
        await purchase_pullback.pullback_screen()
        let enable_pullback = await purchase_pullback.display_pullback_button()
        if (enable_pullback) {
            await purchase_pullback.click_pullback_button()
            await purchase_pullback.click_execute_button()
            let isDisplay = await purchase_pullback.display_popup_pullback()
            if (isDisplay) {
              await purchase_pullback.click_close_popup()
              let status = await purchase_delete.check_status()
              assert.strictEqual(status, contsn.buying_requirements_creation, "Status is not buying_requirements_creation : FAILED")
              if(status){
                  await console.log("Status is buying_requirements_creation : PASSED")
              }
            }
        }
    })


    afterEach(async () => {
         await page.close()
    })
})