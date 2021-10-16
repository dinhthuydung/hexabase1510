const { Locator } = require('../../locator/purchase/pullback.js')
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

class pullbackPage extends WorkSpace {
    pullbackPage() { }
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen() {
        return purchase_modify.filter_status(locator.status_quotation_registered)
    }
    async enable_pullback_button() {
        let display = await this.display_pullback_button()
        if (display == true) {
            return await base.is_enable(locator.pullback_button)
        }
    }
    async display_pullback_button() {
        return base.check_display_element(locator.pullback_button, " Pullback button [ 引き戻す ] ")
    }
    async click_pullback_button() {
        let enable = await this.enable_pullback_button()
        if (enable) {
            return base.click_element(locator.pullback_button, "[ 引き戻す ] button")
        }
    }
    async click_execute_button() {
        let enable = await base.is_enable(locator.execute_button)
        await assert.strictEqual(enable, true, "Execute button")
        if (enable) {
            return base.click_element(locator.execute_button, "Execute button")
        }
    }

    async display_popup_pullback() {
        return base.check_display_element(locator.confirm_popup, "Popup confirm [処理実行]")
    }
    async click_close_popup() {
        return base.click_element(locator.click_close, "[ 閉じる ] button")
    }
    async click_close_popup_pullback() {
        let result = await this.display_popup_pullback()
        if (result) {
            return base.click_element(locator.click_close, "[ 閉じる ] button")
        }
    }
    async check_status(){
        let status = await base.getText_element(locator.status)
        return status
    }
}
module.exports = { pullbackPage }