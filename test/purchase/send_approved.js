const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/purchase/purchase_search')
const { send_approvedPage } = require('../../page/purchasePage/send_approvedPage')
const { purchase_regisPage } = require('../../page/purchasePage/purchase_regisPage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')

const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')


describe('V2_CREO_APL: 購買要件詳細/アクション：発注依頼発信する /  Purchase requirements details / actions: Send an order request : purchase/send_approved.js', async () => {
    const purchase_search = new purchase_search_modifyPage()
    const purchase_register = new purchase_regisPage()
    const send_approved = new send_approvedPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        await send_approved.login_pass()
        await page.setViewportSize({ width: 1920, height: 1080 })
        

    })
    //=============Check display Approve quote request screen==========================================
    it('TC114: Check display screen', async () => {
        await send_approved.detail_screen()
        let isDisplay = await send_approved.display_send_button()
        await assert.strictEqual(isDisplay, true, "Send quote button [ 発注依頼発信する ] is not display : FAILED")
        if (isDisplay) {
            await console.log(" Send a quote button [発注依頼発信する] display correct: PASSED")
        }
    })
    //=============Check click [ 実行する ] button: should be display confirm popup=====================
    it('TC117: Check click [ 実行する ] button', async () => {
        await send_approved.detail_screen()
        await send_approved.click_send()
        await send_approved.click_execute_button()
        let isDisable = await send_approved.display_confirm_popup()
        if (isDisable) {
            let goto_search = await send_approved.display_goto_search_screen()
            let goto_detail = await send_approved.display_goto_detail_screen()
            if (goto_search == true && goto_detail == true) {
                await console.log("Click execute send request success, display 2 button [購買要件検索画面へ] and [発注詳細画面へ ]  : PASSED")
            }
        }

    })
    //==============Check click  [購買要件検索画面へ  ] button : should be display correct status=====================
    it('TC118: Check click [ 購買要件検索画面へ  ] button', async () => {
        await send_approved.detail_screen()
        await send_approved.click_send()
        await send_approved.click_execute_button()
        await send_approved.click_goto_search_screen()
        let status = await send_approved.display_search_screen()
        if(status==true){
            await console.log("Go to search screen correct : PASSED")
        }
       
    })
    //==============Check click  [発注詳細画面へ ] button : should be display correct status=====================
    it('TC119: Check click [  発注詳細画面へ ] button', async () => {
        await send_approved.detail_screen()
        await send_approved.click_send()
        await send_approved.click_execute_button()
        await send_approved.click_goto_detail_screen()
        let status = await send_approved.check_status()
        await assert.strictEqual(status, constn.quotation_registered, " Status is not '見積登録済' : FAILED")
        if (status == constn.quotation_registered) {
            await console.log(" Status '見積登録済' : PASSED")
        }
    })
     
    afterEach(async () => {
        await page.close()
    })
})