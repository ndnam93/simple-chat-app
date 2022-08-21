db.createUser(
  {
    user: "ndnam",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "cloudprimero"
      }
    ]
  }
)