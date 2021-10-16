const { Locator } = require('../../locator/purchase/approve_applied.js')
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

class approve_appliedPage extends WorkSpace {
    approve_appliedPage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n2)
    }
    async detail_screen(){
        return purchase_modify.filter_status(locator.status_applied)
    }
    async click_approve(){    
        let enable = await this.display_approve_button()
        if (enable){
            return base.click_element(locator.approve_button,"[ 購買発注依頼承認する ] button")
        }       
    } 
    async enable_approve_button(){
        return base.is_enable(locator.approve_button)
    }
    async display_approve_button(){
        return base.check_display_element(locator.approve_button,"[ 購買発注依頼承認する ] button")
    }
    async enable_execute_button(){
        return base.is_enable(locator.execute_button)
    }
    
    async click_execute_button(){
        let isEnable = await this.enable_execute_button()
        await assert.strictEqual(isEnable, true, "[ 実行する ] is not enable to click: FAILED")
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
    //check status after apply request
    async check_status(){
        let status = await base.getText_element(locator.status)
        return status
    }
}
module.exports = { approve_appliedPage }