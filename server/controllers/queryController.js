const db = require("../models/queryModels");

const queryController = {};

// GET request to get all db info for schema_list and fields tables
queryController.getAllSchemaList = (req, res, next) => {
  // schema_name, field_name, field_type
  const { schema_name, field_name, field_type } = req.body;
  // const item = `SELECT * FROM schema_list, fields WHERE schema_list`
  const text = `SELECT * FROM "public"."schema_list"`;
  db.query(text)
    .then((data) => {
      // console.log('getAllSchemaList is: ', data);
      res.status(200).json(data.rows);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

queryController.getAllFields = (req, res, next) => {
  // schema_name, field_name, field_type
  const { id, field_name, field_type } = req.body;
  // const item = `SELECT * FROM schema_list, fields WHERE schema_list`
  const text = `SELECT * FROM "public"."fields"`;
  db.query(text)
    .then((data) => {
      // console.log('getAllFields is: ', data);
      res.status(200).json(data.rows);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST request: creates a new row in the schema_list table
// req.body would send the 'schema_name'
queryController.addRowSchemaList = (req, res, next) => {
  const { ourTableName } = req.body;
  // console.log(schema_name, 'schema_name')
  const text = `INSERT INTO schema_list (schema_name) VALUES ($1)`;

  db.query(text, [ourTableName])
    .then((data) => {
      // console.log(data, 'data')
      res.status(200).send("schema_name added to schema_list table");
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

// user adds many rows to fields table - 'post' request
queryController.addManyFieldsRows = (req, res, next) => {
  const arr = req.body;
  // we will get an array of objects with multiple rows that will need to be added
  let addToSchema = "";
  // `SELECT id FROM schema_list WHERE schema_name = ($1)demo-schema`
  const getIdString = `SELECT id FROM schema_list WHERE schema_name = $1`;
  console.log("this is the reqest body", req.body);
  // $1 is going to point to [req.body.tableName]
  const getIdParam = [req.body.ourTableName];
  console.log("getIdParam", getIdParam);
  // once we query this, save it to a variable, and pass that variable to our INSERT statement as the foreign key
  let idNumber = 0;
  db.query(getIdString, getIdParam).then((data) => {
    console.log("we made it in here!!!!!");
    console.log("this is our data", data);
    idNumber = data.rows[0].id;
    console.log("inside query", idNumber);

    const inputsArray = req.body.inputs;
    console.log("inputsarray", inputsArray);

    for (let i = 0; i < inputsArray.length; i++) {
      const userFieldName = inputsArray[i].fieldName;
      const userFieldType = inputsArray[i].fieldType;
      const userDefaultValue = inputsArray[i].defaultValue;
      const userPrimaryKey = inputsArray[i].primaryKey;
      const userUnique = inputsArray[i].unique;
      const userRequired = inputsArray[i].required;
      const userQueryable = inputsArray[i].queryable;
      const userTableRelate = inputsArray[i].tableRelationship;
      const userFieldRelate = inputsArray[i].fieldRelationship;
      const userTypeRelate = inputsArray[i].typeRelationship;

      console.log(
        "userFieldName: ",
        userFieldName,
        "userFieldType: ",
        userFieldType,
        "userDefaultValue:",
        userDefaultValue,
        "userPrimaryKey: ",
        userPrimaryKey,
        "userUnique: ",
        userUnique,
        "userRequired",
        userRequired,
        "userQueryable",
        userQueryable
      );

      let concatStr =
        "(" +
        `'${userFieldName}'` +
        "," +
        `'${userFieldType}'` +
        "," +
        `'${userDefaultValue}'` +
        "," +
        `'${userPrimaryKey}'` +
        "," +
        `'${userUnique}'` +
        "," +
        `'${userRequired}'` +
        "," +
        `'${userQueryable}'` +
        "," +
        `'${userTableRelate}'` +
        "," +
        `'${userFieldRelate}'` +
        "," +
        `'${userTypeRelate}'` +
        "," +
        `${idNumber}` +
        "),";
      // console.log('this is the concatenated string', concatStr);
      addToSchema = addToSchema + concatStr;
      // console.log('this is our addToSchema query after concat:', addToSchema);
    }
    let oldDbQuery = `INSERT INTO fields (field_name, field_type, default_value, primary_key, unique_bool, required_bool, queryable, table_relationship, field_relationship, type_relationship, schema_list_id) VALUES `;

    let newDB = oldDbQuery + addToSchema;
    // console.log(newDB, 'newDB');
    let lengthSlice = newDB.length - 1;
    // console.log(lengthSlice, 'lengthSlice');
    let newDbQuery = newDB.slice(0, lengthSlice);
    // console.log(newDbQuery, 'newDbQuery');
    console.log("this is the new DB query, pls work! ", newDbQuery);

    db.query(newDbQuery)
      .then((data) => {
        // console.log('data ln 120: ', data);
        // console.log(`this is the data from the user's rows table: `, data.rows);
        res.status(200).send(`Rows added to fields table`);
        next();
        // res.locals.userCart = data.rows;
      })
      .catch((err) => {
        console.log("ERROR: No rows added.", err);
      });
  });

  // data.rows[0].id
};

// DELETE request: to delete a row from the fields table
queryController.deleteFieldsRow = (req, res, next) => {
  // query fields table based on id and delete if item exists
  const id = parseInt(req.params.id);
  const text = `DELETE FROM fields WHERE id = $1`;
  // send our query over to the db passing in the query and id
  db.query(text, [id])
    .then(() => {
      res.status(200).send(`fields row deleted with ID: ${id}`);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE request: to delete a row in the schema_list
queryController.deleteSchemaRow = (req, res, next) => {
  const id = parseInt(req.params.id);
  const text = `DELETE FROM schema_list WHERE id = $1`;
  db.query(text, [id])
    .then(() => {
      res.status(200).send(`schema_list row deleted with ID: ${id}`);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

/* STRETCH FEATURES*/
// POST request that adds a new row to fields table w/ existing schema_name
queryController.addFieldsRow = (req, res, next) => {};

// PATCH request to edit/update existing fields in an existing fields/schema table
queryController.editFieldsRow = (req, res, next) => {};

module.exports = queryController;
