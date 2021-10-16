
class Locator{
    constructor() {}  
    delete_button = "(//button[@name='action'])[2]"
    //[ 実行する ] button
    execute_delete_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    // popup_execute_delete
    popup_execute_delete = "div.basic-dialog.v-card"
    close_delete_popup_button = "button[name='route']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"
}
module.exports = {Locator};