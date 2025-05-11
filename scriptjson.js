// 구매자 회원가입 처리 함수
document
  .getElementById("buyer-register-btn")
  .addEventListener("click", function () {
    // 입력값 가져오기
    const username = document.getElementById("buyer-id").value;
    const password = document.getElementById("buyer-password").value;
    const password2 = document.getElementById("buyer-password-confirm").value;
    const name = document.getElementById("buyer-name").value;

    // 전화번호 조합
    const phonePrefix = document.getElementById("buyer-phone-prefix").value;
    const phoneMiddle = document.getElementById("buyer-phone-middle").value;
    const phoneLast = document.getElementById("buyer-phone-last").value;
    const phone = `${phonePrefix}${phoneMiddle}${phoneLast}`;

    // 회원가입 데이터 객체 생성
    const buyerData = {
      username,
      password,
      password2,
      name,
      phone,
      type: "BUYER",
    };

    // API 요청 보내기
    fetch(
      "https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buyerData),
      }
    )
      .then((response) => {
        // 응답 상태 확인
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("가입 성공:", data);
        alert("회원가입이 완료되었습니다!");
      })
      .catch((error) => {
        console.error("가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  });

// 판매자 회원가입 처리 함수
document
  .getElementById("seller-register-btn")
  .addEventListener("click", function () {
    // 입력값 가져오기
    const username = document.getElementById("seller-id").value;
    const password = document.getElementById("seller-password").value;
    const password2 = document.getElementById("seller-password-confirm").value;
    const name = document.getElementById("seller-name").value;

    // 전화번호 조합
    const phonePrefix = document.getElementById("seller-phone-prefix").value;
    const phoneMiddle = document.getElementById("seller-phone-middle").value;
    const phoneLast = document.getElementById("seller-phone-last").value;
    const phone = `${phonePrefix}${phoneMiddle}${phoneLast}`;

    // 스토어 정보
    const store_name = document.getElementById("seller-store-name").value;
    const business_number = document.getElementById(
      "seller-business-number"
    ).value;

    // 회원가입 데이터 객체 생성
    const sellerData = {
      username,
      password,
      password2,
      name,
      phone,
      store_name,
      business_number,
      type: "SELLER",
    };

    // API 요청 보내기
    fetch(
      "https://api.wenivops.co.kr/services/open-market/accounts/seller/signup/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellerData),
      }
    )
      .then((response) => {
        // 응답 상태 확인
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("가입 성공:", data);
        alert("판매자 회원가입이 완료되었습니다!");
      })
      .catch((error) => {
        console.error("가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
  });
