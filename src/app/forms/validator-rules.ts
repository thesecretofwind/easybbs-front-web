export const validatorNumber = /^([0]|[1-9][0-9]*)$/;
export const validatorPassword =
  /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!#$%^&*_]{8,16}$/;

export const formMessage = {
  email: {
    required: '请输入邮箱',
    pattern: '邮箱格式不正确',
  },
  nickname: {
    required: '请输入昵称',
  },
  password: {
    required: '请输入密码',
    pattern: '密码必须8-16位,且包含数字、大小写字母、特殊字符! #$%^&*',
  },
  checkPassword: {
    required: '请输入确定密码',
    confirm: '两次输入密码不一致',
  },
  checkCode: {
    required: '请输入验证码',
    pattern: '验证码格式不正确',
    wrongCheckCode: '验证码错误'
  },
};
