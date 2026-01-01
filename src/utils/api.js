class Api {
  constructor(token) {
    this.token = token;
  }

  getInfoFromApi(url) {
    return fetch(url, {
      headers: {
        authorization: this.token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  updateProfile(url, item) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
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

  updateAvatar(url, item) {
    return fetch(url, {
      method: "PATCH",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
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

  postCard(url, item) {
    return fetch(url, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        link: item.link,
        isLiked: false,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(url) {
    return fetch(url, {
      method: "DELETE",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }

  updateLike(url, item) {
    let method;

    if (!item.isLiked) {
      method = "PUT";
    } else {
      method = "DELETE";
    }

    return fetch(url, {
      method: method,
      headers: {
        authorization: this.token,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
    });
  }
}

const api = new Api("a1ae33fa-92c8-4fb4-90f3-3874e08185b4");

export { api };
