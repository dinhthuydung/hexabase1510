class Locator {
    constructor() { }
    //status [購買見積依頼申請済]
    status_submitted = "(//div[@role='option'])[3]"
    // [削除する] button
    sendback_button = "(//button[@name='action'])[2]"
    //[ 実行する ] button
    execute_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    popup_confirm = "div.basic-dialog.v-card"
    close_popup_button = "button[name='reload']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"
}
module.exports = { Locator }