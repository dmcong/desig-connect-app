import React, { useState } from "react";
import Transfer from "./transfer";

const Hedera = () => {
  const [accountId, setAccountId] = useState("");

  return (
    <div>
      Hedera
      <Transfer />
    </div>
  );
};

export default Hedera;
