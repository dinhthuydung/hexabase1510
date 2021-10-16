class OrderDetailLocator {
    constructor() { }
    static inclusion_hope_day_error_mess = '//label[text()=" 納入希望日 "]//..//..//div[text()="当日以降の日付を入力してください"]'
    static scheduled_day_error_mess = '//label[text()=" 発注予定日 "]//..//..//div[text()="当日以降の日付を入力してください"]'
    static scheduled_date_after_app_date_error_mess = '//label[text()=" 発注予定日 "]//..//..//div[@class="v-messages__message"]'

    static oder_date_field = '//input[@name="order_application_date"]'
    static scheduled_day_field = '//label[text()=" 発注予定日 "]//..//..//input[@name="order_date"]'
    static inclusion_hope_day_field = '//input[@name="delivery_limit_date"]'
    static current_day = '//div[@class="v-menu__content theme--light menuable__content__active"]//button[@class="v-btn v-date-picker-table__current v-btn--rounded v-btn--outlined theme--light accent--text"]'
    static next_month_button = '//div[@class="v-menu__content theme--light menuable__content__active"]//button[@aria-label="Next month"]'
    static pre_month_button = '//div[@class="v-menu__content theme--light menuable__content__active"]//button[@aria-label="Previous month"]'
    
    static success_update_popup = '//div[@class="v-dialog v-dialog--active v-dialog--persistent"]'
    static detail_disabled_field = '//input[@disabled="disabled"]'
    static access_action_popup = '//div[@class="panel-section__box action-area"]'
    static able_button = '//button[@class="v-btn v-btn--contained theme--light v-size--default"]'
    static on_site_approval_button = "//span[text()=' 現場承認をする ']"
    static apply_for_an_odder_button = "//span[text()=' 発注申請する ']"
    static order_approval_button = "//span[text()=' 発注決裁する ']"
    static run_button = '//span[text()=" 実行する "]'
    static close_button = '//span[text()=" 閉じる "]'

    static text_approve_on_site_mess = '//p[@class="content__text basic-dialog__text"]'

    static first_item_unit_price = '//input[@name="unit_price[0]"]'
    static first_item_order_quantity = '//input[@name="order_quantity[0]"]'
    static first_item_amount = '//input[@name="amount[0]"]'
    static first_item_tax = '//input[@name="tax[0]"]'
    static first_item_tax_classification = '//div[@class="detail-info-area"][1]//label[@for="課税区分"]//..//..//div[@class="v-select__selection v-select__selection--comma"]'
    static future_date = '//div[@class="v-menu__content theme--light menuable__content__active"]//tr[2]/td[1]/button'
    static amount_fields = "//input[contains(@name,'amount') and not(contains(@name,'total'))]"
    static total_amount = "//label[@for='合計金額']//..//..//input"
    static tax_fields = "//input[contains(@name,'tax[') and not(contains(@name,'total'))]"
    static total_tax = '//label[@for="消費税額"]//..//..//input'
}
module.exports = { OrderDetailLocator }