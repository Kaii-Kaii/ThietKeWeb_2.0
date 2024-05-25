let ds_daThemVaoGioHang = [];
let bookT, bookP, bookSL;
let test_cartItemCount = document.getElementById('cartItemCount');

function anSoLuong() {
    if (test_cartItemCount.innerText == 0) {
        test_cartItemCount.style.display = 'none';
    }
}

function openPopupSach() {
    const books = document.querySelectorAll('.book');
    let cartNotification;
    books.forEach(book => {
        book.addEventListener('click', (event) => {
            event.stopPropagation();
            const img = book.querySelector('img').src;
            console.log(img);
            document.getElementById('img_popup').src = img;
            document.getElementById('book-title').textContent = book.querySelector('.book-title').textContent;
            document.getElementById('book-price').textContent = book.querySelector('.book-price').textContent;
            document.getElementById('discount').textContent = book.querySelector('.discount').textContent;
            document.getElementById('rating').textContent = book.querySelector('.rating').textContent;
            loadFileWithPath('popup.html', '#popupThongTinSach');
            popupThongTinSach.style.display = 'block';

            const closeButton = document.querySelector('.closeButton');
            closeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                popupThongTinSach.style.display = 'none';
            });

            const addToCartBtn = document.querySelector('.addToCartBtn');
            // Loại bỏ sự kiện click cũ để tránh đăng ký nhiều lần
            const newAddToCartBtn = addToCartBtn.cloneNode(true);
            addToCartBtn.parentNode.replaceChild(newAddToCartBtn, addToCartBtn);

            newAddToCartBtn.addEventListener('click', () => {
                const SL = document.querySelector('input[type="number"]').value;
                const bookTitle = book.querySelector('.book-title').textContent;
                const bookPrice = book.querySelector('.book-price').textContent;
                let currentCount = parseInt(test_cartItemCount.innerText);
                let bookExists = false;
                ds_daThemVaoGioHang.forEach(sach => {
                    if (sach.tenSach == bookTitle) {
                        bookExists = true;
                    }
                });
                if (!bookExists) {
                    currentCount++;
                    test_cartItemCount.innerText = currentCount;
                }
                bookT = bookTitle;
                bookP = bookPrice;
                bookSL = SL;
                init(bookT, bookP, bookSL);
                showCartNotification(`Đã thêm ${bookTitle} vào giỏ hàng. Giá: ${bookPrice}`);
                if (test_cartItemCount.innerText > 0) {
                    test_cartItemCount.style.display = 'block';
                }
                gioHang();
            });

        });
    });

    window.addEventListener('click', (event) => {
        if (event.target !== popupThongTinSach && event.target !== closeButton && !popupThongTinSach.contains(event.target)) {
            popupThongTinSach.style.display = 'none';
        }
    });

    function showCartNotification(message) {
        if (!cartNotification) {
            cartNotification = document.createElement('div');
            cartNotification.classList.add('cart-notification');
            document.body.appendChild(cartNotification);
        }
        cartNotification.textContent = message;
        const windowHeight = window.innerHeight;
        const notificationHeight = cartNotification.clientHeight;
        const notificationTop = windowHeight - notificationHeight - 70;
        cartNotification.style.top = notificationTop + 'px';
        cartNotification.style.display = 'block';
        cartNotification.style.padding = '10px';
        cartNotification.style.margin = '0px';
        cartNotification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        cartNotification.style.color = 'white';
        cartNotification.style.textAlign = 'center';
        cartNotification.style.height = '40px';
        cartNotification.style.maxHeight = '40px';
        setTimeout(() => {
            cartNotification.style.display = 'none';
        }, 3000);
    }
}


function gioHang() {
    let cart = document.getElementById('cart');
    cart.style.textAlign = 'left';
    cart.style.width = 'auto';
    cart.style.maxWidth = '700px';
    cart.style.height = 'auto';
    cart.style.maxHeight = '500px';
    cart.style.overflow = 'hidden';
    cart.style.backgroundColor = 'gray';
    cart.style.backgroundColor = "white";
    cart.style.padding = '10px';
    cart.style.display = 'none';
    cart.style.fontSize = '20px';
    cart.style.zIndex = '999999';
    cart.innerHTML = '';

}
function init(bookT, bookP, bookSL) {
    let giaTriKhongDauPhay = bookP.replace('.', '');
    let giaTriSoNguyen = parseInt(giaTriKhongDauPhay);
    let daTonTai = false; // Biến cờ để kiểm tra xem sách đã tồn tại trong danh sách hay chưa
    ds_daThemVaoGioHang.forEach(sach => {
        if (sach.tenSach === bookT) {
            sach.soLuong = parseInt(sach.soLuong) + parseInt(bookSL);
            daTonTai = true; // Đánh dấu rằng sách đã tồn tại trong danh sách
            return;
        }
    });
    // Nếu sách chưa tồn tại trong danh sách, thêm sách mới vào
    if (!daTonTai) {
        ds_daThemVaoGioHang.push({ "tenSach": bookT, "gia": giaTriSoNguyen, "soLuong": bookSL });
    }
}

function showCart() {
    let totalPrice = 0;
    let cartItemCount = 0;
    const cartContent = document.createElement('div');
    const DivCart = document.getElementById('cart');

    // Xóa nội dung cũ của giỏ hàng trước khi thêm nội dung mới
    DivCart.innerHTML = '';

    // Tạo bảng
    const table = document.createElement('table');
    table.style.width = '550px';
    table.style.borderCollapse = 'collapse';
    table.style.textAlign = 'left';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const th4 = document.createElement('th');
    const th5 = document.createElement('th');

    th1.textContent = 'Tên sách';
    th2.textContent = 'Giá';
    th3.textContent = 'Số lượng';
    th4.textContent = 'Thành tiền';
    th5.textContent = 'Xóa';

    // padding left 5px
    th1.style.paddingLeft = '5px';
    th2.style.paddingLeft = '5px';
    th3.style.paddingLeft = '5px';
    th4.style.paddingLeft = '5px';
    th5.style.paddingLeft = '5px';

    // border
    th1.style.border = '1px solid black';
    th2.style.border = '1px solid black';
    th3.style.border = '1px solid black';
    th4.style.border = '1px solid black';
    th5.style.border = '1px solid black';

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    thead.appendChild(tr);
    table.appendChild(thead);

    if (ds_daThemVaoGioHang.length > 0) {
        ds_daThemVaoGioHang.forEach((sach, index) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const td4 = document.createElement('td');
            const td5 = document.createElement('td');

            td1.textContent = sach.tenSach;
            td2.textContent = sach.gia + 'đ';
            td3.textContent = sach.soLuong;
            td4.textContent = sach.gia * sach.soLuong + 'đ';

            // Tạo nút xóa
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Xóa';
            deleteButton.style.backgroundColor = 'red';
            deleteButton.style.color = 'white';
            deleteButton.style.border = 'none';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.borderRadius = '5px';
            deleteButton.style.padding = '5px';
            deleteButton.style.marginTop = '5px';
            deleteButton.style.marginBottom = '5px';
            deleteButton.addEventListener('click', () => {
                ds_daThemVaoGioHang.splice(index, 1);
                cartContent.innerHTML = '';
                showCart();
                gioHang();
                var cartItemCount = document.getElementById('cartItemCount');
                cartItemCount.innerText = ds_daThemVaoGioHang.length;
                anSoLuong();
            });
            td5.appendChild(deleteButton);

            // border
            td1.style.border = '1px solid black';
            td2.style.border = '1px solid black';
            td3.style.border = '1px solid black';
            td4.style.border = '1px solid black';
            td5.style.border = '1px solid black';
            // padding 5px
            td1.style.padding = '5px';
            td2.style.padding = '5px';
            td3.style.padding = '5px';
            td4.style.padding = '5px';
            td5.style.padding = '5px';
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);

            totalPrice += sach.gia * sach.soLuong;
            cartItemCount++;
        });

        const trBlank = document.createElement('tr');
        const tdBlank = document.createElement('td');
        tdBlank.setAttribute('colspan', '4'); // Kết hợp tất cả các cột
        tdBlank.style.height = '20px'; // Đặt chiều cao của dòng trống
        trBlank.appendChild(tdBlank);
        tbody.appendChild(trBlank);

        // Tạo hàng tổng
        const trTotal = document.createElement('tr');
        const tdTotal = document.createElement('td');
        const tdTotalValue = document.createElement('td');
        tdTotal.setAttribute('colspan', '3'); // Kết hợp các cột trước tổng giá trị
        tdTotal.textContent = 'Tổng';
        tdTotalValue.textContent = totalPrice + ' đ';
        trTotal.appendChild(tdTotal);
        trTotal.appendChild(tdTotalValue);
        tbody.appendChild(trTotal);

        table.appendChild(tbody);
        cartContent.appendChild(table);
        DivCart.appendChild(cartContent);

        // Nút xóa toàn bộ sách
        const deleteAll = document.createElement('button');
        deleteAll.textContent = 'Xóa tất cả';
        // Nút ở bên phải
        deleteAll.style.float = 'right';
        deleteAll.style.marginTop = '10px';
        deleteAll.style.padding = '5px';
        deleteAll.style.backgroundColor = 'red';
        deleteAll.style.color = 'white';
        deleteAll.style.border = 'none';
        deleteAll.style.cursor = 'pointer';
        deleteAll.style.borderRadius = '5px';
        deleteAll.style.fontSize = '20px';
        deleteAll.addEventListener('click', () => {
            ds_daThemVaoGioHang = [];
            cartContent.innerHTML = '';
            DivCart.innerHTML = '';
            var cartItemCount = document.getElementById('cartItemCount');
            cartItemCount.innerText = 0;
            cartItemCount.style.display = 'none';
            anSoLuong();
        });
        DivCart.appendChild(deleteAll);
    } else {
        DivCart.innerHTML = 'Giỏ hàng trống';
    };
}

// Hiển thị giỏ hàng
const cartIcon = document.getElementById('cartIcon');
// Ẩn giỏ hàng ban đầu
cart.style.display = 'none';
// Hiển thị giỏ hàng khi click vào icon giỏ hàng
cartIcon.addEventListener('click', () => {
    cart.style.display = 'block';
    event.stopPropagation();
    showCart();

});
// Ẩn giỏ hàng khi click ra ngoài
document.addEventListener('click', (event) => {
    const targetElement = event.target;
    if (targetElement !== cartIcon && !cart.contains(targetElement)) {
        cart.style.display = 'none';
        cart.innerHTML = '';
    }
});


