let ds_daThemVaoGioHang = [];
let bookT, bookP, bookSL;
let test_cartItemCount = document.getElementById('cartItemCount');

function anSoLuong() {
    if(test_cartItemCount.innerText == 0) {
        test_cartItemCount.style.display = 'none';
    }
}

function openPopupSach() {
    const books = document.querySelectorAll('.book');
    const popupThongTinSach = document.getElementById('popupThongTinSach');
    let cartNotification; // Biến để lưu trữ thông báo
    books.forEach(book => {
        book.addEventListener('click', (event) => {
            event.stopPropagation(); // Ngăn sự kiện click lan ra các phần tử cha
            const popupContent = `
            <div class="popup">
                <span class="closeButton" style="position: absolute; top: 10px; right: 10px; cursor: pointer; background-color: rgba(255, 255, 255, 0.5); border-radius: 50%; padding: 5px; width: 40px; height: 40px; text-align: center;">x</span>
                <div class="popup-content" style="display: flex;">
                    <div class="image-wrapper" style="position: relative; margin-right: 20px;">
                        <img src="${book.querySelector('img').src}" alt="Book Cover" style="width: 280px; height: 280px; object-fit: cover; margin: 10px">
                    </div>
                    <style>
                        .addToCartBtn:hover {
                            background-color: #4CAF50;
                            color: white;
                        }
                    </style>
                    <div class="book-details" style="flex-grow: 1;">
                        <h2 class="book-title">${book.querySelector('.book-title').textContent}</h2>
                        <p class="book-price">${book.querySelector('.book-price').textContent}</p>
                        <p class="discount">${book.querySelector('.discount').textContent}</p>
                        <div class="rating">${book.querySelector('.rating').innerHTML}</div>
                        <p class="note">${book.querySelector('.note').textContent}</p>
                        <div class="authenticity" style="margin-bottom: 20px;">${book.querySelector('.authenticity').innerHTML}</div>
                        <label for="quantity">Số lượng</label>
                        <input type="number" value="1" min="1" style="width: 50px; height: 30px; margin-right: 10px; border-radius: 5px; padding: 10px; display: inline-block;">
                        <button class="addToCartBtn" style="background-color: rgb(51, 206, 255); margin-left: 50px; padding: 2px; border-radius: 5px; display: inline-block;">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
            `;
            popupThongTinSach.innerHTML = popupContent;
            popupThongTinSach.style.display = 'block';
            const closeButton = document.querySelector('.closeButton');
            closeButton.addEventListener('click', (event) => {
                event.stopPropagation();
                popupThongTinSach.innerHTML = '';
                popupThongTinSach.style.display = 'none';
            });
            const addToCartBtn = document.querySelector('.addToCartBtn');
            addToCartBtn.addEventListener('click', () => {
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
                if(test_cartItemCount.innerText > 0) {
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
    // Hàm để hiển thị thông báo và đặt vị trí
    function showCartNotification(message) {
        if (!cartNotification) {
            // Nếu thông báo chưa được tạo, tạo mới nó
            cartNotification = document.createElement('div');
            cartNotification.classList.add('cart-notification');
            document.body.appendChild(cartNotification);
        }
        cartNotification.textContent = message;
        const windowHeight = window.innerHeight;
        const notificationHeight = cartNotification.clientHeight;
        const notificationTop = windowHeight - notificationHeight - 70; // Vị trí từ dưới lên trên
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
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tbody.appendChild(tr);

            totalPrice += sach.gia * sach.soLuong;
            cartItemCount++;
        });

        // Thêm dòng trống
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


