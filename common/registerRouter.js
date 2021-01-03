function noop() {}

const register = function (io, _io, routes) {
  Object.keys(routes).forEach((route) => {
    io.on(route, noop); // register event
  });
  return async (ctx, next) => {
    if (routes[ctx.event]) {
      await routes[ctx.event](ctx);  //call event funciton
    }
    await next();
  };

};

export default register;