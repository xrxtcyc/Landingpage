document.addEventListener("DOMContentLoaded", function () {
  const bannerContainer = document.querySelector(".banner-container");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const slideCount = document.querySelectorAll(".banner-slide").length;
  let currentIndex = 1; // 초기 인덱스

  // 초기 설정
  updateBanner();

  // 다음 슬라이드로 이동
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateBanner();
  }

  //다음 슬라이드: 인덱스를 증가시키고 updateBanner()로 화면을 갱신.
  //이전 슬라이드: 인덱스를 감소시키며, 음수가 되지 않도록 ( + slideCount ) % slideCount 처리.
  // 이전 슬라이드로 이동
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateBanner();
  }

  // 배너 업데이트
  function updateBanner() {
    bannerContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // 도트 업데이트
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // 화살표 버튼 이벤트
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // 도트 클릭 이벤트
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateBanner();
    });
  });

  // 배너에 마우스를 올리면 자동 슬라이드 정지
  const banner = document.querySelector(".banner");
  banner.addEventListener("mouseenter", () => clearInterval(interval));

  // 배너에서 마우스가 나가면 자동 슬라이드 재개
  banner.addEventListener("mouseleave", () => {
    clearInterval(interval);
    setInterval(nextSlide, 5000);
  });
});
