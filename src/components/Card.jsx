const Card = (props) => {
    return (
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", props.titulo);
        }}
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "8px",
          marginBottom: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          cursor: "grab",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{props.titulo}</p>
        <div>{props.descricao}</div>
      </div>
    );
  };
  
  export default Card;
  