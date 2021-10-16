
class Locator{
    constructor() {}  
    // [購買見積依頼申請する] button
    apply_button = "(//button[@name='action'])[1]"
    //[ 実行する ] button
    execute_apply_button = "//main[@class='v-main main-contents form-edit-content']//div[@class='action-area__button']//button[1]"
    // popup_execute_apply
    popup_execute_apply = "div.basic-dialog.v-card"
    close_apply_popup_button = "button[name='reload']"
    status = "p.content__text.basc-info-panel__status-name.status-tag--purchase"
    //使用部門 mess required
    department_use = "(//div[@class='v-messages__message'])[1]"
    //納入希望日
    desired_delivery_date = "(//div[@class='v-messages__message'])[2]" 
    //見積依頼日
    quotation_request_date = "(//div[@class='v-messages__message'])[3]"
    //見積提出期限
    quotation_submission_deadline = "(//div[@class='v-messages__message'])[4]"
    //見積書提出方法
    submit_quote = "(//div[@class='v-messages__message'])[4]"
}
module.exports = {Locator};