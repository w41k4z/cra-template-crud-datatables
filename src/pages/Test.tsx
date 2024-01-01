import { Helmet } from "react-helmet-async";
import { TestView } from "../sections/test/view";

const Test = () => {
  return (
    <>
      <Helmet>
        <title>Test Page</title>
      </Helmet>
      <TestView />
    </>
  );
};

export default Test;
