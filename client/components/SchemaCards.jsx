import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

const SchemaCards = (boolSwap) => {
  const [schemaResponse, setResponse] = useState([]);
  const [fieldResponse, setFields] = useState([]);

  // fetch request to get all the table names and field information for our tables
  useEffect(() => {
    fetch("/schema")
      .then((res) => {
        // console.log('res schema', res);
        return res.json();
      })
      .then((res) => setResponse(res))
      .catch((err) => {
        console.log(err);
      });
  }, [boolSwap]);

  console.log("this is the schemaResponse", schemaResponse);

  useEffect(() => {
    fetch("/field")
      .then((res) => {
        // console.log('res field', res);
        return res.json();
      })
      .then((res) => setFields(res))
      .catch((err) => {
        console.log(err);
      });
  }, [boolSwap]);

  console.log("this is the fieldResponse", fieldResponse);

  // console.log('schemaResponse[0].schema_name ', schemaResponse[0].schema_name);

  /* We want to dynamically render/populate a new <tr> and <td>s every
  time a new table is created/we call fetch */
  // create a const to store the responses from fetches
  // const responses = [schemaResponse, fieldResponse];
  // newCard array will store elements we want to render below
  // console.log('responses', responses);
  // const newCard = [];
  
  // for (const [index, value] of responses.entries()) {
  //   newCard.push(
  //     // <br></br>
  //     <table key={index}>{value}</table>
  //   )
  // }

  // <br></br>
  //     <table> 
  //       <div>
  //         {newCard}
  //       </div>
  //     </table>

  return (
    <>
      <br></br>
      <br></br>
      <table>
        <div>
          <tr>
            {/* {// grab table_name from response object} */}
            <h2 className="tableHeader">THIS IS YOUR TABLE NAME BITCH</h2>
          </tr>
          <tr>
            {/* {// grab field_name and field_type from response object} */}
            <th className="table">Field Name</th>
            <th className="table">Field Type</th>
          </tr>
          <tr>
            <td>id</td>
            <td>id</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>String</td>
          </tr>
          <button className="updateDelete">Delete</button>
          <button className="updateDelete">Update</button>
        </div>
      </table>
    </>
  );
};

export default SchemaCards;
