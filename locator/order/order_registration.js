class Locator {
    constructor() { }

    order_menu = '//button[@class="v-icon notranslate v-icon--link mdi mdi-file-document-edit-outline theme--light"]'
    // [発注登録] order registration in menu
    order_registration = '//div[@class="v-expansion-panel gnav__item v-expansion-panel--active v-item--active"][2]/div[1]'
    //発注登録 screen
    order_registration_screen = "//h2[text()='発注登録']"
    //仕入先担当
    supplier_charge = "(//div[@role='button'])[2]"
    //Pop up [仕入先選択]
    supplier_selection = "//div[@class='v-dialog v-dialog--active']//div[text()=' 仕入先選択 ']"
    //Button [取得]
    get_supplier = "//div[@class='input-area-wrap'][13]//button"
    //close_button of [仕入先選択]
    close_supplier_selection = "//button[contains(@class,'btn-secondary v-btn')]"
    //Value of supplier selection 
    value_supplier_selection = "//div[text()=' 仕入先選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //仕入先担当
    supplier_charge = "(//div[@role='button'])[2]"
    //支払情報
    payment_information = "(//div[@role='button'])[3]"
    //Button [取得]
    get_payment = "//div[@class='input-area-wrap'][15]//button"
    //Popup [支払先選択]
    payee_selection = "//div[@class='v-dialog v-dialog--active']//div[text()=' 支払先選択 ']"
    //close_button of [支払先選択]
    close_payee_selection = "//button[contains(@class,'btn-secondary v-btn')]"
    //Value of supplier selection 
    value_payee_selection = "//div[text()=' 支払先選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"


    //規格
    specification = "(//div[@role='combobox'])[1]//input[1]"
    //発注数量
    order_quality = "input[name='order_quantity[0]']"
    //単位
    unit = "(//div[@class='v-select__selections']//input)[5]"
    value_unit = '//div[text()="T"]//..//..//..//div[@role="option"]/div'
    //単価
    unit_price = "input[name='unit_price[0]']"
    //金額
    amount = "input[name='amount[0]']"
    //消費税
    sale_tax = "input[name='tax[0]']"
    //課税区分
    tax_classification = "(//div[@class='v-select__selections']//input)[6]"
    // get button of [品目]
    get_item1 = "//div[@class='detail-info-area'][1]//div[@class='input-area-wrap'][2]//button"
    //Popup [品目選択]
    item_selection = "//div[@class='v-dialog v-dialog--active']//div[text()=' 品目選択 ']"
    //close_popup
    close_item_popup = "button.btn-secondary.v-btn"
    //search button in Popup [品目選択]
    search_item_selection = "//div[@class='basic-dialog__search-action col']//button[1]"
    is_listed_selection = "//div[text()=' 品目選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //申請者部門
    get_appicant_department = "(//button[contains(@class,'btn-normal v-btn')])[1]"
    value_applicant_department = "//div[text()=' 申請者部門選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //発注申請日
    order_application = "input[name='order_application_date']"
    select_order_application = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //申請者
    get_applicant = '//div[@labeltext="発注申請者名"]//button'
    value_applicant = "//div[text()=' 申請者選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //使用部門
    get_user_department = "(//button[contains(@class,'btn-normal v-btn')])[3]"
    value_user_department = "//div[text()=' 使用部門選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //使用設備
    get_use_equipment = "(//button[contains(@class,'btn-normal v-btn')])[4]"
    value_user_equipment = "//div[text()=' 使用設備選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //納入希望日
    desired_delivery = "input[name='delivery_limit_date']"
    select_desired_delivery = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    //仕入先
    get_supplier = "(//button[contains(@class,'btn-normal v-btn')])[6]"
    value_supplier = "//div[text()=' 仕入先選択 ']//..//..//div[@class='basic-dialog v-card v-sheet theme--light']//tbody/tr"
    //仕入先担当
    supplier_charge = "(//div[@class='v-select__slot'])[1]"
    value_supplier_charge = "(//div[contains(@class,'v-list-item v-list-item--link')])"
    //支払情報
    payment_information = "(//div[@class='v-select__slot'])[2]"
    value_payment_information = "//div[contains(@class,'menuable__content__active')]//div[contains(@class,'v-list-item v-list-item')]"
    //発注予定日
    scheduled_order_date = "input[name='order_date']"
    value_scheduled_order_date = "div.menuable__content__active button.v-btn.v-date-picker-table__current"
    // 登録する 
    order_register = "button[name='register']"
    //goto edit [ 発注詳細画面へ ] button 
    goto_edit = "button[name='toEdit']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--order"
    // value of [合計金額]
    fee = "((//label[text()=' 合計金額 '])[2]/following::input)[1]"
    // value of [消費税額]
    consumption_tax = "((//label[text()=' 消費税額 '])[2]/following::input)[1]"


}
module.exports = { Locator }
