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
// lấy id lỗi trong class name-error
const nameError = document.getElementById("name-error");
// lấy id lỗi trong class phone-error
const phoneError = document.getElementById("phone-error");
// lấy id users trong class users
const usersContainer = document.getElementById("users-container");
// đặt tên biến .emty-state
const emptyState = document.querySelector(".empty-state");
// lấy id modal-title
const modalTitle = document.getElementById("modal-title");
// lấy id btn-delete
const btnDelete = document.getElementById("btn-delete");
// lấy id modal-delete
const modalDelete = document.getElementById("modal-delete");
// lấy id btn-cancel2
const btnCancel2 = document.getElementById("btn-cancel2");
// lấy id close__modal
const closemodal = document.getElementById("close__modal");
// lấy id search
const searchBar = document.getElementById("search");
// đặt tên biến data chứa form trong localstogare nếu rong thi []
let dataForm = JSON.parse(localStorage.getItem("data")) || [];
// đặt tên biến định danh khi edit null
let isEdit = null;
// đặt tên biến định danh khi xóa null
let isDelete = null;
// bắt sự kiện click form
form.addEventListener("submit", function (e) {
  // ngăn reload form
  e.preventDefault();

  let isValid = true;

  //reset mảng lối
  nameError.style.display = "none";
  phoneError.style.display = "none";

  // check ô input name phải >= 2
  if (name.value.length < 2) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  // check ô input phone sdt phai 10-11 số
  if (phone.value.length < 10 || phone.value.length > 11) {
    phoneError.style.display = "block";
    isValid = false;
  } else {
    phoneError.style.display = "none";
  }

  // nếu có lỗi thì thoát, không lưu vào localStorage
  if (!isValid) {
    return;
  }

  // nếu edit không null thì update user
  if (isEdit !== null) {
    // tìm người dùng theo id
    const user = dataForm.find((item) => item.id === isEdit);
    // update người dùng
    user.name = name.value;
    user.email = email.value;
    user.phone = phone.value;
    // reset id
    isEdit = null;
  } else {
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
  }
  // lưu mang vao localStorage
  localStorage.setItem("data", JSON.stringify(dataForm));
  // closeModal đóng
  modalForm.close();
  // render
  render();
  // reset form
  form.reset();
});

// bắt sự kiện click addUsers
addUsers.addEventListener("click", function () {
  isEdit = null;
  form.reset();
  nameError.style.display = "none";
  phoneError.style.display = "none";
  modalTitle.textContent = "Thêm Người Dùng Mới";
  addUser.textContent = "Thêm người dùng";
  modalForm.showModal();
});

// bắt sự kiện click closeModal
closeModal.addEventListener("click", function () {
  nameError.style.display = "none";
  phoneError.style.display = "none";
  form.reset();
  modalForm.close();
});

// bắt sự kiện click cancel
cancel.addEventListener("click", function () {
  nameError.style.display = "none";
  phoneError.style.display = "none";
  form.reset();
  modalForm.close();
});

// Tạo function render data vào usersContainer
function render() {
  //check dataForm rong

  //tạo tên biến chứa giá trị của dataFrom trùng với giá trị của searchBar
  const searchValue = searchBar.value.toLowerCase();
  dataSearch = dataForm.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.email.toLowerCase().includes(searchValue)
    );
  });

  // if (dataForm.length === 0 && searchValue === "") {
  //   emptyState.style.display = "block";
  // } else {
  //   emptyState.style.display = "none";
  // }

  // check dataSearch rong
  // if (dataSearch.length === 0) {
  //   emptyState.style.display = "block";
  //   emptyState.innerHTML = `
  //   <h3>Không tìm thấy kết quả cho"${searchValue}"</h3>
  //   `;
  // } else {
  //   emptyState.style.display = "none";
  // }

  //nếu searchValue không rỗng và dataSearch rỗng
  // if (searchValue !== "" && dataSearch.length === 0) {
  //   emptyState.style.display = "block";
  //   emptyState.innerHTML = `
  //   <h3>Không tìm thấy kết quả cho"${searchValue}"</h3>
  //   `;
  // }

  //nếu formData rỗng
  if (dataForm.length === 0) {
    emptyState.style.display = "block";
    //nếu dataSearch rỗng
    if (dataSearch.length === 0) {
      emptyState.style.display = "block";
      emptyState.innerHTML = `
        <h3>Chưa có người dùng nào</h3>
        <p>Hãy thêm người dùng đầu tiên của bạn!</p>
    `;
    }
  }

  //nếu formData khác rỗng
  if (dataForm.length !== 0) {
    //nếu dataSearch rỗng
    if (dataSearch.length === 0) {
      emptyState.style.display = "block";
      emptyState.innerHTML = `
    <h3>Không tìm thấy kết quả cho"${searchValue}"</h3>
    `;
    } else {
      emptyState.style.display = "none";
    }
  }

  usersContainer.innerHTML = "";
  dataSearch.forEach((item) => {
    usersContainer.innerHTML += `
              <div class="user-card">
                <h3>${item.name}</h3>
                <p>Email: ${item.email}</p>
                <p>Phone: ${item.phone}</p>
                <div class="user-actions">
                  <button class="btn btn-primary" onclick="editUser(${item.id})">Edit</button
                  ><button class="btn btn-danger" onclick="deleteUser(${item.id})">Delete</button>
                </div>
              </div>
    `;
  });
}
render();

// tạo function delete
function deleteUser(id) {
  isDelete = id;
  // hiện thị modal delete
  modalDelete.show();
  // bắt sự kiện click closemodal
  closemodal.addEventListener("click", function () {
    modalDelete.close();
  });
  // bắt sự kiện btnCancel2
  btnCancel2.addEventListener("click", function () {
    modalDelete.close();
  });
  // bắt sự kiện btnDelete
  btnDelete.addEventListener("click", function () {
    if (isDelete !== null) {
      const index = dataForm.filter((item) => item.id === id);
      dataForm.splice(index, 1);
      localStorage.setItem("data", JSON.stringify(dataForm));
      render();
    }
    isDelete = null;
    modalDelete.close();
  });
}

// tạo function edit
function editUser(id) {
  const user = dataForm.find((item) => item.id === id);
  isEdit = id;
  name.value = user.name;
  email.value = user.email;
  phone.value = user.phone;
  // text bằng edit
  modalTitle.textContent = "Edit User";
  //text bằng save
  addUser.textContent = "Save";
  modalForm.showModal();
}

// đồng bộ storage khi có nhiều tab
window.addEventListener("storage", function (e) {
  if (e.key === "data") {
    dataForm = JSON.parse(localStorage.getItem("data")) || [];
    render();
  }
});

searchBar.addEventListener("input", function () {
  // lấy giá trị của searchBar
  const searchValue = searchBar.value.toLowerCase();
  render(searchValue);
});
