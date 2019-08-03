
export default store => next => action => {
  console.log('action', action);
  console.log('data', store);
  return next(action);
};
