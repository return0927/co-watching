class API {
  constructor() {
    this.baseUrl = "https://co-play.enak.kr";
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