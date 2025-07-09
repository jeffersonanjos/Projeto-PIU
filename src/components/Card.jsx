// Importa o React
import React from 'react';

// Componente funcional Card
const Card = (props) => {
    // Props desestruturadas
    const { card, darkMode, onDragStart, isDragging, onDragOver, className, onDeleteTask } = props;

    // Estilo aplicado apenas se estiver sendo arrastado
    const draggingStyle = isDragging ? { opacity: 0.5, border: '2px dashed #999' } : {};

    // Renderização do Card
    return (
        <div
            draggable="true"
            onDragStart={(e) => onDragStart(e, card.id)}
            onDragOver={onDragOver}
            style={{
                position: 'relative',
                backgroundColor: darkMode ? "#333" : "#fff",
                border: darkMode ? "1px solid #777" : "1px solid #ccc",
                borderRadius: "8px",
                padding: "8px",
                marginBottom: "8px",
                boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 2px 5px rgba(0,0,0,0.1)",
                cursor: "grab",
                color: darkMode ? "#eee" : "#333",
                transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, opacity 0.2s ease, transform 0.3s ease",
                ...draggingStyle,
            }}
            className={className}
        >
            {/* Botão de deletar */}
            <button
                onClick={() => onDeleteTask(card.id)}
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: darkMode ? '#bbb' : '#888',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    padding: '0',
                    lineHeight: '1',
                    transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = darkMode ? '#fff' : '#333'}
                onMouseLeave={(e) => e.currentTarget.style.color = darkMode ? '#bbb' : '#888'}
            >
                &times;
            </button>

            {/* Título */}
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.1em" }}>{card.titulo}</p>

            {/* Descrição, se houver */}
            {card.descricao && (
                <p style={{ margin: "5px 0 0 0", fontSize: "0.9em", color: darkMode ? "#aaa" : "#666" }}>
                    {card.descricao}
                </p>
            )}
        </div>
    );
};

// Exporta o componente
export default Card;
