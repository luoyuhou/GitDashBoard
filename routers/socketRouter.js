module.exports = {
  async data(ctx) {
    try {
      ctx.socket.emit('receive', {data: "a"});
    } catch (error) {
      console.log(error);
    }
  }
}