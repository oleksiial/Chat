import LoginForm from './LoginForm';
import { compose, graphql } from 'react-apollo';

import { SIGN_IN, SIGN_UP } from '../../requests';

export default compose(
  graphql(SIGN_IN, {
    props: ({ mutate }) => ({
      onSignIn: (username, password) => mutate({ variables: { username, password } })
    })
  }),
  graphql(SIGN_UP, {
    props: ({ mutate }) => ({
      onSignUp: (username, password, passwordConfirmation) =>
        mutate({ variables: { username, password, passwordConfirmation } })
    })
  })
)(LoginForm);
