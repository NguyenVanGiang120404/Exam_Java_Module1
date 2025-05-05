let sachList = [
    { id: "10001", title: "Lập trình C cơ bản", year: 2015, quantity: 3, status: true },
    { id: "20002", title: "JavaScript nâng cao", year: 2018, quantity: 5, status: true },
    { id: "30003", title: "Cấu trúc dữ liệu", year: 2016, quantity: 0, status: false },
    { id: "40004", title: "Hệ điều hành", year: 2017, quantity: 2, status: true },
    { id: "50005", title: "Lập trình Web", year: 2019, quantity: 1, status: true }
];

function hienThiDanhSach() {
    const tbody = document.getElementById("bookList");
    tbody.innerHTML = "";
    sachList.forEach((book) => {
        let row = `
  <tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.year}</td>
    <td>${book.quantity}</td>
    <td>${book.status ? "Còn sách" : "Hết sách"}</td>
    <td>
      <button onclick="muonSach('${book.id}')">Mượn</button>
      <button onclick="xoaSach('${book.id}')">Xóa</button>
    </td>
  </tr>
`;
        tbody.innerHTML += row;
    });
    hienThiSachMax();
}

function muonSach(id) {
    let book = sachList.find(b => b.id === id);
    if (book && book.quantity > 0) {
        book.quantity--;
        if (book.quantity === 0) {
            book.status = false;
        }
        alert("Mượn sách thành công!");
        hienThiDanhSach();
    }
}

function xoaSach(id) {
    let index = sachList.findIndex(b => b.id === id);
    if (index !== -1 && confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
        sachList.splice(index, 1); 
        alert("Sách đã bị xóa!");
        hienThiDanhSach(); 
    }
}

function hienThiSachMax() {
    if (sachList.length === 0) {
        document.getElementById("sachMax").innerText = "Chưa có sách nào.";
        return;
    }

    let max = Math.max(...sachList.map(s => s.quantity));
    let sachMaxList = sachList.filter(s => s.quantity === max);

    let html = sachMaxList.map(book =>
        `Mã: <strong>${book.id}</strong>, Tên: <strong>${book.title}</strong>, Số quyển: <strong>${book.quantity}</strong>`
    ).join("<br>");

    document.getElementById("sachMax").innerHTML = html;
}

document.getElementById("formThemSach").addEventListener("submit", function (e) {
    e.preventDefault();

    let id = document.getElementById("id").value.trim();
    let title = document.getElementById("title").value.trim();
    let year = parseInt(document.getElementById("year").value);
    let quantity = parseInt(document.getElementById("quantity").value);

    if (!/^[1-5][0-9]{4}$/.test(id)) {
        alert("Mã sách không hợp lệ!");
        return;
    }

    if (isNaN(year) || year < 1000 || year > 9999) {
        alert("Năm xuất bản không hợp lệ!");
        return;
    }

    if (isNaN(quantity) || quantity < 0) {
        alert("Số quyển không hợp lệ!");
        return;
    }

    let status = quantity > 0;
    let book = { id, title, year, quantity, status };
    sachList.push(book);
    alert("Thêm sách thành công!");
    hienThiDanhSach();
    e.target.reset();
});

hienThiDanhSach(); 