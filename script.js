class User {
	constructor(id, name, price, detail, color) {
	  this.id = id;
	  this.name = name;
	  this.price = price;
	  this.detail = detail;
	  this.color = color;
	}
  }
  class App {
	renderUser(users) {
	  let userTableTbody = document.querySelector('#tbody');
	  let userTableBodyHtml = '';
  
	  for (let user of users) {
		userTableBodyHtml += `<tr id="row${user.id}">
			<td>${user.id}</td>
			<td>${user.name}</td>
			<td>${user.price}</td>
			<td>${user.detail}</td>
			<td>${user.color}</td>
			<td>
			  <button class="btn btn-edit" data-id="${user.id}">Edit</button>
			  <button class="btn btn-delete" data-id="${user.id}" >Delete</button>
			</td>
		  </tr>`;
	  }
	  userTableTbody.innerHTML = userTableBodyHtml;
	  initDelete();
	}
  }
  
  let users = [];
  let app = new App();
  
  let submitBtn = document.querySelector('#submit');
  let editBtns = document.querySelectorAll('.btn-edit');
  
  let nameEl = document.querySelector('#name');
  let priceEl = document.querySelector('#price');
  let detailEl = document.querySelector('#detail');
  let colorEl = document.querySelector('#color');
  
  let editId = '';
  
  submitBtn.addEventListener('click', function () {
	if (editId) {
	  let userEditIndex = users.findIndex((item) => item.id == editId);
	  let userEdit = users[userEditIndex];
	  userEdit.name = nameEl.value;
	  userEdit.price = priceEl.value;
	  userEdit.detail = detailEl.value;
	  userEdit.color = colorEl.value;
	  app.renderUser(users);
	  resetForm();
	} else {
	  let id = parseInt(Math.random() * 100);
	  let userCreate = new User(id, nameEl.value, priceEl.value, detailEl.value, colorEl.value);
	  users.push(userCreate);
	  app.renderUser(users);
	  resetForm();
	}
  });
  function resetForm() {
	nameEl.value = '';
	priceEl.value = '';
	detailEl.value = '';
	colorEl.value = '';
	editId = '';
  }
  
  editBtns.forEach((item) => {
	item.addEventListener('click', function () {
	  editId = this.getAttribute('data-id');
	  let userEditIndex = users.findIndex((item) => item.id == editId);
	  let userEdit = users[userEditIndex];
	  nameEl.value = userEdit.name;
	  priceEl.value = userEdit.price;
	  detailEl.value = userEdit.detail;
	  colorEl.value = userEdit.color;
	});
  });
  
  function initDelete()
  {
	let deleteBtns = document.querySelectorAll('.btn-delete');
	deleteBtns.forEach((item) => {
	  item.addEventListener('click', function () {
		let isDelete = confirm('Are you sure ???');
		if (isDelete) {
		let id = item.getAttribute('data-id');
		let userIndex = users.findIndex((item) => item.id == id);
		users.splice(userIndex, 1);
		app.renderUser(users);
	}});
	});
  }