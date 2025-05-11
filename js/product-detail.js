//.tab 클래스가 붙은 모든 요소(탭 버튼들)를 선택하고,

//.tab-content 클래스가 붙은 요소들(각 탭에 해당하는 콘텐츠)을 선택합니다.

const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    tab.classList.add("active");

    const tabId = tab.getAttribute("data-tab");
    document.getElementById(tabId).classList.add("active");
  });
});

// 모든 탭과 콘텐츠에서 "active" 클래스를 제거합니다.
// 클릭한 탭에는 "active" 클래스를 다시 추가합니다.
// 클릭한 탭의 data-tab 속성에 저장된 id 값을 가져옵니다.
// 해당 id를 가진 콘텐츠에 "active" 클래스를 추가해 보여줍니다

const minusBtn = document.querySelector(".quantity-button:first-child");
const plusBtn = document.querySelector(".quantity-button:last-child");
const quantityValue = document.querySelector(".quantity-value");
const productPrice = 17500;
const totalPriceElement = document.querySelector(".total-price");

// 초기 총 가격을 설정합니다.
function updateTotalPrice() {
  const quantity = parseInt(quantityValue.textContent);
  const total = productPrice * quantity;
  totalPriceElement.textContent = total.toLocaleString() + "원";
}

minusBtn.addEventListener("click", () => {
  let quantity = parseInt(quantityValue.textContent);
  if (quantity > 1) {
    quantity--;
    quantityValue.textContent = quantity;
    updateTotalPrice();
  }
});

plusBtn.addEventListener("click", () => {
  let quantity = parseInt(quantityValue.textContent);
  quantity++;
  quantityValue.textContent = quantity;
  updateTotalPrice();
});
