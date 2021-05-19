import React from "react";

export default function withError(WrappedComponent) {
  return function withLoading({ errorMessage, ...props }) {
  
      return (
          <>
          <WrappedComponent {...props} />
          {errorMessage && (
              <span className = "error-message">
              {errorMessage}
              </span>
          )}
          </>
      );
  }
}