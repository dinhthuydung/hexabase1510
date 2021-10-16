const { OrderDetailLocator } = require('../../locator/order/order_detail')
const { Constant } = require('../../constant/constant')
const { BasePage } = require('../basepage')
const { WorkSpace } = require('../loginPage/workspacePage')
const base = new BasePage()
const constn = new Constant()
const workspace = new WorkSpace()
const playwright = require('playwright')
const assert = require('assert')
const { EMULTIHOP } = require('constants')

class order_detailPage {
    async change_date_to_current_day_when_show_error_mess(date_field_error, date_field){
        let hope_error = await base.check_display_element(date_field_error)        
        if (hope_error == true){
            await base.click_element(date_field, date_field)
            let current_date = await base.check_display_element_with_1s(OrderDetailLocator.current_day)
            while (current_date != true){
                await base.click_element(OrderDetailLocator.next_month_button, OrderDetailLocator.next_month_button)
                current_date = await base.check_display_element_with_1s(OrderDetailLocator.current_day)
            }
            await base.click_element(OrderDetailLocator.current_day)
        } else{
            await console.log("Don't have date error mess")
        }
    }

    async change_date_to_current_day(date_field){
        await base.click_element(date_field, date_field)
        let current_date = await base.check_display_element_with_1s(OrderDetailLocator.current_day)
            while (current_date != true){
                await base.click_element(OrderDetailLocator.next_month_button, OrderDetailLocator.next_month_button)
                current_date = await base.check_display_element_with_1s(OrderDetailLocator.current_day)
            }
            await base.click_element(OrderDetailLocator.current_day)
    }

    async change_date_after_current_day(date_field){
        await base.click_element(date_field, date_field)
        let current_date = await base.check_display_element_with_1s(OrderDetailLocator.current_day)
            while (current_date != true){
                await base.click_element(OrderDetailLocator.next_month_button, OrderDetailLocator.next_month_button)
                current_date = await base.check_display_element_with_1s(OrderDetailLocator.current_day)
            }
            await base.click_element(OrderDetailLocator.next_month_button, OrderDetailLocator.next_month_button)
            await base.click_element(OrderDetailLocator.future_date)
    }

    async click_pre_month_and_click_past_date(date_field){
        await base.click_element(date_field)
        await base.click_element(OrderDetailLocator.pre_month_button)
        await base.click_element(OrderDetailLocator.future_date)
    }

    async change_date_current_day(){
        await this.change_date_to_current_day_when_show_error_mess(OrderDetailLocator.inclusion_hope_day_error_mess,
            OrderDetailLocator.inclusion_hope_day_field)
        
        await this.change_date_to_current_day_when_show_error_mess(OrderDetailLocator.scheduled_day_error_mess, 
            OrderDetailLocator.scheduled_day_field)
    }

    async change_date_order_date_after_scheduled_order(){
        await this.change_date_after_current_day(
            OrderDetailLocator.oder_date_field)
        
        await this.change_date_to_current_day( 
            OrderDetailLocator.scheduled_day_field)
    }

    async change_date_order_date_before_scheduled_order(){
        await this.change_date_to_current_day(
            OrderDetailLocator.oder_date_field)
        
        await this.change_date_after_current_day( 
            OrderDetailLocator.scheduled_day_field)

        await this.change_date_after_current_day( 
            OrderDetailLocator.inclusion_hope_day_field)
    }

    async change_date_order_date_before_scheduled_order(){
        await this.change_date_to_current_day(
            OrderDetailLocator.oder_date_field)
        
        await this.change_date_after_current_day( 
            OrderDetailLocator.scheduled_day_field)

        await this.change_date_after_current_day( 
            OrderDetailLocator.inclusion_hope_day_field)
    }

    async change_schedule_date_to_past(){
        await this.change_date_to_current_day_when_show_error_mess(OrderDetailLocator.scheduled_day_error_mess, 
            OrderDetailLocator.scheduled_day_field)
        await this.click_pre_month_and_click_past_date(OrderDetailLocator.scheduled_day_field)

    }

    async verify_inclusion_hope_day_and_scheduled_order_date(){
        let hope_day = await base.get_values(OrderDetailLocator.inclusion_hope_day_field)
        
        let scheduled_day = await base.get_values(OrderDetailLocator.scheduled_day_field)
        await assert.strictEqual(hope_day, scheduled_day, "[発注予定日] < [購買要件登録日]: FAILED")
        await console.log("[発注予定日] > [購買要件登録日]: PASSED")
    }

    async click_on_site_approval_button(){
        await base.click_element(OrderDetailLocator.on_site_approval_button)
    }

    async click_on_apply_for_an_odder_button(){
        await base.click_element(OrderDetailLocator.apply_for_an_odder_button)
    }

    async click_on_order_approval_button(){
        await base.click_element(OrderDetailLocator.order_approval_button)
    }

    async click_run_button(){
        await base.click_element(OrderDetailLocator.run_button)
    }

    async click_close_button(){
        await base.click_element(OrderDetailLocator.close_button)
    }

    // async check_display_success_update_popup(){
    //     return await base.check_display_element(OrderDetailLocator.success_update_popup)   
    // }

    async get_text_approve_success_mess(){
        return await base.getText_element(OrderDetailLocator.text_approve_on_site_mess)
    }

    async check_display_detail_disabled_field(){
        return await base.check_display_element(OrderDetailLocator.detail_disabled_field)
    }

    async check_display_access_action_popup(){
        return await base.check_display_element(OrderDetailLocator.access_action_popup)
    }

    async check_display_able_button(){
        return await base.check_display_element(OrderDetailLocator.able_button)
    }

    async get_text_scheduled_date_error_mess(){
        return await base.getText_element(OrderDetailLocator.scheduled_date_after_app_date_error_mess)    
    }

    async check_display_scheduled_date_error_mess(){
        return await base.check_display_element_with_1s(OrderDetailLocator.scheduled_date_after_app_date_error_mess)    
    }

    async check_display_success_update_popup(){
        return await base.check_display_element(OrderDetailLocator.success_update_popup)
    }

    async get_unit_price_first_item(){
        return await base.get_value(OrderDetailLocator.first_item_unit_price)
    }

    async get_quantity_first_item(){
        return await base.get_value(OrderDetailLocator.first_item_order_quantity)
    }

    async get_tax_first_item(){
        return await base.get_value(OrderDetailLocator.first_item_tax)
    }

    async change_unit_price_in_first_item(){
        const random_field = Math.floor(Math.random() * 10000)
        await base.fill_input(OrderDetailLocator.first_item_unit_price, random_field.toString())
    }

    async check_change_unit_price(){
        let before_price = await this.get_unit_price_first_item()
        await this.change_unit_price_in_first_item()
        let after_price = await this.get_unit_price_first_item()

        await assert.notStrictEqual(before_price, after_price, "Don't change value : FAILED")
        await console.log('Change value unit price successfully: PASS')
    }

    async calculator_amount_first_item(){
        let after_price = await this.get_unit_price_first_item()
        let quantity = await this.get_quantity_first_item()

        return await parseInt(after_price)*parseInt(quantity)
    }

    async get_amount_first_item(){
        return await base.get_value(OrderDetailLocator.first_item_amount)
    }

    async compare_amount_item(){
        let calculator = await this.calculator_amount_first_item()
        let amount = await this.get_amount_first_item()

        await assert.strictEqual(calculator.toString(), amount, "Amount don't the same : FAILD")
        await console.log('Compare amount is the same: PASS')
    }

    async calculator_taxt_first_item(){
        let after_amount = await this.get_amount_first_item()
        let tax_classification = await base.getText_element(OrderDetailLocator.first_item_tax_classification)
        let tax = 0
        if (tax_classification == constn.tax){
            tax = await (parseInt(after_amount)*parseInt(constn.present_taxt))/100}
        else if (tax_classification == constn.not_tax){
            tax = 0
        } else if (tax_classification == constn.reduced_tax_rate){
            tax = await (parseInt(after_amount)*parseInt(constn.reduced_tax_rate_present))/100
        }
        return await Math.floor(tax)
    }

    async compare_tax_item(){
        let calculator = await this.calculator_taxt_first_item()
        let tax = await this.get_tax_first_item()

        await assert.strictEqual(calculator.toString(), tax, "TAX don't the same : FAILD")
        await console.log(`Compare TAX is the same ${calculator}: PASS`)
    }

    async calculator_total_amount(){
        let element = OrderDetailLocator.amount_fields;
        await page.waitForSelector(element, { timeout: 10000 })
        //let text = await page.textContent(element)
        //let text = await page.text(element)
        let texts = await page.$$eval(element, async el =>{
            let array = []
            for (let i=0; i< el.length; i++){
                await console.log(el[i].value)
                await array.push(el[i].value)
            }
            return array
        })
        let a = 0
        for (let i =0; i< texts.length; i++){
            a = await a + parseInt(texts[i])
        }
        return a
    }

    async calculator_total_tax(){
        let element = OrderDetailLocator.tax_fields;
        await page.waitForSelector(element, { timeout: 10000 })
        //let text = await page.textContent(element)
        //let text = await page.text(element)
        let texts = await page.$$eval(element, async el =>{
            let array = []
            for (let i=0; i< el.length; i++){
                await console.log(el[i].value)
                await array.push(el[i].value)
            }
            return array
        })
        let a = 0
        for (let i =0; i< texts.length; i++){
            a = await a + parseInt(texts[i])
        }
        return a
    }

    async get_total_amount(){
        let amount = await base.get_value(OrderDetailLocator.total_amount)
        
        return await parseInt(amount.replace(',',''))
    }

    async get_total_tax(){
        let amount = await base.get_value(OrderDetailLocator.total_tax)
        
        return await parseInt(amount.replace(',',''))
    }


}

module.exports = { order_detailPage }