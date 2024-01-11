import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../store/storeGlobal";

const PageWrapper = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.state) {
      dispatch(setAppState(props.state));
    }
  }, [dispatch, props]);

  return (
    <>{props.children}</>
  );
};

export default PageWrapper;
