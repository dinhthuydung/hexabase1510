const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { Locator } = require('../../locator/order/order_search')
const { order_searchPage } = require('../../page/orderPage/order_searchPage')
const { order_detailPage } = require('../../page/orderPage/order_detail_page')
const { order_registrationPage } = require('../../page/orderPage/order_registrationPage')
const { chromium } = require('playwright')
const constn = new Constant()
const base = new BasePage()
const locator = new Locator()
const assert = require('assert')
const { compileFunction } = require('vm')


describe('V2_CREO_APL: 発注登録 / Order search : order/order_applied.js', async () => {
    const order_search = new order_searchPage()
    const order_search2 = new order_searchPage()
    const order_detail = new order_detailPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        // await page.setViewportSize({ width: 1920, height: 1080 })
        await order_search.login_pass_with_p3_email()
    });

    //==================Check go to order detail page ========================================
    it('TC171: Check display Order detail with 現場承認済 search', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        let display = await order_search.display_order_detail_title()
        await assert.strictEqual(display, constn.order_detail_title, "Not display correct : FAILED")
        if (display == constn.order_detail_title) {
            await console.log("Display correct Order search screen : PASSED")
        }
    })

    //==================Check error mess ========================================
    it('TC173: Check error mess when 発注予定日 < current day', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        await order_detail.change_schedule_date_to_past()
        let display = await order_detail.check_display_scheduled_date_error_mess()
        await assert.strictEqual(display, true, "Don't display error mess : FAILED")
        await console.log("Display error mess : PASSED")
    })

    it.only('TC174: Check error mess when 発注予定日 < 発注申請日', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        await order_detail.change_date_current_day()
        await order_detail.change_schedule_date_to_past()
        let display = await order_detail.get_text_scheduled_date_error_mess()
        if (display == constn.scheduled_date_after_app_date_mess.mess3){
            await assert.strictEqual(display, constn.scheduled_date_after_app_date_mess.mess3, "Don't show error mess: FAILED")
        }
        await console.log("Show error mess when  発注予定日 < 発注申請日 : PASSED")
    })

    //==========Check action modify screen ================================================
    it('TC175: Check edit value 仕入先 in 現場承認済 detail', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        let value = await order_search.get_supplier()
        text1 = value.split(' ')[0]
        let text2 = await order_search.value_supplier()
        await assert.strictEqual(text1, text2.trim(), "Display incorrect value : FAILED")
        if (text1 == text2.trim()) {
            await console.log("Display correct value : PASSED")
        }
    })

    //========== Check [支払情報] is blank ================================================
    it('TC176: Check edit value 支払先 in 現場承認済 detail', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        let value = await order_search.value_payment_destination()
        await assert.strictEqual(value, "", "Not blank [支払情報] : FAILED")
        if (value == "") {
            await console.log("[支払情報] is blank : PASSED")
        }
    })

    it('TC177: Check edit value 支払先 in 現場承認済 detail', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        await order_detail.check_change_unit_price()
        await order_detail.compare_amount_item()
        await order_detail.compare_tax_item()
    })

    it('TC177_1: Check calculator total value of [品目]', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        let calculator_amount = await order_detail.calculator_total_amount()
        let total_amount = await order_detail.get_total_amount()
        await assert.strictEqual(calculator_amount, total_amount, "Total amount not equal calculator amount : FAILED")
        
        let calculator_tax = await order_detail.calculator_total_tax()
        let total_tax = await order_detail.get_total_tax()
        await assert.strictEqual(calculator_tax, total_tax, "Total tax not equal calculator tax : FAILED")

    })

    //==================Check Click [ 修正する] button ========================================
    it('TC178: Check Click [ 修正する] button', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        let value = await order_search.modify_supplier()
        let text1 = value.split(' ')[0]
        let text2 = await order_search.value_supplier()

        await assert.strictEqual(text1, text2.trim(), "Display incorrect value : FAILED")
        if (text1 == text2.trim()) {
            await console.log("Display correct value : PASSED")
        }
    })

    it('TC179: Check update when Click [ 修正する] button and Click [ 閉じる ] button', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_search.click_modify_button()
        let disable_button = await order_search.check_disable_run_button()
        await console.log(disable_button)
        if (disable_button == true) {
            await order_detail.change_date_current_day()
            await order_search.click_run_button();
        } else{
            await order_search.click_run_button();
        }
        let popup = await order_detail.check_display_success_update_popup()
        await assert.strictEqual(popup, true, "Don't Display Popup : FAILED")
    })

    it('TC180: Check disable when click [ 現場承認をする ] button', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        await order_detail.click_on_order_approval_button()
        // let success_update_popup = await order_detail.check_display_success_update_popup()
        let access_action_popup = await order_detail.check_display_access_action_popup()
        let display_able_button = await order_detail.check_display_able_button()
        // await assert.strictEqual(detail_disabled, true, "Don't disabled all field : FAILED")
        await assert.strictEqual(access_action_popup, true, "Don't Display access acction popup : FAILED")
        await assert.strictEqual(display_able_button, true, "Don't Display able button : FAILED")
    })

    it('TC183: Check action button is not displayed', async () => {
        await order_search2.filter_status(locator.admit_on_spot)
        await order_detail.click_on_order_approval_button()
        // let success_update_popup = await order_detail.check_display_success_update_popup()
        let access_action_popup = await order_detail.check_display_access_action_popup()
        let display_able_button = await order_detail.check_display_able_button()
        // await assert.strictEqual(detail_disabled, true, "Don't disabled all field : FAILED")
        await assert.strictEqual(access_action_popup, true, "Display access acction popup : TRUE")
        await assert.strictEqual(display_able_button, true, "Display able button : TRUE")
    })

    afterEach(async () => {
        await page.close()
    })

})