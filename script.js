// alert("ss");
//To make code clean and unique
"use strict";

//SideBar

const menuItems = document.querySelectorAll(".menu-item");
//Theme

const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize-theme");
const fontSizes = document.querySelectorAll(".choose-size span");
var root = document.querySelector(":root");
const colorPalette = document.querySelectorAll(".choose-color span");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

//Messages
const messageNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = document.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

//Feed Search
const feedSearch = document.querySelector("#feed-search");
const feeds = document.querySelector(".feeds");
const feed = document.querySelectorAll(".feed");
// console.log(feed);

//Create Post Button
const newPost = document.querySelector(".post-create");
const postForm = document.querySelector(".create-post");

//Delete Post
const threeDots = document.querySelector(".uil-ellipsis-h");

// ====================Sidebar===============
//Remove active class
const changeActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notifications-count"
      ).style.display = "none";
    }
  });
});

//=====================================Logout==========================
const logOut = document.querySelector("#Logout");
logOut.addEventListener("click", function () {
  window.location.replace("./signup/index.html");
});

// ====================Messages===============
//search chats
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((chat) => {
    let name = chat.querySelector("h5").textContent.toLocaleLowerCase();
    if (name.indexOf(val) != -1) {
      chat.style.display = "flex";
    } else {
      chat.style.display = "none";
    }
  });
};

//search chat
messageSearch.addEventListener("keyup", searchMessage);

// search Feed
const searchFeed = () => {
  const val = feedSearch.value.toLowerCase();
  feed.forEach((chat) => {
    let name = chat.querySelector("h3").textContent.toLocaleLowerCase();
    let feedText = chat.querySelector(".photo").textContent.toLocaleLowerCase();
    if (name.indexOf(val) != -1 || feedText.indexOf(val) != -1) {
      chat.style.display = "content";
    } else {
      chat.style.display = "none";
    }
  });
};

//search Feed
feedSearch.addEventListener("keyup", searchFeed);

//Search FEED THROUGH API
const searchApi = document.querySelector(".search-api");

async function searchPosts(e) {
  e.preventDefault();
  const feeds = document.querySelector(".feeds");
  const div = document.createElement("div");
  feeds.innerHTML = "";

  div.classList.add("feed");
  const val = feedSearch.value.toLowerCase(); //to avoid errors
  const res = await fetch(`https://dummyjson.com/posts/search?q=${val}`);
  const data = await res.json();
  console.log(data);
  for (let i = 0; i < data.posts.length; i++) {
    // posts[i].innerText = data.posts[i].body

    const HTML = `
    <div class="head">
      <div class="user">
        <div class="profile-picture">
          <img src="./images/profile-22.jpg" alt="Profile Picture" />
        </div>
        <div class="ingo">
          <h3>alpha</h3>
          <small>${data.posts[i].title}</small>
        </div>
      </div>
      <span class="edit">
        <i class="uil uil-ellipsis-h"></i>
      </span>
    </div>
    <div class="photo">
    ${data.posts[i].body}
      
    </div>
    <div class="action-buttons">
      <div class="intraction-buttons">
      <span class="like-btn">
      <i class="fa-regular fa-heart active"></i
      ><i class="fa-solid fa-heart"></i>
    </span>
    <span class="Comment-btn">
    <i class="uil uil-comment-dots"></i>
  </span>
        <span>
          <i class="uil uil-share-alt"></i>
        </span>
      </div>
      <div class="bookmark">
        <span>
          <i class="uil uil-bookmark-full"></i>
        </span>
      </div>
    </div>
    <div class="liked-by"><p>Liked by <b>${data.posts[i].reactions} others</b></p>
    </div>
    <div class="caption">
      <p>
        <b> Lorem ipsum</b> dolor sit amet consectetur adipisicing
        elit.
        <span class="hash-tag">#trending</span>
      </p>
    </div>
    <div class="comment-section">
      <input type="text" class="search-bar comment-text" />
      <button class="btn btn-primary add-comment-btn">
        Add Comment
      </button>
    </div>
    <div class="comments text-muted comment-count-text" >
      view all 3 comments
    </div>
    <!-- ---------------------------1st Feed end------------------- -->
`;
    div.innerHTML += HTML;
    feeds.appendChild(div);
  }
}
searchApi.addEventListener("click", searchPosts);

// ====================Higlighting Message Section=================================================

messageNotification.addEventListener("click", () => {
  messages.style.boxShadow = "0 0 1rem var(--color-primary)";
  messageNotification.querySelector(".notifications-count").style.display =
    "none";
  setTimeout(() => {
    messages.style.boxShadow = "none";
  }, 5000);
});

//Theme Customization

//opens modal
const openThemeModal = () => {
  themeModal.style.display = "grid";
};

//Closes Modal
const closeThemeModal = (e) => {
  if (e.target.classList.contains("customize-theme")) {
    themeModal.style.display = "none";
  }
};

//Close Modal
themeModal.addEventListener("click", closeThemeModal);
theme.addEventListener("click", openThemeModal);

//Font Size

//remove active class from sapn
const removeSizeSelector = () => {
  fontSizes.forEach((size) => {
    size.classList.remove("active");
  });
};

fontSizes.forEach((size) => {
  size.addEventListener("click", () => {
    removeSizeSelector();
    let fontSize;
    size.classList.toggle("active");

    if (size.classList.contains("font-size-1")) {
      fontSize = "10px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "5.4rem");
    } else if (size.classList.contains("font-size-2")) {
      fontSize = "13px";
      root.style.setProperty("----sticky-top-left", "5.4rem");
      root.style.setProperty("----sticky-top-right", "-7rem");
    } else if (size.classList.contains("font-size-3")) {
      fontSize = "16px";
      root.style.setProperty("----sticky-top-left", "-2rem");
      root.style.setProperty("----sticky-top-right", "-17rem");
    } else if (size.classList.contains("font-size-4")) {
      fontSize = "19px";
      root.style.setProperty("----sticky-top-left", "-5rem");
      root.style.setProperty("----sticky-top-right", "-25rem");
    } else if (size.classList.contains("font-size-5")) {
      fontSize = "22px";
      root.style.setProperty("----sticky-top-left", "-12rem");
      root.style.setProperty("----sticky-top-right", "-35rem");
    }
    //Change Font size of the root html element
    document.querySelector("html").style.fontSize = fontSize;
  });
});

//Remove active class
const changeActiveColorClass = () => {
  colorPalette.forEach((colorPicker) => {
    colorPicker.classList.remove("active");
  });
};
//change primary colors
colorPalette.forEach((color) => {
  color.addEventListener("click", () => {
    changeActiveColorClass();
    let primary;
    let primaryHue;

    if (color.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (color.classList.contains("color-2")) {
      primaryHue = 52;
    } else if (color.classList.contains("color-3")) {
      primaryHue = 352;
    } else if (color.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (color.classList.contains("color-5")) {
      primaryHue = 202;
    }
    color.classList.add("active");

    root.style.setProperty("--color-primary-hue", primaryHue);
  });
});

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

//Change Background Color
const changeBG = () => {
  root.style.setProperty("--light-color-lightness", lightColorLightness);
  root.style.setProperty("--white-color-lightness", whiteColorLightness);
  root.style.setProperty("--dark-color-lightness", darkColorLightness);
};

Bg1.addEventListener("click", () => {
  darkColorLightness = "17%";
  whiteColorLightness = "100%";
  lightColorLightness = "95%";

  //Add active Class
  Bg1.classList.add("active");
  //remove active class
  Bg2.classList.remove("active");
  Bg3.classList.remove("active");
  //   window.location.reload();
  changeBG();
});
Bg2.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "20%";
  lightColorLightness = "15%";

  //Add active Class
  Bg2.classList.add("active");
  //remove active class
  Bg1.classList.remove("active");
  Bg3.classList.remove("active");
  changeBG();
});
Bg3.addEventListener("click", () => {
  darkColorLightness = "95%";
  whiteColorLightness = "10%";
  lightColorLightness = "0%";

  //Add active Class
  Bg3.classList.add("active");
  //remove active class
  Bg1.classList.remove("active");
  Bg2.classList.remove("active");
  changeBG();
});

//Create comment
const createComment = (title) => {
  const newComment = document.createElement("div");
  newComment.classList.add("Comment-area");

  newComment.appendChild(document.createElement("p")).textContent = title;
  const btnParentDiv = newComment.appendChild(document.createElement("div"));
  const button = btnParentDiv.appendChild(document.createElement("button"));
  const editbutton = btnParentDiv.appendChild(document.createElement("button"));
  editbutton.classList.add("text-muted");
  editbutton.textContent = "Edit";
  button.classList.add("text-muted");
  button.textContent = "Delete";
  button.addEventListener("click", () => newComment.remove());
  return newComment;
  //   newComment.
};
// setInterval(getNewComments, 1000);

//Comments form API
async function getNewComments() {
  let response = await fetch("https://dummyjson.com/comments/post/1", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
}
getNewComments();

// async function getNewComments() {
//   //   e.preventDefault();
//   const res = await fetch("https://dummyjson.com/comments/", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await res.json();
//   console.log(data);
//   return data;
// }

// ============================================================================================================================================================ADD COMMWNT==NEW=TrY-----===========================================================================================================================================================================================================================================================================//

var selectedRow = null;
let isValid = true;
function onFormSubmit() {
  if (validate()) {
    var formData = readFormData();
    if (selectedRow == null) insertNewRecord(formData);
    else updateRecord(formData);
    resetForm();
  }
}

function readFormData() {
  var formData = {};
  formData["fullName"] = document.querySelector(".fullName").value;
  return formData;
}

function insertNewRecord(data) {
  var table = document
    .querySelector(".employeeList")
    .getElementsByTagName("tbody")[0];
  var newRow = table.insertRow(table.length);
  let cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName;

  let cell4 = newRow.insertCell(1);
  cell4.innerHTML = `<button class="btn btn-primary cmt-btn" onClick="onEdit(this)">Edit</button>
                       <button class="btn btn-primary cmt-btn" onClick="onDelete(this)">Delete</button>`;
}

function resetForm() {
  document.querySelector(".fullName").value = "";

  selectedRow = null;
}

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  document.querySelector(".fullName").value = selectedRow.cells[0].innerHTML;
}
function updateRecord(formData) {
  selectedRow.cells[0].innerHTML = formData.fullName;
}

function onDelete(td) {
  if (confirm("Are you sure to delete this record ?")) {
    let row = td.parentElement.parentElement;
    document.querySelector(".employeeList").deleteRow(row.rowIndex);
    resetForm();
  }
}
function validate() {
  isValid = true;
  if (document.querySelector(".fullName").value == "") {
    isValid = false;
    document.querySelector(".fullNameValidationError").classList.remove("hide");
  } else {
    isValid = true;
    if (
      !document
        .querySelector(".fullNameValidationError")
        .classList.contains("hide")
    )
      document.querySelector(".fullNameValidationError").classList.add("hide");
  }
  return isValid;
}
// ===================================================================

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const post = document.getElementById("create-post").value;
  //   console.log(post);
  const feeds = document.querySelector(".feeds");
  const div = document.createElement("div");
  div.classList.add("feed");

  const HTML = `
              <div class="head">
                <div class="user">
                  <div class="profile-picture">
                    <img src="./images/profile-1.jpg" alt="Profile Picture" />
                  </div>
                  <div class="ingo">
                    <h3>Sniper Wolf</h3>
                    <small>Dubai,15 MINUTES AGO</small>
                  </div>
                </div>
                <span class="edit">
                  <i class="uil uil-ellipsis-h"></i>
                </span>
              </div>
              <div class="photo">
                ${post}
              </div>
              <div class="action-buttons">
                <div class="intraction-buttons">
                  <span>
                    <i class="uil uil-heart"></i>
                  </span>
                  <span>
                    <i class="uil uil-comment-dots"></i>
                  </span>
                  <span>
                    <i class="uil uil-share-alt"></i>
                  </span>
                </div>
                <div class="bookmark">
                  <span>
                    <i class="uil uil-bookmark-full"></i>
                  </span>
                </div>
              </div>
              <div class="liked-by">
              </div>
              <div class="caption">
                <p>
                  <b> Lorem ipsum</b> dolor sit amet consectetur adipisicing
                  elit.
                  <span class="hash-tag">#trending</span>
                </p>
              </div>
              <!-- ---------------------------1st Feed end------------------- -->
  `;
  //   const feed = (document.querySelector(".feed").insertAdjacentHTML =
  // ("afterbegin", HTML));
  div.innerHTML = HTML;
  feeds.appendChild(div);

  likeSetting();
});

//Delete Post

// threeDots.addEventListener(cli);
let j = 10;

//Get new post from the FAKE API
async function getNewPost(e) {
  //   e.preventDefault();
  const res = await fetch("https://dummyjson.com/posts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    // body:JSON.stringify()
  });
  const allPosts = await res.json();
  // .then((res) => res.json())

  for (var i = 0; i < 10; i++) {
    // console.log(allPosts.posts[i], allPosts.posts[i].id + 1);
    //Comments
    var HTML1 = `
    <div class="head">
      <div class="user">
        <div class="profile-picture">
          <img src="./images/profile-${
            allPosts.posts[i].id + 1
          }.jpg" alt="Profile Picture" />
        </div>
        <div class="ingo">
          <h3>${allPosts.posts[i].userId}</h3>
          <small>${allPosts.posts[i].title}</small>
        </div>
      </div>
      <span class="edit">
        <i class="uil uil-ellipsis-h"></i>
      </span>
    </div>
    <div class="photo">
    ${allPosts.posts[i].body}
      
    </div>
    <div class="action-buttons">
      <div class="intraction-buttons">
      <span class="like-btn">
      <i class="fa-regular fa-heart active"></i
      ><i class="fa-solid fa-heart"></i>
    </span>
    <span class="Comment-btn">
    <i class="uil uil-comment-dots"></i>
  </span>
        <span>
          <i class="uil uil-share-alt"></i>
        </span>
      </div>
      <div class="bookmark">
        <span>
          <i class="uil uil-bookmark-full"></i>
        </span>
      </div>
    </div>
    <div class="liked-by"><p>Liked by <b>${
      allPosts.posts[i].reactions
    } others</b></p>
    </div>
    <div class="caption">
      <p>
        <b> Lorem ipsum</b> dolor sit amet consectetur adipisicing
        elit.
        <span class="hash-tag">#trending</span>
      </p>
    </div>
    <div class="comment-section">
      <input type="text" class="search-bar comment-text" />
      <button class="btn btn-primary add-comment-btn">
        Add Comment
      </button>
    </div>
    `;

    const feeds = document.querySelector(".feeds");
    const div = document.createElement("div");
    div.classList.add("feed");
    div.innerHTML = HTML1;
    feeds.appendChild(div);
    let response = await fetch(`https://dummyjson.com/comments/post/${i + 1}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.comments.length);
    for (let m = 0; m < data.comments.length; m++) {
      console.log(data.comments[m].body);

      const div2 = document.createElement("div");

      const HTML2 = `
      <div class="comment-block"><img class="comment-image" src="./images/profile-${
        i + 1
      }.jpg"/>
  <div class="comment-dialog">
    <h4 class="username">Matheus Plessmann</h4>
    <p class="text">${data.comments[m].body}</p>
  </div>
  <button class="btn btn-primary cmt-btn" onClick="onDelete(this)">Delete</button>
</div>
        
      <!-- ---------------------------1st Feed end------------------- -->
`;
      //   const feed = (document.querySelector(".feed").insertAdjacentHTML =
      // ("afterbegin", HTML));

      const feed = document.querySelectorAll(".feed");
      feed.forEach((feed) => {
        div2.innerHTML = HTML2;
        feed.appendChild(div2);
      });

      // div2.insertAdjacentHTML("beforeend", HTML2);
    }

    j += 1;
  }

  window.onscroll = async function (ev) {
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 2
    ) {
      for (i; i < 20; i++) {
        const feeds = document.querySelector(".feeds");
        const div = document.createElement("div");
        div.classList.add("feed");
        div.innerHTML = HTML1;
        feeds.appendChild(div);
        let response = await fetch(
          `https://dummyjson.com/comments/post/${i + 1}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        for (let m = 0; m < data.comments.length; m++) {
          console.log(data.comments[m].body);

          const div2 = document.createElement("div");

          const HTML2 = `
        <div class="comment-block"><img class="comment-image" src="./images/profile-${
          i + 1
        }.jpg"/>
    <div class="comment-dialog">
      <h4 class="username">Matheus Plessmann</h4>
      <p class="text">${data.comments[m].body}</p>
    </div>
    <button class="btn btn-primary cmt-btn" onClick="onDelete(this)">Delete</button>
  </div>
          
        <!-- ---------------------------1st Feed end------------------- -->
`;

          const feeds = document.querySelector(".feeds");
          const div = document.createElement("div");
          div.classList.add("feed");

          const feed = document.querySelectorAll(".feed");
          feed.forEach((feed) => {
            div2.innerHTML = HTML2;
            feed.appendChild(div2);
          });

          // div2.insertAdjacentHTML("beforeend", HTML2);
        }
      }
      console.log(i);
    }
  };

  //Feed Search
  const feedSearch = document.querySelector("#feed-search");
  // const feeds = document.querySelector(".feeds");
  const feed = document.querySelectorAll(".feed");
  //   console.log(feed);
  const searchFeed = () => {
    const val = feedSearch.value.toLowerCase();
    feed.forEach((chat) => {
      let name = chat.querySelector("h3").textContent.toLocaleLowerCase();
      let feedText = chat
        .querySelector(".photo")
        .textContent.toLocaleLowerCase();
      if (name.indexOf(val) != -1 || feedText.indexOf(val) != -1) {
        chat.style.display = "content";
      } else {
        chat.style.display = "none";
      }
    });
  };

  //search chat
  feedSearch.addEventListener("keyup", searchFeed);

  likeSetting();

  const commentInput = document.querySelectorAll(".comment-text");
  //   console.log(commentInput);
  const addCommentBtn = document.querySelectorAll(".add-comment-btn");
  //   console.log(addCommentBtn);

  const commentCountText = document.querySelectorAll(".comment-count-text");
  //   console.log(commentCountText);
  //Toggle comment btn
  const commentBtn = document.querySelectorAll(".Comment-btn");
  //   console.log(commentBtn);
  const commentSection = document.querySelectorAll(".comment-section");
  //   console.log(commentSection);
  //   console.log("sdfg", commentBtn.length);

  // for (let i = 0; i < commentBtn.length; i++) {
  //   commentBtn[i].addEventListener("click", function () {
  //     //   for (let p = 0; p < commentSection.length; p++) {
  //     commentSection[i].classList.toggle("comment-section");
  //     //   }
  //   });
  // }

  //   console.log(allPosts);
  //   console.log(allPosts.posts[0]);
}
function refreshPosts() {
  if (window.LOADED) getNewPost();
  else if (window.addEventListener)
    window.addEventListener("load", getNewPost, false);
  else if (window.attachEvent) window.attachEvent("onload", getNewPost);
}
window.onload = refreshPosts();

setInterval(likeSetting, 2000);
// setTimeout(alpha, 2000);
function likeSetting() {
  const likeBtn = document.querySelectorAll(".like-btn");
  //   console.log(likeBtn);
  for (let i = 0; i < likeBtn.length; i++) {
    likeBtn[i].addEventListener("click", function () {
      const emptyHeart = document.querySelectorAll(".fa-regular");
      const fillHeart = document.querySelectorAll(".fa-solid");
      if (emptyHeart[i].classList.contains("active")) {
        emptyHeart[i].classList.remove("active");
        emptyHeart[i].style.display = "none";
        fillHeart[i].style.display = "inline-block";
        fillHeart[i].classList.add("active");
      } else if (fillHeart[i].classList.contains("active")) {
        emptyHeart[i].classList.add("active");
        emptyHeart[i].style.display = "inline-block";
        fillHeart[i].style.display = "none";
        fillHeart[i].classList.remove("active");
      }
    });
  }
}
function alpha() {
  //Add Comment
  const commentInput = document.querySelectorAll(".comment-text");
  console.log(commentInput);
  const addCommentBtn = document.querySelectorAll(".add-comment-btn");
  console.log(addCommentBtn);

  const commentCountText = document.querySelectorAll(".comment-count-text");
  console.log(commentCountText);

  const createComment = (title) => {
    const newComment = document.createElement("div");
    newComment.classList.add("Comment-area");

    newComment.appendChild(document.createElement("p")).textContent = title;
    const btnParentDiv = newComment.appendChild(document.createElement("div"));
    const button = btnParentDiv.appendChild(document.createElement("button"));
    const editbutton = btnParentDiv.appendChild(
      document.createElement("button")
    );
    editbutton.classList.add("text-muted");
    editbutton.textContent = "Edit";
    button.classList.add("text-muted");
    button.textContent = "Delete";
    button.addEventListener("click", () => newComment.remove());
    return newComment;
    //   newComment.
  };
  for (let i = 0; i < addCommentBtn.length; i++) {
    addCommentBtn[i].addEventListener("click", () => {
      // for (let j = 0; j < commentInput.length; j++) {
      let newComment = createComment(commentInput[i].value);
      commentCountText[i].insertAdjacentElement("beforebegin", newComment);
      // }
      // for (let i = 0; i < commentCountText.length; i++) {
      commentCountText[i].insertAdjacentElement("beforebegin", newComment);
      // }
    });
  }
}

//Toggle comment btn
const commentBtn = document.querySelectorAll(".Comment-btn");
//   console.log(commentBtn);
const commentSection = document.querySelectorAll(".comment-section");
//   console.log(commentSection);
console.log("sdfg", commentBtn.length);

for (let i = 0; i < commentBtn.length; i++) {
  commentBtn[i].addEventListener("click", function () {
    //   for (let p = 0; p < commentSection.length; p++) {
    commentSection[i].classList.toggle("comment-section");
    //   }
  });
}

//END
