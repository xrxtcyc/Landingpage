// DOM 요소 가져오기
const buyerTab = document.getElementById("buyer-tab");
const sellerTab = document.getElementById("seller-tab");
const buyerForm = document.getElementById("buyer-form");
const sellerForm = document.getElementById("seller-form");
const buyerRegisterBtn = document.getElementById("buyer-register-btn");
const sellerRegisterBtn = document.getElementById("seller-register-btn");
const passwordToggles = document.querySelectorAll(".password-toggle");

// 중복확인 버튼 가져오기
const buyerIdCheckBtn = buyerForm.querySelector(".verification-btn");
const sellerIdCheckBtn = sellerForm.querySelector(".verification-btn");

// ID 유효성 검사 상태 변수
let buyerIdValidated = false;
let sellerIdValidated = false;

// 입력 필드 가져오기 - 구매 회원
const buyerInputs = {
  id: document.getElementById("buyer-id"),
  password: document.getElementById("buyer-password"),
  passwordConfirm: document.getElementById("buyer-password-confirm"),
  name: document.getElementById("buyer-name"),
  phoneMiddle: document.getElementById("buyer-phone-middle"),
  phoneLast: document.getElementById("buyer-phone-last"),
  terms: document.getElementById("buyer-terms"),
};

// 입력 필드 가져오기 - 판매 회원
const sellerInputs = {
  id: document.getElementById("seller-id"),
  password: document.getElementById("seller-password"),
  passwordConfirm: document.getElementById("seller-password-confirm"),
  name: document.getElementById("seller-name"),
  phoneMiddle: document.getElementById("seller-phone-middle"),
  phoneLast: document.getElementById("seller-phone-last"),
  storeName: document.getElementById("seller-store-name"),
  businessNumber: document.getElementById("seller-business-number"),
  terms: document.getElementById("seller-terms"),
};

// 오류 메시지 요소 가져오기 - 구매 회원
const buyerErrors = {
  id: document.getElementById("buyer-id-error"),
  password: document.getElementById("buyer-password-error"),
  passwordConfirm: document.getElementById("buyer-password-confirm-error"),
  name: document.getElementById("buyer-name-error"),
  phone: document.getElementById("buyer-phone-error"),
};

// 오류 메시지 요소 가져오기 - 판매 회원
const sellerErrors = {
  id: document.getElementById("seller-id-error"),
  password: document.getElementById("seller-password-error"),
  passwordConfirm: document.getElementById("seller-password-confirm-error"),
  name: document.getElementById("seller-name-error"),
  phone: document.getElementById("seller-phone-error"),
  storeName: document.getElementById("seller-store-name-error"),
  businessNumber: document.getElementById("seller-business-number-error"),
};

// 구매 회원 입력 필드 순서 정의
const buyerInputOrder = [
  buyerInputs.id,
  buyerInputs.password,
  buyerInputs.passwordConfirm,
  buyerInputs.name,
  buyerInputs.phoneMiddle,
  buyerInputs.phoneLast,
];

// 판매 회원 입력 필드 순서 정의
const sellerInputOrder = [
  sellerInputs.id,
  sellerInputs.password,
  sellerInputs.passwordConfirm,
  sellerInputs.name,
  sellerInputs.phoneMiddle,
  sellerInputs.phoneLast,
  sellerInputs.storeName,
  sellerInputs.businessNumber,
];

// 탭 전환 기능
buyerTab.addEventListener("click", function () {
  buyerTab.classList.add("active");
  sellerTab.classList.remove("active");
  buyerForm.style.display = "block";
  sellerForm.style.display = "none";
});

sellerTab.addEventListener("click", function () {
  sellerTab.classList.add("active");
  buyerTab.classList.remove("active");
  sellerForm.style.display = "block";
  buyerForm.style.display = "none";
});

// ID 유효성 검사 함수
function validateId(id) {
  // 최소 4자 이상, 영문과 숫자만 허용
  const pattern = /^[a-zA-Z0-9]{4,}$/;
  return pattern.test(id);
}

// ID 중복 확인 처리 함수 (모의 구현)
function checkDuplicateId(id, isSellerForm = false) {
  // 실제로는 서버에 중복 확인 요청을 보내야 함
  // 여기서는 모의 구현으로 특정 ID만 중복으로 처리 (user1, admin, test123)
  const duplicateIds = ["user1", "admin", "test123"];

  const errorElement = isSellerForm ? sellerErrors.id : buyerErrors.id;
  const inputElement = isSellerForm ? sellerInputs.id : buyerInputs.id;

  if (!validateId(id)) {
    errorElement.textContent =
      "아이디는 4자 이상의 영문과 숫자만 사용 가능합니다";
    errorElement.style.display = "block";
    inputElement.classList.add("error-border");
    return false;
  } else if (duplicateIds.includes(id)) {
    errorElement.textContent = "이미 사용 중인 아이디입니다";
    errorElement.style.display = "block";
    inputElement.classList.add("error-border");
    return false;
  } else {
    errorElement.textContent = "사용 가능한 아이디입니다";
    errorElement.style.color = "#6abe71";
    errorElement.style.display = "block";
    inputElement.classList.remove("error-border");

    // ID 유효성 검사 통과 상태 저장
    if (isSellerForm) {
      sellerIdValidated = true;
    } else {
      buyerIdValidated = true;
    }

    validateForm();
    return true;
  }
}

// 각 필드에 대해 유효성 검사 함수 추가
function addValidation(inputElement, errorElement, index, inputOrder) {
  inputElement.addEventListener("focus", function () {
    // 이전 필드들 검사
    for (let i = 0; i < index; i++) {
      const prevInput = inputOrder[i];
      const prevError = findErrorElement(prevInput);

      if (!prevInput.value.trim()) {
        showError(prevInput, prevError);
      }
    }
  });

  inputElement.addEventListener("input", function () {
    // ID 필드일 경우 중복 확인 상태 리셋
    if (this.id === "buyer-id") {
      buyerIdValidated = false;
      buyerErrors.id.textContent = "필수 정보입니다";
      buyerErrors.id.style.color = "#e74c3c";
    } else if (this.id === "seller-id") {
      sellerIdValidated = false;
      sellerErrors.id.textContent = "필수 정보입니다";
      sellerErrors.id.style.color = "#e74c3c";
    }

    if (this.value.trim()) {
      hideError(this, errorElement);
    } else {
      showError(this, errorElement);
    }

    validateForm();
  });

  inputElement.addEventListener("blur", function () {
    if (!this.value.trim()) {
      showError(this, errorElement);
    } else if (this.id === "buyer-id" || this.id === "seller-id") {
      // ID 필드가 포커스를 잃으면 유효성 검사 수행
      const isSellerForm = this.id === "seller-id";
      const idValue = this.value.trim();

      if (!validateId(idValue)) {
        const errorMsg = findErrorElement(this);
        errorMsg.textContent =
          "아이디는 4자 이상의 영문과 숫자만 사용 가능합니다";
        errorMsg.style.display = "block";
        this.classList.add("error-border");
      }
    }
    validateForm();
  });
}

// 비밀번호 일치 확인 및 아이콘 변경 함수
function checkPasswordMatch(passwordField, confirmField, confirmIcon) {
  if (confirmField.value.trim() === "") return;

  if (passwordField.value === confirmField.value) {
    // 비밀번호 일치 시 이미지 변경
    confirmIcon.querySelector("img").src = "./img/icon-check-on.svg";
  } else {
    // 비밀번호 불일치 시 기본 이미지
    confirmIcon.querySelector("img").src = "./img/icon-check-off.svg";
  }
}

// 비밀번호 입력 필드에 이벤트 리스너 추가
buyerInputs.password.addEventListener("input", function () {
  const confirmIcon = buyerInputs.passwordConfirm.nextElementSibling;
  checkPasswordMatch(this, buyerInputs.passwordConfirm, confirmIcon);
});

buyerInputs.passwordConfirm.addEventListener("input", function () {
  const confirmIcon = this.nextElementSibling;
  checkPasswordMatch(buyerInputs.password, this, confirmIcon);
});

sellerInputs.password.addEventListener("input", function () {
  const confirmIcon = sellerInputs.passwordConfirm.nextElementSibling;
  checkPasswordMatch(this, sellerInputs.passwordConfirm, confirmIcon);
});

sellerInputs.passwordConfirm.addEventListener("input", function () {
  const confirmIcon = this.nextElementSibling;
  checkPasswordMatch(sellerInputs.password, this, confirmIcon);
});

// 모든 입력 필드에 유효성 검사 이벤트 추가
buyerInputOrder.forEach((input, index) => {
  const errorElement = findErrorElement(input);
  addValidation(input, errorElement, index, buyerInputOrder);
});

sellerInputOrder.forEach((input, index) => {
  const errorElement = findErrorElement(input);
  addValidation(input, errorElement, index, sellerInputOrder);
});
// 오류 메시지 표시 함수
function showError(inputElement, errorElement) {
  if (errorElement) {
    errorElement.style.display = "block";

    // input-group 안에 있는 경우 처리
    if (inputElement.parentElement.classList.contains("input-group")) {
      inputElement.classList.add("error-border");
    } else if (
      inputElement.parentElement.classList.contains("phone-container")
    ) {
      // 전화번호 필드 처리
      inputElement.classList.add("error-border");
    } else {
      inputElement.classList.add("error-border");
    }
  }
}

// 오류 메시지 숨김 함수
function hideError(inputElement, errorElement) {
  if (errorElement) {
    errorElement.style.display = "none";

    // input-group 안에 있는 경우 처리
    if (inputElement.parentElement.classList.contains("input-group")) {
      inputElement.classList.remove("error-border");
    } else if (
      inputElement.parentElement.classList.contains("phone-container")
    ) {
      // 전화번호 필드 처리
      inputElement.classList.remove("error-border");
    } else {
      inputElement.classList.remove("error-border");
    }
  }
}

// 입력 필드에 해당하는 오류 요소 찾기
function findErrorElement(inputElement) {
  const id = inputElement.id;

  if (id.startsWith("buyer-")) {
    if (id.includes("phone")) {
      return buyerErrors.phone;
    }
    const fieldName = id.replace("buyer-", "");
    return buyerErrors[fieldName];
  } else if (id.startsWith("seller-")) {
    if (id.includes("phone")) {
      return sellerErrors.phone;
    }
    const fieldName = id.replace("seller-", "");
    return sellerErrors[fieldName];
  }
  return null;
}

// 구매 회원 폼 유효성 검사
function validateBuyerForm() {
  let isValid = true;

  // 모든 필드 검사
  if (!buyerInputs.id.value.trim()) isValid = false;
  if (!buyerInputs.password.value.trim()) isValid = false;
  if (!buyerInputs.passwordConfirm.value.trim()) isValid = false;
  if (!buyerInputs.name.value.trim()) isValid = false;
  if (
    !buyerInputs.phoneMiddle.value.trim() ||
    !buyerInputs.phoneLast.value.trim()
  )
    isValid = false;
  if (!buyerInputs.terms.checked) isValid = false;

  // ID 중복 확인 여부 검사
  if (!buyerIdValidated) isValid = false;

  // 비밀번호 일치 여부 검사
  if (buyerInputs.password.value !== buyerInputs.passwordConfirm.value) {
    isValid = false;
    if (buyerInputs.passwordConfirm.value.trim() !== "") {
      buyerErrors.passwordConfirm.textContent = "비밀번호가 일치하지 않습니다";
      buyerErrors.passwordConfirm.style.display = "block";
      buyerInputs.passwordConfirm.classList.add("error-border");
    }
  } else if (buyerInputs.passwordConfirm.value.trim() !== "") {
    buyerErrors.passwordConfirm.style.display = "none";
    buyerInputs.passwordConfirm.classList.remove("error-border");
  }

  // 버튼 활성화/비활성화
  if (isValid) {
    buyerRegisterBtn.classList.add("active");
  } else {
    buyerRegisterBtn.classList.remove("active");
  }

  return isValid;
}

// 판매 회원 폼 유효성 검사
function validateSellerForm() {
  let isValid = true;

  // 모든 필드 검사
  if (!sellerInputs.id.value.trim()) isValid = false;
  if (!sellerInputs.password.value.trim()) isValid = false;
  if (!sellerInputs.passwordConfirm.value.trim()) isValid = false;
  if (!sellerInputs.name.value.trim()) isValid = false;
  if (
    !sellerInputs.phoneMiddle.value.trim() ||
    !sellerInputs.phoneLast.value.trim()
  )
    isValid = false;
  if (!sellerInputs.storeName.value.trim()) isValid = false;
  if (!sellerInputs.businessNumber.value.trim()) isValid = false;
  if (!sellerInputs.terms.checked) isValid = false;

  // ID 중복 확인 여부 검사
  if (!sellerIdValidated) isValid = false;

  // 비밀번호 일치 여부 검사
  if (sellerInputs.password.value !== sellerInputs.passwordConfirm.value) {
    isValid = false;
    if (sellerInputs.passwordConfirm.value.trim() !== "") {
      sellerErrors.passwordConfirm.textContent = "비밀번호가 일치하지 않습니다";
      sellerErrors.passwordConfirm.style.display = "block";
      sellerInputs.passwordConfirm.classList.add("error-border");
    }
  } else if (sellerInputs.passwordConfirm.value.trim() !== "") {
    sellerErrors.passwordConfirm.style.display = "none";
    sellerInputs.passwordConfirm.classList.remove("error-border");
  }

  // 버튼 활성화/비활성화
  if (isValid) {
    sellerRegisterBtn.classList.add("active");
  } else {
    sellerRegisterBtn.classList.remove("active");
  }

  return isValid;
}

// 활성화된 폼에 따라 유효성 검사
function validateForm() {
  if (buyerForm.style.display !== "none") {
    return validateBuyerForm();
  } else {
    return validateSellerForm();
  }
}

// 모든 입력 필드에 유효성 검사 이벤트 추가
buyerInputOrder.forEach((input, index) => {
  const errorElement = findErrorElement(input);
  addValidation(input, errorElement, index, buyerInputOrder);
});

sellerInputOrder.forEach((input, index) => {
  const errorElement = findErrorElement(input);
  addValidation(input, errorElement, index, sellerInputOrder);
});

// 체크박스 이벤트 추가
buyerInputs.terms.addEventListener("change", function () {
  validateBuyerForm();
});

sellerInputs.terms.addEventListener("change", function () {
  validateSellerForm();
});

buyerRegisterBtn.addEventListener("click", function () {
  if (!validateBuyerForm()) {
    // 빈 필드 표시
    buyerInputOrder.forEach((input) => {
      const errorElement = findErrorElement(input);
      if (!input.value.trim()) {
        showError(input, errorElement);
      }
    });

    if (!buyerInputs.terms.checked) {
      alert("이용약관 및 개인정보처리방침에 동의해주세요.");
    }
    return;
  }

  // 전화번호 조합
  const phonePrefix = document.getElementById("buyer-phone-prefix")
    ? document.getElementById("buyer-phone-prefix").value
    : "010"; // 기본값 설정
  const phoneMiddle = buyerInputs.phoneMiddle.value;
  const phoneLast = buyerInputs.phoneLast.value;
  const phone = `${phonePrefix}${phoneMiddle}${phoneLast}`;

  // 회원가입 데이터 객체 생성
  const buyerData = {
    username: buyerInputs.id.value,
    password: buyerInputs.password.value,
    password2: buyerInputs.passwordConfirm.value,
    name: buyerInputs.name.value,
    phone: phone,
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
      // 성공 후 페이지 이동이나 추가 작업이 필요하면 여기에 작성
      // 예: window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    });
});

// 판매 회원 가입 버튼 이벤트를 수정합니다
sellerRegisterBtn.addEventListener("click", function () {
  if (!validateSellerForm()) {
    // 빈 필드 표시
    sellerInputOrder.forEach((input) => {
      const errorElement = findErrorElement(input);
      if (!input.value.trim()) {
        showError(input, errorElement);
      }
    });

    if (!sellerInputs.terms.checked) {
      alert("이용약관 및 개인정보처리방침에 동의해주세요.");
    }
    return;
  }

  // 전화번호 조합
  const phonePrefix = document.getElementById("seller-phone-prefix")
    ? document.getElementById("seller-phone-prefix").value
    : "010"; // 기본값 설정
  const phoneMiddle = sellerInputs.phoneMiddle.value;
  const phoneLast = sellerInputs.phoneLast.value;
  const phone = `${phonePrefix}${phoneMiddle}${phoneLast}`;

  // 회원가입 데이터 객체 생성
  const sellerData = {
    username: sellerInputs.id.value,
    password: sellerInputs.password.value,
    password2: sellerInputs.passwordConfirm.value,
    name: sellerInputs.name.value,
    phone: phone,
    store_name: sellerInputs.storeName.value,
    business_number: sellerInputs.businessNumber.value,
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
      // 성공 후 페이지 이동이나 추가 작업이 필요하면 여기에 작성
      // 예: window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("가입 실패:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    });
});

// // 구매회원 가입 버튼 이벤트
// buyerRegisterBtn.addEventListener("click", function () {
//   if (!validateBuyerForm()) {
//     // 빈 필드 표시
//     buyerInputOrder.forEach((input) => {
//       const errorElement = findErrorElement(input);
//       if (!input.value.trim()) {
//         showError(input, errorElement);
//       }
//     });

//     if (!buyerInputs.terms.checked) {
//       alert("이용약관 및 개인정보처리방침에 동의해주세요.");
//     }
//     return;
//   }

//   // 가입 처리 (예시)
//   alert("구매회원 가입이 완료되었습니다!");
//   // 실제로는 서버로 데이터를 전송하고 처리해야 함
// });

// // 판매회원 가입 버튼 이벤트
// sellerRegisterBtn.addEventListener("click", function () {
//   if (!validateSellerForm()) {
//     // 빈 필드 표시
//     sellerInputOrder.forEach((input) => {
//       const errorElement = findErrorElement(input);
//       if (!input.value.trim()) {
//         showError(input, errorElement);
//       }
//     });

//     if (!sellerInputs.terms.checked) {
//       alert("이용약관 및 개인정보처리방침에 동의해주세요.");
//     }
//     return;
//   }

//   // 가입 처리 (예시)
//   alert("판매회원 가입이 완료되었습니다!");
//   // 실제로는 서버로 데이터를 전송하고 처리해야 함
// });

// 휴대폰 번호 필드 자동 포커스
document
  .getElementById("buyer-phone-middle")
  .addEventListener("input", function () {
    if (this.value.length >= 4) {
      document.getElementById("buyer-phone-last").focus();
    }
  });

document
  .getElementById("seller-phone-middle")
  .addEventListener("input", function () {
    if (this.value.length >= 4) {
      document.getElementById("seller-phone-last").focus();
    }
  });

// 전화번호 입력 필드에 숫자만 입력되도록 처리
function onlyNumbers(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

const phoneInputs = document.querySelectorAll(
  'input[id$="-phone-middle"], input[id$="-phone-last"]'
);
phoneInputs.forEach((input) => {
  input.addEventListener("input", function () {
    onlyNumbers(this);
  });
});

// 중복확인 버튼 이벤트 리스너 추가
buyerIdCheckBtn.addEventListener("click", function () {
  const idValue = buyerInputs.id.value.trim();

  if (!idValue) {
    buyerErrors.id.textContent = "필수 정보입니다";
    buyerErrors.id.style.display = "block";
    buyerInputs.id.classList.add("error-border");
    return;
  }

  checkDuplicateId(idValue, false);
});

sellerIdCheckBtn.addEventListener("click", function () {
  const idValue = sellerInputs.id.value.trim();

  if (!idValue) {
    sellerErrors.id.textContent = "필수 정보입니다";
    sellerErrors.id.style.display = "block";
    sellerInputs.id.classList.add("error-border");
    return;
  }

  checkDuplicateId(idValue, true);
});

// 초기 버튼 상태 설정
validateBuyerForm();
validateSellerForm();
