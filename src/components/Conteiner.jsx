const Conteiner = (props) => {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const cardTitle = e.dataTransfer.getData("text/plain");
        alert(`Card solto na coluna ${props.titulo}: ${cardTitle}`);
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        flex: 1,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        background: "#fff",
        margin: "8px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          margin: 0,
          padding: "16px",
          background: "#f0f0f0",
          fontSize: "18px",
          borderBottom: "1px solid #ddd",
        }}
      >
        {props.titulo}
      </h1>
      <div
        style={{
          backgroundColor: props.backgroundColor,
          flex: 1,
          padding: "20px",
          borderRadius: "0 0 12px 12px",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Conteiner;
