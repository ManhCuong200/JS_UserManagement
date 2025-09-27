// lấy id trong class modal-form
const modalForm = document.getElementById("modal-form");
// lấy id trong class close-modal
const closeModal = document.getElementById("close-modal");
// lấy id trong class btn-add
const addUser = document.getElementById("btn-add");
// lấy id trong class btn-cancel
const cancel = document.getElementById("btn-cancel");
// lấy id trong class add-users
const addUsers = document.getElementById("add-users");
// lấy id trong class form
const form = document.getElementById("form");
// lấy id trong class name-value
const name = document.getElementById("name-value");
// lấy id trong class email-value
const email = document.getElementById("email-value");
// lấy id trong class phone-value
const phone = document.getElementById("phone-value");
// đặt tên biến data chứa form trong localstogare nếu rong thi []
let dataForm = JSON.parse(localStorage.getItem("data")) || [];

// bắt sự kiện click form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //lấy giá trị của name
  const nameValue = name.value;
  //lấy giá trị của email
  const emailValue = email.value;
  //lấy giá trị của phone
  const phoneValue = phone.value;

  // tạo object
  const data = {
    id: Date.now(),
    name: nameValue,
    email: emailValue,
    phone: phoneValue,
  };
  // them object vao mang
  dataForm.push(data);
  // lưu mang vao localStorage
  localStorage.setItem("data", JSON.stringify(dataForm));
  // reset form
  form.reset();
});

// bắt sự kiện click addUsers
addUsers.addEventListener("click", function () {
  modalForm.showModal();
});

// bắt sự kiện click closeModal
closeModal.addEventListener("click", function () {
  modalForm.close();
});

// bắt sự kiện click addUser
addUser.addEventListener("click", function () {
  modalForm.showModal();
});

// bắt sự kiện click cancel
cancel.addEventListener("click", function () {
  modalForm.close();
});
