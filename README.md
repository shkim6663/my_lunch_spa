# my_lunch_spa
**목표**  
- JavaScript로 JSON 기반 데이터 처리 및 화면 렌더링 이해를 할 수 있어요.
- 기본적인 DOM 조작 및 이벤트 처리를 구현할 수 있어요.
- 화면 전환을 통한 CSR 느낌 익히기 (window.location.href 활용)

  1. 메뉴 등록 기능
 
  🔹핵심 포인트

1)localStorage에 메뉴 저장
-addMenu() → 배열에 push 후 저장
-updateMenu() → 기존 메뉴 덮어쓰기

2)폼 제출 시 새로고침 막기
-e.preventDefault() 사용

3)등록 후 화면 전환
-SPA에서는 window.location.href 대신 showList() 호출
-목록 화면을 보여주며 바로 갱신

         // ---------- 메뉴 등록 폼 ----------
         const menuForm = document.getElementById("menuForm");
         const menuIndexInput = document.getElementById("menuIndex");

         menuForm.addEventListener("submit", (e) => {
          e.preventDefault(); // 페이지 새로고침 방지

         const menu = {
         name: document.getElementById("name").value,
         spicy: Number(document.getElementById("spicy").value),
         price: Number(document.getElementById("price").value)
          };

         const index = menuIndexInput.value;

         if(index) {
          // 수정 모드일 경우
         updateMenu(index, menu);
         } else {
          // 새 메뉴 등록
          addMenu(menu);
          }

         // 등록 후 목록 화면으로 전환
         showList();
         });

 
  2. 메뉴 목록 조회 기능

🔹 핵심 포인트
1)localStorage에서 메뉴 불러오기
-getMenus() 호출 → 메뉴 배열 가져오기

2)목록 초기화 후 렌더링
-menuListEl.innerHTML = "" → 이전 목록 지우기
-배열 순회하면서 li 요소 동적 생성

3)수정/삭제 버튼 연결
-수정 → showForm(index) 호출 → 폼 화면 열기
-삭제 → deleteMenu(index) 호출 후 renderList() 재호출

4)등록된 메뉴가 없으면 안내 문구
-<li>등록된 메뉴가 없습니다.</li>

    const menuListEl = document.getElementById("menuList");

    // 메뉴 목록 렌더링 함수
    function renderList() {
    const menus = getMenus(); // localStorage에서 메뉴 불러오기
    menuListEl.innerHTML = ""; // 기존 목록 초기화

    if (menus.length === 0) {
        menuListEl.innerHTML = "<li>등록된 메뉴가 없습니다.</li>";
        return;
    }

    menus.forEach((menu, index) => {
        const li = document.createElement("li");
        li.className = "menu-item";

        // 메뉴 이름, 맵기, 가격 표시 + 수정/삭제 버튼
        li.innerHTML = `
            ${menu.name} (맵기: ${menu.spicy}, 가격: ${menu.price}원)
            <span>
                <button onclick="showForm(${index})" class="btn btn-primary btn-sm">수정</button>
                <button onclick="deleteMenu(${index}); renderList();" class="btn btn-secondary btn-sm">삭제</button>
            </span>
        `;

        menuListEl.appendChild(li);
    });
    }


  3. 메뉴 수정 기능

    // 화면 전환 함수: 수정 모드로 폼 열기
    function showForm(editIndex = null) {
    formContainer.style.display = "block";
    listContainer.style.display = "none";

    if (editIndex !== null) {
        const menus = getMenus();
        const menu = menus[editIndex];
        // 기존 메뉴 데이터 폼에 채우기
        document.getElementById("name").value = menu.name;
        document.getElementById("spicy").value = menu.spicy;
        document.getElementById("price").value = menu.price;
        menuIndexInput.value = editIndex; // 수정 인덱스 저장
    } else {
        menuForm.reset();
        menuIndexInput.value = "";
    }
    }
 
  4. 메뉴 삭제 기능

    // localStorage에서 메뉴 삭제
    function deleteMenu(index) {
    const menus = getMenus(); // 기존 메뉴 배열 가져오기
    menus.splice(index, 1);    // index 위치의 메뉴 삭제
    localStorage.setItem("menus", JSON.stringify(menus)); // 저장
    }
 
  5. 데이터 저장 기능


    // localStorage에서 메뉴 불러오기
    function getMenus() {
    const data = localStorage.getItem("menus");
    return data ? JSON.parse(data) : [];
    }

         // 메뉴 추가 후 저장
    function addMenu(menu) {
    const menus = getMenus();
    menus.push(menu);
    localStorage.setItem("menus", JSON.stringify(menus));
    }

    // 메뉴 수정 후 저장
    function updateMenu(index, menu) {
    const menus = getMenus();
    menus[index] = menu;
    localStorage.setItem("menus", JSON.stringify(menus));
    }

    // 메뉴 삭제 후 저장
    function deleteMenu(index) {
    const menus = getMenus();
    menus.splice(index, 1);
    localStorage.setItem("menus", JSON.stringify(menus));
    }
 
  6. 화면 전환 기능

🔹 핵심 포인트
1)showForm() → 등록/수정 화면 표시, 목록 숨김

2)showList() → 목록 화면 표시, 폼 숨김, 목록 갱신

3)버튼 클릭 시 한 번에 한 화면만 보여 SPA 흉내


    // 화면 전환
    function showForm(editIndex = null) {
    formContainer.style.display = "block";  // 폼 보여주기
    listContainer.style.display = "none";   // 목록 숨기기
    }

    function showList() {
    formContainer.style.display = "none";   // 폼 숨기기
    listContainer.style.display = "block";  // 목록 보여주기
    renderList();                            // 목록 갱신
     }

    // 버튼 이벤트 연결
    showFormBtn.addEventListener("click", () => showForm());
    showListBtn.addEventListener("click", showList);
    cancelBtn.addEventListener("click", showList());


