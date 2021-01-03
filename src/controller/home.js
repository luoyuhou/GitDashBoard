import Base from './base';

module.exports = class Home extends Base {
  static async index(ctx, next) {
    ctx.status = 200;
    ctx.body = 'hello world!';
  }

  static async home(ctx, next) {
    ctx.status = 200;
    ctx.body = 'home page';
  }
};