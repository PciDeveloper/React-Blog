
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
  let [title, setTitle] = useState(['남자코트추천', '강남맛집', '파이썬독학']);
  let [like, setLike] = useState(0);
  let [modal, setModal] = useState(false); // 모달창 디폴트 false

  return (
    <div className="App">
      <div className='black-nav'>
        <h4>React Blog</h4>
      </div>

      <button onClick={()=> {
        let copy1 = [...title];
        copy1.sort();
        setTitle(copy1);
      }}>정렬</button>

      <button onClick={() => {
        // 따라서 기존 state 가 array 또는 object 이면 독립적인 카피본을 만들어놓고 수정하여야 함 => shallow copy
        let copy = [...title]; // 이렇게 하면 array 괄호가 벗겨지고 다시 씌워주라는 의미. 즉, 독립적이게 됨 그러면 화살표도 달라짐 2
        copy[0] = '여자코트추천'; 
        // console.log(copy === 글제목); // 변수, 데이터가 바뀌어도 화살표는 바뀌지 않으므로 true 나옴 1
        setTitle(copy);
        }}>글수정</button>

      <div className='list'>
        <h4 className='hover'> { title[0] } <span className='hover' onClick={ ()=>{ setLike(like + 1) }}>❤️</span> { like } </h4>
        <p>2023년 발행</p>
      </div>

      <div className='list'>
        <h4 className='hover'>{ title[1] }</h4>
        <p>2023년 발행</p>
      </div>

      <div className='list'>
        <h4 className='hover' onClick={ () => { setModal(!modal) }}>{ title[2] }</h4>
        <p>2023년 발행</p>
      </div>
       
      {/* <Component>/</Component> 아래와 같은 방법으로도 사용 가능함 */}
      {/* 동적인 UI 만드는 방법 
        1. html css 미리 디자인 완성
        2. UI 의 현재 상태를 state 로 저장
        3. state 에 따라 UI 가 어떻게 보일지 작성 */}
        {
          // 삼항연산자
          modal === true ? <Modal/> : null
        }

    </div>
  );
}

// 컴포넌트 만드는 방법
// 1. function 만들기
// 2. return () 안에 html 담기
// 3. <함수명> </함수명> 쓰기
// html 병렬 기입하면 에러이므로 <> </> 프래그먼트 문법을 사용

// 컴포넌트를 사용하면 좋은 예 3가지
// 1. 반복적인 UI 를 사용하여야 할 때 사용
// 2. 자주 변경되는 UI 
// 3. 큰 페이지들 또한 컴포넌트 사용하는게 좋음

// 단점
// 1. state 를 가져다가 사용할 때 문제가 생김
// 변수 선언을 const 로 하게되면 console 에 에러 메세지가 찍혀서 좋음
const Modal = () => {
  return (
    <>
      <div className='modal'>
        <h4>제목</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  )
}

export default App;
