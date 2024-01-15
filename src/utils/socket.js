export default class SocketConn {
  constructor(url) {
    this.url = url;
    this.conn = new WebSocket(this.url);
    this.listeners = [];

    this.conn.onmessage = (ev) => {
      const data = JSON.parse(ev.data);

      this.listeners
        .filter((listener) => listener.type == ev.type)
        .forEach((listener) => {
          listener.callback(data, ev);
        });
    };
  }

  on(event, callback) {
    this.listeners.push({ event, callback });
  }

  off(event, callback) {
    this.listeners = this.listeners.filter(
      (listener) => listener.event != event && listener.callback != callback
    );
  }

  emit(type, data) {
    this.conn.send(JSON.stringify({ type, data }));
  }
}
