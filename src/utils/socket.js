import { router } from "expo-router";
import alertFunction from "./alertFunction";

export default class SocketConn {
  constructor(url) {
    this.url = url;
    this.conn = new WebSocket(this.url);
    this.listeners = [];
    this.errorOccured = false;
    this.forceClose = false;

    this.on("ErrorMessage", (data) => {
      this.errorOccured = true;
      alertFunction("An error Occured", data.message, "close", () => {
        router.push("/");
      });
    });

    this.conn.onerror = (ev) => {
      console.log("Error", ev);
    };

    this.conn.onopen = (ev) => {
      console.log("OnOpen", ev);
    };

    this.conn.onclose = (ev) => {
      console.log("OnClose", ev);

      if (this.errorOccured || this.forceClose) return;

      setTimeout(() => {
        this.reconnect();
      }, 4000);
    };

    this.conn.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      this.listeners
        .filter((listener) => listener.type == data.type)
        .forEach((listener) => {
          listener.callback(data.data, ev);
        });
    };
  }

  on(type, callback) {
    this.listeners.push({ type, callback });
  }

  off(type, callback) {
    this.listeners = this.listeners.filter(
      (listener) => listener.type != type && listener.callback != callback
    );
  }

  emit(type, data) {
    this.conn.send(JSON.stringify({ type, data }));
  }

  reconnect() {
    console.log("Reconnecting...");
    this.errorOccured = false;
    const newConn = new WebSocket(this.url);

    newConn.onopen = this.conn.onopen;
    newConn.onmessage = this.conn.onmessage;
    newConn.onclose = this.conn.onclose;
    newConn.onerror = this.conn.onerror;

    this.conn = newConn;
  }

  close() {
    this.forceClose = true;
    this.listeners = [];
    this.conn.close();
  }
}
