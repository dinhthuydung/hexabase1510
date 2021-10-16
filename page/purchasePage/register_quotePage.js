const { Locator } = require('../../locator/purchase/register_quote.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const { purchase_search_modifyPage } = require('../../page/purchasePage/purchase_search_modifyPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const playwright = require('playwright')
const assert = require('assert')

class register_quotePage extends WorkSpace {
    register_quotePage() { }
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen() {
        return purchase_modify.filter_status(locator.status_search)
    }
    //[見積登録をする] button
    async click_register_quote_button() {
        let display = await this.display_register_quote_button()
        await assert.strictEqual(display, true, " OOPs, [見積登録をする] button is not enable to click : FAILED")
        if (display) {
            return base.click_element(locator.register_quote_button, "[見積登録をする] button")
        }
    }
    async enable_register_quote_button() {
        return base.is_enable(locator.register_quote_button)
    }
    async display_register_quote_button() {
        return base.check_display_element(locator.register_quote_button," [見積登録をする] button ")
    }

    // [実行する] button
    async enable_execute_register() {
        return base.is_enable(locator.execute_button)
    }

    async display_execute_button() {
        return base.check_display_element(locator.execute_button, " [実行する] button ")
    }
    async click_execute_register() {
        return base.click_element(locator.execute_button, " [実行する] button ")
    }
    //popup_execute_successf
    async display_popup_execute_success() {
        return base.check_display_element(locator.popup_confirm, " Popup [処理実行] when click execute apply")
    }
    //click [閉じる] close button
    async click_close_popup_apply() {
        return base.click_element(locator.close_popup_button, " close popup button ")
    }
    //check status after apply request
    async check_status() {
        let status = await base.get_value(locator.status)
        return status
    }
    async click_execute() {
        let enable = await this.enable_execute_register()
        await assert.strictEqual(enable, true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable) {
            await this.click_execute_register()
            let enable_close = await this.display_popup_execute_success()
            if (enable_close) {
                await base.click_element(locator.close_popup_button, " close popup button ")
            }
        }
    }
}
module.exports = { register_quotePage }