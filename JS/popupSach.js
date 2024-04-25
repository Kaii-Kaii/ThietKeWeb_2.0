function openPopupSach(id) {
    const books = document.querySelectorAll(id);
    const popupThongTinSach = document.getElementById('popupThongTinSach');
    let cartNotification; // Biến để lưu trữ thông báo
    books.forEach(book => {
        book.addEventListener('click', (event) => {
            event.stopPropagation(); // Ngăn sự kiện click lan ra các phần tử cha
            const popupContent = `
            <div class="popup">
                <span class="closeButton" style="position: absolute; top: 10px; right: 10px; cursor: pointer; background-color: rgba(255, 255, 255, 0.5); border-radius: 50%; padding: 5px;">x</span>
                <div class="popup-content" style="display: flex;">
                    <div class="image-wrapper" style="position: relative; margin-right: 20px;">
                        <img src="${book.querySelector('img').src}" alt="Book Cover" style="width: 280px; height: 280px; object-fit: cover;">
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

            // Bắt sự kiện khi nhấp vào nút "Thêm vào giỏ hàng"
            const addToCartBtn = document.querySelector('.addToCartBtn');
            addToCartBtn.addEventListener('click', () => {
                const bookTitle = book.querySelector('.book-title').textContent;
                const bookPrice = book.querySelector('.book-price').textContent;
                showCartNotification(`Đã thêm ${bookTitle} vào giỏ hàng. Giá: ${bookPrice}`);
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
        // Đặt nội dung cho thông báo
        cartNotification.textContent = message;
        // Đặt vị trí của thông báo
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
        cartNotification.style.height = '30px';
        cartNotification.style.maxHeight = '30px';
        setTimeout(() => {
            cartNotification.style.display = 'none';
        }, 3000);
    }
}
