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
    // 'className': Uma string de classes CSS adicionais, usada para feedback visual e animações.
    // 'onDeleteTask': Uma função passada do App.jsx para lidar com a exclusão do card.
    const { card, darkMode, onDragStart, isDragging, onDragOver, className, onDeleteTask } = props;

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
        // O elemento div principal que representa um card arrastável.
        // 'draggable="true"' torna este div arrastável.
        // 'onDragStart' é o evento que dispara quando o arrasto começa.
        // 'onDragOver' é o evento que dispara quando outro card é arrastado sobre este.
        // 'className' pode incluir classes como 'drag-over-target' ou 'card-exit' para animações.
        <div
            draggable="true"
            onDragStart={(e) => onDragStart(e, card.id)}
            onDragOver={onDragOver}
            // Estilos inline para o card, adaptáveis ao modo escuro.
            style={{
                position: 'relative', // Necessário para posicionar o botão de exclusão.
                backgroundColor: darkMode ? "#333" : "#fff", // Cor de fundo do card.
                border: darkMode ? "1px solid #777" : "1px solid #ccc", // Borda do card.
                borderRadius: "8px", // Cantos arredondados.
                padding: "8px",      // Preenchimento interno.
                marginBottom: "8px", // Margem inferior para espaçar os cards.
                // Sombra do card, ajustada para o modo escuro para um visual mais natural.
                boxShadow: darkMode ? "0 4px 12px rgba(0, 0, 0, 0.3)" : "0 2px 5px rgba(0,0,0,0.1)",
                cursor: "grab",      // O cursor vira uma "mãozinha" para indicar que é arrastável.
                // Cor do texto do card, muda com base no 'darkMode'.
                color: darkMode ? "#eee" : "#333",
                // Transições suaves para as mudanças de estilo, tornando a experiência visual mais agradável.
                transition: "background 0.3s ease, border 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, opacity 0.2s ease, transform 0.3s ease",
                // Aplica os estilos definidos em 'draggingStyle' se o card estiver sendo arrastado.
                ...draggingStyle,
            }}
            // Adiciona classes CSS adicionais, como 'drag-over-target' ou 'card-enter'/'card-exit', para feedback visual e animações.
            className={className}
        >
            {/* Botão de exclusão (o "X") */}
            <button
                onClick={() => onDeleteTask(card.id)} // Chama a função onDeleteTask com o ID do card.
                style={{
                    position: 'absolute', // Posiciona o botão de forma absoluta em relação ao card.
                    top: '5px',           // 5px do topo.
                    right: '5px',         // 5px da direita.
                    backgroundColor: 'transparent', // Fundo transparente.
                    border: 'none',       // Sem borda.
                    color: darkMode ? '#bbb' : '#888', // Cor do "X" adaptável ao tema.
                    fontSize: '1.2em',    // Tamanho maior para o "X".
                    cursor: 'pointer',    // Cursor de ponteiro ao passar o mouse.
                    padding: '0',         // Sem preenchimento interno.
                    lineHeight: '1',      // Garante que a altura da linha não afete o posicionamento.
                    transition: 'color 0.2s ease', // Transição suave para a cor ao hover.
                }}
                // Estilo ao passar o mouse (hover) para o botão de exclusão.
                onMouseEnter={(e) => e.currentTarget.style.color = darkMode ? '#fff' : '#333'}
                onMouseLeave={(e) => e.currentTarget.style.color = darkMode ? '#bbb' : '#888'}
            >
                &times; {/* Símbolo de "X" (multiplicação) */}
            </button>

            {/* Título do card */}
            <p style={{ margin: 0, fontWeight: "bold", fontSize: "1.1em" }}>{card.titulo}</p>
            {/* Descrição do card, exibida apenas se existir */}
            {card.descricao && (
                <p style={{ margin: "5px 0 0 0", fontSize: "0.9em", color: darkMode ? "#aaa" : "#666" }}>
                    {card.descricao}
                </p>
            )}
        </div>
    );
};

// Exporta o componente 'Card' para que ele possa ser importado e usado em outros arquivos.
export default Card;
