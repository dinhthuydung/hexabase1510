class Locator {
    constructor() { }
    //status [見積登録済]
    status_registed = "(//div[@role='option'])[6]"
    // [購買発注依頼申請をする ] button
    apply_button = "//span[text()=' 購買発注依頼申請をする ']//..//..//button"
    //[ 実行する ] button
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    popup_confirm = "div.basic-dialog.v-card"
    close_popup_button = "button[name='reload']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"

}
module.exports = { Locator }