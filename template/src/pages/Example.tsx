import { Helmet } from "react-helmet-async";
import { ExampleView } from "../sections/example/view";

const Example = () => {
  return (
    <>
      <Helmet>
        <title>Example Page</title>
      </Helmet>
      <ExampleView />
    </>
  );
};

export default Example;
