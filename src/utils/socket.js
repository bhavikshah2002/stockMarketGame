export default class SocketConn {
  constructor(url) {
    this.url = url;
    this.conn = new WebSocket(this.url);
    this.listeners = [];
    this.conn.onerror = (ev) => {
      console.log("Error", ev);
    };
    this.conn.onopen = (ev) => {
      console.log("OnOpen", ev);
    };
    this.conn.onclose = (ev) => {
      console.log("OnClose", ev);
    };
    this.conn.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      console.log(data.data);
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

  close() {
    this.listeners = [];
    this.conn.close();
  }
}
