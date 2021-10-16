const { Locator } = require('../../locator/purchase/send_request.js')
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

class send_requestPage extends WorkSpace {
    send_requestPage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen(){
        return purchase_modify.filter_status(locator.status_search)
    }
    async click_send_request(){    
        let enable = await this.display_send_request_button()
        if (enable){
            return base.click_element(locator.send_request_button,"[ 見積依頼発信をする ] button")
        }       
    } 
    async enable_send_request_button(){
        return base.is_enable(locator.send_request_button)
    }
    async display_send_request_button(){
        return base.check_display_element(locator.send_request_button,"[ 見積依頼発信をする ] button")
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
module.exports = { send_requestPage }