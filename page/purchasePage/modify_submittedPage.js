const { Locator } = require('../../locator/purchase/modify_submitted.js')
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

class modify_submittedPage extends WorkSpace {
    modify_submittedPage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n2)
    }
    async detail_screen(){
        return purchase_modify.filter_status(locator.status_submitted)
    }
    async click_modify(){    
        let enable = await this.display_modify_button()
        if (enable){
            return base.click_element(locator.modify_button,"[削除する] button")
        }       
    } 
    async enable_modify_button(){
        return base.is_enable(locator.modify_button)
    }
    async display_modify_button(){
        return base.check_display_element(locator.modify_button,"[削除する] button")
    }
    async enable_execute_button(){
        return base.is_enable(locator.execute_button)
    }
    
    async click_execute_button(){
        let isEnable = await modify_submmitted.enable_execute_button()
        await assert.strictEqual(isEnable, true, "Modify submitted purchase screen display incorrect: FAILED")
        if(isEnable){
           return base.click_element(locator.execute_button,"execute button")
        }     
    }
    async display_confirm_popup(){
        return base.check_display_element(locator.popup_confirm, "confirm popup ")
    }
    async click_close_button(){
        return base.click_element(locator.close_popup_button," close popup button")
    }


    async click_apply_quotation_button(){
        return base.click_element(locator.apply_button,"[購買見積依頼申請する] button")
    }
    // [実行する] button
    async enable_execute_apply(){
        return base.is_enable(locator.execute_apply_button)
    }
    async click_execute_apply(){
        return base.click_element(locator.execute_apply_button," [実行する] button ")
    }
    //popup_execute_apply_success
    async display_popup_execute_apply_success(){
        return base.check_display_element(locator.popup_execute_apply," Popup [処理実行] when click execute apply")
    }
    //click [閉じる] close button
    async click_close_popup_apply(){
        return base.click_element(locator.close_apply_popup_button,"close popup button")
    }
    //check status after apply request
    async check_status(){
        let status = await base.get_value(locator.status)
        return status
    }
}
module.exports = { modify_submittedPage }