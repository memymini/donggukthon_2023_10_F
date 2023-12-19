import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Css/Login.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로
import API from '../API/axios';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = { id, password }; // 객체 구조 분해 활용
      const response = await API.post('/auth/login', userData);

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);
        const { access, refresh } = response.data; // 객체 구조 분해 활용
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        alert('로그인에 성공했습니다.');
        navigate('/myigloo');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='full_container'>
      <div className='background_f'>
        <div className='window'>
          <div className='logo'>
            <img
              src={require('../Image/Login/Title.png')}
              alt="IGLOO"
              style={{ width: '80%' }}
            />
          </div>
          <form className='input_container' onSubmit={handleLogin}>
            <input type='text' name='id' placeholder='아이디를 입력해주세요' value={id} onChange={(e) => setId(e.target.value)} required />
            <input type='password' name='password' placeholder='비밀번호를 입력해주세요' value={password} onChange={(e) => setPassword(e.target.value)} required />

            <button type="submit" className='google_button'>
              로그인
            </button>

            <div className='find_last_login_do_it'>
              <Link to='/signup' style={{ justifySelf: 'end' }}>회원가입</Link> | <Link to='/forgotpassword' style={{ justifySelf: 'start' }}>비밀번호 찾기</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
