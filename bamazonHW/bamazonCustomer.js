require("dotenv").config();
const mysql = require("mysql");
const keys = require("./keys.js");
const columnify = require("columnify");
const inquirer = require("inquirer");
let bproducts;

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: keys.mysqlDB.password,
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  getProducts();
});

function getProducts() {
  bproducts = [];
  connection.query(
    "SELECT item_id, product_name, price FROM products",
    function(err, res) {
      if (err) throw err;
      console.log(`Below are a list of Bamazon Products: \n`);
      // Log all results of the SELECT statement
      res.forEach(product => {
        bproducts.push(product);
      });
      let bamazon_products = columnify(res, {
        columnSplitter: "   |  ",
        truncate: true,
        minWidth: 5,
        config: { price: { align: "right" } }
      });
      console.log(bamazon_products);
      getPurchase();
    }
  );
}

function getPurchase() {
  inquirer
    .prompt([
      {
        type: `input`,
        name: `PRODUCT`,
        message: `Enter the ID of the product you would like to purchase: `
      },
      {
        type: `input`,
        name: `QUANITY`,
        message: `How many would you like to purchase?`
      }
    ])
    .then(answers => {
      const productID = answers.PRODUCT || 0,
        quantity = answers.QUANITY || 0;
      let item =
        quantity < 2
          ? `${bproducts[productID - 1].product_name}`
          : `${bproducts[productID - 1].product_name}s`;
      console.log(
        `\nAlright, let me see if I can fulfill your purchase request for ${quantity} ${item}.\n`
      );
      finalizePurchase(productID, quantity);
    });
}

function finalizePurchase(ID, Q) {
  connection.query(`SELECT * FROM products WHERE item_id = ${ID}`, function(
    err,
    res
  ) {
    if (err) throw err;
    // console.log(res);
    let available = res[0].stock_quantity,
      price = res[0].price,
      name = res[0].product_name;
    if (available >= Q) {
      console.log(`Preparing purchase...\n`);
      console.log(`Processing purchase...\n`);
      makePurchase(ID, Q, name, price, available);
    } else {
      console.log(
        `Sorry, we don't have enough ${name}s in stock to fulfill your purchase request. \nInsufficient quantity!\n`
      );
      getPurchase();
    }
  });
}

function makePurchase(i, q, n, p, a) {
  let query = `UPDATE products SET stock_quantity = ${a -
      q} WHERE item_id = ${i}`,
    reciept = {
      "product name": n,
      quantity: q,
      price: p,
      total: `$ ${Math.round(p * q * 100) / 100}`
    };
  // console.log(reciept);
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.log(`Purchase successful!\n`);
    let final_reciept = columnify([reciept], {
      columnSplitter: "   |  ",
      columns: ["product name", `quantity`, "price", "total"],
      truncate: true,
      minWidth: 5,
      config: { price: { align: "right" } }
    });
    console.log(final_reciept, "\n");
    let item = reciept.quantity < 2 ? `${n}` : `${n}s`;

    console.log(
      `Thank you for shopping at BAMazon. We hope you enjoy your ${item} :)\n`
    );
    inquirer
      .prompt([
        {
          type: "list",
          name: "upsale",
          message: "Would you like to make another purchase?",
          choices: ["Yes", "No"]
        }
      ])
      .then(answers => {
        switch (answers.upsale) {
          case "Yes":
            console.log(`\nShopping spree!!\n`);
            getProducts();
            break;
          case "No":
            console.log(`\nOur store is open 24/7! Come back anytime :)\n`);
            connection.end();
            break;
        }
      });
  });
}
