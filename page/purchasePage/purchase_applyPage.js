const { Locator } = require('../../locator/purchase/purchase_apply.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const {purchase_search_modifyPage} = require('../../page/purchasePage/purchase_search_modifyPage')
const {purchase_regisPage} = require('../../page/purchasePage/purchase_regisPage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const purchase_modify = new purchase_search_modifyPage()
const purchase_regis = new purchase_regisPage()
const playwright = require('playwright')
const assert = require('assert')

class purchase_applyPage extends WorkSpace {
    purchase_applyPage() {}
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    async detail_screen(){
        return purchase_modify.detail_screen()
    }
    async click_apply(){
        let enable = await this.enable_apply_button()
        await assert.strictEqual(enable, true , " OOPs, [購買見積依頼申請する] button is not enable to click : FAILED")
        if (this.enable_apply_button){
            return base.click_element(locator.apply_button,"[購買見積依頼申請する] button")
        }       
    }

    async enable_apply_button(){
        return base.is_enable(locator.apply_button)
    }
    async click_apply_quotation_button(){
        return base.click_element(locator.apply_button,"[購買見積依頼申請する] button")
    }
    // [実行する] button
    async enable_execute_apply(){
        return base.is_enable(locator.execute_apply_button)
    }
    async display_execute_button(){
        return base.check_display_element(locator.execute_apply_button," [実行する] button ")
    }
    async click_execute_apply(){
        return base.click_element(locator.execute_apply_button," [実行する] button ")
    }
    //popup_execute_apply_successf
    async display_popup_execute_apply_success(){
        return base.check_display_element(locator.popup_execute_apply," Popup [処理実行] when click execute apply")
    }
    //click [閉じる] close button
    async click_close_popup_apply(){
        return base.click_element(locator.close_apply_popup_button," close popup button ")
    }
    //check status after apply request
    async check_status(){
        let status = await base.getText_element(locator.status)
        return status
    }
    async click_execute(){
        let enable = await this.enable_execute_apply()
        await assert.strictEqual(enable,true, " [ 実行する ] button is not enable to click: FAILED")
        if (enable) {
            await this.click_execute_apply()
            let enable_close = await this.display_popup_execute_apply_success()
            if (enable_close) {
                await base.click_element(locator.close_apply_popup_button," close popup button ")
            }
        }
    }
     //使用部門 message required
     async mess_department_use(){
        let display = await base.check_display_element(locator.department_use, "Message required of [使用部門]")
        if(display==true){
            return base.getText_element(locator.department_use)
        }
    }
    //納入希望日 Desired delivery date
    async mess_desired_delivery_date(){
        let display = await base.check_display_element(locator.desired_delivery_date, "Message required of [納入希望日]")
        if(display==true){
            return base.getText_element(locator.desired_delivery_date)
        }
    }
     //見積依頼日 
     async mess_quotation_request_date(){
        let display = await base.check_display_element(locator.quotation_request_date, "Message required of [見積依頼日]")
        if(display==true){
            return base.getText_element(locator.quotation_request_date)
        }
    }
     //見積提出期限 
     async mess_quotation_submission_deadline(){
        let display = await base.check_display_element(locator.quotation_submission_deadline, "Message required of [見積提出期限]")
        if(display==true){
            return base.getText_element(locator.quotation_submission_deadline)
        }
    }
    //見積書提出方法 
    async mess_submit_quote(){
        let display = await base.check_display_element(locator.submit_quote, "Message required of [見積書提出方法]")
        if(display==true){
            return base.getText_element(locator.submit_quote)
        }
    }
    async apply_screen(){
        await purchase_regis.click_purchase_register()
        await purchase_regis.regis_date()
        await purchase_regis.get_applicant_department()
        await purchase_regis.get_applicant()
        await purchase_regis.schedule_order_date()
        await purchase_regis.get_item()
        await purchase_regis.input_estimated_number()
        await purchase_regis.input_unit()
        await purchase_regis.click_execute_button()
        await purchase_regis.register_success()
        await this.click_apply()
    }

}
module.exports = { purchase_applyPage }