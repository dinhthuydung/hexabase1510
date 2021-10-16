const { Locator } = require('../../locator/purchase/send_approved.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const { purchase_search_modifyPage } = require('./purchase_search_modifyPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const playwright = require('playwright')
const assert = require('assert')

class send_approvedPage extends WorkSpace {
    send_approvedPage() { }
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen() {
        return purchase_modify.filter_status(locator.status_approved)
    }
    async click_send() {
        let enable = await this.display_send_button()
        if (enable) {
            return base.click_element(locator.send_button, "[ 発注依頼発信する ] button")
        }
    }
    async enable_send_button() {
        return base.is_enable(locator.send_button)
    }
    async display_send_button() {
        return base.check_display_element(locator.send_button, "[ 発注依頼発信する ] button")
    }
    async enable_execute_button() {
        return base.is_enable(locator.execute_button)
    }

    async click_execute_button() {
        let isEnable = await this.enable_execute_button()
        await assert.strictEqual(isEnable, true, "[ 実行する ] is not enable to click: FAILED")
        if (isEnable) {
            return base.click_element(locator.execute_button, "execute button")
        }
    }
    async display_confirm_popup() {
        return base.check_display_element(locator.popup_confirm, "confirm popup ")
    }
    async display_goto_search_screen() {
        return base.check_display_element(locator.goto_search_screen, "[購買要件検索画面へ] button")
    }
    async display_goto_detail_screen() {
        return base.check_display_element(locator.goto_detail_screen, "[発注詳細画面へ ] button")
    }
    async click_goto_search_screen() {
        let display = this.display_goto_search_screen()
        if (display) {
            return base.click_element(locator.goto_search_screen, " [購買要件検索画面へ] button")
        }
    }
    async click_goto_detail_screen() {
        let display = this.display_goto_detail_screen()
        if (display) {
            return base.click_element(locator.goto_detail_screen, " [発注詳細画面へ] button")
        }
    }
    async display_search_screen(){
        return base.check_display_element(locator.search_screen," Search screen")
    }
    //check status after apply request
    async check_status() {
        let status = await base.getText_element(locator.status)
        return status
    }
}
module.exports = { send_approvedPage }