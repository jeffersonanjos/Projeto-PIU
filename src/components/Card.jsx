// Importa a biblioteca React.
import React from 'react';

// Define o componente funcional 'Card'.
// Ele recebe um objeto 'props' (propriedades) do componente pai (App.jsx ou Conteiner.jsx).
const Card = (props) => {
    // Desestrutura as propriedades para facilitar o uso.
    // 'card': O objeto completo do card (contém id, titulo, descricao, column).
    // 'darkMode': Um booleano que indica se o modo escuro está ativado.
    // 'onDragStart': Uma função passada do App.jsx para iniciar o processo de arrasto.
    // 'isDragging': Um booleano que indica se ESTE card específico está sendo arrastado.
    // 'onDragOver': Uma função passada do Conteiner.jsx para lidar com o arrastar sobre este card.
    // 'className': Uma string de classes CSS adicionais, usada para feedback visual.
    const { card, darkMode, onDragStart, isDragging, onDragOver, className } = props;

    // -------------------------------------------------------------------
    // Estilos Condicionais
    // -------------------------------------------------------------------

    // Define um objeto de estilo inline que será aplicado ao card APENAS se ele estiver sendo arrastado.
    // 'isDragging' é um booleano que vem do App.jsx.
    // Se 'isDragging' for true, aplica opacidade e borda tracejada; caso contrário, é um objeto vazio.
    const draggingStyle = isDragging ? { opacity: 0.5, border: '2px dashed #999' } : {};

    // -------------------------------------------------------------------
    // Renderização do Componente (JSX)
    // -------------------------------------------------------------------

    return (
      // O elemento <div> que representa um único card (tarefa).
      // Ele é configurado para ser arrastável.
      <div
        draggable // A propriedade 'draggable' HTML torna este elemento arrastável.
        // 'onDragStart': Evento disparado quando o usuário começa a arrastar este elemento.
        // Chama a função 'onDragStart' (passada do App.jsx), enviando o evento e o ID do card.
        onDragStart={(e) => onDragStart(e, card.id)}
        // 'onDragOver': Evento disparado quando um elemento arrastável passa sobre este <div>.
        // A função 'onDragOver' é passada do Conteiner.jsx para lidar com a reordenação.
        onDragOver={onDragOver}
        style={{
          // Cor de fundo do card, muda com base no 'darkMode'.
          background: darkMode ? "#666" : "#fff",
          // Borda do card, muda com base no 'darkMode'.
          border: darkMode ? "1px solid #777" : "1px solid #ccc",
          borderRadius: "8px", // Cantos arredondados.
          padding: "8px",      // Preenchimento interno.
          marginBottom: "8px", // Margem inferior para espaçar os cards.
          // Sombra do card, ajustada para o modo escuro para um visual mais natural.
          boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 2px 5px rgba(0,0,0,0.1)",
          cursor: "grab",      // O cursor vira uma "mãozinha" para indicar que é arrastável.
          // Cor do texto do card, muda com base no 'darkMode'.
          color: darkMode ? "#eee" : "#333",
          // Transições suaves para as mudanças de estilo, tornando a experiência visual mais agradável.
          transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, opacity 0.2s ease",
          // Aplica os estilos definidos em 'draggingStyle' se o card estiver sendo arrastado.
          ...draggingStyle,
        }}
        // Adiciona classes CSS adicionais, como 'drag-over-target', para feedback visual.
        className={className}
      >
        {/* Título do card */}
        <p style={{ margin: 0, fontWeight: "bold" }}>{card.titulo}</p>
        {/* Descrição do card */}
        <div>{card.descricao}</div>
      </div>
    );
  };
  
  // Exporta o componente 'Card' para que ele possa ser importado e usado em outros arquivos.
  export default Card;
