alert("name Must be kminchelle and Password should be 0lelplR");

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_form = document.querySelector(".sign-in-form");

//form shift to sign in or sign up
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

//Name Validation
const fullName = document.getElementById("userName");
const fullName1 = document.getElementById("user-name-s");
function validName() {
  if (
    !/^[a-zA-Z_]*$/.test(fullName.value) ||
    !/^[a-zA-Z_]*$/.test(fullName1.value)
  ) {
    alert("invalid Name");
  }
}
//Password Toggle

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#id_password");

togglePassword.addEventListener("click", function (e) {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

const toggleReg = document.querySelector("#toggleReg");
const pass = document.querySelector("#id_reg");

toggleReg.addEventListener("click", function (e) {
  const type = pass.getAttribute("type") === "password" ? "text" : "password";
  pass.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
});

async function verifyCredentials(e) {
  e.preventDefault();

  const name = document.querySelector("#user-name").value;
  const passKey = document.querySelector("#id_password").value;
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      // kminchelle
      // 0lelplR

      username: name,
      password: passKey,
      // expiresInMins: 60, // optional
    }),
  });
  // .then((res) => res.json())
  // .then(console.log);
  const data = await res.json();
  console.log(data);

  //   const json = ;
  localStorage.setItem("token", JSON.stringify(data.token));
  localStorage.setItem("username", JSON.stringify(data.username));
  if (data.message != "Invalid credentials") {
    window.location.href = "../index_main.html";
  }
}

sign_in_form.addEventListener("submit", verifyCredentials);
