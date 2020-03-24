export const BCG_ROOT_NAME = 'background';

// 一级路由
export const INDEX = { path: '', name: '首页' };
// export const LOGIN = { path: '/login', name: '登录页' };
// export const REGISTER = { path: '/register', name: '注册页' };
export const HOME = { path: '/home', name: '主页' };

// 二级路由
export const HOME_INDEX = { path: '/home/index', name: '主首页' };
export const HOME_SETTING = { path: '/home/setting', name: '个人设置页' };

// 员工填写页面
export const HOME_WRITE_WELCOME = {
  path: '/home/write/welcome',
  name: '员工填写欢迎页'
};
export const HOME_WRITE_DETAIL = {
  path: '/home/write/detail',
  name: '员工填写详情页'
};
export const HOME_WRITE_CURRENT = {
  path: '/home/write/current',
  name: '员工填写详情页'
};

// 业务员页面
export const HOME_MODIFY_LIST = {
  path: '/home/medify/list',
  name: '业务员列表页面'
};
export const HOME_MODIFY_DETAIL = {
  path: '/home/modify/detail',
  name: '业务员修改详情面'
};

// 评审员页面
export const HOME_EXAMINATION_LIST = {
  path: '/home/examination/list',
  name: '评审员列表页面'
};
export const HOME_EXAMINATION_DETAIL = {
  path: '/home/examination/detail',
  name: '评审员审核详情页'
};