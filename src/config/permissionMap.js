export const permissions = {
  jobs: {
    view: ["user", "admin"],
    create: ["user", "admin"],
    edit: ["user", "admin"],
    delete: ["admin"]
  },

  budgets: {
    view: ["user", "admin"],
    create: ["user", "admin"],
    edit: ["user", "admin"],
    delete: ["admin"]
  },

  users: {
    view: ["admin"],
    create: ["admin"],
    edit: ["admin"],
    delete: ["admin"]
  }
};