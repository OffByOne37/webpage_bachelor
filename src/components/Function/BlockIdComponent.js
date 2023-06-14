import React from "react";

const BlockIdComponent = ({
  blockID,
  blockIDRequired,
  setBlockID,
  setBlockIDRequired,
}) => {
  const handleBlockIdRequiredClick = () => {
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
          onChange={() => handleBlockIdRequiredClick()}
        />
        BlockID
      </label>
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
