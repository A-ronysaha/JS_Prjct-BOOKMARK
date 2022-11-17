let modal = document.getElementById("modal");
let modalShow = document.getElementById("show-modal");
let modalClose = document.getElementById("close-modal");
let bookForm = document.getElementById("bookmark-form");
let button = document.getElementById("btn");
let websiteName = document.getElementById("website-name");
let websiteUrl = document.getElementById("website-url");
let container = document.getElementById("bookmark-container");
let item = document.querySelector(".item");

display();
// SHOW MODAL FORM

function showModal() {
  modal.classList.add("show-modal");
  websiteName.focus();
}
modalShow.addEventListener("click", showModal);

// CLOSE MODAL FORM

function closeModal() {
  modal.classList.remove("show-modal");
}
modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  //console.log(e.target)
  e.target === modal ? modal.classList.remove("show-modal") : false;
});

// VALIDATE FORM

function validation(webName, webUrl) {
  if (!webName || !webUrl) {
    alert(`Anyof the field cannot leave blank`);
  }
  let expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
  let regex = new RegExp(expression);
  if (webUrl.match(regex)) {
    alert("correct format");
  } else {
    alert("Wrong!! Please write correct url form");
  }
}

// move to local sotorage

function store(webName, webUrl) {
  let bookmark = [];
  let bookmarks = {
    address: webName,
    url: webUrl,
  };
  //bookmark.push(bookmarks);
  //console.log(bookmark);
  let webText = localStorage.getItem("Web");
  let webObj;
  if (webText === null) {
    webObj = [];
  } else {
    webObj = JSON.parse(webText);
  }
  webObj.push(bookmarks);
  localStorage.setItem("Web", JSON.stringify(webObj));
  websiteName.value = "";
  websiteUrl.value = "";
  websiteName.focus();
}

//  DISPLAY BOOKMARK

function display() {
  let webText = localStorage.getItem("Web");
  let webObj;
  if (webText === null) {
    webObj = [];
  } else {
    webObj = JSON.parse(webText);
  }
  let html = "";
  webObj.forEach(function (ele, index) {
    //for(let ele of webObj){
    html += ` <div class="item">
    <i class="fas fa-times" id='dlt' title="Delete Bookmark"></i>
    <div class="name">
    <h5 class="card-title">Bookmark : ${index + 1}</h5>
    <img src="https://s2.googleusercontent.com/s2/favicons?domain=${ele.url}" alt="">
    <a href=${ele.url} target="_blank">${ele.address}</a>
</div> 
</div> `;
  });

  container.innerHTML = html;
}

// DELETE BOOKMARK

function deleteBookmark() {
  console.log("fire");
}
//remove.addEventListener('click',deleteBookmark)

// SUBMIT FORM

function submitForm(e) {
  let webName = websiteName.value;
  let webUrl = websiteUrl.value;
  if (!webUrl.includes("http://" || "https://")) {
    webUrl = `http://${webUrl}`;
  }
  //console.log(webUrl);
  validation(webName, webUrl);
  store(webName, webUrl);
  display();
  deleteBookmark(url);
  e.preventDefault();
}
button.addEventListener("click", submitForm);
