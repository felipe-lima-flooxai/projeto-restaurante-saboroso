var conn = require("../inc/db");
var express = require('express');
var router = express.Router();
var menus = require("./../inc/menus");
var reservations = require("./../inc/reservations");
var contacts = require("./../inc/contacts");
var emails = require("./../inc/emails");

/* GET home page. */
router.get('/', function(req, res, next) {
  menus.getMenus().then(results=>{
    res.render("index", {
      title: "Restaurante Saboroso!",
      menus: results,
      isHome: true
    })
  });
});

router.get("/contacts", function(req, res, next){

  contacts.render(req, res);

})

router.post("/contacts", function(req, res, next){

  if (!req.body.name) {
    contacts.render(req, res, "Por favor, digite seu nome");
  } else if (!req.body.email) {
    contacts.render(req, res, "Por favor, digite seu e-mail");
  } else if (!req.body.message) {
    contacts.render(req, res, "Por favor, digite a mensagem");
  } else {
    contacts.save(req.body).then(results => {

      req.body = {};
      contacts.render(req, res, null, "Contato enviado com sucesso!"); 

    }).catch(err=>{

      contacts.render(req, res, err.message);

    })
  }
})

router.get("/menus", function(req, res, next){

  menus.getMenus().then(results=>{
    res.render("menus", {
      title: "Menus - Restaurante Saboroso!",
      background: "images/img_bg_1.jpg",
      h1: "Saboreie nosso menu!",
      menus: results
    });
  });

  

})

router.get("/reservations", function(req, res, next){

  reservations.render(req, res);
})

router.post("/reservations", function(req, res, next){

  if (!req.body.name) {
    reservations.render(req, res, "Por favor, digite seu nome");
  } else if (!req.body.email) {
    reservations.render(req, res, "Por favor, digite seu e-mail");
  } else if (!req.body.people) {
    reservations.render(req, res, "Por favor, informe a quantidade de pessoas");
  } else if (!req.body.date) {
    reservations.render(req, res, "Por favor, selecione uma data");
  } else if (!req.body.time) {
    reservations.render(req, res, "Por favor, selecione um horário");
  } else {
    reservations.save(req.body).then(results=>{

      req.body = {}

      reservations.render(req, res, null, "Reserva realizada com sucesso!"); 
    }).catch(err=>{
      reservations.render(req, res, err.message);
    });
  }



})

router.get("/services", function(req, res, next){

  res.render("services", {
    title: "Serviços - Restaurante Saboroso!",
    background: "images/img_bg_1.jpg",
    h1: "É um prazer poder servir!"
  });

})

router.post("/subscribe", function(req, res, next){

  emails.save(req).then(results=>{

    res.send(results);

  }).catch(err=>{

    res.send(err);

  })

  

})

module.exports = router;
