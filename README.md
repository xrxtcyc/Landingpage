# Landingpage
 https://xrxtcyc.github.io/Landingpage/
JavaScript 코드 해석: 회원가입 페이지
이 코드는 구매 회원과 판매 회원으로 나누어진 회원가입 페이지를 위한 JavaScript 코드입니다. 두 가지 유형의 사용자(구매자와 판매자)를 위한 폼을 관리하고, 입력 검증 및 서버 제출을 처리합니다.
주요 기능
![image](https://github.com/user-attachments/assets/919fd1a2-7729-46c6-8bb4-b9f9ddcea5e3)
![image](https://github.com/user-attachments/assets/d82f44d9-dbc3-442b-b6e4-db1a0ac91245)
![image](https://github.com/user-attachments/assets/d4015e4d-5e0e-4911-9576-5ef9090800c3)

탭 전환 기능

구매자와 판매자 탭 간 전환 가능
선택된 탭에 따라 적절한 폼 표시


유효성 검사

필수 필드 검사
ID 형식 검증 (4자 이상, 영문과 숫자만)
ID 중복 검사 (모의 구현)
비밀번호 일치 확인
약관 동의 확인


사용자 경험(UX) 기능

순차적 유효성 검사 (이전 필드 먼저 확인)
오류 메시지 표시 및 숨김
전화번호 입력 시 자동 포커스 이동
전화번호 필드에 숫자만 입력 가능
비밀번호 확인 필드의 시각적 표시


폼 제출 처리

폼 데이터 수집 및 가공
API 호출을 통한 회원가입 처리
성공/실패 시 알림



주요 요소 및 변수

탭 및 폼 요소: buyerTab, sellerTab, buyerForm, sellerForm 등
입력 필드 모음: buyerInputs, sellerInputs 객체에 저장
오류 메시지 요소: buyerErrors, sellerErrors 객체에 저장
입력 필드 순서: buyerInputOrder, sellerInputOrder 배열에 저장
유효성 검사 상태: buyerIdValidated, sellerIdValidated 등

주요 함수

유효성 검사 함수

validateId(): ID 형식 검증
checkDuplicateId(): ID 중복 확인 (모의 구현)
validateBuyerForm(), validateSellerForm(): 전체 폼 유효성 검사


오류 처리 함수

showError(): 오류 메시지 표시
hideError(): 오류 메시지 숨김
findErrorElement(): 입력 필드에 대응하는 오류 요소 찾기


폼 제출 함수

구매자/판매자 가입 버튼 이벤트 핸들러
데이터 조합 및 API 요청 처리



이벤트 처리

탭 전환 이벤트: 탭 클릭 시 해당 폼으로 전환
입력 필드 이벤트:

focus: 이전 필드 검증
input: 입력 값 검증 및 ID 중복 확인 상태 리셋
blur: 빈 필드 오류 표시


약관 동의 체크박스 이벤트: 폼 유효성 다시 검사
회원가입 버튼 이벤트: 최종 검증 및 API 요청

API 연동
코드는 다음 두 엔드포인트로 회원가입 데이터를 전송합니다:

구매자: https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/
판매자: https://api.wenivops.co.kr/services/open-market/accounts/seller/signup/

요청은 JSON 형식으로 전송되며, 성공/실패에 따라 적절한 알림이 표시됩니다.
이 코드는 대규모 회원가입 페이지의 프론트엔드 기능을 종합적으로 구현하고 있으며, 사용자 경험을 향상시키기 위한 다양한 유효성 검사와 피드백 메커니즘을 포함하고 있습니다.
