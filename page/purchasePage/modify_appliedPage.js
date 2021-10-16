const { Locator } = require('../../locator/purchase/modify_applied.js')
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

class modify_appliedPage extends WorkSpace {
    modify_requestPage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n2)
    }
    async detail_screen(){
        return purchase_modify.filter_status(locator.status)
    }
    async click_modify(){    
        let enable = await this.display_modify_button()
        if (enable){
            return base.click_element(locator.modify_button,"[修正する] button")
        }       
    } 
    async enable_modify_button(){
        return base.is_enable(locator.modify_button)
    }
    async display_modify_button(){
        return base.check_display_element(locator.modify_button,"[ 修正する ] button")
    }
    async enable_execute_button(){
        return base.is_enable(locator.execute_button)
    }
    
    async click_execute_button(){
        let isEnable = await this.enable_execute_button()
        await assert.strictEqual(isEnable, true, "Execute button is not enable: FAILED")
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
}
module.exports = { modify_appliedPage }