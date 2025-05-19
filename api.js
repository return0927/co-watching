class API {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  async getGroup(groupId) {
    const resp = await fetch(`${this.baseUrl}/group/${groupId}`, {
      method: 'GET',
    });
    return resp;
  }

  async createGroup() {
    const resp = await fetch(`${this.baseUrl}/group/`, {
      method: 'POST',
    });
    return resp;
  }

  async signalGroup(groupId, accessKey, signal) {
    const resp = await fetch(`${this.baseUrl}/group/${groupId}/signal`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessKey,
      },
      body: JSON.stringify(signal),
    });
    return resp;
  }
}
window.API = new API();