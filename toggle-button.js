module.exports = (RED) => {
    function ToggleButtonNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        node.on("input", (msg) => {
            //node.warn({ RED, config, globalThis })
            msg.payload = this.flg ? 1 : 0;
            node.send(msg);
        });
    };
    RED.nodes.registerType("toggle-button", ToggleButtonNode);

    RED.httpAdmin.post("/toggle-button/:id", RED.auth.needsPermission("toggle-button.write"), function(req, res) {
        const node = RED.nodes.getNode(req.params.id);
        if (!node) {
            res.sendStatus(404);
            return;
        }
        node.flg = !node.flg;
        node.receive();
        res.sendStatus(200);
    });
};
