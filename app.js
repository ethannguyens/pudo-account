const Couchbase = require("couchbase");
const Express = require("express");
const UUID = require("uuid");
const BodyParser = require("body-parser");
const Bcrypt = require("bcryptjs");

const app = Express();
const N1qlQuery = Couchbase.N1qlQuery;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

const cluster = new Couchbase.Cluster("couchbase://localhost");
const bucket = cluster.openBucket("user", "83cf6289f35e10e94ef9e62df0f7ba25");

const server = app.listen(3000, () => {
  console.log("Listening on port " + server.address().port + "...");
});

//POST /account creating – Create a new user profile with account information
app.post("/account", (request, response) => {
  if(!request.body.email) return response.status(401).send({ "message": "An `email` is required" });
  else if(!request.body.password) return response.status(401).send({ "message": "A `password` is required" });

  const id = UUID.v4();
  const account = {
    "type": "account",
    "pid": id,
    "email": request.body.email,
    "password": Bcrypt.hashSync(request.body.password, 10)
  };

  const profile = request.body;

  profile.type = "profile";

  delete profile.password;

  bucket.insert(id, profile, (error, result) => {
    if(error) {
      return response.status(500).send(error);
    }
    bucket.insert(request.body.email, account, (error, result) => {
      if(error) {
        bucket.remove(id);
        return response.status(500).send(error);
      }
      response.send(result);
    });
  });
});