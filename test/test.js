var supertest = require("supertest");
 var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:8080");

// UNIT test begin

describe("SAMPLE unit test",function(){

  // #1 should return home page

  it("should get pets list",function(done){

    // calling home page api
    server
    .get("/pets")
    .expect("Content-type",/json/)
    .expect(200) // THis is HTTP response
    .end(function(err,res){
        if(!err){
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        res.body.error.should.equal(false);
        done();
        } else{
            console.error(err)
        }

    });
  });

  //>> Create New Pets....
  it("should create new pets",function(done){
    //calling ADD api
    server
    .post('/pets')
    .send({name : "Jocky", age : 2,colour: 'blue'})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
        if(err){
            console.error(err)
        }
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      res.body.result.should.equal(true);
      done();
    });
  });

  //Failure..... Required Validation...
  it("should return required validation",function(done){
    server
    .post('/pets')
    .send({name : "", age : 2,colour: 'blue'})
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(true);
      done();
    });
  });


  //Delete..... Pets...
  it("should return deleted pets true or false",function(done){
    server
    .delete('/pets/1')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(false);
      done();
    });
  });


    //Error Test Cases
    it("should return Error",function(done){
        server
    .get('/pets/1')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.body.error.should.equal(true);
      done();
    });
    });

  //404 Response..
  it("should return 404",function(done){
    server
    .get("/random")
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      done();
    });
  }) 
});