
import React from 'react';
import './App.css';
import { useState } from 'react';

// 미리보기 화면 띄우기 npm start
// vscode 에서 레포지토리 복제하고 작업하는데 npm start 가 안되면
// npm install react-scripts 해야함
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
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false); // 모달창 디폴트 false
  let [modalTitle, setModalTitle] = useState(0); // state 위치를 굳이 여기에 만들어야 하는 이유는 여러 App, Modal 여러 컴포넌트에서 사용하기 위함
  let [input, setInput] = useState(''); // input 에 입력한 값 저장 state

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

      {
        // map() 반복문 함수 => 글제목 title array 갯수만큼 반복문
        // return 안에 있는 것들을 array 로 담아줌
        // 유용한 파라미터 2개 사용 가능
        // a 파라미터 => array 안에 있던 데이터
        // i 파라미터 => 반복문이 돌 때 마다 1씩 증가하는 정수
        title.map(function(a, i) {
          return (
            <div className='list' key={ i }>
              <h4 onClick={ () => { setModal(true); setModalTitle(i) }}> { title[i] }
                <span onClick={ (e)=> {
                  e.stopPropagation(); // 이벤트 버블링 => 즉, span 태그를 눌렀는데 그 안에 요소인 h4 태그 모달창이 열리는 현상을 막아줌
                  let copy = [...like];
                  copy[i] = copy[i] + 1;
                  setLike(copy)}}>❤️
                </span> { like[i] }
              </h4>
              <p>2023년 발행</p>

              <button onClick={ () => { // 삭제 버튼을 누르면 동작하는 핸들러
              
                let copy = [...title];

                // splice 메서드 => array 자료에서 원하는 항목을 삭제할 수 있음
                // 첫번째 파라미터는 삭제할 index
                // 두번째 파라미터는 삭제할 요소의 갯수
                copy.splice(i, 1);
                setTitle(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      {/* input 에 입력한 값을 가져오기 => 파라미터 e 추가 후 e.target.value
          input 에 입력할 때마다 setInput state 에 저장됨 */}
      <input onChange={ (e) => {
        setInput(e.target.value);
        console.log(input);
      }} />

      <button onClick={ () => { // input에 글 작성후 글발행 버튼을 눌렀을 때 동작하는 핸들러
        let copy = [...title]; // 먼저, 글제목 원본 copy 
        copy.unshift(input); // unshift 메서드 => array 배열에 자료 추가하는 함수에 input은 위에서 state 만들어논 입력값 변수명
        setTitle(copy);
      }}>글발행</button>

      {/* <Component>/</Component> 아래와 같은 방법으로도 사용 가능함 */}
      {/* 동적인 UI 만드는 방법 
        1. html css 미리 디자인 완성
        2. UI 의 현재 상태를 state 로 저장
        3. state 에 따라 UI 가 어떻게 보일지 작성 */}
        {
          // 삼항연산자
          // 부모 state 를 자식에게도 사용하게 해주고 싶다면(props) 2번의 step 이 있음
          // 컴포넌트 사용하는 곳에서 자유롭게 작명 해주고 사용하고싶은 state 이름을 적으면 됨
          // 보통 작명은 사용하고자 하는 state 와 동일하게 작명 하는 경우가 있음
          // 자식 컴포넌트 Modal() 함수에서 파라미터를 추가해줌 관례상 props 라고 작명
          // props 전송 사용 방법은 부모 -> 자식만 가능하고 자식 -> 부모는 안됨
          modal === true ? <Modal setTitle={ setTitle } modalTitle={ modalTitle } title={ title } color={ 'orange'} /> : null
        }

        {/* <ClassModal></ClassModal> 옛날 방식 class 를 이용해서 컴포넌트 만들어봤음 */} 
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
// state 를 가져다 쓰려면 props 방식을 사용하면 됨
// 변수 선언을 const 로 하게되면 console 에 에러 메세지가 찍혀서 좋음
function Modal(props) {
  // let [modalTitle, setModalTitle] = useState(0); 여기에 선언해도 되지만 
  // state 가 Modal, App 등등 여러곳에서 필요하다면 가장 상위 부모 컨포넌트에 만드는게 좋음
  return (
    <>
      <div className='modal' style={{ background : props.color }}>
        <h4>{ props.title[props.modalTitle] }</h4>
        {/** <h4>{ props.title[modalTitle] }</h4> 96번 라인에 state 선언 후 사용해도 되지만,
          선언한 state가 Modal, App 등등 여러 함수 컴포넌트들에 필요하다면 
          가장 상위 부모 컴포넌트에 보관하는게 좋음 패륜전송 불륜전송이 안됨 */} 
        <p>날짜</p>
        <p>상세내용</p>
        <button>글수정</button>
      </div>
    </>
  )
}

// class 로 컴포넌트 만드는 방법 => 예전 스타일임. 요즘은 함수로 컴포넌트 만들어서 사용함
// class 문법은 변수랑 함수를 많이 보관할 수 있음
// 3개의 함수를 채워넣고 시작해야함 constructor, super, render
// class ClassModal extends React.Component {
//   constructor(props) { // this.
//     super(props);
//     this.state = { // class 컴포넌트에서 state 만드는 방법
//       name : 'park',
//       age : 20
//     }
//   }
//   render() {
//     return (
//       <div>안녕{this.state.name}
//         <button onClick={ () => {
//           this.setState( { name : 'kim' } ); // class 컴포넌트에서 state 수정하는 방법
//         }}>버튼</button>
//           </div> // object 자료형에서 원하는 데이터 출력하는 방법
//     )
//   }

// }

export default App;
