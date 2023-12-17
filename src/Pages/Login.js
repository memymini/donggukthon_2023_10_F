import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Login.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로

function Login() {

  return (
    <div className='full_container'>
      <div className='background_f'>
        <div className='window'>
            <div className='logo'>
              <img
              src={require('../Image/Login/Title.png')}
              alt="IGLOO"
              style={{ width: '80%'}}
              />
            </div>
            <div className='input_container'>
              <input type='text' name='id' placeholder='아이디를 입력해주세요' required></input>
              <input type='password'name='password' placeholder='비밀번호를 입력해주세요' required></input>
              <Link to='/myigloo'>
              <button className='google_button'>
                <img
                src={require('../Image/Login/google.png')}
                alt="receipt"
                id='logo'
                />
                구글 로그인
              </button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
