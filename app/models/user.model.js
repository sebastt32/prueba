class UserModel {
  static users = [
    {
      id: "1",
      name: "Ada Lovelace",
      email: "ada@example.com",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Alan Turing",
      email: "alan@example.com",
      createdAt: new Date().toISOString(),
    },
  ];

  // Eloquent-style API for service layer consumption.
  static async all() {
    return this.users;
  }

  static async find(id) {
    return this.users.find((user) => user.id === String(id)) || null;
  }

  static async create(payload) {
    const newUser = {
      id: String(this.users.length + 1),
      name: payload.name,
      email: payload.email,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    return newUser;
  }
}

module.exports = UserModel;
