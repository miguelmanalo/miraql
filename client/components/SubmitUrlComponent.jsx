import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import SubmitQuery from './SubmitQuery.jsx';

// submitURL component is the parent to submitQuery component (so we can access urlValue in state)

function SubmitUrlComponent() {
  // react hooks to set state for url value
  let [urlValue, setUrlValue] = useState('');

  // function to handle change for the url input and store whatever is typed in state
  const handleUrlInput = (e) => {
    let inputValue = e.target.value;
    setUrlValue(inputValue);
  };

  // return chakra form, added function created above onChange in the input field and returning submitQuery component
  return (
    <div>
      <Grid borderTop="1px" borderColor="gray.200" h={10}>
        <GridItem bg="white">
          <Stack direction={'row'}>
            <FormLabel> URL: </FormLabel>
            <FormControl id="url-form">
              <Input
                type="url"
                placeholder="enter URL here"
                onChange={handleUrlInput}
              />
            </FormControl>
            <Button colorScheme="pink">Connect</Button>
          </Stack>
        </GridItem>
      </Grid>
      <SubmitQuery urlValue={urlValue} />
    </div>
  );
}

export default SubmitUrlComponent;
