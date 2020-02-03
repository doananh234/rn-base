import React from 'react';
import { useSelector } from 'react-redux';

const withLocale = () => WrappedComponent => {
  const LocaleHandler = props => {
    const locale = useSelector(state => state.app.language);
    return <WrappedComponent locale={locale} {...props} />;
  };
  return LocaleHandler;
};

export default withLocale;
