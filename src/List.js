import React from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

function List () {
  const { path, url } = useRouteMatch();
  const { country } = useParams();

  console.log({ path, url, country });
}

export default List;
