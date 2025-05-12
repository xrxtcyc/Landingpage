const signupBuyer = async (username, password, name, phone_number) => {
  const url =
    "https://api.wenivops.co.kr/services/open-market/accounts/buyer/signup/";

  const body = {
    username: username,
    password: password,
    name: name,
    phone_number: phone_number,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error:", errorData);
    } else {
      const data = await response.json();
      console.log("Signup successful:", data);
    }
  } catch (error) {
    console.error("Error during the request:", error);
  }
};

// 예시 호출
signupBuyer("testuser", "password123", "John Doe", "01012345678");
