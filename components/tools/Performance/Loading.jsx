import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Loading = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#5ec2cc");

  return (
    <div className="flex-col">
      <PuffLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loading;
