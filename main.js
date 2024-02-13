// 유저는 할일 추가 + 버튼
// 할일에 삭제와 체크버튼
// 삭제버튼 - 할일이 리스트에서 삭제
// 체크버튼 할일이 끝난것으로 되어 밑줄이 그어짐
// 탭 버튼을 누르면 작은 바가 이동
// 끝난 일은 되돌리기 버튼을 클릭하면 다시 되돌릴수 있다
// 탭을 이용하여 아이템들을 상태별로 나눌수 있음
// 전체탭 누를시 전체 아이템으로 돌아옴
// 반응형 웹

let addList = document.getElementById('add-todo');
let mainInput = document.getElementById('todo-input');
let toDoArray = [];

addList.addEventListener('click', addToDo);
mainInput.addEventListener('focus', function () {
  mainInput.value = '';
});

function addToDo() {
  let taskInput = mainInput.value;
  toDoArray.push(taskInput);
  console.log(taskInput);
  if (taskInput == '') {
    alert(`Don't forget to do something :)`);
    toDoArray.pop(taskInput);
  }
  render();
}

function render() {
  let resultHTML = '';
  for (let i = 0; i < toDoArray.length; i++) {
    resultHTML += `<div id="task-list">
      <div>${toDoArray[i]}</div>
      <div>
        <button>Check</button>
        <button>Delete</button>
      </div>
      </div>`;
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}
