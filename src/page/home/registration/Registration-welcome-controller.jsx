import React, { useState } from 'react';

// 样式
import '@/style/home/registration/welcome.styl';
import { Input, Icon, Button, message } from 'antd';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

export default props => {
  const { loginLoading } = useSelector(state => state.enterpriseStore),
    [registrationName, setRegistrationName] = useState(''),
    dispatch = useDispatch();

  const handleSubmitCreateRegistration = e => {
    e.preventDefault();

    if (registrationName) {
      dispatch(
        enterpriseAction.asyncCreateEnterpriseRegistion(registrationName)
      );
    } else {
      message.error('请输入登记测试名称');
    }
  };

  return (
    <div className='welcome-box'>
      <div className='left-box'>
        <div className='top-box'>
          <h1 className='caption'>
            <Icon type='audit' />
            <span>登记办理新测试</span>
          </h1>
          <p className='passage'>
          服务流程：
          1. 委托方填写产品测试登记表，准备必要资料（包括产品测试功能表和产品用户操作手册）。
          2. 委托方准备测试环境。
          3. 开展检测工作。
          4. 对检测过程中发现的问题进行及时沟通。
          5. 出具检测报告。
          6. 后续相关事宜的咨询。
          注意事项：
          1. 拥有软件著作权的软件，检测时运行名称须与软件著作权证书上体现的名称一致。
          2. 尽量提前或预留检测时间，避免招投标或项目验收对检测报告的需求特别急迫。
          </p>
        </div>
        <div className='bottom-box'>
          <Input
            size='large'
            placeholder='请输入测试产品名称'
            className='input'
            onChange={e => {
              setRegistrationName(e.target.value);
            }}
          />
          <Button
            size='large'
            type='primary'
            className='button'
            onClick={handleSubmitCreateRegistration}
            loading={loginLoading}
          >
            确认
          </Button>
        </div>
      </div>
      <div className='right-box'>
        <img
          className='image'
          src='/image/welcome-controller/right.jpg'
          alt='Paris'
        />
      </div>
    </div>
  );
};
