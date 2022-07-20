const urlApi =
	"https://62c3ac49abea8c085a60d110.mockapi.io/api/products_capstone";

function Service() {
	this.getListProductApi = function () {
		return axios({
			url: urlApi,
			method: "GET",
		});
	};

	this.addProductApi = function () {
		return axios({
			url: urlApi,
			method: "POST",
			data: product,
		});
	};
}
