class Utils {

  static eventsUri(id: string): string {
    return `ws://localhost:8080/events?id=${id}`;
  }

  static telemetryUri(id: string): string {
    return `ws://localhost:8080/telemetry?id=${id}`;
  }

}

export default Utils;
