#procure-c-e2e
## Setup
 - install playwright
 - test-run: npm test
	if run specified file: npm test test/folder_name/file_name
## Install lib
 - run cmd: npm i -D playwright
 - data-driven:1.4.0
 - papaparse: 5.3.1
 - fs: 0.0.1
 - assert: 2.0.0
 - mochawesome :6.2.2
## Test cases:
### Login
 - Not input value, should show error message
 - Check If Login Successfully
 - Check show/hide password
### LoginData
 - login_test
### Workspace
 - Check if Unselect workspace
 - Check select workspace
 - Check if select workspace successfully
### Purchase
 - Purchase registration
 - Purchase search
### Order 
 - Order registration
 - Order search

### Delivery
 - Delivery processing
 - Delivery adjust
 - Delivery acceptanse process
### Payment
 - Payment registration
 - Payment request
## Change username, password, url:
If u want change URL , email and password , you must go to contant.js in /contant/constant.js

## REPORT
 Open terminal, input "npm test" 
 In mochawesome-report package, open html file, you can see this new report
 
 ## Run all file test
 - In file package.json, modify this if you want run all test file:
	\n"scripts": {
	\n"test": "mocha 'test/**/*.js' --timeout 20000 --reporter mochawesome --exit"
	\n},
  
 - And modify this if run specified file:
	\n"scripts": {
	\n"test": "mocha --timeout 20000 --reporter mochawesome --exit"
	\n},
  
  # File testcase 
	購買要件登録/Purchasing requirement registration : purchase_regis.js (1-19)
	購買要件検索/Purchasing requirements search : purchase_search_modify.js (20-21)
	購買要件詳細/アクション：修正する / Purchasing Requirements Details / Actions: Modify : purchase_search_modify.js (22-37)
	購買要件詳細/アクション：購買見積依頼申請する / Apply for a purchase quote request : purchase_apply.js (38-42)
	購買要件詳細/アクション：削除する / Purchasing requirements details / actions: delete : purchase_delete.js (43-44)
	購買要件詳細/アクション：引き戻す /  Purchasing requirements details / actions: Pull back : purchase_pullback.js (45-46)
	購買要件詳細/アクション：修正する（見積依頼申請済）/ Purchasing Requirement Details / Action: Modify (Quotation Request Submitted) : modify_submitted.js (47-56)
	購買要件詳細/アクション：購買見積依頼承認する / Purchasing requirements details / actions: Approve purchase quote request : approve_quote.js (57-60)
	購買要件詳細/アクション：差し戻す / Purchasing requirements details / action:  Send back : sendback.js (61-62)
	購買要件詳細/アクション：見積依頼発信をする / Purchase requirements details / actions: Send a quote request : send_request.js (63-66)
	購買要件詳細/アクション：修正する/ Purchasing Requirements Details / Actions: Modify : modify_registed.js (67-74)
	購買要件詳細/アクション：見積登録をする / Purchasing requirements details / actions: Register a quote : register_quote.js (75-78)
	購買要件詳細/アクション：削除する / Purchasing Requirements Details / Actions: Delete : delete_quote.js (79-80)
	購買要件詳細/アクション：修正する / Purchasing Requirements Details / Actions:Modify : modify_quote.js (81-89)
	購買要件詳細/アクション：購買発注依頼申請をする / Purchase requirements details / actions: Apply for purchase order request : apply_quote.js (90-94)
	購買要件詳細/アクション：修正する / Purchasing Requirements Details / Actions: Modify : modify_applied (99-107)
	購買要件詳細/アクション：購買発注依頼承認する / Purchasing Requirements Details / Actions: Approve Purchase Order Request : approve_applied.js (108-111)
	発注登録 / Order registration : order_registration (120-139)
	発注検索 / Order search + 発注詳細/アクション：修正する / Order Details / Actions: Modify : order_search.js (140-151)











































