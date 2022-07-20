var service = new Service();

function getEle(id) {
	return document.getElementById(id);
}

function getListProduct() {
	//pending
	getEle("loading").style.display = "block";

	service
		.getListProductApi()
		.then(function (res) {
			getEle("loading").style.display = "none";
			renderProducts(res.data);
		})
		.catch(function (error) {
			getEle("loading").style.display = "none";
			console.log(error);
		});
}

getListProduct();

function renderProducts(data) {
	let contentHTML = "";

	for (let i = 0; i < data.length; i++) {
		contentHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td>
                ${data[i].screen}
            </td>

            <td>
                ${data[i].backCamera}
            </td>
            <td>
                ${data[i].frontCamera}
            </td>
            <td>
                <img width="100px" src="${data[i].img}" alt=""
                />
            </td>
            <td>
                ${data[i].desc}
            </td>
            <td>
                ${data[i].type}
            </td>
                
            <td>
            
                <button onclick="getProduct('${
					data[i].id
				}')" class="btn btn-info w-100 mb-2">Cập nhật</button>
                <button onclick="deleteProduct('${
					data[i].id
				}')" class="btn btn-danger w-100 ">Xóa</button>
            </td>
            
        </tr>
    `;
	}

	getEle("tblDanhSachSP").innerHTML = contentHTML;
}

// create product
function createProduct() {
	// validate form
	var isValid = validateForm();
	if (!isValid) return;

	let prodName = getEle("TenSP").value;
	let prodPrice = getEle("GiaSP").value;
	let prodScreen = getEle("ScreenSP").value;
	let prodBackCamera = getEle("backCameraSP").value;
	let prodFrontCamera = getEle("frontCameraSP").value;
	let prodImage = getEle("HinhSP").value;
	let prodDesc = getEle("MoTa").value;
	let prodType = getEle("LoaiSP").value;

	let product = new Product(
		prodName,
		prodPrice,
		prodScreen,
		prodBackCamera,
		prodFrontCamera,
		prodImage,
		prodDesc,
		prodType
	);

	axios({
		url: "https://62c3ac49abea8c085a60d110.mockapi.io/api/products_capstone",
		method: "POST",
		data: product,
	})
		.then(function (res) {
			getListProduct();
			getEle("btnCloseModal").click();
		})
		.catch(function (err) {
			console.log(err);
		});
}

//delete product
function deleteProduct(id) {
	axios({
		url:
			"https://62c3ac49abea8c085a60d110.mockapi.io/api/products_capstone/" +
			id,
		method: "DELETE",
	})
		.then(function (res) {
			alert("Xoa thanh cong");
			getListProduct();
		})
		.catch(function (err) {
			console.log(err);
		});
}

// update:  1. Get product  2. Update product
// Get product
function getProduct(id) {
	// use id ==> find index
	axios({
		url:
			"https://62c3ac49abea8c085a60d110.mockapi.io/api/products_capstone/" +
			id,
		method: "GET",
	})
		.then(function (res) {
			// bat modal len
			getEle("btnThemSP").click();
			// Dom toi tat ca input, đổ dữ liệu cũ vào
			getEle("TenSP").value = res.data.name;
			getEle("GiaSP").value = res.data.price;
			getEle("ScreenSP").value = res.data.screen;
			getEle("backCameraSP").value = res.data.backCamera;
			getEle("frontCameraSP").value = res.data.frontCamera;
			getEle("HinhSP").value = res.data.img;
			getEle("MoTa").value = res.data.desc;

			getEle("productID").value = res.data.id;
			getEle("btnSaveInfo").style.display = "none";
			getEle("btnUpdate").style.display = "inline";
		})
		.catch(function (err) {
			console.log(err);
		});
}

// update product
function updateProduct() {
	// lấy tất cả các field xuống, có cả id
	var prodId = getEle("productID").value;

	let prodName = getEle("TenSP").value;
	let prodPrice = getEle("GiaSP").value;
	let prodScreen = getEle("ScreenSP").value;
	let prodBackCamera = getEle("backCameraSP").value;
	let prodFrontCamera = getEle("frontCameraSP").value;
	let prodImage = getEle("HinhSP").value;
	let prodDesc = getEle("MoTa").value;
	let prodType = getEle("LoaiSP").value;

	let product = new Product(
		prodName,
		prodPrice,
		prodScreen,
		prodBackCamera,
		prodFrontCamera,
		prodImage,
		prodDesc,
		prodType
	);

	axios({
		url:
			"https://62c3ac49abea8c085a60d110.mockapi.io/api/products_capstone/" +
			prodId,
		method: "PUT",
		data: product,
	})
		.then(function (res) {
			getEle("btnCloseModal").click();
			//alert("Cập nhật thành công");
			getListProduct();
		})
		.catch(function (err) {
			console.log(err);
		});
}
