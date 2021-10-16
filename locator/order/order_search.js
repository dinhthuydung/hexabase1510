class Locator {
    constructor() { }
    order_menu = '//button[@class="v-icon notranslate v-icon--link mdi mdi-file-document-edit-outline theme--light"]'
    order_search = '//div[@class="v-expansion-panel gnav__item v-expansion-panel--active v-item--active"]/div[2]/div'
    order_search_title = "//h2[text()='発注検索']"

    status_button = '//div[@class="v-select__selections"]'
    creating_an_order_application_status = "//div[text()='発注申請作成中']"
    order_applied = "//div[@role='listbox']//div[text()='発注申請済']"
    admit_on_spot = "//div[@role='listbox']//div[text()='現場承認済']"
    search_button = "//span[text()=' 検索 ']"
    detail_button = '//button[@class="v-btn v-btn--depressed theme--light v-size--default btn-normal"]'

    order_detail_title = "//h2[text()='発注詳細']"
    supplier_get_button = '//div[@labeltext="仕入先名"]//span[text()="取得"]'
    value_supplier_selection ="//div[@class ='v-data-table__wrapper']//tbody//tr"
    modify_button = "//span[text()=' 修正する ']//..//..//button"
    text_supplier1 = "//input[@name='supplier_id']"
    text_supplier2 = "(//label[text()=' 仕入先 ']/following::input)[2]"
    supplier_charge = "(//label[text()=' 仕入先担当 ']/following::input)[1]"
    payment_destination = "(//label[text()=' 支払情報 ']/following::input)[1]"
    run_button = "//span[text()=' 実行する ']//.."
    disable_run_button = "//span[text()=' 実行する ']//..//..//button[@disabled='disabled']"
}
module.exports = { Locator }
