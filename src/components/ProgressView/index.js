import { LineWave } from "react-loader-spinner";

import "./index.css";

const ProgressView = () => (
  <div className="progressView">
    <LineWave 
      height="160"
      width="140"
      radius={1}
      color="#4fa94d"
      ariaLabel="puff-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  </div>
);

export default ProgressView;