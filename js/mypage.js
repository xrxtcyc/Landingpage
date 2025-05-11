// 현재 선택된 탭 상태를 저장 (기본값: 구매회원)
let currentUserType = "buyer";

const buyerTab = document.getElementById("buyer-tab");
const sellerTab = document.getElementById("seller-tab");
const loginBtn = document.getElementById("login-btn");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const usernameError = document.getElementById("username-error");
const passwordError = document.getElementById("password-error");
const loginError = document.getElementById("login-error");
const loginTypeDisplay = document.getElementById("login-type-display");
const loadingIndicator = document.getElementById("loading");

// 탭 전환 기능
buyerTab.addEventListener("click", function () {
  if (currentUserType !== "buyer") {
    buyerTab.classList.add("active");
    sellerTab.classList.remove("active");
    currentUserType = "buyer";
    loginTypeDisplay.textContent = "구매회원으로 로그인";
    clearErrors();
    clearInputs();
  }
});

sellerTab.addEventListener("click", function () {
  if (currentUserType !== "seller") {
    sellerTab.classList.add("active");
    buyerTab.classList.remove("active");
    currentUserType = "seller";
    loginTypeDisplay.textContent = "판매회원으로 로그인";
    clearErrors();
    clearInputs();
  }
});

// 오류 메시지 초기화 함수
function clearErrors() {
  usernameError.style.display = "none";
  passwordError.style.display = "none";
  loginError.style.display = "none";
  usernameInput.parentElement.classList.remove("error");
  passwordInput.parentElement.classList.remove("error");
}

// 입력 필드 초기화 함수
function clearInputs() {
  usernameInput.value = "";
  passwordInput.value = "";
}

// 로딩 표시 함수
function showLoading() {
  loadingIndicator.style.display = "block";
  loginBtn.disabled = true;
  loginBtn.style.backgroundColor = "#ccc";
}

// 로딩 숨김 함수
function hideLoading() {
  loadingIndicator.style.display = "none";
  loginBtn.disabled = false;
  loginBtn.style.backgroundColor = "#6abe71";
}

// 로그인 검증 함수
loginBtn.addEventListener("click", function () {
  clearErrors();

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  // 아이디와 비밀번호 모두 공란인 경우
  if (!username && !password) {
    usernameError.textContent = "아이디를 입력해 주세요.";
    usernameError.style.display = "block";
    usernameInput.parentElement.classList.add("error");
    return;
  }

  // 아이디만 공란인 경우
  if (!username) {
    usernameError.textContent = "아이디를 입력해 주세요.";
    usernameError.style.display = "block";
    usernameInput.parentElement.classList.add("error");
    return;
  }

  // 비밀번호만 공란인 경우
  if (!password) {
    passwordError.textContent = "비밀번호를 입력해 주세요.";
    passwordError.style.display = "block";
    passwordInput.parentElement.classList.add("error");
    return;
  }

  // 로딩 표시
  showLoading();

  // 사용자 유형에 따라 다른 로그인 처리
  setTimeout(() => {
    hideLoading();

    // 유형에 따른 다른 테스트 계정 설정
    // 실제로는 서버에서 처리해야 함
    if (currentUserType === "buyer") {
      // 구매회원 로그인 검증
      if (username === "buyer" && password === "password") {
        alert("구매회원으로 로그인 성공!");
        // 구매회원 페이지로 이동 (예시)
        // window.location.href = "buyer-dashboard.html";
      } else {
        loginError.textContent =
          "구매회원 아이디 또는 비밀번호가 일치하지 않습니다.";
        loginError.style.display = "block";
      }
    } else {
      // 판매회원 로그인 검증
      if (username === "seller" && password === "password") {
        alert("판매회원으로 로그인 성공!");
        // 판매회원 페이지로 이동 (예시)
        // window.location.href = "seller-dashboard.html";
      } else {
        loginError.textContent =
          "판매회원 아이디 또는 비밀번호가 일치하지 않습니다.";
        loginError.style.display = "block";
      }
    }
  }, 1000); // 1초 딜레이 (로딩 표시용)
});

// 엔터 키로 로그인 하기
function handleEnterKey(event) {
  if (event.key === "Enter") {
    loginBtn.click();
  }
}

usernameInput.addEventListener("keypress", handleEnterKey);
passwordInput.addEventListener("keypress", handleEnterKey);
