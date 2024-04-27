let ds_daThemVaoGioHang = [];
let bookT, bookP;
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
                    <div class="book-details" style="flex-grow: 1;">
                        <h2 class="book-title">${book.querySelector('.book-title').textContent}</h2>
                        <p class="book-price">${book.querySelector('.book-price').textContent}</p>
                        <p class="discount">${book.querySelector('.discount').textContent}</p>
                        <div class="rating">${book.querySelector('.rating').innerHTML}</div>
                        <p class="note">${book.querySelector('.note').textContent}</p>
                        <div class="authenticity" style="margin-bottom: 50px;">${book.querySelector('.authenticity').innerHTML}</div>
                        <button class="addToCartBtn" style="margin-left: 200px">Thêm vào giỏ hàng</button>
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
                const bookTitle = book.querySelector('.book-title').textContent;
                const bookPrice = book.querySelector('.book-price').textContent;
                const test_cartItemCount = document.getElementById('cartItemCount');
                let currentCount = parseInt(test_cartItemCount.innerText);
                test_cartItemCount.innerText = currentCount + 1;
                bookT = bookTitle;
                bookP = bookPrice;
                init(bookT, bookP);
                showCartNotification(`Đã thêm ${bookTitle} vào giỏ hàng. Giá: ${bookPrice}`);
                gioHang();
            });
        });
    });
    window.addEventListener('click', (event) => {
        if (event.target !== popupThongTinSach && event.target !== closeButton) {
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
    let totalPrice = 0;
    let cartItemCount = 0;
    // hien thi thong tin sach
    const cartContent = document.createElement('div');
    const DivCart = document.getElementById('cart');
    let cart = document.getElementById('cart');
    cart.style.width = 'auto';
    cart.style.maxWidth = '500px';
    cart.style.height = 'auto';
    cart.style.maxHeight = '500px';
    cart.style.overflow = 'hidden';
    cart.style.backgroundColor = 'gray';
    cart.style.color = 'white';
    cart.style.padding = '10px';
    cart.style.display = 'none';
    cart.style.fontSize = '20px';
    cart.style.zIndex = '999999';
    cart.innerHTML = '';

}
function init(bookT, bookP) {
    let giaTriKhongDauPhay = bookP.replace('.', '');
    let giaTriSoNguyen = parseInt(giaTriKhongDauPhay);
    ds_daThemVaoGioHang.push({ "tenSach": bookT, "gia": giaTriSoNguyen });
}



function showCart() {
    let totalPrice = 0;
    let cartItemCount = 0;
    const cartContent = document.createElement('div');
    const DivCart = document.getElementById('cart');
    const list = document.createElement('ul');
    // tao bang 
    const table = document.createElement('table');
    table.style.width = '500px';
    table.style.borderCollapse = 'collapse';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    th1.textContent = 'Tên sách';
    th2.textContent = 'Giá';
    tr.appendChild(th1);
    tr.appendChild(th2);
    thead.appendChild(tr);
    table.appendChild(thead);
    ds_daThemVaoGioHang.forEach(sach => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        td1.textContent = sach.tenSach;
        td2.textContent = sach.gia + ' đ';
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.appendChild(tr);
        totalPrice += parseInt(sach.gia);
        cartItemCount++;
    });
    const trTotal = document.createElement('tr');
    const tdTotal = document.createElement('td');
    const tdTotalValue = document.createElement('td');
    tdTotal.textContent = 'Tổng';
    tdTotalValue.textContent = totalPrice + ' đ';
    trTotal.appendChild(tdTotal);
    trTotal.appendChild(tdTotalValue);
    tbody.appendChild(trTotal);
    table.appendChild(tbody);
    cartContent.appendChild(table);
    DivCart.appendChild(cartContent);
    // nut xoa taon bo sach
    const deleteAll = document.createElement('button');
    deleteAll.textContent = 'Xóa tất cả';
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
        cart.innerHTML = '';
        var test_cartItemCount = document.getElementById('cartItemCount');
        test_cartItemCount.innerText = 0;
    });
    DivCart.appendChild(deleteAll);
}
const cartIcon = document.getElementById('cartIcon');
    // Ẩn giỏ hàng ban đầu
    cart.style.display = 'none';
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


