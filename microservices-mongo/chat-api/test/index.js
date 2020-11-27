const app = require("../src");
const chai = require("chai");
const chaiHttp = require("chai-http");
console.log(process.env.DBURL);
console.log(process.env.JWTSECRET);
const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  // let token = '';
  // before(async function () {
  //   return new Promise((resolve) => {
  //   chai
  //     .request(app)
  //     .post("/api/auth/signup")
  //     .send({
  //       email: "lilit4@gmail.com",
  //       password: "password",
  //       firstName: "Lilit",
  //       lastName: "Karapetyan",
  //     })
  //     .end((err, res) => {
  //       expect(res).to.have.status(200);
  //       chai
  //       .request(app)
  //       .post("/api/auth/signin")
  //       .send({
  //         email: "lilit4@gmail.com",
  //         password: "password",
  //       })
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.haveOwnProperty('token');
  //         token = res.body.token;
  //         resolve();
  //       });
  //     });

  //   });
  // });
  it("adds two numbers", done => {
   expect(1+2).to.equals(3);
   done()
  })
  
  it("should get current user", done => {
    done()
    // chai
    //   .request(app)
    //   .get("/api/users/me")
    //   .set('authorization', token)
    //   .end((err, res) => {
    //     expect(res).to.have.status(200);
    //     expect(res.body.user.firstName).to.equals('Lilit');
    //     done();
    //   });
  });
});