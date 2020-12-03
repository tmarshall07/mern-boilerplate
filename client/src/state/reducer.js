export default function (state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };

    default:
      return state;
  }
}
