import Base from './base';
import shell from 'shelljs';

module.exports = class Git extends Base {
  static async index(ctx, next) {
    ctx.status = 200;
    ctx.body = await Git.display('git/index.html');

    ctx.body = Git.assign(ctx.body, { data: 'git dashboard', port: process.env.SOCKET_PORT });
  }

  static async execute(ctx, next) {
    const { path, cmd } = ctx.request.body;
    console.log(`[path=${path}] [cmd=${cmd}]`);
    shell.cd(path);

    let data = '';
    ctx.status = 200;
    try {
      data = await shell.exec(cmd)
    } catch (e) {
      ctx.status = 500;
    }
    ctx.body = data;
  }
};