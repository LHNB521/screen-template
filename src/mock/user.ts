export default {
  login: (prams: any) => {
    console.log(prams)
    return {
      code: 200,
      data: {
        token: '1234567890',
        userInfo: {
          name: 'admin',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        },
      },
    }
  },
}
