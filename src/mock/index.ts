import Mock from 'mockjs'
import user from './user'

Mock.mock('/api/login', user.login)
