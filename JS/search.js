document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('searchIcon');
    const searchWindow = document.getElementById('searchWindow');
    const closeButton = document.getElementById('closeButton');
    const searchInput = document.getElementById('searchInput');
    const searchResult = document.getElementById('searchResult');
    const characters = [
        "Dế Mèn Phiêu Lưu Ký - Tô Hoài",
        "Số Đỏ - Vũ Trọng Phụng",
        "Chí Phèo - Nam Cao",
        "Tắt Đèn - Ngô Tất Tố",
        "Truyện Kiều - Nguyễn Du",
        "Lão Hạc - Bùi Ngọc Tấn",
        "Lão Tử - Lão Tử",
        "Tiểu Thuyết Kim Dung - Kim Dung",
        "Chúa Nhẫn - J.R.R. Tolkien",
        "Sự Kích của các Vị Anh Hùng - Alexandre Dumas",
        "Cô Bé Quàng Khăn Đỏ - Antoine de Saint-Exupéry",
        "Chiếc Nón Kỳ Diệu - Roald Dahl",
        "Cuốn Theo Chiều Gió - Margaret Mitchell",
        "Người Đàn Bà Vĩ Đại - Pearl S. Buck",
        "Hai Số Phận - Charles Dickens",
        "Kỳ Nghỉ Lớn - Agatha Christie",
        "Vũ Điệu Hạnh Phúc - Ken Follett",
        "Trò Chơi Vương Quyền - George R.R. Martin",
        "Thời Kỳ Rực Rỡ - F. Scott Fitzgerald",
        "Bóng Ma - Stephen King",
        "Sống Ở Đời - Ernest Hemingway",
        "Mùa Gặt - John Steinbeck",
        "Đời Người - Leo Tolstoy",
        "Quốc Gia Tự Do - Ayn Rand",
        "Hành Trình Về Phương Đông - Hermann Hesse",
        "Trăm Năm Cô Đơn - Gabriel García Márquez",
        "Tôi Là Tôi - Shusaku Endo",
        "Bội Tình - Emily Brontë",
        "Con Đường Hạnh Phúc - Paulo Coelho",
        "Cây Gậy Ông Đạo - Anthony Burgess",
        "Tình Yêu Trong Sáng - Jane Austen",
        "Nhà Giả Kim - Paulo Coelho",
        "Cái Gương Thần - Oscar Wilde",
        "Những Bài Học Đắt Giá - Jim Rohn",
        "Tự Kiểm Soát Tinh Thần - Jiddu Krishnamurti",
        "Tư Duy Thành Công - Napoleon Hill",
        "Những Nguyên Tắc Cơ Bản Của Sự Thành Công - Jack Canfield",
        "Sức Mạnh Của Sự Tự Tin - Brian Tracy",
        "Muôn Kiếp Nhân Sinh - Nguyên Phong",
        "Lời Khuyên Từ Một Kẻ Thất Bại - J.K. Rowling",
        "Mỹ Thuật Bán Hàng Cao Cấp - Zig Ziglar",
        "Thói Quen Thứ 8 - Stephen R. Covey",
        "Cửa Hiệu Triệu Phú - Chet Holmes",
        "Tư Duy Tối Ưu - Thanh Bình",
        "Những Bài Học Kinh Doanh - Bill Gates",
        "Kỹ Năng Tư Duy Tích Cực - Dr. Norman Vincent Peale",
        "Tìm Kiếm Ý Nghĩa Cuộc Sống - Viktor Frankl",
        "Phương Pháp Silva Kiếm Tiền - José Silva",
        "Triết Lý Kinh Doanh - Jim Rohn",
        "Tâm Lý Học Đám Đông - Gustave Le Bon",
        "Sử Ta - Trần Trọng Kim"
    ];
    function getDefaultResults() {
        return characters.slice(0, 5);
    }
    function displayResults(results) {
        searchResult.innerHTML = ''; // Xóa kết quả cũ

        if (results.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'Không có mục cần tìm';
            searchResult.appendChild(li);
        } else {
            results.forEach(result => {
                const li = document.createElement('li');
                li.textContent = result;
                searchResult.appendChild(li);
            });
        }
    }
    searchIcon.addEventListener('click', () => {
        searchWindow.style.display = 'block';
        const defaultResults = getDefaultResults();
        displayResults(defaultResults);
    });

    closeButton.addEventListener('click', () => {
        searchWindow.style.display = 'none';
    });

    function filterCharacters(query) {
        const queryWords = query.toLowerCase().split(/\s+/);
        return characters.filter(character => {
            const words = character.toLowerCase().split(/\s+/);
            return queryWords.every(queryWord => words.some(word => word.includes(queryWord)));
        }).slice(0, 5);
    }
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query === '') {
            const defaultResults = getDefaultResults();
            displayResults(defaultResults);
        } else {
            const filteredCharacters = filterCharacters(query);
            // Giới hạn số lượng kết quả hiển thị
            const limitedResults = filteredCharacters.slice(0, 5);
            displayResults(limitedResults);
        }
    });
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        // Kiểm tra xem ô tìm kiếm có trống hay không
        if (query === '') {
            const defaultResults = getDefaultResults();
            displayResults(defaultResults);
        } else {
            const filteredCharacters = filterCharacters(query);
            displayResults(filteredCharacters);
        }
    });
    //neu bam ra ngoai se dong cua so
    window.addEventListener('click', (event) => {
        if (event.target !== searchWindow && event.target !== searchIcon && event.target !== searchInput) {
            searchWindow.style.display = 'none';
        }
    });
});
