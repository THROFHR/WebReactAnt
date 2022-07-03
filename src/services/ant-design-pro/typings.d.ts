declare namespace API {
  type CreateUserDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 昵称 */
    nickname: string;
    /** 生日 */
    birthday: string;
  };

  type CurrentUser = {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
    birthday: string;
    createdAt: string;
    token: string;
  };

  type LoginParams = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
    /** 登陆类型 */
    type: string;
    /** 手机号 */
    phone: string;
    /** 验证码 */
    code: string;
  };

  type ResponseDto = {
    /** 请求结果状态码 */
    code: number;
    /** 请求结果数据 */
    data: Record<string, any>;
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage: string;
    /** 业务上的请求是否成功 */
    success: boolean;
  };

  type UpdateUserDto = {
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 昵称 */
    nickname?: string;
    /** 生日 */
    birthday?: string;
  };

  type UserDto = {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
    birthday: string;
    createdAt: string;
  };

  type UserLoginResponseDto = {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
    birthday: string;
    createdAt: string;
    token: string;
  };
}
