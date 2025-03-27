import React, { useReducer } from 'react';

// Initial state for the form
const initialState = {
  name: '',
  email: '',
  password: '',
  error: ''
};

// Reducer function to handle form state updates
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'RESET':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

const SignupForm = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.password) {
      dispatch({ type: 'SET_ERROR', error: 'All fields are required' });
      return;
    }
    alert(`Form submitted with: ${JSON.stringify(state, null, 2)}`);
    dispatch({ type: 'RESET' });
  };

  return (
    <div>
      <h2>Signup Form</h2>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type="text" name="name" value={state.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" name="email" value={state.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" name="password" value={state.password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
      </form>
    </div>
  );
};

export default SignupForm;
