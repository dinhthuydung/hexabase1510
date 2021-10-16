const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { purchase_applyPage } = require('../../page/purchasePage/purchase_applyPage')
const { register_quotePage } = require('../../page/purchasePage/register_quotePage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：見積登録をする / Purchasing requirements details / actions: Register a quote : purchase/register_quote.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const register_quote = new register_quotePage()
    const purchase_apply = new purchase_applyPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await register_quote.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
       
    })
    //=============Check display Register a quote  screen============================================
    it('TC75: Check display  Register a quote screen', async () => {
        await register_quote.detail_screen()
        let enable_register = await register_quote.enable_register_quote_button()
        await assert.strictEqual(enable_register, true, "Register a quote button [見積登録をする] is not enable : FAILED")
        if (enable_register) {
            await console.log("Register a quote screen display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC78_1: Check click [ 実行する ] button', async () => {
        await register_quote.detail_screen()
        await register_quote.click_register_quote_button()
        let enable_register = await register_quote.enable_execute_register()
        await assert.strictEqual(enable_register,true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable_register) {
            await register_quote.click_execute_register()
            let display = await register_quote.display_popup_execute_success()
            if (display) {
                await console.log("Click execute request a quote : PASSED")
            }
        }
    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC78_2: Check click [ 閉じる ] button', async () => {
        await register_quote.detail_screen()
        await register_quote.click_register_quote_button()
        await purchase_apply.click_execute() 
        let status = await purchase_apply.check_status() 
        let result = await assert.strictEqual(status, constn.quotation_registered," Status is not '見積登録済' : FAILED")
        if(status == constn.quotation_registered){
            await console.log(" Status is '見積登録済' : PASSED")
        }
    })
    afterEach(async () => {  
        await page.close()
    })
})