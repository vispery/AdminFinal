import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    email: '1@qq.com',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '管理员'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    personalProfile: Mock.mock('@county(true)'),
    'age|18-60': 1,
    createdAt: Mock.Random.date(),
    role:'true',
  }));
}

export { LoginUsers, Users };
