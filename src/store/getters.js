import variables from '@/styles/variables.scss'

const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => variables,
  /**
   * true 表示已存在用户信息
   */
  hasUserInfo: (state) => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}
export default getters
