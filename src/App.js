
import './App.css';
import { useState } from 'react';

function App() {
  // 자료를 잠시 저장해놓고 싶을 때 useState 함수를 사용
  // a => useState 에 보관했던 자료
  // b => state 를 변경을 도와주는 함수
  // Destructuring 문법
  // array 안에 있는 자료들을 각각의 변수로 빼주는 방법
  // let [a, c] = [1, 2];
  // useState 는 중간에 값이 변경되거나 바뀌면 자동으로 렌더링이 돼서 html 에 반영됨 (재 렌더링)
  // 따라서 useState 는 데이터 변동이 있을 시 자동으로 html 에 반영되게 하고 싶을 때 사용 (자주 변경되는)
  let [글제목, 글제목변경] = useState(['남자코트추천', '강남맛집', '파이썬독학']);
  
  let [따봉, 따봉변경] = useState(0);


  return (
    <div className="App">
      <div className='black-nav'>
        <h4>React Blog</h4>
      </div>

      <button onClick={()=> {
        let copy1 = [...글제목];
        copy1.sort();
        글제목변경(copy1);
      }}>정렬</button>

      <button onClick={() => {
        // 따라서 기존 state 가 array 또는 object 이면 독립적인 카피본을 만들어서 수정하여야 함 shallow copy
        // let copy = 글제목;
        let copy = [...글제목]; // 이렇게 하면 array 괄호가 벗겨지고 다시 씌워주라는 독립적이게 됨 그러면 화살표도 달라짐 2
        copy[0] = '여자코트추천'; 
        // console.log(copy === 글제목); // 변수, 데이터가 바뀌어도 화살표는 바뀌지 않으므로 true 나옴 1
        글제목변경(copy);
        }}>글수정</button>

      <div className='list'>
        <h4>{ 글제목[0] } <span className='hover' onClick={ ()=>{ 따봉변경(따봉 + 1) }}>❤️</span> { 따봉 } </h4>
        <p>2023년 발행</p>
      </div>

      <div className='list'>
        <h4>{ 글제목[1] }</h4>
        <p>2023년 발행</p>
      </div>

      <div className='list'>
        <h4>{ 글제목[2] }</h4>
        <p>2023년 발행</p>
      </div>
    </div>
  );
}

export default App;
