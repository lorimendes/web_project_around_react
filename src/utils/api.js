class Api {
  constructor(baseUrl, token) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  _request(url, method, body) {
    return fetch(url, {
      ...(method && { method: method }),
      headers: {
        authorization: this.token,
        ...(body && { "Content-Type": "application/json" }),
      },
      ...(body && { body: JSON.stringify(body) }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log("Erro:", err);
      });
  }

  getProfile() {
    return this._request(`${this.baseUrl}/users/me`);
  }

  getCards() {
    return this._request(`${this.baseUrl}/cards`);
  }

  updateProfile({ name, about }) {
    return this._request(`${this.baseUrl}/users/me`, "PATCH", { name, about });
  }

  updateAvatar({ avatar }) {
    return this._request(`${this.baseUrl}/users/me/avatar`, "PATCH", {
      avatar,
    });
  }

  postCard({ name, link }) {
    return this._request(`${this.baseUrl}/cards`, "POST", {
      name,
      link,
      isLiked: false,
    });
  }

  deleteCard(cardToDelete) {
    return this._request(`${this.baseUrl}/cards/${cardToDelete._id}`, "DELETE");
  }

  updateLike(cardToUpdate) {
    let method;

    if (!cardToUpdate.isLiked) {
      method = "PUT";
    } else {
      method = "DELETE";
    }

    return this._request(
      `${this.baseUrl}/cards/${cardToUpdate._id}/likes`,
      method
    );
  }
}

const api = new Api(
  "https://around-api.pt-br.tripleten-services.com/v1",
  "a1ae33fa-92c8-4fb4-90f3-3874e08185b4"
);

export { api };
