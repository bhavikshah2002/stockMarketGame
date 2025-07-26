export default class SocketConn {
  constructor(url) {
    this.url = url;
    this.conn = null;
    this.listeners = [];
    this.errorOccured = false;
    this.forceClose = false;

    try {
      if (!this.url.startsWith("ws://") && !this.url.startsWith("wss://")) {
        throw new Error("Invalid WebSocket URL format: " + this.url);
      }

      console.log("Creating WebSocket with URL:", this.url);
      this.conn = new WebSocket(this.url);

      // Set up event listeners
      this.conn.onerror = (ev) => {
        console.log("WebSocket error event:", ev);
      };

      this.conn.onopen = (ev) => {
        console.log("WebSocket connected:", ev);
      };

      this.conn.onclose = (ev) => {
        console.log("WebSocket closed:", ev);

        if (!this.errorOccured && !this.forceClose) {
          setTimeout(() => this.reconnect(), 4000);
        }
      };

      this.conn.onmessage = (ev) => {
        try {
          const data = JSON.parse(ev.data);
          this.listeners
            .filter((listener) => listener.type === data.type)
            .forEach((listener) => listener.callback(data.data, ev));
        } catch (err) {
          console.error(
            "Failed to parse incoming WebSocket message:",
            ev.data,
            err
          );
        }
      };

      // Register error listener
      this.on("ErrorMessage", (data) => {
        this.errorOccured = true;
        alertFunction("An error Occurred", data.message, "close", () => {
          router.push("/");
        });
      });

      console.log("WebSocket setup completed");
    } catch (e) {
      console.error("Failed to create WebSocket:", e);
    }
  }

  on(type, callback) {
    this.listeners.push({ type, callback });
  }

  off(type, callback) {
    this.listeners = this.listeners.filter(
      (listener) => listener.type !== type || listener.callback !== callback
    );
  }

  emit(type, data) {
    if (this.conn && this.conn.readyState === WebSocket.OPEN) {
      this.conn.send(JSON.stringify({ type, data }));
    } else {
      console.warn("Cannot emit, WebSocket not open");
    }
  }

  reconnect() {
    console.log("Attempting WebSocket reconnect...");
    this.errorOccured = false;

    try {
      this.conn = new WebSocket(this.url);

      this.conn.onopen = this.conn.onopen;
      this.conn.onmessage = this.conn.onmessage;
      this.conn.onclose = this.conn.onclose;
      this.conn.onerror = this.conn.onerror;
    } catch (err) {
      console.error("WebSocket reconnect failed:", err);
    }
  }

  close() {
    this.forceClose = true;
    this.listeners = [];
    if (this.conn) {
      this.conn.close();
    }
  }
}
