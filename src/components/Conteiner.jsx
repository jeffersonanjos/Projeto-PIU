import React from 'react'; // Importa o componente Card
import Card from './Card';

// Define o componente funcional 'Conteiner'.
// Ele recebe um objeto 'props' (propriedades) que são dados passados do componente pai (App.jsx).
const Conteiner = (props) => { // Define os cards, modo escuro e ações de arrastar/soltar e reordenar.

  const { titulo, backgroundColor, children, darkMode, onDrop, onCardReorder, draggingCardId } = props; // Lida com o arrastar de um card sobre outro dentro do contêiner.

  const handleDragOverCard = (e, targetCardId) => { // Permite que o card possa ser solto ao prevenir o comportamento padrão.

    e.preventDefault(); // Pega o ID do card arrastado salvo no dataTransfer.
    const draggedCardId = e.dataTransfer.getData('cardId'); // Garante que o card arrastado seja diferente do card alvo.
    if (draggedCardId && draggedCardId !== targetCardId) { // Informa ao App para reordenar o card em relação ao card alvo na coluna.
      onCardReorder(draggedCardId, targetCardId, titulo);
    }
  };
// Lida com o drop do card no espaço vazio do contêiner.
  const handleDropOnContainer = (e) => { // Novamente, 'e.preventDefault()' é necessário para permitir o drop.
    e.preventDefault(); // Chama a função 'onDrop' que foi passada do App.jsx e informando que um card foi solto nesta 'titulo' de coluna.
    onDrop(e, titulo);
  };

  return (
    <div
// Permite o drop ao arrastar algo sobre a <div>.
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropOnContainer}
      style={{
        display: "flex", 
        flexDirection: "column", 
        width: "100%",  
        flex: 1,        
                        
        borderRadius: "12px",
        overflow: "hidden",   
        boxShadow: darkMode ? "0 8px 20px rgba(0, 0, 0, 0.4)" : "0 4px 10px rgba(0,0,0,0.1)",
        background: darkMode ? "#555" : "#fff",
        margin: "8px", 
        transition: "background 0.3s ease, box-shadow 0.3s ease",  
      }}
    >
      {/* Cabeçalho da coluna */}
      <h1
        style={{
          textAlign: "center", 
          margin: 0,          
          padding: "16px",     
          background: darkMode ? "#444" : "#f0f0f0",
          color: darkMode ? "#fff" : "#333",
          fontSize: "18px",    
          borderBottom: darkMode ? "1px solid #666" : "1px solid #ddd",
          transition: "background 0.3s ease, color 0.3s ease, border-bottom 0.3s ease",
        }}
      >
    
        {titulo}
      </h1>
      <div
        style={{
          backgroundColor: backgroundColor,
          flex: 1,        
          padding: "20px", 
          borderRadius: "0 0 12px 12px",
        }}
      >
        
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && child.type === Card) {
            return React.cloneElement(child, {
              onDragOver: (e) => handleDragOverCard(e, child.props.card.id),
              onDrop: (e) => {
                e.preventDefault();
                const draggedCardId = e.dataTransfer.getData('cardId');
                if (draggedCardId && draggedCardId !== child.props.card.id) {
                  onCardReorder(draggedCardId, child.props.card.id, titulo);
                }
              },
              className:
                draggingCardId && draggingCardId !== child.props.card.id
                  ? 'drag-over-target'
                  : '',
            });
          }
          return child;
        })}
        
      </div>
    </div>
  );
};

export default Conteiner;
