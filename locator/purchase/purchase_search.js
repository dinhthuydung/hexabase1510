class Locator {
    constructor() { }
    purchase_search = "(//li[@class='gnav__content']//a)[2]"
    purchase_search_title = "//h2[text()='購買要件検索']"
    search_button = "button[name='search']"
    detail_button_1 = "(//td[@class='text-start']//button)[1]"
    detail_button = "(//td[@class='text-start']//button)"
    status_button = "div.v-select__selections"
    status_prepared = "div#app>div:nth-of-type(2)>div>div:nth-of-type(2)"
    //checkbox = "(//tbody//div[@class='v-input--selection-controls__ripple']/following-sibling::i)"
    checkbox = "//td//div[@class='v-data-table__checkbox v-simple-checkbox']"
    process_button = "button[name='bulkAction']"
    modify_button = "(//button[@name='action'])[3]"

    //見積依頼先
    value_request_quotation = "(//input[@name='supplier_id'])[1]"
    //支払先
    value_payment_destination = "(//input[@name='payment_destination_supplier_id'])[1]"
    // 実行する 
    excute_modify_button = "//div[@class='action-area__button']//button[1]"
    confirm_execute_modify_popup = "(//div[contains(@class,'basic-dialog v-card')])[2]"
    //button close 品目選択
    close_item_selection = "(//button[contains(@class,'btn-secondary v-btn')])[2]"
    // button  [閉じる] of 処理実行
    close_process = "button[name='reload']"
    
    disable_fields = "//input[@type='text']"
    //申請者部門
    applicant_department = "(//input[@name='estimate_application_department_id'])[1]"
    mess_required = "div.v-messages__message"
}
module.exports = { Locator };