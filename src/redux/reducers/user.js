const initialState = {};

const configureUser = (state = initialState, action) => {
  switch (action.type) {
    case 'login':
      return {
          ...state,
          user: action.payload.user,
          expiration: action.payload.expiration,
          refreshToken: action.payload.refreshToken,
          refreshTokenExpiration:action.payload.refreshToken.refreshTokenExpiration,
          token:action.payload.token
      }
    case 'logout':
      return initialState;
    default:
      return state;
  }
};

export default configureUser;
