class Locator {
    constructor() { }
    // Purchase requirement registration 
    text_title = "//h2[text()='購買要件登録']"
    purchase_register = "(//li[@class='gnav__content']//a)[1]"
    //見積依頼先
    charge_of_requesting = "(//div[@class='v-select__selections']//input)[1]"//見積依頼先担当
    get_request_quotation = "//div[@class='input-area-wrap'][13]//button"
    //見積依頼先選択 popup
    request_quotation_popup = "(//div[@class='v-dialog v-dialog--active']//form[@class='v-form'])[1]"
    close_request_quotation = "//button[contains(@class,'btn-secondary v-btn')]//span[1]"
    value_department_popup = "//div[text()=' 見積依頼先選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //支払先
    payment_information = "(//div[@class='v-select__selections']//input)[2]"
    get_payment_destination = "//div[@class='input-area-wrap'][15]//button"
    payee_popup = "(//div[@class='v-dialog v-dialog--active']//div[contains(@class,'basic-dialog v-card')])"
    close_payee_popup = "(//button[contains(@class,'btn-secondary v-btn')])[1]"
    value_payee_popup = "//div[text()=' 支払先選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //明細 1
    get_item1 = "//div[@class='detail-info-area'][1]//div[@class='input-area-wrap'][2]//button"
    specification = "(//div[@role='combobox'])[1]//input[1]"
    estimated_quantity = "input[name='order_quantity[0]']"
    unit = "(//div[@class='v-select__selections']//input)[6]"
    //value_unit = "(//div[@role='option']/following-sibling::div)"
    value_unit = '//div[text()="T"]//..//..//..//div[@role="option"]/div'
    estimated_unit_price = "input[name='unit_price[0]']"
    estimated_amount = "input[name='amount[0]']"
    sale_tax = "input[name='tax[0]']"
    tax_classification = "(//div[@class='v-select__selections']//input)[7]"

    //品目選択
    item_selection = "//div[@class='v-dialog v-dialog--active']//div[contains(@class,'basic-dialog v-card')]"
    close_item_selection = "button.btn-secondary.v-btn"
    search_item_selection = "//div[@class='basic-dialog__search-action col']//button[1]"
    is_listed_selection = "//div[text()=' 品目選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //申請者部門
    get_appicant_department = "(//button[contains(@class,'btn-normal v-btn')])[1]"
    value_applicant_department = "//div[text()=' 申請者部門選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //申請者
    get_applicant = "(//button[@type='button'])[4]"
    value_applicant = "//div[text()=' 申請者選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //納入希望日
    desired_delivery = "input[name='delivery_limit_date']"
    select_desired_delivery = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //購買要件登録日
    regis_date = "input[name='purchase_requirement_date']"
    select_regis_date = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //使用部門
    get_department_of_user = "(//button[@type='button'])[5]"
    value_department_of_user = "//div[text()=' 使用部門選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //納入希望日
    //見積依頼日
    quotation_request_date = "input[name='estimate_date']"
    select_quotation_request_date = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //見積提出期限
    quotation_submission_deadline = "input[name='estimate_deadline_date']"
    select_quotation_submission_deadline = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //見積提出期限
    // 見積書提出方法 
    submit_quote = "(//div[@class='v-select__selections'])[3]"
    submit_quote_value = "(//div[@class='v-list-item__content'])[2]"
    //発注予定日
    schedule_order_date = "input[name='order_plan_date']"
    select_schedule_order_date = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //使用設備:  (//div[@role='document'])[6]//tbody
    //納品場所:  (//div[@role='document'])[7]//tbody
    //見積数量
    estimated_number = "input[name='order_quantity[0]']"
    //  登録する execute button 
    execute_button = "button[name='register']"
    // 購買要件詳細画面へ 
    goto_detail_screen_buttom = "button[name='toEdit']"
    status = "p.content__text.basc-info-panel__status-name"

    //Error message check mandatory field 申請者部門
    message_applicant_department = "//label[text()=' 申請者部門 ']//..//..//div[@class='v-messages__message message-transition-enter-to']"
    //Error message check mandatory field 申請者
    message_applicant = "//label[text()=' 申請者 ']//..//..//div[@class='v-messages__message message-transition-enter-to']"
    //Error message check mandatory field 発注予定日
    message_scheduled_order_date = "//label[text()=' 発注予定日 ']//..//..//div[@class='v-messages__message']"
    //Error message check mandatory field 見積数量
    message_estimated_quantity = "//label[text()=' 見積数量 ']//..//..//div[@class='v-messages__message']"
    //Error message check mandatory field 単位
    message_unit = "//label[text()=' 単位 ']//..//..//div[@class='v-messages__message']"

}
module.exports = { Locator }