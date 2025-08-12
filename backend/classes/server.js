export default class Server {
    constructor(wss) {
        this.server = wss
        this.players = []
        this.groups = []

        wss.on("connection", ws => this.handleConnection(ws))
    }

    handleConnection(ws) {
        ws.on("close", () => {
            console.log("Client disconnected")
        })
        

        ws.on("message", (message) => {
            const parsed = JSON.parse(message);
            const { type, data } = parsed;
            switch (type) {
                case "setName":
                    console.log("New client connected: ", data.name)
                    break;
                default:
                    break;
            }
        })
        

    }




}