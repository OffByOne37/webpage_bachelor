const EnumOptionPane = ({ generateFinalEnum, currEnumValues }) => {
  return (
    <>
      {currEnumValues.map((x) => (
        <h1 key={x.enumValue}>{x.enumValue}</h1>
      ))}
    </>
  );
};

export default EnumOptionPane;
