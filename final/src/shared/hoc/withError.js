import React from "react";

export default function withError(WrappedComponent) {
  return function withLoading({ errorMessage, ...props }) {
  
      return (
          <>
          </>
      )

    return <WrappedComponent {...props} />;
  };
}