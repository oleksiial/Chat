import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import View from './View';
import { VALIDATE_SESSION } from '../requests';

export default compose(
  graphql(VALIDATE_SESSION, {
    props: ({ data: { loading, validate } }) => {
      return {
        sessionLoading: loading,
        isLoggedIn: validate
      };
    }
  })
)(View);
