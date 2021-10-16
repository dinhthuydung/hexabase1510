const { Locator } = require('../../locator/purchase/purchase_delete.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const {purchase_search_modifyPage} = require('../../page/purchasePage/purchase_search_modifyPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const playwright = require('playwright')
const assert = require('assert')

class purchase_deletePage extends WorkSpace {
    purchase_deletePage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen(){
        return purchase_modify.detail_screen()
    }
    async enable_delete_button(){
        return base.is_enable(locator.delete_button)
    }
    async click_delete_quotation_button(){
        return base.click_element(locator.delete_button,"[ 削除する ] button")
    }
    // [実行する] button
    async enable_execute_delete(){
        return base.is_enable(locator.execute_delete_button)
    }
    async display_execute_button(){
        return base.check_display_element(locator.execute_apply_button," [実行する] button ")
    }
    async click_execute_delete(){
        return base.click_element(locator.execute_delete_button," [実行する] button ")
    }
    //popup_execute_delete_success
    async display_popup_execute_delete_success(){
        return base.check_display_element(locator.popup_execute_delete," Popup [処理実行] when click execute delete")
    }
    //click [閉じる] close button
    async click_close_popup_delete(){
        return base.click_element(locator.close_delete_popup_button," close popup button")
    }
    //check status after delete request
    async check_status(){
        let status = await base.get_value(locator.status)
        return status
    }
}
module.exports = { purchase_deletePage }