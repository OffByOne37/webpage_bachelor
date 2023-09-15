import React from "react";
import Warning from "../Warning";

const BlockIdComponent = ({
  blockID,
  blockIDRequired,
  setBlockID,
  setBlockIDRequired,
}) => {
  const handleBlockIDRequiredClick = () => {
    setBlockIDRequired(!blockIDRequired);
    if (blockIDRequired) {
      setBlockID("");
    }
  };

  return (
    <>
      <label style={{ color: blockIDRequired ? "black" : "grey" }}>
        <input
          type="checkbox"
          checked={blockIDRequired}
          style={{ marginRight: "4px" }}
          onChange={() => handleBlockIDRequiredClick()}
        />
        BlockID
      </label>

      {blockIDRequired && blockID === "" && (
        <Warning message={"Please provide a corresponding Block ID."} />
      )}

      {blockIDRequired && (
        <input
          type="text"
          value={blockID}
          onChange={(e) => setBlockID(e.target.value)}
          required={blockIDRequired}
        />
      )}
    </>
  );
};

export default BlockIdComponent;
