const { Locator } = require('../../locator/purchase/delete_quote.js')
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

class delete_quotePage extends WorkSpace {
    delete_quotePage() { }
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen() {
        return purchase_modify.filter_status(locator.status_search)
    }
    //[ 削除する ] button
    async click_delete_quote_button() {
        let enable = await this.display_delete_quote_button()
        await assert.strictEqual(enable, true, " OOPs, [ 削除する ] button is not enable to click : FAILED")
        if (enable) {
            return base.click_element(locator.delete_quote_button, "[ 削除する ] button")
        }
    }
    async enable_delete_quote_button() {
        return base.is_enable(locator.delete_quote_button)
    }
    async display_delete_quote_button() {
        return base.check_display_element(locator.delete_quote_button," [ 削除する ] button ")
    }

    // [実行する] button
    async enable_execute_delete() {
        return base.is_enable(locator.execute_button)
    }
    async display_execute_button() {
        return base.check_display_element(locator.execute_button, " [実行する] button ")
    }
    async click_execute_delete() {
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
        let enable = await this.enable_execute_delete()
        await assert.strictEqual(enable, true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable) {
            await this.click_execute_delete()
            let enable_close = await this.display_popup_execute_success()
            if (enable_close) {
                await base.click_element(locator.close_popup_button, " close popup button ")
            }
        }
    }
}
module.exports = { delete_quotePage }