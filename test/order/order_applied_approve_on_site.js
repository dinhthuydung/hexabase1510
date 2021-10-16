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
    const order_detail = new order_detailPage()

    beforeEach(async () => {
        const browser = await chromium.launch({
            headless: false,
            channel: 'chrome',
            slowMo: 100
        })
        page = await browser.newPage({ ignoreHTTPSErrors: true })
        // await page.setViewportSize({ width: 1920, height: 1080 })
        await order_search.login_pass_with_p2_email()
    });

    it('TC166: Check disable when click [ 現場承認をする ] button', async () => {
        await order_search.filter_status(locator.order_applied)
        await order_detail.click_on_site_approval_button()
        // let success_update_popup = await order_detail.check_display_success_update_popup()
        let access_action_popup = await order_detail.check_display_access_action_popup()
        let display_able_button = await order_detail.check_display_able_button()
        // await assert.strictEqual(detail_disabled, true, "Don't disabled all field : FAILED")
        await assert.strictEqual(access_action_popup, true, "Don't Display access acction popup : FAILED")
        await assert.strictEqual(display_able_button, true, "Don't Display able button : FAILED")
    })

    it.only('TC168: Check [発注予定日] > [購買要件登録日]', async () => {
        await order_search.filter_status(locator.order_applied)
        await order_search.click_modify_button()
        await order_detail.change_date_current_day()
        await order_detail.click_run_button()
        await order_detail.click_close_button()
        await order_detail.click_on_site_approval_button()
        await order_detail.verify_inclusion_hope_day_and_scheduled_order_date()

    })

    it('TC169: Check disable when click [ 現場承認をする ] button', async () => {
        await order_search.filter_status(locator.order_applied)
        await order_search.click_modify_button()
        await order_detail.change_date_current_day()
        await order_detail.click_run_button()
        await order_detail.click_close_button()
        await order_detail.click_on_site_approval_button()
        await order_detail.click_run_button()
        let text_mess =  await order_detail.get_text_approve_success_mess()
        await assert.strictEqual(text_mess, constn.approver_success_mess, "Approve mess do not the same spec : FAILED")

    })

    afterEach(async () => {
        await page.close()
    })

})