const { Locator } = require('../../locator/purchase/sendback.js')
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

class sendbackPage extends WorkSpace {
    sendbackPage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n2)
    }
    async detail_screen(){
        return purchase_modify.filter_status(locator.status_submitted)
    }
    async click_sendback(){    
        let enable = await this.display_sendback_button()
        if (enable){
            return base.click_element(locator.sendback_button,"[ 差し戻す ] button")
        }       
    } 
    async enable_sendback_button(){
        return base.is_enable(locator.sendback_button)
    }
    async display_sendback_button(){
        return base.check_display_element(locator.sendback_button,"[ 差し戻す ] button")
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
        let status = await base.get_value(locator.status)
        return status
    }
}
module.exports = { sendbackPage }