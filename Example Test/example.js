console.log(document.getElementById('test').innerHTML);
console.log(document.getElementById('test2').textContent);

document.getElementById('test').innerHTML = `<h1> brother</h1>`;
// 효과 까지 적용
document.getElementById('test2').textContent = `<h1> brother</h1>`;
// text를 그대로 전환
