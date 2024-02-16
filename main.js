// 유저는 할일 추가 + 버튼
// 할일에 삭제와 체크버튼
// 삭제버튼 - 할일이 리스트에서 삭제
// 체크버튼 할일이 끝난것으로 되어 밑줄이 그어짐
// 탭 버튼을 누르면 작은 바가 이동
// 끝난 일은 되돌리기 버튼을 클릭하면 다시 되돌릴수 있다
// 탭을 이용하여 아이템들을 상태별로 나눌수 있음
// 전체탭 누를시 전체 아이템으로 돌아옴
// 반응형 웹

// event 객체는  키보드, 마우스, 폼 이벤트, 문서 로딩 이벤트, 애니메이션, 드래그앤드롭
// 전역변수
let addList = document.getElementById('add-todo');
let mainInput = document.getElementById('todo-input');
let toDoArray = [];
let tabs = document.querySelectorAll('.task-tabs .menu');
let mode = 'all';
let ongoingList = [];
let underLine = document.querySelector('.task-tabs .under-line');

addList.addEventListener('click', addToDo);
mainInput.addEventListener('focus', function () {
  mainInput.value = '';
});
mainInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addToDo();
  }
});
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function (event) {
    filter(event);
  });
}

tabs.forEach((menu) =>
  menu.addEventListener('click', (e) => horizontalIndicator(e))
);
function horizontalIndicator(e) {
  underLine.style.left = e.currentTarget.offsetLeft + 'px';
  underLine.style.width = e.currentTarget.offsetWidth + 'px';
  underLine.style.top =
    e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 'px';
}

console.log(tabs);

tabs.forEach((menu) => {
  menu.addEventListener('click', function () {
    tabs.forEach((tab) => tab.classList.remove('active'));
    this.classList.add('active');
  });
});

function changeActive(clickedMenu) {
  document.querySelectorAll('.menu').forEach((menu) => {
    menu.classList.remove('active');
  });

  clickedMenu.classList.add('active');
}

function addToDo() {
  let task = {
    id: randomIDGenerate(),
    taskInput: mainInput.value,
    isComplete: false,
  };
  toDoArray.push(task);
  mainInput.value = '';
  console.log(task);
  if (task.taskInput == '') {
    alert(`Please add your task!`);
    toDoArray.pop(task);
    // addList.disabled = true;
  }
  mode = 'all';
  render();
}

function render() {
  let list = [];
  if (mode === 'all') {
    list = toDoArray;
  } else if (mode === 'ongoing' || mode === 'done') {
    list = ongoingList;
  }

  let resultHTML = '';
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `<div id="task-list" class="transition">
  <div class="task-done">${list[i].taskInput}</div>
  <div class="button-container">
  <i class="fa-solid fa-rotate-left" id = "return" onclick="toggleComplete('${list[i].id}')"></i>
  <i class="fa-solid fa-x" id = "trash" onclick = "deleteToggle('${list[i].id}')"></i>
  </div>
  </div>`;
    } else {
      resultHTML += `<div id="task-list">
    <div class= "task-done2">${list[i].taskInput}</div>
    <div class="button-container">
    <i class="fa-solid fa-check" id = "check" onclick="toggleComplete('${list[i].id}')"></i>
    <i class="fa-solid fa-x" id = "trash" onclick = "deleteToggle('${list[i].id}')"></i>
    </div>
    </div>`;
    }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < toDoArray.length; i++) {
    if (toDoArray[i].id == id) {
      toDoArray[i].isComplete = !toDoArray[i].isComplete;
      // true와 false 전환이 가능
      // !의미는 아니다
      break;
    }
  }
  console.log(toDoArray);
  render();
}

function filter(event) {
  mode = event.target.id;
  ongoingList = [];
  if (mode === 'all') {
    render();
  } else if (mode === 'ongoing') {
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].isComplete === false) {
        ongoingList.push(toDoArray[i]);
      }
    }
    render();
    console.log(ongoingList);
  } else if (mode === 'done') {
    for (let i = 0; i < toDoArray.length; i++) {
      if (toDoArray[i].isComplete === true) {
        ongoingList.push(toDoArray[i]);
      }
    }
    render();
  }
}
function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function deleteToggle(id) {
  for (let i = 0; i < toDoArray.length; i++) {
    if (toDoArray[i].id == id) {
      toDoArray.splice(i, 1);
      break;
    }
  }
  if (mode === 'all') {
    render();
  } else if (mode === 'ongoing') {
    ongoingList = toDoArray.filter((item) => item.isComplete === false);
    render();
  } else if (mode === 'done') {
    ongoingList = toDoArray.filter((item) => item.isComplete === true);
    render();
  }

  // 배열에서 정보를 제거
  //  toDoArray = toDoArray.filter((item) => item.id !== id);
  // render();
}

// innerHTML = element의 HTML, XML을 읽어오거나, 설정할수 있습니다.
// textContent = 해상 노드가 가지고 있는 텍스트 값을 그대로 가져옴
