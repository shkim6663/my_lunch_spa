// 메뉴 저장 / 불러오기
function getMenus() {
    const data = localStorage.getItem("menus");
    return data ? JSON.parse(data) : [];
}

function addMenu(menu) {
    const menus = getMenus();
    menus.push(menu);
    localStorage.setItem("menus", JSON.stringify(menus));
}

function updateMenu(index, menu) {
    const menus = getMenus();
    menus[index] = menu;
    localStorage.setItem("menus", JSON.stringify(menus));
}

function deleteMenu(index) {
    const menus = getMenus();
    menus.splice(index, 1);
    localStorage.setItem("menus", JSON.stringify(menus));
}
