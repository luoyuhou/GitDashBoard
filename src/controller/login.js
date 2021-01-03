import Base from './base';

module.exports = class Login extends Base {
  static async index(ctx, next) {
    ctx.status = 200;
    ctx.body = 'login'
  }
};