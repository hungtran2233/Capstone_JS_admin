function validateForm() {
	var isValid = true;
	var name = document.getElementById("TenSP").value;
	var price = document.getElementById("GiaSP").value;
	var screen = document.getElementById("ScreenSP").value;
	var img = document.getElementById("HinhSP").value;

	isValid &=
		checkRequired(name, "spanName") &&
		checkCharacter(name, "spanName") &&
		checkLength(name, "spanName", 2, 80);
	isValid &=
		checkRequired(price, "spanPrice") && checkPrice(price, "spanPrice");
	isValid &=
		checkRequired(screen, "spanScreen") &&
		checkCharacter(screen, "spanScreen");

	isValid &= checkRequired(img, "spanImg");
	isValid &= checkTypeProduct("LoaiSP", "spanType");

	return isValid;
}

// check required
function checkRequired(val, spanId) {
	if (val) {
		document.getElementById(spanId).innerHTML = "";
		return true;
	}
	document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập";
	return false;
}

// check length
function checkLength(val, spanId, min, max) {
	if (val.length >= min && val.length <= max) {
		document.getElementById(spanId).innerHTML = "";
		return true;
	}
	document.getElementById(
		spanId
	).innerHTML = `*Độ dài phải từ ${min} tới ${max} kí tự`;
	return false;
}

// check character
function checkCharacter(val, spanId) {
	var letter =
		"^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
		"ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
		"ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
	if (val.match(letter)) {
		//true
		document.getElementById(spanId).innerHTML = "";
		return true;
	}
	//false
	document.getElementById(spanId).innerHTML = "*Vui lòng nhập chuỗi kí tự";
	return false;
}

// check price
function checkPrice(val, spanId) {
	if (val >= 1) {
		//true
		document.getElementById(spanId).innerHTML = "";
		return true;
	}
	//false
	document.getElementById(spanId).innerHTML = "*Sô nhập vào phải lớn hơn 1";
	return false;
}

// check type product
function checkTypeProduct(selectId, spanId) {
	if (document.getElementById(selectId).selectedIndex !== 0) {
		document.getElementById(spanId).innerHTML = "";
		return true;
	}
	document.getElementById(spanId).innerHTML = "*Vui lòng chọn loại sản phẩm";
	return false;
}
