class Constant {
    //URL
    URL = "https://dev-app.procure-c.net/"
    // Account
    inputEmail = "cs__creoapl_admin_stg@b-eee.com"
    inputPassword = "creoapl_admin_stg_2021"

    email_n1 = 'cs__creoapl_n1_stg@b-eee.com'
    email_n2 = 'cs__creoapl_n2_stg@b-eee.com'
    email_p1 = 'cs__creoapl_p1_stg@b-eee.com'
    email_p2 = 'cs__creoapl_p2_stg@b-eee.com'
    email_p3 = 'cs__creoapl_p3_stg@b-eee.com'
    email_a1 = 'cs__creoapl_a1_stg@b-eee.com'
    email_a2 = 'cs__creoapl_a2_stg@b-eee.com'
    password = 'creoapl_admin_stg_common_2021'

    // Error message when input blank email or password
    MS = " メールアドレスもしくはパスワードが違います。 "
    //Error message when input wrong email format
    MS_invalidEmail = "メールアドレスは有効なメールアドレスではありません"
    //Error message of email , password required
    MS_email = "メールアドレスは必須項目です"
    MS_password = "パスワードは必須項目です"

    // Error message when dont select workspace
    err_message_workspace = " エラーが発生しました。 "
    //Path save screenshot to report
    path_pic1 = './report/screenshot1.png'
    path_pic2 = './report/screenshot2.png'

    // Workspace screen
    err_mess = " エラーが発生しました。 "

    //申請者部門 error message check mandatory fields
    mess_applicant_department = "申請者部門は必須項目です"
    //申請者 error message check mandatory fields
    mess_applicant = "申請者は必須項目です"
    //発注予定日 error message check mandatory fields
    mess_scheduled_order_date = "発注予定日は必須項目です"
    //見積数量 error message check mandatory fields
    mess_estimated_quantity = "見積数量は必須項目です"
    //単位 error message check mandatory fields
    mes_unit = "単位は必須項目です"
    //使用部門 error message check mandatory fields
    mess_department_use = "使用部門は必須項目です"
    mess_desired_delivery_date = "納入希望日は必須項目です"
    mess_quotation_request_date = "見積依頼日は必須項目です"
    mess_quotation_submission_deadline = "見積提出期限は必須項目です"
    mess_submit_quote = "見積書提出方法は必須項目です"

    // Detail page Error
    scheduled_date_after_app_date_mess = {
        mess1: "発注申請日以降の日付を入力してください",
        mess2: "納入希望日以前の日付を入力してください",
        mess3: "当日以降の日付を入力してください"
    }

    //TAX
    present_taxt = '10'
    reduced_tax_rate_present = '8'
    not_tax = '課税なし'
    reduced_tax_rate = '軽減税率'
    tax = '課税'
    
    // detail page mess
    approver_success_mess = " 「現場承認をする」を実行しました "

    //Status 
    purchase_quotation_request_applied = " 購買見積依頼申請済 "
    purchasing_requirements_deleted = "購買要件削除済"
    buying_requirements_creation = " 購買要件作成中 "
    quotation_registered = "見積登録済"
    purchase_requirement_being_created = " 購買要件作成中 "
    purchase_quotation_request_approved = " 購買見積依頼承認済 "
    quotation_request = " 見積依頼中 "
    quotation_registered = " 見積登録済 "
    purchase_order_request_applied = " 購買発注依頼申請済 "
    purchase_order_request_approved = ' 購買発注依頼承認済 '
    creating_an_order_application = ' 発注申請作成中 '
    order_search_title = '発注検索'
    order_detail_title = '発注詳細'
}
module.exports = { Constant };