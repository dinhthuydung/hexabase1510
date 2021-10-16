const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { purchase_applyPage } = require('../../page/purchasePage/purchase_applyPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：購買見積依頼申請する / Apply for a purchase quote request : purchase/purchase_apply.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const purchase_apply = new purchase_applyPage()

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
    //=============Check display Apply for a purchase quote request screen===========================
    it('TC38: Check display screen', async () => {
        await purchase_apply.detail_screen()
        let enable_apply = await purchase_apply.enable_apply_button()
        assert.strictEqual(enable_apply,true," Apply button [購買見積依頼申請する] is not enable to click : FAILED")
        if (enable_apply) {
            await purchase_apply.click_apply_quotation_button()
            let display_execute = await purchase_apply.display_execute_button()
            if (display_execute) {
                await console.log("Apply request quotaiton screen display correct : PASSED")
            }
        }
    })
    //============Check mandatory fields===============================================================
    it('TC39: Check mandatory fields', async () => {
        await purchase_apply.apply_screen()
        let department_use = await purchase_apply.mess_department_use()
        let desired_delivery_date = await purchase_apply.mess_desired_delivery_date()
        let quotation_request_date = await purchase_apply.mess_quotation_request_date()
        let quotation_submission_deadline = await purchase_apply.mess_quotation_submission_deadline()
        let submit_quote = await purchase_apply.mess_submit_quote()
        await assert.strictEqual(department_use, constn.mess_department_use, " Message required is wrong : FAILED")
        await assert.strictEqual(desired_delivery_date, constn.mess_desired_delivery_date, " Message required is wrong : FAILED")
        await assert.strictEqual(quotation_request_date, constn.mess_quotation_request_date, " Message required is wrong : FAILED")
        await assert.strictEqual(quotation_submission_deadline, constn.mess_quotation_submission_deadline, " Message required is wrong : FAILED")
        await assert.strictEqual(submit_quote, constn.mess_submit_quote, " Message required is wrong : FAILED")

        if (department_use == constn.mess_department_use) {
            await console.log('Message 使用部門 display correct : PASSED')
        }
        if (desired_delivery_date == constn.mess_desired_delivery_date) {
            await console.log('Message 納入希望日 display correct : PASSED')
        }
        if (quotation_request_date == constn.mess_quotation_request_date) {
            await console.log('Message 見積依頼日 display correct : PASSED')
        }
        if (quotation_submission_deadline == constn.mess_quotation_submission_deadline) {
            await console.log('Message 見積提出期限 display correct : PASSED')
        }
        if (submit_quote == constn.mess_submit_quote) {
            await console.log('Message 見積書提出方法 display correct : PASSED')
        }

    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC42_1: Check click [ 実行する ] button', async () => {
        await purchase_apply.detail_screen()
        await purchase_apply.click_apply_quotation_button()
        let enable_apply = await purchase_apply.enable_execute_apply()
        await assert.strictEqual(enable_apply,true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable_apply) {
            await purchase_apply.click_execute_apply()
            let isDisable = await purchase_apply.display_popup_execute_apply_success()
            if (isDisable) {
                await console.log("Click execute apply request success : PASSED")
            }
        }
    })
    //==============Check click [ 閉じる ] button : should be display correct status=====================
    it('TC42_2: Check click [ 閉じる ] button', async () => {
        await purchase_apply.detail_screen()
        await purchase_apply.click_apply_quotation_button()
        await purchase_apply.click_execute() 
        let status = await purchase_apply.check_status() 
       let result = await assert.strictEqual(status, constn.purchase_quotation_request_applied," Status is not '購買見積依頼申請済' : FAILED")
        if(status==constn.purchase_quotation_request_applied){
            await console.log(" Status is '購買見積依頼申請済' : PASSED")
        }
    })
    afterEach(async () => {
        //await page.close()
    })
})