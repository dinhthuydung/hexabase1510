const { Locator } = require('../../locator/purchase/purchase_register.js')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../../page/basepage')
const { WorkSpace } = require('../../page/loginPage/workspacePage')
const base = new BasePage()
const locator = new Locator()
const constn = new Constant()
const workspace = new WorkSpace()
const playwright = require('playwright')
const assert = require('assert')
const { O_CREAT } = require('constants')
class purchase_regisPage extends WorkSpace {
    purchase_regisPage() { }
    async login_pass() {
        workspace.login_pass(constn.email_n1)
    }
    // click 購買要件登録 in menu
    async click_purchase_register() {
        return base.click_element(locator.purchase_register, "[購買要件登録]")
    }
    async check_display_screen_requirement_registration() {
        return await base.check_display_element(locator.text_title, " title ")
    }
    //disable 見積依頼先担当
    async disable_charge_requesting() {
        return base.is_disable(locator.charge_of_requesting)
    }
    async click_get_request_quotation() {
        return base.click_element(locator.get_request_quotation, " get button")
    }
    async display_request_quotation_popup() {
        return await base.check_display_element(locator.request_quotation_popup, " Popup [見積依頼先選択] ")
    }
    async close_request_quotation() {
        return page.isVisible(locator.request_quotation_popup)
    }
    async click_close_request_quotation() {
        return page.click(locator.close_request_quotation)
    }
    //購買要件登録日
    async regis_date(){
        await base.click_element(locator.regis_date, " [購買要件登録日]  ")
        await base.click_element(locator.select_regis_date, " [購買要件登録日] date ")
    }
    //見積依頼先
    async select_random_value_department_popup() {
        let select_random_value = await page.$$(locator.value_department_popup)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //enable 見積依頼先担当
    async enable_charge_requesting() {
        return base.is_enable(locator.charge_of_requesting)
    }
    async disable_payment_information() {
        return base.is_disable(locator.payment_information)
    }
    async click_get_payment_destination() {
        await page.click(locator.get_payment_destination)
    }
    async display_payee_popup() {
        return base.check_display_element(locator.payee_popup, " payee popup ")
    }
    async close_payee_popup() {
        return page.isVisible(locator.payee_popup)
    }
    async click_close_payee_popup() {
        await page.click(locator.close_payee_popup)
    }
    async select_random_value_payee_popup() {
        let select_random_value = await page.$$(locator.value_payee_popup)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    async display_item_selection() {
        return base.check_display_element(locator.item_selection, "item selection ")
    }
    async enable_payement_information() {
        return base.is_enable(locator.payment_information)
    }
    async click_get_item1() {
        return base.click_element(locator.get_item1, " get item button")
    }
    async item_selection() {
        return page.isVisible(locator.item_selection)
    }
    async enable_close_item_selection_button() {
        return base.is_enable(locator.close_item_selection)
    }
    async click_close_item_selection() {
        return base.click_element(locator.close_item_selection, " close item button")
    }
    async disable_specification() {
        return base.is_disable(locator.specification)
    }
    async disable_estimated_quantity() {
        return base.is_disable(locator.estimated_quantity)
    }
    async disable_unit() {
        return base.is_disable(locator.unit)
    }
    async disable_estimated_unit_price() {
        return base.is_disable(locator.estimated_unit_price)
    }
    async disable_estimated_amount() {
        return base.is_disable(locator.estimated_amount)
    }
    async disable_sale_tax() {
        return base.is_disable(locator.sale_tax)
    }
    async disable_tax_classification() {
        return base.is_disable(locator.tax_classification)
    }
    async click_search_item_selection() {
        return page.click(locator.search_item_selection)
    }
    async is_listed_selection() {
        return base.is_enable(locator.is_listed_selection)
    }
    async select_item() {
        let select_random_value = await page.$$(locator.is_listed_selection)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    async enable_specification() {
        return base.is_enable(locator.specification)
    }
    async enable_estimated_quantity() {
        return base.is_enable(locator.estimated_quantity)
    }
    async enable_unit() {
        return base.is_enable(locator.unit)
    }
    async enable_estimated_unit_price() {
        return base.is_enable(locator.estimated_unit_price)
    }
    async enable_estimated_amount() {
        return base.is_enable(locator.estimated_amount)
    }
    async enable_sale_tax() {
        return base.is_enable(locator.sale_tax)
    }
    async enable_tax_classification() {
        return base.is_enable(locator.tax_classification)
    }

    //申請者部門
    async get_applicant_department() {
        await base.click_element(locator.get_appicant_department, "get applicant department button ")
        let select_random_value = await page.$$(locator.value_applicant_department)
        //await console.log(select_random_value.length)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //申請者
    async get_applicant() {
        await base.click_element(locator.get_applicant, "get applicant button ")
        let select_random_value = await page.$$(locator.value_applicant)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //納入希望日
    async desired_delivery() {
        await base.click_element(locator.desired_delivery, " [納入希望日]  ")
        await base.click_element(locator.select_desired_delivery, " [納入希望日] date ")
    }
    //使用部門
    async department_of_use() {
        await base.click_element(locator.get_department_of_user, "get department of use ")
        let select_random_value = await page.$$(locator.value_department_of_user)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //見積依頼日
    async quotation_request_date() {
        await base.click_element(locator.quotation_request_date, " [見積依頼日]  ")
        await base.click_element(locator.select_quotation_request_date, " [見積依頼日] date ")
    }
    //見積提出期限
    async quotation_submission_deadline() {
        await base.click_element(locator.quotation_submission_deadline, " [見積提出期限]  ")
        await base.click_element(locator.select_quotation_submission_deadline, " [見積提出期限] date ")
    }
    //見積書提出方法
    async submit_quote() {
        await base.click_element(locator.submit_quote, " [見積書提出方法] ")
        await base.click_element(locator.submit_quote_value, " [見積書提出方法] value")
    }

    //発注予定日
    async schedule_order_date() {
        await base.click_element(locator.schedule_order_date, " [発注予定日]  ")
        await base.click_element(locator.select_schedule_order_date, " [発注予定日] date ")
    }
    //明細 1
    async get_item() {
        await base.click_element(locator.get_item1, "get item1 ")
        await base.click_element(locator.search_item_selection, "get item1 ")
        let select_random_value = await page.$$(locator.is_listed_selection)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    //見積数量
    async input_estimated_number() {
        let value = Math.floor(Math.random() * 10);
        await page.type(locator.estimated_number, value.toString())
    }
    //単位
    async input_unit() {
        await base.click_element(locator.unit, "get unit")
        let select_random_value = await page.$$(locator.value_unit)
        const random_field = Math.floor(Math.random() * select_random_value.length)
        await select_random_value[random_field].click()
    }
    // 登録する execute_button
    async click_execute_button() {
        let enable = await base.is_enable(locator.execute_button)
        await assert.strictEqual(enable, true, "[ 登録する] execute button ")
        if (enable) {
            await base.click_element(locator.execute_button, "[ 登録する] execute button")
            await base.click_element(locator.goto_detail_screen_buttom, "[購買要件詳細画面へ] button ")
        }
    }
    
    async register_success() {
        //await base.click_element(locator.goto_detail_screen_buttom,"[購買要件詳細画面へ] button ")
        let stt = await base.get_value(locator.status)
        return stt
    }
    //申請者部門 error message check mandatory fields
    async message_applicant_department() {
        let display = await base.check_display_element(locator.message_applicant_department, "申請者部門 error message check mandatory fields")
        if (display) {
            return base.getText_element(locator.message_applicant_department, "申請者部門 error message check mandatory fields")
        }
    }
    //申請者 error message check mandatory fields
    async message_applicant() {
        let display = await base.check_display_element(locator.message_applicant, "申請者 error message check mandatory fields")
        if (display) {
            return base.getText_element(locator.message_applicant, "申請者 error message check mandatory fields")
        }
    }
    //発注予定日 error message check mandatory fields
    async message_scheduled_order_date() {
        let display = await base.check_display_element(locator.message_scheduled_order_date, "発注予定日 error message check mandatory fields")
        if (display) {
            return base.getText_element(locator.message_scheduled_order_date, "発注予定日 error message check mandatory fields")
        }
    }

    //見積数量 error message check mandatory fields
    async message_estimated_quantity() {
        let display = await base.check_display_element(locator.message_estimated_quantity, "見積数量 error message check mandatory fields")
        if (display) {
            return base.getText_element(locator.message_estimated_quantity, "見積数量 error message check mandatory fields")
        }
    }
    //単位 error message check mandatory fields
    async message_unit() {
        let display = await base.check_display_element(locator.message_unit, "単位 error message check mandatory fields")
        if (display) {
            return base.getText_element(locator.message_unit, "単位 error message check mandatory fields")
        }
    }


}
module.exports = { purchase_regisPage }