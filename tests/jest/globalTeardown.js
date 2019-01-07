module.exports = async () => {
    global.httpServer = await global.httpServer.close();
};