class Locator {
    constructor() { }
    //status [見積登録済]
    status_search = "(//div[@role='option'])[6]"
    // [ 見積依頼発信をする ] button
    delete_button = "(//button[@name='action'])[2]"
    //[ 実行する ] button
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    popup_confirm = "div.basic-dialog.v-card"
    close_popup_button = "button[name='reload']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"
}
module.exports = { Locator }