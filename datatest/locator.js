class Locator {
    constructor() {}
    execute_button = "//div[@class='action-area__button']//button[1]"
    close_button  = "button[name='reload']"
    //status [購買要件作成中]
    status_2= "(//div[@role='option'])[2]"
    apply_button = "(//button[@name='action'])[1]"




    //購買見積依頼申請済
    status_3 = "(//div[@role='option'])[3]"
    //購買見積依頼承認済
    status_4 = "(//div[@role='option'])[4]"

}
module.exports = { Locator };