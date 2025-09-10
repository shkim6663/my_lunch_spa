const menuListEl = document.getElementById("menuList");
const randomBtn = document.getElementById("randomBtn");
const randomResult = document.getElementById("randomResult");

// 메뉴 렌더링
function renderList() {
    const menus = getMenus();
    menuListEl.innerHTML = "";

    if (menus.length === 0) {
        menuListEl.innerHTML = "<li>등록된 메뉴가 없습니다.</li>";
        return;
    }

    menus.forEach((menu, index) => {
        const li = document.createElement("li");
        li.className = "menu-item";
        li.innerHTML = `
            ${menu.name} (맵기: ${menu.spicy}, 가격: ${menu.price}원)
            <span>
                <button onclick="editMenu(${index})" class="btn btn-primary btn-sm">수정</button>
                <button onclick="deleteMenu(${index}); renderList();" class="btn btn-secondary btn-sm">삭제</button>
            </span>
        `;
        menuListEl.appendChild(li);
    });
}

// 수정 이동
function editMenu(index) {
    window.location.href = `form.html?edit=${index}`;
}

// 랜덤 추천
randomBtn.addEventListener("click", () => {
    const menus = getMenus();
    if (menus.length === 0) {
        randomResult.textContent = "추천할 메뉴가 없습니다 😢";
        return;
    }
    const randomIndex = Math.floor(Math.random() * menus.length);
    const menu = menus[randomIndex];
    randomResult.textContent = `오늘의 추천 메뉴 👉 ${menu.name} (${menu.price}원)`;
});

// 초기 렌더링
renderList();
