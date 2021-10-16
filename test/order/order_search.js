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


describe('V2_CREO_APL: 発注登録 / Order registration : order/order_registration.js', async () => {
    const order_search = new order_searchPage()
    const order_detail = new order_detailPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        // await page.setViewportSize({ width: 1920, height: 1080 })
        await order_search.login_pass()
    });
    //=============Check display Order search screen======================================
    it('TC140: Check display Order search screen', async () => {
        await order_search.click_order_search()
        let display = await order_search.display_order_search_title()
        await assert.strictEqual(display, constn.order_search_title, "Not display correct : FAILED")
        if (display == constn.order_search_title) {
            await console.log("Display correct order registration screen : PASSED")
        }
    })
    //===============Check displau detail screen order search screen=======================
    it('TC141: Check display Order search screen', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        let display = await order_search.display_order_detail_title()
        await assert.strictEqual(display, constn.order_detail_title, "Not display correct : FAILED")
        if (display == constn.order_detail_title) {
            await console.log("Display correct Order search screen : PASSED")
        }
    })

    //===================Check display modify screen=====================================
    it('TC142: Check display Order modify screen', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        let display = await order_search.enable_modify_button()
        await assert.strictEqual(display, true, "Modify button is not enable to click : FAILED")
        if (display == true) {
            await console.log("Modify button is enale to click : PASSED")
        }

    })

    //===================Check display modify screen=====================================
    it('TC144: Check display error mess when 発注予定日 < 発注申請日', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        await order_detail.change_date_order_date_after_scheduled_order()
        let display = await order_detail.get_text_scheduled_date_error_mess()
        if (display == constn.scheduled_date_after_app_date_mess.mess1){
            await assert.strictEqual(display, constn.scheduled_date_after_app_date_mess.mess1, "Don't show error mess: FAILED")
        } else{
            await assert.strictEqual(display, constn.scheduled_date_after_app_date_mess.mess2, "Don't show error mess: FAILED")
        }
        await console.log("Show error mess when order_date > scheduled date : PASSED")
    })

    //===================Check display modify screen=====================================
    it('TC145: Check dont show error mess when 発注予定日 > 発注申請日', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        await order_detail.change_date_order_date_after_scheduled_order()
        let display = await order_detail.check_display_scheduled_date_error_mess()
        await assert.strictEqual(display, true, "Show error mess: FAILED")

        await console.log("Dont when order_date < scheduled date : PASSED")
    })

    //==========Check action modify screen ================================================
    it('TC146: Check edit value 仕入先', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        let value = await order_search.get_supplier()
        text1 = value.split(' ')[0]
        let text2 = await order_search.value_supplier()
        await assert.strictEqual(text1, text2.trim(), "Display incorrect value : FAILED")
        if (text1 == text2.trim()) {
            await console.log("Display correct value : PASSED")
        }
    })
    //========== Check [仕入先担当] is blank ================================================
    it('TC147: Check edit value 仕入先', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        let value = await order_search.value_supplier_charge()
        await assert.strictEqual(value, "", "Not blank [仕入先担当] : FAILED")
        if (value == "") {
            await console.log("[仕入先担当] is blank : PASSED")
        }
    })
    //========== Check [支払情報] is blank ================================================
    it('TC148: Check edit value 支払先', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        let value = await order_search.value_payment_destination()
        await assert.strictEqual(value, "", "Not blank [支払情報] : FAILED")
        if (value == "") {
            await console.log("[支払情報] is blank : PASSED")
        }
    })

    //========== Check Edit value of [品目] ================================================
    it('TC149: Check edit value of [品目]', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        await order_detail.check_change_unit_price()
        await order_detail.compare_amount_item()
        await order_detail.compare_tax_item()
    })

    it('TC149_1: Check calculator total value of [品目]', async () => {
        await order_search.filter_status(locator.admit_on_spot)
        let calculator_amount = await order_detail.calculator_total_amount()
        let total_amount = await order_detail.get_total_amount()
        await assert.strictEqual(calculator_amount, total_amount, "Total amount not equal calculator amount : FAILED")
        
        let calculator_tax = await order_detail.calculator_total_tax()
        let total_tax = await order_detail.get_total_tax()
        await assert.strictEqual(calculator_tax, total_tax, "Total tax not equal calculator tax : FAILED")

    })

    //==================Check Click [ 修正する] button ========================================
    it('TC150: Check Click [ 修正する] button', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_search.click_modify_button()
        let value = await order_search.modify_supplier()
        let text1 = value.split(' ')[0]
        let text2 = await order_search.value_supplier()

        await assert.strictEqual(text1, text2.trim(), "Display incorrect value : FAILED")
        if (text1 == text2.trim()) {
            await console.log("Display correct value : PASSED")
        }
    })

    //==================Check Click [ 閉じる] button ========================================
    it('TC151: Check update when Click [ 修正する] button and Click [ 閉じる ] button', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
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

    it('TC152: Check disable when click [ 現場承認をする ] button', async () => {
        await order_search.filter_status(locator.creating_an_order_application_status)
        await order_detail.click_on_apply_for_an_odder_button()
        // let success_update_popup = await order_detail.check_display_success_update_popup()
        let access_action_popup = await order_detail.check_display_access_action_popup()
        let display_able_button = await order_detail.check_display_able_button()
        // await assert.strictEqual(detail_disabled, true, "Don't disabled all field : FAILED")
        await assert.strictEqual(access_action_popup, true, "Don't Display access acction popup : FAILED")
        await assert.strictEqual(display_able_button, true, "Don't Display able button : FAILED")
    })

    afterEach(async () => {
        await page.close()
    })
})