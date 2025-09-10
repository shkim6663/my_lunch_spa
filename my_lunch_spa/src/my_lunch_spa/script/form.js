const form = document.getElementById("menuForm");
const menuIndexInput = document.getElementById("menuIndex");

// 수정 모드 처리
const params = new URLSearchParams(window.location.search);
const editIndex = params.get("edit");

if (editIndex !== null) {
    const menus = getMenus();
    const menu = menus[editIndex];
    document.getElementById("name").value = menu.name;
    document.getElementById("spicy").value = menu.spicy;
    document.getElementById("price").value = menu.price;
    menuIndexInput.value = editIndex;
}

// 폼 제출
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const menu = {
        name: document.getElementById("name").value,
        spicy: Number(document.getElementById("spicy").value),
        price: Number(document.getElementById("price").value),
    };

    const index = menuIndexInput.value;
    if (index) {
        updateMenu(index, menu);
    } else {
        addMenu(menu);
    }
    window.location.href = "list.html";
});
